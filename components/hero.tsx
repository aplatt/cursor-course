import { Star, GitPullRequest, Users } from "lucide-react"
import { RepoSearch } from "@/components/repo-search"

const stats = [
  {
    icon: Star,
    value: "2.4M+ Stars",
    label: "Repos analyzed",
  },
  {
    icon: GitPullRequest,
    value: "12M+ PRs",
    label: "Pull requests indexed",
  },
  {
    icon: Users,
    value: "50K+ Devs",
    label: "Trust GitPulse",
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-primary">
              AI-Powered Repository Intelligence
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Understand any GitHub repo{" "}
            <span className="text-primary">in seconds</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Paste a repository URL and get an instant AI-generated summary, star
            trends, key pull requests, contributor analysis, and a full health
            score.
          </p>

          {/* Client-side search input */}
          <RepoSearch />

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="flex items-center justify-center gap-3 rounded-lg border border-border/50 bg-card/50 px-6 py-4"
              >
                <stat.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
