"use client";

export default function ControlSplit({
  usagePercent,
  systemPercent,
  usageDollars,
  systemDollars,
}: {
  usagePercent: number;
  systemPercent: number;
  usageDollars: number;
  systemDollars: number;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        The Honesty Filter
      </h3>

      <div className="flex rounded-full overflow-hidden h-8 mb-4">
        <div
          className="bg-blue-600 flex items-center justify-center text-white text-xs font-bold"
          style={{ width: `${Math.max(usagePercent, 8)}%` }}
        >
          {Math.round(usagePercent)}%
        </div>
        <div
          className="bg-red-500 flex items-center justify-center text-white text-xs font-bold"
          style={{ width: `${Math.max(systemPercent, 8)}%` }}
        >
          {Math.round(systemPercent)}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
            <span className="text-sm font-semibold text-blue-900">You Control</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">${usageDollars.toFixed(2)}</p>
          <p className="text-xs text-blue-700 mt-1">Usage-driven charges you can reduce</p>
        </div>

        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-sm font-semibold text-red-900">You Don&apos;t Control</span>
          </div>
          <p className="text-2xl font-bold text-red-900">${systemDollars.toFixed(2)}</p>
          <p className="text-xs text-red-700 mt-1">System charges set by markets &amp; regulation</p>
        </div>
      </div>
    </div>
  );
}