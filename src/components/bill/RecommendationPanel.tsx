"use client";

import { Recommendation } from "@/lib/engine/recommend";

export default function RecommendationPanel({
  actionable,
  honest,
}: {
  actionable: Recommendation[];
  honest: Recommendation[];
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">What You Can Do</h3>
        <div className="space-y-3">
          {actionable.map((rec, i) => (
            <div key={i} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-blue-900">{rec.title}</h4>
                {rec.estimatedSavings && (
                  <span className="text-sm font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded shrink-0 ml-3">
                    Save {rec.estimatedSavings}
                  </span>
                )}
              </div>
              <p className="text-sm text-blue-800 mt-2">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          What&apos;s Honestly Outside Your Control
        </h3>
        <div className="space-y-3">
          {honest.map((rec, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900">{rec.title}</h4>
              <p className="text-sm text-gray-700 mt-2">{rec.description}</p>
            </div>
          ))}
        </div>
        <a href="/legislation" className="inline-block mt-4 text-blue-700 font-semibold hover:underline">
          See what Albany is doing about it &rarr;
        </a>
      </div>
    </div>
  );
}
