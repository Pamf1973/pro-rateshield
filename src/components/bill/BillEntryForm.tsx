"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBillStore } from "@/stores/billStore";

export default function BillEntryForm() {
  const router = useRouter();
  const { setResult, setLoading, setError, isLoading } = useBillStore();
  const [form, setForm] = useState({
    totalAmount: "",
    kwhUsage: "",
    billingPeriodStart: "",
    billingPeriodEnd: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalAmount: parseFloat(form.totalAmount),
          kwhUsage: parseInt(form.kwhUsage),
          billingPeriodStart: form.billingPeriodStart,
          billingPeriodEnd: form.billingPeriodEnd,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Decomposition failed");
      }

      const data = await res.json();
      setResult(data);
      setLoading(false);
      router.push("/bill/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Total Bill Amount ($)
        </label>
        <input
          type="number"
          step="0.01"
          min="1"
          required
          placeholder="175.43"
          value={form.totalAmount}
          onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          The total amount on your Con Edison bill
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          kWh Usage
        </label>
        <input
          type="number"
          min="1"
          required
          placeholder="623"
          value={form.kwhUsage}
          onChange={(e) => setForm({ ...form, kwhUsage: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Kilowatt-hours used — found on your bill summary
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Billing Period Start
          </label>
          <input
            type="date"
            required
            value={form.billingPeriodStart}
            onChange={(e) =>
              setForm({ ...form, billingPeriodStart: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Billing Period End
          </label>
          <input
            type="date"
            required
            value={form.billingPeriodEnd}
            onChange={(e) =>
              setForm({ ...form, billingPeriodEnd: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Decoding..." : "Decode My Bill"}
      </button>
    </form>
  );
}