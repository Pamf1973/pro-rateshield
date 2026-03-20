/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ComponentBreakdown } from "@/lib/engine/decompose";

const COLORS = ["#2563EB", "#DC2626", "#F59E0B", "#059669", "#7C3AED"];

export default function CostBreakdownChart({
  components,
}: {
  components: ComponentBreakdown[];
}) {
  const data = components.map((c) => ({
    name: c.label,
    value: c.dollars,
    percent: c.percent,
  }));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={60}
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any) => [`$${Number(value).toFixed(2)}`, ""]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "14px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-gray-600">{item.name}</span>
            <span className="ml-auto font-semibold">
              ${item.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}