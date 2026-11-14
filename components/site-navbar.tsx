"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import logo from "@/app/assets/images/logo.png"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"

// Matches the "Hireloop 2.0" design: a full-width dark bar with the wordmark
// on the left and the links + auth actions grouped on the right.
const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const { data: session } = useSession()

  React.useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  const handleSignOut = async () => {
    setOpen(false)
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="HireLoop home" className="block shrink-0">
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/")

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm text-white/80 transition-colors hover:text-white",
                      active && "font-semibold text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Separator */}
          <div aria-hidden className="h-5 w-px bg-white/15" />

          <div className="flex items-center gap-5">
            {session?.user ? (
              <>
                <span className="text-sm text-white/80">
                  Welcome, {session.user.name}!
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-sm font-medium text-[#645AFF] transition-colors hover:text-[#7B74FF]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-[#645AFF] transition-colors hover:text-[#7B74FF]"
                >
                  Sign In
                </Link>
                <Button
                  render={<Link href="/sign-up" />}
                  nativeButton={false}
                  className="h-9 rounded-lg bg-[#5C53FE] px-5 text-sm font-medium text-white shadow-[inset_0_2px_6px_rgba(255,255,255,0.25)] hover:bg-[#7B74FF]"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          aria-expanded={open}
          aria-controls="site-navbar-mobile"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "size-10 rounded-lg bg-[#141414] text-white hover:bg-[#1F1F1F] hover:text-white lg:hidden"
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile panel */}
      {open ? (
        <div
          id="site-navbar-mobile"
          className="mx-4 flex flex-col gap-1 rounded-xl border border-white/10 bg-[#0A0A0A] p-3 shadow-xl lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/")

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-white",
                      active
                        ? "font-semibold text-white"
                        : "text-white/80"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div aria-hidden className="h-px w-full bg-white/10" />

          <div className="flex flex-col gap-2 pt-1">
            {session?.user ? (
              <>
                <span className="px-3 text-sm text-white/80">
                  Welcome, {session.user.name}!
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#645AFF] transition-colors hover:bg-white/5 hover:text-[#7B74FF]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 px-3 py-2.5 text-center text-sm font-medium text-[#645AFF] transition-colors hover:bg-white/5 hover:text-[#7B74FF]"
                >
                  Sign In
                </Link>
                <Button
                  render={<Link href="/sign-up" onClick={() => setOpen(false)} />}
                  nativeButton={false}
                  className="h-11 rounded-lg bg-[#5C53FE] px-5 text-sm font-medium text-white shadow-[inset_0_2px_6px_rgba(255,255,255,0.25)] hover:bg-[#7B74FF]"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
