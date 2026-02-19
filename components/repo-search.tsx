"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RepoSearch() {
  const [repoUrl, setRepoUrl] = useState("")
  const router = useRouter()

  function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    if (!repoUrl.trim()) return
    // Navigate to an analysis page with the repo URL as a query param
    const encoded = encodeURIComponent(repoUrl.trim())
    router.push(`/analyze?repo=${encoded}`)
  }

  return (
    <form
      onSubmit={handleAnalyze}
      className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="url"
          placeholder="https://github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="h-12 pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
      >
        Analyze Repository
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  )
}
