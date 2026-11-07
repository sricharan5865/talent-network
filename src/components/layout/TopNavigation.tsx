import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  FolderOpen,
  Layers,
  LayoutGrid,
  LogOut,
  Mail,
  Plus,
  Search,
  Send,
  Sparkles,
  User,
  Users,
  X,
} from "lucide-react"
import { mockQuotas, mockRecentSearches } from "../../data/resdexData"

export interface TopNavigationProps {
  onSearchClick?: () => void
}

export function TopNavigation({ onSearchClick }: TopNavigationProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // Dropdown states
  const [jobsMenuOpen, setJobsMenuOpen] = useState(false)
  const [resdexMenuOpen, setResdexMenuOpen] = useState(false)
  const [reportsMenuOpen, setReportsMenuOpen] = useState(false)
  const [quotaPopoverOpen, setQuotaPopoverOpen] = useState(false)
  const [recentSearchOpen, setRecentSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false)

  // Top nav active tab calculation
  const isJobsActive =
    location.pathname.startsWith("/employer/jobs") ||
    location.pathname.includes("/pipeline")
  const isResdexActive =
    location.pathname.includes("/candidates") ||
    location.pathname.includes("/matching") ||
    location.pathname.includes("/nvite")
  const isReportsActive =
    location.pathname.includes("/analytics") ||
    location.pathname.includes("/ux-analysis")

  const navRef = useRef<HTMLDivElement>(null)

  // Close all popovers on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeAllMenus()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close all popovers on ESC
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAllMenus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const closeAllMenus = () => {
    setJobsMenuOpen(false)
    setResdexMenuOpen(false)
    setReportsMenuOpen(false)
    setQuotaPopoverOpen(false)
    setRecentSearchOpen(false)
    setNotifOpen(false)
    setUserMenuOpen(false)
    setAppSwitcherOpen(false)
  }

  // Primary Quota to display in pill
  const cvQuota =
    mockQuotas.find((q) => q.id === "quota-cv-access") || mockQuotas[0]
  const nviteQuota =
    mockQuotas.find((q) => q.id === "quota-nvite") || mockQuotas[1]

  return (
    <header
      ref={navRef}
      className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 select-none shadow-xs"
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 h-14 flex items-center justify-between gap-3">
        {/* Left Side: Brand Logo & Mega Nav Menus */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <button
            type="button"
            onClick={() => {
              closeAllMenus()
              navigate("/employer")
            }}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            title="Naukri Talent Cloud - Employer Home"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow-xs">
              n
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 leading-none">
                naukri
              </span>
              <span className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase">
                Talent Cloud
              </span>
            </div>
          </button>

          {/* Primary Navigation Menus */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700">
            {/* Jobs & Responses Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  const state = !jobsMenuOpen
                  closeAllMenus()
                  setJobsMenuOpen(state)
                }}
                className={`flex items-center gap-1 px-3 py-4 text-xs font-semibold tracking-wide transition relative ${
                  isJobsActive
                    ? "text-blue-700 font-bold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>Jobs & Responses</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform text-slate-400 ${
                    jobsMenuOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
                {isJobsActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>

              {jobsMenuOpen && (
                <div className="absolute top-full left-0 mt-0.5 w-68 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Postings & Inboxes
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/jobs/new?type=hot_vacancy")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-800 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <BriefcaseBusiness size={14} className="text-blue-600" />
                      Post a Hot Vacancy
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-200">
                      Active
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/jobs/new?type=smb")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs text-slate-700 flex items-center gap-2"
                  >
                    <Plus size={14} className="text-slate-400" />
                    Post a SMB Job
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/jobs/new?type=internship")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs text-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Plus size={14} className="text-slate-400" />
                      Post an Internship
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200">
                      Active
                    </span>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/jobs")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-blue-50 text-xs font-semibold text-blue-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={14} className="text-blue-600" />
                      Manage Jobs & Responses
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                      70
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Resdex Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  const state = !resdexMenuOpen
                  closeAllMenus()
                  setResdexMenuOpen(state)
                }}
                className={`flex items-center gap-1 px-3 py-4 text-xs font-semibold tracking-wide transition relative ${
                  isResdexActive
                    ? "text-blue-700 font-bold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>Resdex</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform text-slate-400 ${
                    resdexMenuOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
                {isResdexActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>

              {resdexMenuOpen && (
                <div className="absolute top-full left-0 mt-0.5 w-68 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Sourcing & Outreaches
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/candidates/search")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <Search size={14} className="text-blue-600" />
                    Search Resumes (Resdex)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/nvite/broadcast")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-800 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Send size={14} className="text-blue-600" />
                      Send NVite
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-200">
                      Outreach
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/candidates/search?view=saved")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs text-slate-700 flex items-center gap-2"
                  >
                    <Bookmark size={14} className="text-slate-400" />
                    Manage Searches
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/candidates/search?view=folders")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs text-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <FolderOpen size={14} className="text-blue-600" />
                      Folders (Talent Pools)
                    </span>
                    <span className="text-[10px] text-slate-400">
                      4 folders
                    </span>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/candidates/search")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-blue-50 text-xs font-semibold text-blue-700 flex items-center gap-2"
                  >
                    <Sparkles size={14} className="text-blue-600" />
                    Resdex Requirements
                  </button>
                </div>
              )}
            </div>

            {/* Reports Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  const state = !reportsMenuOpen
                  closeAllMenus()
                  setReportsMenuOpen(state)
                }}
                className={`flex items-center gap-1 px-3 py-4 text-xs font-semibold tracking-wide transition relative ${
                  isReportsActive
                    ? "text-blue-700"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>Reports</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform text-slate-400 ${
                    reportsMenuOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
                {isReportsActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d9383a]" />
                )}
              </button>

              {reportsMenuOpen && (
                <div className="absolute top-full left-0 mt-0.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/analytics")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-800"
                  >
                    Hiring Analytics & Funnel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs text-slate-700"
                  >
                    Subscription Quota Telemetry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/ux-analysis")
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs text-purple-700 font-semibold flex items-center justify-between"
                  >
                    <span>Design Lens & Benchmarks</span>
                    <Layers size={13} className="text-purple-500" />
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Center: Live Quota Usage Pill Button */}
        <div className="relative hidden xl:block">
          <button
            type="button"
            onClick={() => {
              const state = !quotaPopoverOpen
              closeAllMenus()
              setQuotaPopoverOpen(state)
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-xs font-medium text-slate-700 hover:text-blue-700 transition cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              CV Access:{" "}
              <strong className="text-slate-900 font-bold">
                {cvQuota.remaining.toLocaleString()}
              </strong>{" "}
              left
            </span>
            <span className="text-slate-300">|</span>
            <span>
              NVite:{" "}
              <strong className="text-slate-900 font-bold">
                {nviteQuota.remaining.toLocaleString()}
              </strong>{" "}
              left
            </span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>

          {quotaPopoverOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                  Active Subscriptions Quota
                </span>
                <span
                  className="text-[10px] text-blue-600 font-semibold cursor-pointer"
                  onClick={() => navigate("/employer")}
                >
                  Details →
                </span>
              </div>
              <div className="space-y-3 pt-3">
                {mockQuotas.map((q) => (
                  <div key={q.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-800 font-semibold">
                        {q.name}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {q.used.toLocaleString()} / {q.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.round((q.used / q.total) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{q.remaining.toLocaleString()} left</span>
                      <span>Renewal: {q.renewalDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Quick Tools, Search, Notifications, Profile, Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Recent Searches Clock Popover */}
          <div className="relative">
            <button
              type="button"
              aria-label="Recent Searches"
              title="Recent Searches & Activity"
              onClick={() => {
                const state = !recentSearchOpen
                closeAllMenus()
                setRecentSearchOpen(state)
              }}
              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <Clock size={17} />
            </button>

            {recentSearchOpen && (
              <div className="absolute top-full right-0 mt-1 w-84 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="font-bold text-xs text-slate-800">
                    Recent Resdex Searches
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Past 7 days
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {mockRecentSearches.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        closeAllMenus()
                        navigate(
                          `/employer/candidates/search?q=${encodeURIComponent(s.keywords.join(", "))}`,
                        )
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-blue-50/60 border border-transparent hover:border-blue-100 transition flex flex-col gap-1 group"
                    >
                      <span className="text-xs text-slate-800 font-medium line-clamp-1 group-hover:text-blue-700">
                        {s.displayText}
                      </span>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>
                          {s.matchCount
                            ? `${s.matchCount.toLocaleString()} matches`
                            : ""}
                        </span>
                        <span>{s.timestamp}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Search Trigger Bar */}
          <button
            type="button"
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 text-xs transition cursor-pointer"
            title="Search candidates, jobs, or requisitions (Ctrl+K)"
          >
            <Search size={14} className="text-slate-500" />
            <span className="hidden sm:inline">Search candidates...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-300 text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Bookmark Quick View */}
          <button
            type="button"
            aria-label="Bookmarks"
            title="Saved Candidates & Folders"
            onClick={() => {
              closeAllMenus()
              navigate("/employer/candidates/search?view=folders")
            }}
            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <Bookmark size={17} />
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              title="Recent alerts & candidate responses"
              onClick={() => {
                const state = !notifOpen
                closeAllMenus()
                setNotifOpen(state)
              }}
              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition relative cursor-pointer"
            >
              <Bell size={17} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {notifOpen && (
              <div className="absolute top-full right-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-xs text-slate-800">
                    Candidate Responses
                  </span>
                  <span className="text-[10px] text-blue-600 font-medium">
                    3 unread
                  </span>
                </div>
                <div className="py-2 space-y-2">
                  <div
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/jobs/req-us-rec-03/responses")
                    }}
                    className="p-2 rounded-lg bg-blue-50/70 border border-blue-100 cursor-pointer hover:bg-blue-100/70 transition"
                  >
                    <div className="text-xs font-semibold text-slate-900">
                      M Arunkumar applied via NVite
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Requisition: Us It Recruiter (8y, ₹8L)
                    </div>
                    <div className="text-[10px] text-blue-600 mt-1 font-medium">
                      2 hours ago
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/jobs/req-infra-01/responses")
                    }}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition"
                  >
                    <div className="text-xs font-semibold text-slate-900">
                      PAWAR MUKESH shortlisted
                    </div>
                    <div className="text-[11px] text-slate-600">
                      DevOps Engineer at TalentPull (9y 5m)
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Yesterday
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/jobs")
                    }}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View all responses →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const state = !userMenuOpen
                closeAllMenus()
                setUserMenuOpen(state)
              }}
              className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-blue-400/40 transition cursor-pointer"
              title="Sheela Nancy (sheela.nancy@ispatialtec.com)"
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center border border-slate-300">
                SN
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                <div className="px-4 py-2 border-b border-slate-100 text-left">
                  <div className="font-bold text-sm text-slate-900">
                    Sheela Nancy
                  </div>
                  <div className="text-xs text-slate-500 font-mono truncate">
                    sheela.nancy@ispatialtec.com
                  </div>
                  <div className="text-[11px] text-blue-600 font-medium mt-0.5">
                    iSpatial Techno Solutions Pvt Ltd
                  </div>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer/settings")
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-xs text-slate-700 flex items-center gap-2"
                  >
                    <User size={14} className="text-slate-400" />
                    Account & Company Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer")
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-xs text-slate-700 flex items-center gap-2"
                  >
                    <Sparkles size={14} className="text-slate-400" />
                    My Subscriptions & Quota
                  </button>
                </div>

                <div className="border-t border-slate-100 py-1">
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/")
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-xs font-medium text-red-600 flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Sign Out (Launcher)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 9-Dot App Switcher */}
          <div className="relative">
            <button
              type="button"
              aria-label="App Switcher"
              title="Talent Cloud Portal Switcher"
              onClick={() => {
                const state = !appSwitcherOpen
                closeAllMenus()
                setAppSwitcherOpen(state)
              }}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            >
              <LayoutGrid size={18} />
            </button>

            {appSwitcherOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Talent Cloud Portals
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employer")
                    }}
                    className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-xs flex flex-col items-center gap-1 hover:bg-blue-100 transition"
                  >
                    <BriefcaseBusiness size={18} />
                    <span>Employer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/employee")
                    }}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs flex flex-col items-center gap-1 hover:bg-slate-100 transition"
                  >
                    <Users size={18} />
                    <span>Employee Flow</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/candidate")
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 font-medium text-xs flex flex-col items-center gap-1 transition"
                  >
                    <User size={18} />
                    <span>Jobseeker</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/recruiter")
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 font-medium text-xs flex flex-col items-center gap-1 transition"
                  >
                    <Users size={18} />
                    <span>Agency CRM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus()
                      navigate("/admin")
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 font-medium text-xs flex flex-col items-center gap-1 transition"
                  >
                    <Layers size={18} />
                    <span>Admin</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
