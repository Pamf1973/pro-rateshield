// Supabase Edge Function: ingest-nyiso
// Fetches Zone J (NYC) Day-Ahead LBMP wholesale prices from NYISO's public CSV feed
// and upserts into the nyiso_prices table.
//
// Usage:
//   GET /functions/v1/ingest-nyiso            → ingests yesterday's data
//   GET /functions/v1/ingest-nyiso?date=2026-03-06 → ingests specific date
//
// NYISO publishes previous day's data by ~7 AM ET. The cron runs at 8 AM UTC (4 AM ET).
// Wait — NYISO publishes DA results the day before delivery by ~11 AM ET.
// So we fetch today's date to get today's DA prices (published yesterday).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// NYISO public CSV — note: HTTP only (HTTPS returns 403), filename has no "DA_" prefix
const NYISO_BASE_URL =
  "http://mis.nyiso.com/public/csv/damlbmp";
const ZONE_J_NAME = "N.Y.C.";

interface NyisoRow {
  timestamp: string;
  zone: string;
  lbmp_total: number;
  lbmp_energy: number;
  lbmp_congestion: number;
  lbmp_losses: number;
}

// Format a Date as YYYYMMDD in ET (UTC-5 standard / UTC-4 daylight)
function toNyisoDate(d: Date): string {
  // NYISO operates in Eastern Time. Approximate by using UTC-5.
  const et = new Date(d.getTime() - 5 * 60 * 60 * 1000);
  const y = et.getUTCFullYear();
  const m = String(et.getUTCMonth() + 1).padStart(2, "0");
  const day = String(et.getUTCDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

function parseCsv(text: string): NyisoRow[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  // Header: Time Stamp,Name,PTID,LBMP ($/MWHr),Marginal Cost Losses ($/MWHr),Marginal Cost Congestion ($/MWHr)
  const rows: NyisoRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length < 6) continue;

    const name = cols[1].trim();
    if (name !== ZONE_J_NAME) continue;

    // Time Stamp format: "03/06/2026 00:00:00"
    const rawTs = cols[0].trim();
    const [datePart, timePart] = rawTs.split(" ");
    const [month, day, year] = datePart.split("/");
    // Build ISO timestamp assuming Eastern Time (offset -05:00 for winter)
    const isoTimestamp = `${year}-${month}-${day}T${timePart}-05:00`;

    const lbmpTotal = parseFloat(cols[3]);
    const lbmpLosses = parseFloat(cols[4]);
    const lbmpCongestion = parseFloat(cols[5]);
    // Energy component = Total - Losses - Congestion
    const lbmpEnergy = lbmpTotal - lbmpLosses - lbmpCongestion;

    if (isNaN(lbmpTotal)) continue;

    rows.push({
      timestamp: new Date(isoTimestamp).toISOString(),
      zone: "ZONE_J",
      lbmp_total: Math.round(lbmpTotal * 100) / 100,
      lbmp_energy: Math.round(lbmpEnergy * 100) / 100,
      lbmp_congestion: Math.round(lbmpCongestion * 100) / 100,
      lbmp_losses: Math.round(lbmpLosses * 100) / 100,
    });
  }

  return rows;
}

Deno.serve(async (req: Request) => {
  try {
    // Parse optional date param
    const url = new URL(req.url);
    const dateParam = url.searchParams.get("date"); // YYYY-MM-DD
    const targetDate = dateParam ? new Date(dateParam) : new Date();

    // Default: use today's date (NYISO DA prices for today are published by 11 AM ET yesterday)
    // If no date param, fetch yesterday's DA data (the day before today)
    if (!dateParam) {
      targetDate.setUTCDate(targetDate.getUTCDate() - 1);
    }

    const nyisoDate = toNyisoDate(targetDate);
    const csvUrl = `${NYISO_BASE_URL}/${nyisoDate}damlbmp_zone.csv`;

    const csvRes = await fetch(csvUrl);
    if (!csvRes.ok) {
      return Response.json(
        {
          error: `NYISO fetch failed: ${csvRes.status}`,
          url: csvUrl,
          hint: "NYISO may not have published data for this date yet. Try a prior date.",
        },
        { status: 502 }
      );
    }

    const csvText = await csvRes.text();
    const rows = parseCsv(csvText);

    if (rows.length === 0) {
      return Response.json(
        {
          error: "No Zone J rows found in CSV",
          url: csvUrl,
          rawLength: csvText.length,
        },
        { status: 422 }
      );
    }

    // Initialize Supabase client using environment variables injected by Supabase
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error, count } = await supabase
      .from("nyiso_prices")
      .upsert(rows, {
        onConflict: "timestamp,zone",
        count: "exact",
      });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      message: "OK",
      date: nyisoDate,
      inserted: count ?? rows.length,
      url: csvUrl,
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
});
