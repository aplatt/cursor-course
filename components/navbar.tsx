"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import AuthControls from "@/app/components/AuthControls"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "API Keys", href: "/dashboards" },
  { label: "API Playground", href: "/dashboards/playground" },
] as const

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Github className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="text-lg font-semibold text-foreground">GitPulse</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href.startsWith("/") ? link.href : pathname === "/" ? link.href : `/${link.href}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <AuthControls />
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href.startsWith("/") ? link.href : pathname === "/" ? link.href : `/${link.href}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
              <AuthControls />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
