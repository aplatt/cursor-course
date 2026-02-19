import { Link2, Cpu, BarChart3 } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Link2,
    title: "Paste a repo URL",
    description:
      "Drop any public GitHub repository link into the search bar. We support any open source project.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI analyzes everything",
    description:
      "Our AI engine crawls the repository, examining code, PRs, issues, contributors, stars, and release history in real time.",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Get actionable insights",
    description:
      "Receive a comprehensive report with summaries, metrics, health scores, and recommendations in under 10 seconds.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium text-primary">How It Works</p>
          <h2 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Three steps to deep repository insight
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] h-px w-[calc(100%-5rem)] bg-border" />
              )}

              <div className="relative mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.step}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
