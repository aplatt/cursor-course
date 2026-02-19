import {
  Brain,
  Star,
  GitPullRequest,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Summaries",
    description:
      "Get instant, context-aware summaries of any repository. Understand the purpose, architecture, and tech stack in seconds.",
  },
  {
    icon: Star,
    title: "Star Analytics",
    description:
      "Track star growth over time with interactive charts. Identify viral moments and understand what drives community interest.",
  },
  {
    icon: GitPullRequest,
    title: "PR Intelligence",
    description:
      "Surface the most impactful pull requests. See merge velocity, review patterns, and identify bottlenecks in the workflow.",
  },
  {
    icon: Users,
    title: "Contributor Insights",
    description:
      "Analyze contributor diversity, activity patterns, and community health. Identify key maintainers and rising contributors.",
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description:
      "Monitor repository momentum with real-time growth metrics. Compare against similar projects and track trends over time.",
  },
  {
    icon: Shield,
    title: "Health Score",
    description:
      "A comprehensive score covering code quality, documentation, issue response time, release cadence, and security practices.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Everything you need to evaluate a repository
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            From high-level summaries to deep contributor analysis, GitPulse gives you a
            complete picture of any open source project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card p-6 transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
