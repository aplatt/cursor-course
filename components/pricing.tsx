import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For developers exploring open source projects.",
    features: [
      "5 analyses per day",
      "Basic AI summaries",
      "Star count & fork metrics",
      "Public repo support",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For teams evaluating dependencies and contributions.",
    features: [
      "Unlimited analyses",
      "Advanced AI summaries with code insights",
      "PR intelligence & merge velocity",
      "Contributor network mapping",
      "Health score breakdown",
      "Export reports as PDF",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations managing open source at scale.",
    features: [
      "Everything in Pro",
      "Private repository support",
      "Custom AI analysis prompts",
      "API access & webhooks",
      "SSO & team management",
      "Priority support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium text-primary">Pricing</p>
          <h2 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start free and scale as you need. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-xl border p-6 md:p-8 ${
                plan.highlighted
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 bg-card"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>

              <ul className="mt-8 flex flex-col gap-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                size="lg"
                asChild
              >
                <Link href="/sign-up">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
