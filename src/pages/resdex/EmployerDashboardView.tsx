import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router"
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Mail,
  Briefcase,
  FolderOpen,
  Search,
  Plus,
  Headphones,
  Check,
  CheckCircle2,
  Calendar,
  Clock,
  Info,
  Users,
  ShieldCheck,
  Building,
  MapPin,
  TrendingUp,
  Sparkles,
  X,
  Copy,
  Download,
  Share2,
  RefreshCw,
  SlidersHorizontal,
  BookmarkCheck,
} from "lucide-react"
import {
  mockQuotas,
  mockWebinars,
  mockRecentSearches,
  mockSavedSearches,
  mockResdexFolders,
  mockJobRequisitions,
  QuotaUsage,
  JobRequisition,
} from "../../data/resdexData"

export function EmployerDashboardView() {
  const navigate = useNavigate()

  // Dynamic state
  const [quotas, setQuotas] = useState<QuotaUsage[]>(mockQuotas)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [registeredWebinars, setRegisteredWebinars] = useState<Set<string>>(
    new Set(["web-1"]),
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [jobSearchTerm, setJobSearchTerm] = useState("")
  const [activeJobFilter, setActiveJobFilter] = useState<"all" | "active" | "drafts">("all")

  // Modals state
  const [quotaModalOpen, setQuotaModalOpen] = useState(false)
  const [ambitionModalOpen, setAmbitionModalOpen] = useState(false)
  const [webinarsModalOpen, setWebinarsModalOpen] = useState(false)
  const [createFolderModalOpen, setCreateFolderModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [folders, setFolders] = useState(mockResdexFolders)
  const [selectedFolder, setSelectedFolder] = useState<typeof mockResdexFolders[0] | null>(null)
  const [folderDetailModalOpen, setFolderDetailModalOpen] = useState(false)
  const [helpDrawerOpen, setHelpDrawerOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [previewSearchModal, setPreviewSearchModal] = useState<{
    title: string
    query: string
  } | null>(null)

  // Show auto-dismissing toast
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  // Quota Carousel Controls
  const maxCarouselSlides = Math.max(0, quotas.length - 2) // Shows 2 at a time on desktop or 1 on mobile
  const nextSlide = () => {
    setCarouselIndex((prev) => (prev < quotas.length - 1 ? prev + 1 : 0))
  }
  const prevSlide = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : quotas.length - 1))
  }

  // Handle Webinar Registration toggle
  const toggleWebinarRegistration = (id: string, title: string) => {
    setRegisteredWebinars((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        showToast(`Registration cancelled for "${title}"`)
      } else {
        next.add(id)
        showToast(`Successfully registered for "${title}"! Calendar invite sent.`)
      }
      return next
    })
  }

  // Handle Add New Folder
  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFolderName.trim()) return
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: newFolderName.trim(),
      count: 0,
      updatedDate: "Today",
      tags: ["Custom"],
    }
    setFolders([newFolder, ...folders])
    setNewFolderName("")
    setCreateFolderModalOpen(false)
    showToast(`Resdex folder "${newFolder.name}" created successfully!`)
  }

  // Filter jobs based on search term & tab
  const filteredJobs = mockJobRequisitions.filter((job) => {
    if (activeJobFilter === "active" && job.status !== "active") return false
    if (activeJobFilter === "drafts") return false // No drafts in default set
    if (!jobSearchTerm) return true
    return (
      job.title.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(jobSearchTerm.toLowerCase())
    )
  })

  // Select top jobs matching screenshot 175546.png
  const displayedJobs = filteredJobs.slice(0, 4)

  return (
    <div className="w-full bg-[#f8fafc] min-h-[calc(100vh-3.5rem)] text-slate-800 font-sans pb-16 pt-3 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-5">
        {/* Recruiter Welcome Greeting & Company Context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 pb-1">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Welcome, Sheela Nancy</span>
              <span className="text-slate-400 font-normal text-sm sm:text-base">
                (sheela.nancy@ispatialtec.com)
              </span>
            </h1>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Building size={13} className="text-slate-400" />
                iSpatial Techno Solutions Pvt Ltd
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-slate-400" />
                Hyderabad, India
              </span>
              <span>•</span>
              <span className="text-blue-700 font-medium">Recruiter ID: 123908</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigate("/employer/jobs/new")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium shadow-xs transition cursor-pointer"
            >
              <Plus size={14} />
              <span>Post a Job</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/employer/candidates/search")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100 bg-white text-slate-700 text-xs font-medium transition cursor-pointer"
            >
              <Search size={14} />
              <span>Search Resdex</span>
            </button>
          </div>
        </div>

        {/* AmbitionBox Employee Choice Awards Banner (Screenshot 175541.png) */}
        <div className="w-full bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#251f14] border border-amber-500/25 rounded-xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Gold ambient radial glow */}
          <div className="absolute -left-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-80 h-48 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left: 3D-styled Gold Trophy Award Block */}
          <div className="flex items-center gap-4 z-10 shrink-0">
            <div className="relative group cursor-pointer" onClick={() => setAmbitionModalOpen(true)}>
              <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 p-[2px] shadow-lg shadow-amber-500/20 transform hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-[#211a0c] to-[#120e06] rounded-[6px] p-2 flex flex-col justify-between items-center text-center">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-black tracking-widest text-amber-400 font-mono">
                      ABECA
                    </span>
                    <Sparkles size={11} className="text-amber-300 animate-pulse" />
                  </div>
                  <div className="my-auto flex flex-col items-center">
                    <Award size={26} className="text-amber-400 drop-shadow-sm mb-1" />
                    <span className="text-[8px] font-bold text-amber-200 uppercase tracking-tighter leading-tight">
                      AmbitionBox
                    </span>
                    <span className="text-[7px] text-amber-300/80 leading-none">
                      Awards 2027
                    </span>
                  </div>
                  <span className="text-[8px] px-1 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                    India@Work
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Headline & Copy */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-amber-200/90 tracking-wide uppercase">
                  AmbitionBox Employee Choice Awards
                </span>
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-extrabold text-[10px] px-2 py-0.5 rounded shadow-xs tracking-wider">
                  6th Edition
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 tracking-tight leading-none mb-1.5">
                Rated by India@Work
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal">
                Become India's top-rated company for culture.
              </p>
            </div>
          </div>

          {/* Right: Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 z-10 shrink-0">
            <button
              type="button"
              onClick={() => setAmbitionModalOpen(true)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-zinc-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-400/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              Invite your employees to rate
            </button>
            <div className="flex flex-col items-center sm:items-start text-[11px] text-zinc-400">
              <span>Rate before 31st Dec '26.</span>
              <button
                type="button"
                onClick={() => setAmbitionModalOpen(true)}
                className="text-amber-400 hover:underline hover:text-amber-300 font-medium cursor-pointer"
              >
                Know More & Winners Gallery ➔
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetric 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Left Column (8 cols): Quota, Jobs, Searches, Folders */}
          <div className="lg:col-span-8 space-y-5">
            {/* 1. Quota Usage Carousel Card (Screenshot 175541.png) */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-shadow hover:shadow-sm">
              <div className="flex items-center justify-between mb-3.5">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Quota usage
                  </h3>
                  <p className="text-xs text-slate-500">
                    Track quota usage of all your subscriptions
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuotaModalOpen(true)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer mr-2"
                  >
                    Manage Quota / Buy More
                  </button>
                  <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                    <button
                      type="button"
                      onClick={prevSlide}
                      title="Previous subscription quota"
                      className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-[11px] font-medium text-slate-500 px-1.5">
                      {carouselIndex + 1}/{quotas.length}
                    </span>
                    <button
                      type="button"
                      onClick={nextSlide}
                      title="Next subscription quota"
                      className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-cards Carousel Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {quotas.map((quota, idx) => {
                  const percentUsed = Math.min(
                    100,
                    Math.round((quota.used / quota.total) * 100),
                  )
                  const isCv = quota.id === "quota-cv-access"
                  const isNvite = quota.id === "quota-nvite"

                  return (
                    <div
                      key={quota.id}
                      className={`rounded-xl border p-3.5 flex flex-col justify-between transition-all bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs relative ${
                        idx === carouselIndex ? "ring-1 ring-blue-500/30" : ""
                      }`}
                    >
                      {/* Category Badge & Status */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-blue-600 tracking-wider">
                            {quota.category || "RESDEX"}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                            FULL QUOTA
                          </span>
                        </div>

                        {/* Title with icon & info tooltip */}
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-3">
                          {isCv ? (
                            <FileText size={15} className="text-slate-500 shrink-0" />
                          ) : isNvite ? (
                            <Mail size={15} className="text-slate-500 shrink-0" />
                          ) : (
                            <Briefcase size={15} className="text-slate-500 shrink-0" />
                          )}
                          <span className="truncate">{quota.name.replace(/RESDEX\s|JOB POSTING\s/g, "")}</span>
                          <button
                            type="button"
                            onClick={() => setQuotaModalOpen(true)}
                            title="View allocation details"
                            className="text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
                          >
                            <Info size={13} />
                          </button>
                        </div>

                        {/* Usage Metrics (used | left) */}
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
                          <span>{quota.used.toLocaleString()} used</span>
                          <span className="text-slate-500">
                            {quota.remaining.toLocaleString()} left
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden mb-3">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              percentUsed > 85 ? "bg-amber-500" : "bg-blue-600"
                            }`}
                            style={{ width: `${percentUsed}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer: User Licenses & Renewal date */}
                      <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => setQuotaModalOpen(true)}
                          className="flex items-center justify-between text-[11px] font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer group text-left"
                        >
                          <span>{quota.assignedUsers || "1/1 licenses assigned"}</span>
                          <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                        </button>
                        <span className="text-[10px] text-slate-400">
                          Renews {isCv || isNvite ? "15 Mar 2027" : "30 Nov 2026"}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Carousel Indicator Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3 pt-1">
                {quotas.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCarouselIndex(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      carouselIndex === i
                        ? "w-5 bg-blue-600"
                        : "w-1.5 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 2. Recently Posted Jobs Card (Screenshot 175546.png & 175553.png) */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-shadow hover:shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Job Postings
                  </h3>
                  <p className="text-xs text-slate-500">
                    Active requisitions, response pipelines, and candidate recommendations
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      type="text"
                      placeholder="Filter jobs..."
                      value={jobSearchTerm}
                      onChange={(e) => setJobSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-none focus:border-blue-500 w-36 sm:w-44 transition"
                    />
                  </div>
                  <div className="flex border border-slate-200 rounded-md p-0.5 bg-slate-50 text-[11px] font-medium">
                    <button
                      type="button"
                      onClick={() => setActiveJobFilter("all")}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        activeJobFilter === "all"
                          ? "bg-white text-blue-600 shadow-xs font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      All (70)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveJobFilter("active")}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        activeJobFilter === "active"
                          ? "bg-white text-blue-600 shadow-xs font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Active (27)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveJobFilter("drafts")}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        activeJobFilter === "drafts"
                          ? "bg-white text-blue-600 shadow-xs font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Drafts (0)
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/70">
                      <th className="py-2.5 px-3">Recently posted jobs</th>
                      <th className="py-2.5 px-3">Created by</th>
                      <th className="py-2.5 px-3">Modified on</th>
                      <th className="py-2.5 px-3 text-center">Applies</th>
                      <th className="py-2.5 px-3 text-center">CV rec...</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayedJobs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No matching jobs found
                        </td>
                      </tr>
                    ) : (
                      displayedJobs.map((job) => (
                        <tr
                          key={job.id}
                          onClick={() => navigate(`/employer/jobs/${job.id}/responses`)}
                          className="hover:bg-blue-50/60 transition cursor-pointer group"
                        >
                          <td className="py-3 px-3">
                            <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                              <span>{job.title}</span>
                              {job.category === "hot_vacancy" && (
                                <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                                  Hot
                                </span>
                              )}
                              {job.category === "nvite" && (
                                <span className="bg-blue-100 text-blue-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                                  NVite
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.experience}</span>
                              <span>•</span>
                              <span className="text-emerald-600 font-medium">Active</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                            12390...
                          </td>
                          <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                            {job.postedDate.substring(0, 6)}...
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="inline-flex items-center gap-1">
                              <span className="font-bold text-blue-600 text-sm">
                                {job.appliesCount}
                              </span>
                              {(job.newApplies || 0) > 0 && (
                                <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-1 py-0.2 rounded-full">
                                  +{job.newApplies} New
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-slate-700">
                            {job.cvsCount || job.resdexRecommended || 0}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/employer/jobs/${job.id}/responses`)
                              }}
                              className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-medium hover:bg-blue-600 hover:text-white transition text-[11px] cursor-pointer"
                            >
                              Responses ➔
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Card Footer: View All Jobs CTA */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/employer/jobs")}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition cursor-pointer"
                >
                  View all jobs
                </button>
                <span className="text-xs text-slate-500">
                  Showing top {displayedJobs.length} of {mockJobRequisitions.length} jobs
                </span>
              </div>
            </div>

            {/* 3. Resdex Searches Card (Screenshot 175553.png) */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-shadow hover:shadow-sm">
              <div className="flex items-center justify-between mb-3.5">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Resdex Searches
                  </h3>
                  <p className="text-xs text-slate-500">
                    Quickly re-execute past talent queries or run saved Boolean searches
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/employer/candidates/search")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Search size={13} />
                  <span>Advanced Search</span>
                </button>
              </div>

              {/* Sub-section 1: Recently searched for */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-600 mb-2 flex items-center justify-between">
                  <span>Recently searched for</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Click chip to re-execute in Resdex
                  </span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
                  {mockRecentSearches.map((search) => (
                    <button
                      key={search.id}
                      type="button"
                      onClick={() => {
                        setPreviewSearchModal({
                          title: "Recent Search Query",
                          query: search.displayText,
                        })
                      }}
                      title={`Run search: ${search.displayText}`}
                      className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-slate-700 hover:text-blue-700 text-xs font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 group shrink-0"
                    >
                      <Search size={12} className="text-slate-400 group-hover:text-blue-500" />
                      <span className="max-w-[240px] truncate">{search.displayText}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => navigate("/employer/candidates/search")}
                    title="More recent searches"
                    className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer shrink-0"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Sub-section 2: Saved Searches */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                  <span>Saved Searches</span>
                  <span className="text-slate-400 font-medium">New profiles</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {mockSavedSearches.map((saved) => (
                    <div
                      key={saved.id}
                      onClick={() => {
                        setPreviewSearchModal({
                          title: saved.name,
                          query: saved.rawQuery,
                        })
                      }}
                      className="py-2.5 flex items-center justify-between hover:bg-blue-50/50 rounded px-2 -mx-2 transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <BookmarkCheck size={14} className="text-blue-600 shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-xs">
                            {saved.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono truncate max-w-sm">
                            {saved.rawQuery}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-600 text-xs">
                          {saved.newProfilesCount}
                        </span>
                        <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform text-xs">
                          ➔
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: View all saved searches */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/employer/candidates/saved-searches")}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition cursor-pointer"
                >
                  View all saved searches
                </button>
                <span className="text-xs text-slate-400">
                  Automated talent alert triggers active
                </span>
              </div>
            </div>

            {/* 4. Resdex Folders Card (Screenshot 175557.png) */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-shadow hover:shadow-sm">
              <div className="flex items-center justify-between mb-3.5">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Resdex Folders
                  </h3>
                  <p className="text-xs text-slate-500">
                    Candidate talent pools and curated shortlists organized by role
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCreateFolderModalOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  <Plus size={13} />
                  <span>New Folder</span>
                </button>
              </div>

              {/* Folders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/70">
                      <th className="py-2 px-3">Recently created folders</th>
                      <th className="py-2 px-3">Created on</th>
                      <th className="py-2 px-3 text-right">Profiles</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {folders.map((folder) => (
                      <tr
                        key={folder.id}
                        onClick={() => {
                          setSelectedFolder(folder)
                          setFolderDetailModalOpen(true)
                        }}
                        className="hover:bg-blue-50/60 transition cursor-pointer group"
                      >
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                            <FolderOpen size={14} className="text-blue-500 shrink-0" />
                            <span>{folder.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">
                          {folder.updatedDate}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-blue-600">
                          {folder.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card Footer: View all resdex folders */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/employer/candidates/folders")}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition cursor-pointer"
                >
                  View all resdex folders
                </button>
                <span className="text-xs text-slate-400">
                  {folders.length} active talent pools
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Upcoming Webinars & Quick Shortcuts */}
          <div className="lg:col-span-4 space-y-5">
            {/* 1. Join Upcoming Webinars Card (Screenshot 175541.png) */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-shadow hover:shadow-sm">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="font-bold text-slate-900 text-base">
                  Join upcoming webinars
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Live & Free
                </span>
              </div>

              {/* Webinar Schedule List */}
              <div className="space-y-2.5 mb-4">
                {mockWebinars.map((webinar) => {
                  const isRegistered = registeredWebinars.has(webinar.id)

                  return (
                    <div
                      key={webinar.id}
                      className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-200 transition flex items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        {/* Date badge */}
                        <div className="w-12 h-11 rounded-md bg-white border border-slate-200 flex flex-col items-center justify-center text-center shrink-0 shadow-xs">
                          <span className="text-[11px] font-extrabold text-blue-700 leading-tight">
                            {webinar.dateStr}
                          </span>
                          <span className="text-[9px] font-medium text-slate-500 leading-none">
                            {webinar.timeStr}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="min-w-0">
                          <h4 className="font-semibold text-slate-900 text-xs leading-snug">
                            {webinar.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {webinar.instructor || "Talent Cloud Academy"}
                          </span>
                        </div>
                      </div>

                      {/* Register Button */}
                      <button
                        type="button"
                        onClick={() => toggleWebinarRegistration(webinar.id, webinar.title)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                          isRegistered
                            ? "bg-emerald-600 text-white"
                            : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        {isRegistered ? "Booked ✓" : "Register"}
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* View All Webinars CTA */}
              <button
                type="button"
                onClick={() => setWebinarsModalOpen(true)}
                className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition cursor-pointer text-center"
              >
                View all webinars
              </button>
            </div>

            {/* 2. Recruiter Fast Shortcuts Card */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-3">
                Quick Shortcuts
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => navigate("/employer/nvite/broadcast")}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-blue-50 hover:border-blue-200 transition text-left cursor-pointer flex flex-col justify-between"
                >
                  <Mail size={16} className="text-blue-600 mb-1" />
                  <span className="font-semibold text-slate-900">Send NVite</span>
                  <span className="text-[10px] text-slate-500">Direct outreach</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/employer/candidates/search")}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-blue-50 hover:border-blue-200 transition text-left cursor-pointer flex flex-col justify-between"
                >
                  <Search size={16} className="text-blue-600 mb-1" />
                  <span className="font-semibold text-slate-900">Find Profiles</span>
                  <span className="text-[10px] text-slate-500">Resdex search</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/employer/jobs/new")}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-blue-50 hover:border-blue-200 transition text-left cursor-pointer flex flex-col justify-between"
                >
                  <Briefcase size={16} className="text-blue-600 mb-1" />
                  <span className="font-semibold text-slate-900">Post Vacancy</span>
                  <span className="text-[10px] text-slate-500">Hot posting</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQuotaModalOpen(true)}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-blue-50 hover:border-blue-200 transition text-left cursor-pointer flex flex-col justify-between"
                >
                  <TrendingUp size={16} className="text-blue-600 mb-1" />
                  <span className="font-semibold text-slate-900">Quota Usage</span>
                  <span className="text-[10px] text-slate-500">License limits</span>
                </button>
              </div>
            </div>

            {/* 3. Account & Enterprise Help Desk Banner */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-xl p-4 text-white shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-blue-300" />
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                  Naukri Priority Support
                </span>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed mb-3">
                Dedicated Enterprise Account Manager for iSpatial Techno Solutions.
              </p>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-amber-300 font-mono">1800-102-5558</span>
                <button
                  type="button"
                  onClick={() => setHelpDrawerOpen(true)}
                  className="text-xs text-white hover:underline cursor-pointer"
                >
                  Call Manager ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom-Right Help Button (Screenshot 175541.png) */}
      <button
        type="button"
        onClick={() => setHelpDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer group"
      >
        <Headphones size={16} className="group-hover:rotate-12 transition-transform" />
        <span>Help</span>
      </button>

      {/* ========================================================================= */}
      {/* MODALS & OVERLAYS                                                        */}
      {/* ========================================================================= */}

      {/* 1. Manage Quota / Buy More Modal */}
      {quotaModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setQuotaModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuotaModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2.5 mb-1">
              <TrendingUp size={20} className="text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Subscription Quota Management
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Account: sheela.nancy@ispatialtec.com • iSpatial Techno Solutions Pvt Ltd
            </p>

            <div className="space-y-4 mb-6">
              {quotas.map((q) => {
                const percent = Math.min(100, Math.round((q.used / q.total) * 100))
                return (
                  <div key={q.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-slate-900">{q.name}</span>
                      <span className="text-xs font-semibold text-blue-600">
                        {q.remaining.toLocaleString()} {q.unit} Remaining
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>Total: {q.total.toLocaleString()}</span>
                      <span>Used: {q.used.toLocaleString()} ({percent}%)</span>
                      <span>Assigned: {q.assignedUsers || "1/1"}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Renews on: {q.renewalDate}</span>
                      <button
                        type="button"
                        onClick={() => {
                          // Simulate top-up
                          setQuotas((prev) =>
                            prev.map((item) =>
                              item.id === q.id
                                ? { ...item, total: item.total + 500, remaining: item.remaining + 500 }
                                : item,
                            ),
                          )
                          showToast(`Added +500 ${q.unit} to ${q.name}!`)
                        }}
                        className="text-blue-600 font-semibold hover:underline cursor-pointer"
                      >
                        + Add 500 credits
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Need more enterprise seats? Contact account executive.
              </span>
              <button
                type="button"
                onClick={() => {
                  setQuotaModalOpen(false)
                  showToast("Quota report downloaded.")
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-md shadow-xs cursor-pointer"
              >
                Download Statement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. AmbitionBox Employee Choice Awards Modal */}
      {ambitionModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setAmbitionModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAmbitionModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Award size={22} className="text-amber-500" />
              <h3 className="text-lg font-bold text-slate-900">
                AmbitionBox Employee Choice Awards 2027
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Invite your workforce to rate iSpatial Techno Solutions on AmbitionBox. Company reviews submitted before 31st Dec 2026 qualify for the 6th Edition India@Work Rankings.
            </p>

            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 mb-4">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                Your Unique Company Rating Link:
              </span>
              <div className="flex items-center gap-2 bg-white border border-amber-300 rounded-lg px-2.5 py-1.5">
                <input
                  type="text"
                  readOnly
                  value="https://www.ambitionbox.com/rate/ispatial-techno-solutions"
                  className="text-xs text-slate-700 bg-transparent flex-1 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      "https://www.ambitionbox.com/rate/ispatial-techno-solutions",
                    )
                    setCopiedLink(true)
                    setTimeout(() => setCopiedLink(false), 2000)
                    showToast("Rating link copied to clipboard!")
                  }}
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white font-medium text-xs cursor-pointer flex items-center gap-1"
                >
                  {copiedLink ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedLink ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>Minimum 25 verified employee reviews required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>Evaluates Work-Life Balance, Compensation, and Company Culture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>Winner badge featured directly on all Naukri Job Postings</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAmbitionModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setAmbitionModalOpen(false)
                  showToast("Employee invitation broadcast email drafted!")
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs rounded-md shadow-xs cursor-pointer"
              >
                Draft Employee Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Upcoming Webinars Schedule Modal */}
      {webinarsModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setWebinarsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setWebinarsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={20} className="text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Naukri Talent Cloud Webinar Masterclasses
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Interactive training series with senior recruitment architects
            </p>

            <div className="space-y-3 mb-5 max-h-80 overflow-y-auto pr-1">
              {mockWebinars.map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-200 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-xs font-bold text-blue-700">{w.dateStr}</span>
                      <span className="text-[10px] text-slate-500">{w.timeStr}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {w.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Instructor: {w.instructor || "Talent Cloud Academy"} • 45 mins + Live Q&A
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleWebinarRegistration(w.id, w.title)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition ${
                      registeredWebinars.has(w.id)
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {registeredWebinars.has(w.id) ? "Enrolled ✓" : "Enroll Free"}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setWebinarsModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-medium cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Resdex Folder Candidate Details Modal */}
      {folderDetailModalOpen && selectedFolder && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setFolderDetailModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setFolderDetailModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen size={20} className="text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Folder: {selectedFolder.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Created on {selectedFolder.updatedDate} • Contains {selectedFolder.count} profile{selectedFolder.count === 1 ? "" : "s"}
            </p>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 text-xs text-slate-700 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Folder Name</span>
                <span className="font-semibold text-slate-900">{selectedFolder.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Total Profiles Saved</span>
                <span className="font-bold text-blue-600">{selectedFolder.count} profiles</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Last Modified</span>
                <span>{selectedFolder.updatedDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setFolderDetailModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setFolderDetailModalOpen(false)
                  navigate(`/employer/candidates?folder=${encodeURIComponent(selectedFolder.name)}`)
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-md shadow-xs cursor-pointer"
              >
                View Profiles in Talent Pool ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Create Resdex Folder Modal */}
      {createFolderModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setCreateFolderModalOpen(false)}
        >
          <form
            onSubmit={handleCreateFolder}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCreateFolderModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen size={20} className="text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Create Resdex Folder
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Group matching candidates into a persistent talent pool
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Folder Name
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g. Cloud Architects 2027"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCreateFolderModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-md shadow-xs cursor-pointer"
              >
                Create Folder
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. Preview Search Query Modal */}
      {previewSearchModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setPreviewSearchModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewSearchModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <Search size={20} className="text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">
                {previewSearchModal.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Re-executing query in Resdex talent discovery database
            </p>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 break-all mb-4">
              {previewSearchModal.query}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span>Estimated matches: ~1,420 profiles</span>
              <span className="text-emerald-600 font-medium">Verified Active candidates</span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPreviewSearchModal(null)}
                className="px-4 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const q = previewSearchModal.query
                  setPreviewSearchModal(null)
                  navigate(
                    `/employer/candidates/search?kw=${encodeURIComponent(
                      q.split("|")[0].trim(),
                    )}`,
                  )
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-md shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Execute Search</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Recruiter Support & Help Center Drawer */}
      {helpDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
          onClick={() => setHelpDrawerOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <Headphones size={20} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Recruiter Help & Support
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setHelpDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                {/* Toll Free */}
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60">
                  <span className="font-bold text-blue-900 block mb-0.5">
                    Recruiter Support Toll-Free
                  </span>
                  <span className="text-base font-extrabold text-blue-700 font-mono">
                    1800-102-5558
                  </span>
                  <p className="text-[11px] text-blue-800/80 mt-1">
                    Available Monday to Saturday (9:30 AM to 6:30 PM IST)
                  </p>
                </div>

                {/* Email Support */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    Email Desk
                  </span>
                  <span className="text-xs text-slate-600 font-mono">
                    support@naukri.com
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Response turnaround within 2 business hours
                  </p>
                </div>

                {/* Quick Tutorials */}
                <div className="space-y-2 pt-2">
                  <span className="font-bold text-slate-900 block">
                    Quick Guides & Videos
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      showToast("Opening 1-min Naukri Launcher tutorial...")
                    }}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition flex items-center justify-between cursor-pointer"
                  >
                    <span>▶ Watch 1-min Launcher tutorial</span>
                    <span className="text-blue-600">➔</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showToast("Downloading Naukri Launcher setup installer...")
                    }}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition flex items-center justify-between cursor-pointer"
                  >
                    <span>📥 Download Naukri Launcher for Windows/Mac</span>
                    <span className="text-blue-600">➔</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHelpDrawerOpen(false)
                      setWebinarsModalOpen(true)
                    }}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition flex items-center justify-between cursor-pointer"
                  >
                    <span>📅 Join live weekly recruiter masterclass</span>
                    <span className="text-blue-600">➔</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-center">
              <p className="text-[11px] text-slate-400">
                Naukri Talent Cloud • Enterprise ID 123908
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
