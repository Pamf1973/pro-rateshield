"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useBillStore } from "@/stores/billStore";
import PageShell from "@/components/layout/PageShell";
import { F, FM } from "@/lib/data/billData";

interface BillFormData {
  totalAmount: number;
  kwhUsage: number;
  billingDays: number;
}

export default function HomePage() {
  const router = useRouter();
  const { setResult, setLoading, setError } = useBillStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillFormData>();

  const onSubmit = async (data: BillFormData) => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - data.billingDays);

    const billInput = {
      totalAmount: Number(data.totalAmount),
      kwhUsage: Number(data.kwhUsage),
      billingPeriodStart: start.toISOString().split("T")[0],
      billingPeriodEnd: today.toISOString().split("T")[0],
    };

    setLoading(true);

    try {
      const res = await fetch("/api/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billInput),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? "Failed to decode bill");
        setLoading(false);
        router.push("/bill/demo");
        return;
      }

      const result = await res.json();
      setResult(result);
      router.push("/bill/result");
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error — please try again");
      setLoading(false);
      router.push("/bill/demo");
    }
  };

  const fieldStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 16,
    fontFamily: FM,
    border: "2px solid #E5E7EB",
    borderRadius: 12,
    outline: "none",
    transition: "border-color 0.15s ease",
    background: "#F9FAFB",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: 13,
    fontWeight: 600 as const,
    color: "#374151",
    fontFamily: F,
    marginBottom: 6,
  };

  const errorStyle = {
    fontSize: 12,
    color: "#DC2626",
    fontFamily: F,
    marginTop: 4,
  };

  return (
    <PageShell>
      <main
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "60px 32px",
          fontFamily: F,
        }}
      >
        {/* Hero */}
        <div
          style={{
            display: "inline-block",
            background: "#F0FDFA",
            color: "#0D9488",
            fontSize: 12,
            fontWeight: 600,
            padding: "6px 14px",
            borderRadius: 99,
            marginBottom: 20,
            border: "1px solid #CCFBF1",
          }}
        >
          Free for all Con Edison customers
        </div>

        <h1
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "#0F172A",
            marginBottom: 12,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Your Con Edison bill,{" "}
          <span style={{ color: "#0D9488" }}>decoded.</span>
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "#6B7280",
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          Enter three numbers from your bill. We&apos;ll show you exactly where
          every dollar goes — and what you can actually do about it.
        </p>

        {/* Form */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Total Bill Amount ($)</label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 16,
                  color: "#9CA3AF",
                  fontFamily: FM,
                  pointerEvents: "none",
                }}
              >
                $
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="161.22"
                {...register("totalAmount", {
                  required: "Enter your bill total",
                  min: { value: 1, message: "Must be at least $1" },
                })}
                style={{ ...fieldStyle, paddingLeft: 32 }}
                onFocus={(e) => (e.target.style.borderColor = "#0D9488")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>
            {errors.totalAmount && (
              <div style={errorStyle}>{errors.totalAmount.message}</div>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Electricity Used (kWh)</label>
            <input
              type="number"
              placeholder="500"
              {...register("kwhUsage", {
                required: "Enter your kWh usage",
                min: { value: 1, message: "Must be at least 1 kWh" },
              })}
              style={fieldStyle}
              onFocus={(e) => (e.target.style.borderColor = "#0D9488")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
            {errors.kwhUsage && (
              <div style={errorStyle}>{errors.kwhUsage.message}</div>
            )}
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Billing Period (days)</label>
            <input
              type="number"
              placeholder="30"
              {...register("billingDays", {
                required: "Enter billing period days",
                min: { value: 1, message: "Must be at least 1 day" },
                max: { value: 90, message: "Max 90 days" },
              })}
              style={fieldStyle}
              onFocus={(e) => (e.target.style.borderColor = "#0D9488")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
            {errors.billingDays && (
              <div style={errorStyle}>{errors.billingDays.message}</div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            style={{
              width: "100%",
              padding: "14px",
              background: "#0D9488",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              fontFamily: F,
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              transition: "background 0.15s ease",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#0F766E")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#0D9488")
            }
          >
            Decode My Bill →
          </button>
        </div>

        <div
          style={{
            marginTop: 20,
            padding: "12px 16px",
            background: "#F0FDFA",
            borderRadius: 10,
            fontSize: 12,
            color: "#115E59",
            lineHeight: 1.6,
            borderLeft: "3px solid #5EEAD4",
          }}
        >
          💡 You can find these numbers on the first page of your Con Edison
          bill. Look for &quot;Total Amount Due&quot;, &quot;kWh Used&quot;, and
          the billing dates.
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            marginTop: 48,
            fontSize: 13,
            color: "#9CA3AF",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0F172A" }}>
              76%
            </div>
            <div>of your bill you can&apos;t control</div>
          </div>
          <div
            style={{ width: 1, background: "#E5E7EB", alignSelf: "stretch" }}
          />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0D9488" }}>
              24%
            </div>
            <div>you can actually reduce</div>
          </div>
          <div
            style={{ width: 1, background: "#E5E7EB", alignSelf: "stretch" }}
          />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0F172A" }}>
              43%
            </div>
            <div>rate increase since 2020</div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
