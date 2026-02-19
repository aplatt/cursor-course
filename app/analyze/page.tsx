import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AnalyzePage({
  searchParams,
}: {
  searchParams: Promise<{ repo?: string }>
}) {
  const { repo } = await searchParams

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
        <h1 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
          Analysis Coming Soon
        </h1>
        {repo && (
          <p className="mt-4 font-mono text-sm text-muted-foreground break-all">
            {decodeURIComponent(repo)}
          </p>
        )}
        <p className="mt-4 text-muted-foreground">
          The full AI analysis engine is not connected yet. This is where the
          repository insights would appear.
        </p>
        <Button
          className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
