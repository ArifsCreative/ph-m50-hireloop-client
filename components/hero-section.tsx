"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BriefcaseBusiness, Building2, MapPin, Search, Sparkles, Star, Users } from "lucide-react"

import globe from "@/app/assets/images/globe.png"

// Matches the "Hireloop 2.0" home hero: badge, headline and a slim search bar
// in a dark starfield, then the glowing planet art with the platform message
// and live stats cards resting on its horizon.
const TRENDING = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const

const STATS = [
  { icon: Building2, value: "50K", label: "Active Jobs" },
  { icon: BriefcaseBusiness, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
] as const

const inputFieldClass = "flex h-11 min-w-0 flex-1 items-center gap-2.5"

export function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [location, setLocation] = React.useState("")

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (location.trim()) params.set("location", location.trim())

    router.push(`/jobs${params.size ? `?${params.toString()}` : ""}`)
  }

  return (
    <section className="relative overflow-hidden bg-[#050505] text-white">
      {/* Star dots behind the hero copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[560px] opacity-60 [background-image:radial-gradient(circle,rgba(255,255,255,0.4)_1px,transparent_1.6px),radial-gradient(circle,rgba(255,255,255,0.22)_1px,transparent_1.5px)] [background-position:30px_20px,110px_70px] [background-size:230px_170px,150px_120px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-14 text-center sm:px-6">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-3 rounded-full bg-gradient-to-b from-[#2E2E2E] to-[#0A0A0A] px-5 py-2.5 shadow-[inset_0_0_6px_4px_rgba(255,255,255,0.08)]">
            <Sparkles aria-hidden className="size-5 text-orange-400" />
            <span className="font-badge text-lg font-bold leading-none text-white">
              50,000+
            </span>
            <span className="font-badge text-[10px] leading-none tracking-[0.18em] text-white/40 uppercase md:text-xs">
              New jobs this month
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-heading text-[36px] leading-[1.15] font-bold tracking-[-0.02em] sm:text-[44px] md:text-[56px]">
            Find Your Dream Job Today
          </h1>
          <p className="max-w-lg text-[15px] leading-[1.6] text-white/60 md:text-base">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={onSubmit}
          role="search"
          className="mx-auto mt-8 max-w-2xl rounded-xl border border-white/10 bg-[#0B0B0B] p-2"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 sm:px-2">
            <div className={inputFieldClass}>
              <Search aria-hidden className="size-5 shrink-0 text-white/60" />
              <input
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, skill or company"
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>

            <div className={inputFieldClass}>
              <MapPin aria-hidden className="size-5 shrink-0 text-white/60" />
              <input
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location or Remote"
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>

            <button
              type="submit"
              aria-label="Search jobs"
              className="flex size-10 shrink-0 items-center justify-center self-center rounded-lg bg-[#5C53FE] transition-colors hover:bg-[#7B74FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:ml-auto"
            >
              <Search aria-hidden className="size-5" />
            </button>
          </div>
        </form>

        {/* Trending positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-xs text-white/50">Trending Position</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TRENDING.map((label) => (
              <a
                key={label}
                href={`/jobs?q=${encodeURIComponent(label)}`}
                className="rounded-full border border-white/10 bg-[#131313] px-3 py-1.5 text-xs leading-[1.5] text-white/80 transition-colors hover:border-[#5C53FE]/60 hover:bg-[#5C53FE] hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Planet art with the platform message and live stats on the horizon */}
      <div className="relative z-10 mx-auto mt-2 h-[500px] max-w-6xl sm:h-[600px] lg:h-[660px]">
        <Image
          src={globe}
          alt=""
          aria-hidden
          priority
          placeholder="blur"
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-[50%_55%] select-none"
        />

        {/* Message over the planet horizon */}
        <div className="absolute inset-x-0 top-[18%] px-4 text-center sm:top-[16%]">
          <p className="font-heading text-xl leading-[1.4] font-medium md:text-2xl">
            Assisting over 15,000 job seekers
            <span className="block text-white/70">
              find their dream positions.
            </span>
          </p>
        </div>

        {/* Seamless fade into the page background */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[#050505]"
        />

        {/* Live stats */}
        <div className="absolute inset-x-4 top-[42%] grid grid-cols-2 gap-3 sm:top-[40%] sm:gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#1A1A1A]/95 to-[#0D0D0D]/95 p-5 text-left shadow-2xl/50"
            >
              <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-[#050505]">
                <stat.icon aria-hidden className="size-[18px] text-white/90" />
              </div>
              <div className="mt-5 text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.1]">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-white/50 lg:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
