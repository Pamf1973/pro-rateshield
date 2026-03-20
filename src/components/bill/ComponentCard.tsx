"use client";

import { useState } from "react";
import { Attribution } from "@/lib/engine/attribution";
import { ComponentBreakdown } from "@/lib/engine/decompose";

export default function ComponentCard({
  component,
  attribution,
}: {
  component: ComponentBreakdown;
  attribution?: Attribution;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-8 rounded-full ${
              component.canControl ? "bg-blue-600" : "bg-red-500"
            }`}
          />
          <div>
            <h4 className="font-semibold text-gray-900">{component.label}</h4>
            <p className="text-xs text-gray-500">
              {component.canControl ? "You can reduce this" : "Outside your control"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">${component.dollars.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{Math.round(component.percent)}% of bill</p>
        </div>
      </div>

      {expanded && attribution && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed">{attribution.explanation}</p>
          <p className="text-xs text-gray-400 mt-3 italic">Source: {attribution.source}</p>
        </div>
      )}
    </div>
  );
}