import {
  Star,
  GitPullRequest,
  GitFork,
  Eye,
  TrendingUp,
  Shield,
  Clock,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DemoPreview() {
  return (
    <section id="demo" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium text-primary">Live Preview</p>
          <h2 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            See GitPulse in action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Here is what a real analysis looks like for a popular open source project.
          </p>
        </div>

        {/* Mock Analysis Card */}
        <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <GitFork className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-mono text-lg font-semibold text-foreground">
                    vercel/next.js
                  </h3>
                  <p className="text-sm text-muted-foreground">The React Framework</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Shield className="mr-1 h-3 w-3" />
                Health: 94/100
              </Badge>
              <Badge variant="outline" className="border-border text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                Analyzed 2s ago
              </Badge>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Star, label: "Stars", value: "128.4K", trend: "+2.1K this month" },
              { icon: GitFork, label: "Forks", value: "27.3K", trend: "+340 this month" },
              { icon: GitPullRequest, label: "Open PRs", value: "487", trend: "23 merged today" },
              { icon: Eye, label: "Watchers", value: "3.1K", trend: "Active community" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border/50 bg-secondary/50 p-4"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <stat.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{stat.label}</span>
                </div>
                <p className="mt-2 text-xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-primary">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>

          {/* AI Summary */}
          <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">AI Summary</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              Next.js is the most widely adopted React framework for production web applications, 
              maintained by Vercel. The repository shows exceptional health with consistent release 
              cadence (bi-weekly), active community engagement (487 open PRs with a 72-hour median 
              merge time), and strong contributor diversity (2,800+ contributors). Recent focus areas 
              include Turbopack stabilization, React Server Components improvements, and enhanced 
              caching APIs. The project demonstrates excellent documentation practices and a mature 
              CI/CD pipeline.
            </p>
          </div>

          {/* Important PRs */}
          <div className="mt-8">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <GitPullRequest className="h-4 w-4 text-primary" />
              Key Pull Requests
            </h4>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "feat: Stabilize Turbopack for production builds",
                  number: "#71234",
                  author: "timneutkens",
                  status: "merged",
                  comments: 84,
                },
                {
                  title: "fix: Improve cache invalidation for dynamic routes",
                  number: "#71189",
                  author: "feedthejim",
                  status: "open",
                  comments: 32,
                },
                {
                  title: "feat: Add support for React 19.2 Activity component",
                  number: "#71102",
                  author: "ztanner",
                  status: "merged",
                  comments: 56,
                },
              ].map((pr) => (
                <div
                  key={pr.number}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <GitPullRequest
                      className={`h-4 w-4 shrink-0 ${
                        pr.status === "merged" ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {pr.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {pr.number} by{" "}
                        <span className="font-mono text-foreground/70">{pr.author}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <Badge
                      variant="outline"
                      className={
                        pr.status === "merged"
                          ? "border-primary/30 text-primary"
                          : "border-border text-muted-foreground"
                      }
                    >
                      {pr.status}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {pr.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
