/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FM } from "@/lib/data/billData";

interface BillRecord {
  billing_period_end: string;
  total_amount: number; // cents
}

interface TrendChartProps {
  bills: BillRecord[];
}

function formatMonth(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

export default function TrendChart({ bills }: TrendChartProps) {
  const data = bills.map((b) => ({
    month: formatMonth(b.billing_period_end),
    total: Number((b.total_amount / 100).toFixed(2)),
  }));

  if (data.length === 0) {
    return (
      <div
        style={{
          background: "#F9FAFB",
          borderRadius: 16,
          padding: 48,
          textAlign: "center",
          border: "2px dashed #E5E7EB",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
          No bills yet
        </div>
        <div style={{ fontSize: 13, color: "#9CA3AF" }}>
          Decode your first bill to start tracking your history
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
          marginBottom: 20,
          fontFamily: FM,
        }}
      >
        Monthly Bill Total
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0D9488" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: FM }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: FM }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value: any) => [`$${Number(value).toFixed(2)}`, "Total"]}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              fontSize: 13,
              fontFamily: FM,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, fontFamily: FM }} />
          <Area
            type="monotone"
            dataKey="total"
            name="Total Bill"
            stroke="#0D9488"
            strokeWidth={2}
            fill="url(#totalGradient)"
            dot={{ fill: "#0D9488", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
