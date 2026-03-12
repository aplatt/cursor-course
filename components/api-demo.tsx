"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Play, Loader2, BookOpen, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { demoSummarize } from "@/app/actions/demo-summarize"

const DEFAULT_PAYLOAD = JSON.stringify(
  { githubUrl: "https://github.com/crystaldba/postgres-mcp" },
  null,
  2,
)

const ENDPOINT_PATH = "/api/github-summarizer"
const DISPLAY_HOST = "https://cursor-course-liart.vercel.app"

type Status = "idle" | "loading" | "success" | "error"

export function ApiDemo() {
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD)
  const [status, setStatus] = useState<Status>("idle")
  const [httpStatus, setHttpStatus] = useState<number | null>(null)
  const [response, setResponse] = useState<string | null>(null)

  const handleSend = useCallback(async () => {
    setStatus("loading")
    setResponse(null)
    setHttpStatus(null)

    let githubUrl: string
    try {
      const parsed = JSON.parse(payload)
      githubUrl = parsed.githubUrl
      if (typeof githubUrl !== "string" || !githubUrl.trim()) {
        throw new Error("Missing githubUrl")
      }
    } catch {
      setStatus("error")
      setHttpStatus(400)
      setResponse(JSON.stringify({ error: "Invalid JSON — body must include a \"githubUrl\" string." }, null, 2))
      return
    }

    const result = await demoSummarize(githubUrl.trim())
    setHttpStatus(result.status)

    if (result.ok) {
      setStatus("success")
      setResponse(JSON.stringify(result.data, null, 2))
    } else {
      setStatus("error")
      setResponse(JSON.stringify({ error: result.error }, null, 2))
    }
  }, [payload])

  return (
    <section className="border-t border-border/50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-sm font-medium text-primary">Try It Live</p>
          <h2 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            See the API in action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Edit the request payload and hit send to analyze any public GitHub
            repository in real time.
          </p>
          <div className="mt-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/docs">
                <BookOpen className="mr-2 h-4 w-4" />
                Documentation
              </Link>
            </Button>
          </div>
        </div>

        {/* Two-panel layout */}
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Request panel */}
          <div className="flex flex-col rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
                  POST
                </Badge>
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {ENDPOINT_PATH}
                </span>
              </div>
            </div>

            <div className="flex-1 p-4">
              {/* Static headers display */}
              <div className="mb-3 rounded-lg bg-secondary/50 px-3 py-2 font-mono text-xs leading-relaxed text-muted-foreground">
                <div>
                  <span className="text-foreground/70">POST</span>{" "}
                  {DISPLAY_HOST}{ENDPOINT_PATH}
                </div>
                <div>
                  <span className="text-foreground/70">Content-Type:</span>{" "}
                  application/json
                </div>
                <div>
                  <span className="text-foreground/70">x-api-key:</span>{" "}
                  demo_••••••••
                </div>
              </div>

              {/* Editable body */}
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Request Body
              </label>
              <textarea
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                spellCheck={false}
                rows={4}
                className="w-full resize-none rounded-lg border border-border bg-secondary/30 px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="border-t border-border/50 px-4 py-3">
              <Button
                size="sm"
                onClick={handleSend}
                disabled={status === "loading"}
                className="w-full sm:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Send Request
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Response panel */}
          <div className="flex flex-col rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
              <span className="text-sm font-medium text-foreground">
                Response
              </span>
              {httpStatus !== null && (
                <Badge
                  variant="outline"
                  className={
                    status === "success"
                      ? "border-green-500/30 text-green-600"
                      : "border-destructive/30 text-destructive"
                  }
                >
                  {status === "success" ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {httpStatus}
                  {status === "success" ? " OK" : " Error"}
                </Badge>
              )}
            </div>

            <div className="flex flex-1 items-start p-4">
              {status === "idle" && (
                <p className="w-full py-12 text-center text-sm text-muted-foreground">
                  Response will appear here after you send a request.
                </p>
              )}

              {status === "loading" && (
                <div className="flex w-full flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-sm font-medium text-foreground">
                    Analyzing repository...
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Fetching README and generating AI insights
                  </p>
                </div>
              )}

              {(status === "success" || status === "error") && response && (
                <pre className="w-full overflow-auto rounded-lg bg-secondary/50 p-3 font-mono text-xs leading-relaxed text-foreground/90">
                  {response}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
