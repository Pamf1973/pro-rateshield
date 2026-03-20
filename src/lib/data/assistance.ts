export const ASSISTANCE_PROGRAMS = [
  {
    name: "LIHEAP (Home Energy Assistance Program)",
    eligibility:
      "NYC residents at or below 60% of state median income. A household of 4 earning under ~$62,000/year typically qualifies.",
    howToApply:
      "Apply through your local Department of Social Services office or online through myBenefits.ny.gov. You will need proof of income, a recent Con Edison bill, and ID.",
    link: "https://otda.ny.gov/programs/heap/",
    type: "bill_credit",
  },
  {
    name: "Con Edison EnergyShare",
    eligibility:
      "Con Edison customers who are behind on payments and experiencing financial hardship. Must demonstrate inability to pay current bill.",
    howToApply:
      "Call Con Edison at 1-800-752-6633 or visit conEd.com/EnergyShare. You may receive a one-time grant toward your arrears balance.",
    link: "https://www.coned.com/en/accounts-billing/payment-plans-and-assistance/help-paying-your-bill",
    type: "grant",
  },
  {
    name: "Con Edison Payment Plans",
    eligibility:
      "Any Con Edison customer with an outstanding balance. No income requirement.",
    howToApply:
      "Call Con Edison at 1-800-752-6633 or log into your account online to set up a Deferred Payment Agreement (DPA). Spreads your balance over 10-12 months.",
    link: "https://www.coned.com/en/accounts-billing/payment-plans-and-assistance",
    type: "payment_plan",
  },
  {
    name: "Low-Income Rate Discount",
    eligibility:
      "Customers enrolled in a qualifying public assistance program (SNAP, Medicaid, SSI, TANF).",
    howToApply:
      "If you are enrolled in a qualifying program, contact Con Edison or your local DSS office to confirm your discount is applied. It should be automatic, but verify.",
    link: "https://www.coned.com/en/accounts-billing/payment-plans-and-assistance",
    type: "rate_discount",
  },
  {
    name: "Disconnection Protections",
    eligibility: "All Con Edison customers during specific conditions.",
    howToApply:
      "These protections are automatic. Con Edison cannot disconnect your service during extreme heat or cold, if you are enrolled in a hardship program, or if your household has documented medical equipment needs.",
    link: "https://www.coned.com/en/accounts-billing/payment-plans-and-assistance",
    type: "protection",
  },
];