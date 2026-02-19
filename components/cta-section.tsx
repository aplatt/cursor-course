import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 px-8 py-16 text-center md:px-16">
          {/* Subtle glow */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Ready to understand your next dependency?
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-muted-foreground">
              Join thousands of developers who use GitPulse to make informed decisions
              about open source software.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                asChild
              >
                <Link href="/sign-up">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
                asChild
              >
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
