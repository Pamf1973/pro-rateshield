import { NextRequest, NextResponse } from "next/server";
import { decomposeBill } from "@/lib/engine/decompose";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { totalAmount, kwhUsage, billingPeriodStart, billingPeriodEnd } = body;

    if (!totalAmount || !kwhUsage || !billingPeriodStart || !billingPeriodEnd) {
      return NextResponse.json(
        { error: "Missing required fields: totalAmount, kwhUsage, billingPeriodStart, billingPeriodEnd" },
        { status: 400 }
      );
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      return NextResponse.json({ error: "totalAmount must be a positive number" }, { status: 400 });
    }
    if (typeof kwhUsage !== "number" || kwhUsage <= 0) {
      return NextResponse.json({ error: "kwhUsage must be a positive number" }, { status: 400 });
    }

    const result = decomposeBill({
      totalAmount: Number(totalAmount),
      kwhUsage: Number(kwhUsage),
      billingPeriodStart,
      billingPeriodEnd,
    });

    // Save bill to DB (user_id = null for pre-auth MVP)
    const supabase = await createClient();
    await supabase.from("bills").insert({
      user_id: null,
      total_amount: Math.round(totalAmount * 100), // store as cents
      kwh_usage: Math.round(kwhUsage),
      billing_period_start: billingPeriodStart,
      billing_period_end: billingPeriodEnd,
      service_class: "SC1",
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to decompose bill" },
      { status: 500 }
    );
  }
}
