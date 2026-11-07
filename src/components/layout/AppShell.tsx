import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react"
import { NavLink, useLocation, useNavigate } from "react-router"
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Command,
  Compass,
  CornerDownLeft,
  Layers,
  LayoutTemplate,
  LogIn,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sparkles,
  Sun,
  UserCheck,
  WandSparkles,
  X,
} from "lucide-react"
import { Avatar, Badge, Button, Input } from "../ui"
import { adminNav, candidateNav, employerNav } from "./nav"
import { candidates, jobs } from "../../data/mockData"
import { TopNavigation } from "./TopNavigation"

export type NavItem = {
  label: string
  icon: ReactNode
  to: string
  group?: string
  badge?: string
  badgeTone?: "neutral" | "blue" | "green" | "amber" | "purple" | "red"
  description?: string
}

type NavLayout = "topnav" | "dock" | "sidebar"

const layoutOptions: {
  id: NavLayout
  label: string
  inspiration: string
  description: string
}[] = [
  {
    id: "topnav",
    label: "Top navigation",
    inspiration: "Apple.com · Stripe",
    description: "Mega-menus plus section tabs. Full-width content.",
  },
  {
    id: "dock",
    label: "Floating dock",
    inspiration: "macOS Dock · visionOS",
    description: "App-icon dock with magnification. Distraction-free.",
  },
  {
    id: "sidebar",
    label: "Sidebar",
    inspiration: "Linear · Notion",
    description: "Persistent grouped sidebar with collapsible rail.",
  },
]

const LAYOUT_KEY = "tn-nav-layout"
const readLayout = (): NavLayout => {
  if (typeof localStorage === "undefined") return "topnav"
  const stored = localStorage.getItem(LAYOUT_KEY)
  return stored === "dock" || stored === "sidebar" || stored === "topnav"
    ? stored
    : "topnav"
}

const portalNotifications = {
  Candidate: [
    {
      id: "c1",
      title: "Interview tomorrow at 10:00 AM",
      detail: "Portfolio review with Nexora Labs · Google Meet",
      time: "14m ago",
      to: "/candidate/interviews",
      unread: true,
    },
    {
      id: "c2",
      title: "92% match: Senior React Developer",
      detail: "Zentrix Labs · Verified salary ₹18–26 LPA",
      time: "1h ago",
      to: "/candidate/jobs",
      unread: true,
    },
    {
      id: "c3",
      title: "3 resume improvements ready",
      detail: "Tailor your profile in Application Studio",
      time: "3h ago",
      to: "/candidate/application-studio",
      unread: false,
    },
  ],
  Employer: [
    {
      id: "e1",
      title: "Priya Sharma (94% match) shortlisted",
      detail: "Senior Product Designer · Ready for interview",
      time: "8m ago",
      to: "/employer/candidates/priya",
      unread: true,
    },
    {
      id: "e2",
      title: "New WhatsApp reply from Priya Sharma",
      detail: "“Tuesday at 11 works for me.”",
      time: "22m ago",
      to: "/employer/communication",
      unread: true,
    },
    {
      id: "e3",
      title: "AI Match Agent evaluated 38 profiles",
      detail: "4 strong-evidence candidates surfaced",
      time: "2h ago",
      to: "/employer/matching",
      unread: false,
    },
  ],
  Recruiter: [
    {
      id: "r1",
      title: "Nexora Labs reviewed shortlist (2 shortlisted)",
      detail: "Siddharth Verma moved to technical architecture panel",
      time: "12m ago",
      to: "/recruiter",
      unread: true,
    },
    {
      id: "r2",
      title: "Mandate SLA: Razorpay Lead SRE due tomorrow",
      detail: "1 submission needed to meet guaranteed delivery SLA",
      time: "45m ago",
      to: "/recruiter",
      unread: true,
    },
    {
      id: "r3",
      title: "Placement Fee Paid: ₹7.92L from Nexora Labs",
      detail: "Invoice INV-2026-088 cleared for Priya Sharma placement",
      time: "3h ago",
      to: "/recruiter",
      unread: false,
    },
  ],
  "Platform Admin": [
    {
      id: "a1",
      title: "18 agent actions awaiting approval",
      detail: "Across 9 enterprise organizations",
      time: "5m ago",
      to: "/admin/agents",
      unread: true,
    },
    {
      id: "a2",
      title: "Platform uptime at 99.99%",
      detail: "All 5 core orchestration services healthy",
      time: "1h ago",
      to: "/admin",
      unread: false,
    },
  ],
}

const nextStepGuide: Record<string, { label: string; to: string; hint: string }> =
  {
    "/candidate": {
      hint: "Ready to explore roles matched to your verified skills?",
      label: "Explore 1,240 Matched Jobs",
      to: "/candidate/jobs",
    },
    "/candidate/jobs": {
      hint: "Want to boost your match score before applying?",
      label: "Open Application Studio",
      to: "/candidate/application-studio",
    },
    "/candidate/application-studio": {
      hint: "Track all your submitted applications in real time.",
      label: "View My Applications",
      to: "/candidate/applications",
    },
    "/candidate/radar": {
      hint: "See how top employers score on culture and pay transparency.",
      label: "Inspect Company Intelligence",
      to: "/candidate/companies",
    },
    "/employer": {
      hint: "4 candidates have 85%+ explainable match evidence.",
      label: "Review AI Talent Matches",
      to: "/employer/matching",
    },
    "/employer/jobs": {
      hint: "Move shortlisted applicants through stages.",
      label: "Open Kanban Pipeline",
      to: "/employer/pipeline",
    },
    "/employer/matching": {
      hint: "Coordinate panels and scorecards for top matches.",
      label: "Open Interview Calendar",
      to: "/employer/interviews",
    },
    "/employer/candidates": {
      hint: "Reach out over consented WhatsApp or email.",
      label: "Open Communication Center",
      to: "/employer/communication",
    },
    "/admin": {
      hint: "18 autonomous agent actions are queued for human review.",
      label: "Govern AI Agents",
      to: "/admin/agents",
    },
  }

const signatureTourSteps = [
  {
    step: 1,
    title: "Candidate Home Bento",
    company: "Apple HIG",
    to: "/candidate",
  },
  {
    step: 2,
    title: "Job Marketplace & Compare",
    company: "Airbnb + Stripe",
    to: "/candidate/jobs",
  },
  {
    step: 3,
    title: "Application Studio",
    company: "Apple Guided Flow",
    to: "/candidate/application-studio",
  },
  {
    step: 4,
    title: "Explainable AI Matching",
    company: "Stripe Trust UI",
    to: "/employer/matching",
  },
  {
    step: 5,
    title: "Kanban Hiring Pipeline",
    company: "Linear Speed",
    to: "/employer/pipeline",
  },
  {
    step: 6,
    title: "Top-Company UX Analysis",
    company: "Full Audit",
    to: "/candidate/ux-analysis",
  },
]

export function AppShell({
  portal,
  nav,
  children,
}: {
  portal: "Employer" | "Candidate" | "Platform Admin" | "Recruiter"
  nav: NavItem[]
  children: ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [switchOpen, setSwitchOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [notifOpen, setNotifOpen] = useState(false)
  const [readIds, setReadIds] = useState<string[]>([])
  const [tourMinimized, setTourMinimized] = useState(true)
  const [layout, setLayout] = useState<NavLayout>(readLayout)
  const [layoutOpen, setLayoutOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") === "dark"
      : false,
  )

  const location = useLocation()
  const navigate = useNavigate()
  const isAdmin = portal === "Platform Admin"
  const portalSlug =
    portal === "Employer"
      ? "employer"
      : portal === "Candidate"
        ? "candidate"
        : portal === "Recruiter"
          ? "recruiter"
          : "admin"

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-theme")
    }
  }, [dark])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setCommandOpen((open) => !open)
      } else if (event.key === "Escape") {
        setCommandOpen(false)
        setNotifOpen(false)
        setSwitchOpen(false)
        setLayoutOpen(false)
        setOpenGroup(null)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const switchPortal = (next: string) => {
    setSwitchOpen(false)
    navigate(
      next === "Employer"
        ? "/employer"
        : next === "Candidate"
          ? "/candidate"
          : next === "Recruiter"
            ? "/recruiter"
            : "/admin",
    )
  }

  const groupedNav = useMemo(() => {
    const groups: { name: string; items: NavItem[] }[] = []
    for (const item of nav) {
      const groupName = item.group || "Navigation"
      const existing = groups.find((g) => g.name === groupName)
      if (existing) {
        existing.items.push(item)
      } else {
        groups.push({ name: groupName, items: [item] })
      }
    }
    return groups
  }, [nav])

  const currentNavItem = useMemo(() => {
    return (
      nav.find((item) => item.to === location.pathname) ||
      nav.find(
        (item) =>
          item.to !== `/${portalSlug}` && location.pathname.startsWith(item.to),
      ) ||
      nav[0]
    )
  }, [nav, location.pathname, portalSlug])

  const commandItems = useMemo(() => {
    const q = commandQuery.trim().toLowerCase()
    const allScreens = [
      ...candidateNav.map((item) => ({
        id: `nav-${item.to}`,
        title: item.label,
        subtitle: item.description || `Candidate · ${item.group || "Page"}`,
        category: "Candidate Portal",
        badge: item.badge || "Candidate",
        to: item.to,
      })),
      ...employerNav.map((item) => ({
        id: `nav-${item.to}`,
        title: item.label,
        subtitle: item.description || `Employer · ${item.group || "Page"}`,
        category: "Employer Workspace",
        badge: item.badge || "Employer",
        to: item.to,
      })),
      ...adminNav.map((item) => ({
        id: `nav-${item.to}`,
        title: item.label,
        subtitle: item.description || `Admin · ${item.group || "Page"}`,
        category: "Platform Admin",
        badge: item.badge || "Admin",
        to: item.to,
      })),
      ...candidates.map((c) => ({
        id: `cand-${c.id}`,
        title: c.name,
        subtitle: `${c.role} · ${c.city} · ${c.match}% match`,
        category: "Candidates",
        badge: `${c.match}% Match`,
        to: `/employer/candidates/${c.id}`,
      })),
      ...jobs.map((j) => ({
        id: `job-${j.title}`,
        title: j.title,
        subtitle: `${j.department} · ${j.location} · ${j.salary}`,
        category: "Open Roles",
        badge: j.status,
        to: "/employer/jobs",
      })),
      {
        id: "act-onboarding-cand",
        title: "Candidate Onboarding Wizard",
        subtitle: "Step-by-step resume extraction & preference setup",
        category: "Flows & Demos",
        badge: "Interactive",
        to: "/candidate/onboarding",
      },
      {
        id: "act-onboarding-emp",
        title: "Employer Workspace Setup Wizard",
        subtitle: "6-step organization & team onboarding",
        category: "Flows & Demos",
        badge: "Interactive",
        to: "/employer/onboarding",
      },
      {
        id: "act-login-cand",
        title: "Candidate Sign-In Experience",
        subtitle: "Preview split-screen authentication UI",
        category: "Flows & Demos",
        badge: "Auth UI",
        to: "/candidate/login",
      },
    ]
    if (!q) return allScreens.slice(0, 12)
    return allScreens
      .filter((item) =>
        `${item.title} ${item.subtitle} ${item.category}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 14)
  }, [commandQuery])

  const notifications = portalNotifications[portal]
  const unreadCount = notifications.filter(
    (n) => n.unread && !readIds.includes(n.id),
  ).length
  const nextStep = nextStepGuide[location.pathname] || {
    hint: "See how Apple, Linear, Stripe & Airbnb UX principles power this workspace.",
    label: "Open UX Design Lens",
    to: `/${portalSlug}/ux-analysis`,
  }

  const mobilePrimaryNav = nav.slice(0, 4)
  const currentGroup =
    groupedNav.find((g) =>
      g.items.some((item) => item.to === currentNavItem?.to),
    ) || groupedNav[0]

  useEffect(() => {
    localStorage.setItem(LAYOUT_KEY, layout)
  }, [layout])

  useEffect(() => {
    setOpenGroup(null)
    setLayoutOpen(false)
  }, [location.pathname])

  const currentTourIdx = Math.max(
    0,
    signatureTourSteps.findIndex((s) => s.to === location.pathname),
  )
  const activeTourStep = signatureTourSteps[currentTourIdx]
  const prevTour =
    signatureTourSteps[
      (currentTourIdx - 1 + signatureTourSteps.length) %
        signatureTourSteps.length
    ]
  const nextTour =
    signatureTourSteps[(currentTourIdx + 1) % signatureTourSteps.length]

  if (portal?.toLowerCase() === "employer") {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
        <TopNavigation onSearchClick={() => setCommandOpen(true)} />
        <main key={location.pathname} className="page flex-1">
          {children}
        </main>
        {commandOpen && (
          <div
            className="spotlight-backdrop"
            onMouseDown={() => setCommandOpen(false)}
          >
            <div
              className="spotlight-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Spotlight command palette"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="spotlight-input-row">
                <Search size={18} />
                <Input
                  autoFocus
                  value={commandQuery}
                  onChange={(e) => {
                    setCommandQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault()
                      setSelectedIndex((i) =>
                        Math.min(i + 1, Math.max(commandItems.length - 1, 0)),
                      )
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault()
                      setSelectedIndex((i) => Math.max(i - 1, 0))
                    } else if (
                      e.key === "Enter" &&
                      commandItems[selectedIndex]
                    ) {
                      e.preventDefault()
                      navigate(commandItems[selectedIndex].to)
                      setCommandOpen(false)
                    }
                  }}
                  placeholder="Type a command, screen name, candidate, or role…"
                />
                <kbd onClick={() => setCommandOpen(false)}>ESC</kbd>
              </div>

              <div className="spotlight-quick-chips">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/employer/candidates/search")
                    setCommandOpen(false)
                  }}
                >
                  <Search size={13} /> Resdex Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/employer/jobs")
                    setCommandOpen(false)
                  }}
                >
                  <BriefcaseBusiness size={13} /> Manage Jobs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/employer/nvite/broadcast")
                    setCommandOpen(false)
                  }}
                >
                  <Sparkles size={13} /> Send NVite
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/candidate/jobs")
                    setCommandOpen(false)
                  }}
                >
                  <Compass size={13} /> Jobseeker Portal
                </button>
              </div>

              <div className="spotlight-results">
                {commandItems.map((item, idx) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`spotlight-item ${
                      idx === selectedIndex ? "selected" : ""
                    }`}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => {
                      navigate(item.to)
                      setCommandOpen(false)
                    }}
                  >
                    <div className="spotlight-item-main">
                      <strong>{item.title}</strong>
                      <small>{item.subtitle}</small>
                    </div>
                    <span className="spotlight-item-meta">
                      <Badge>{item.category}</Badge>
                      <CornerDownLeft size={14} />
                    </span>
                  </button>
                ))}
              </div>

              <div className="spotlight-foot">
                <span>
                  <kbd>↑</kbd> <kbd>↓</kbd> to navigate · <kbd>↵</kbd> to open ·{" "}
                  <kbd>ESC</kbd> to dismiss
                </span>
                <span>Naukri Talent Cloud Omnibar</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`app-frame layout-${layout} ${
        collapsed && layout === "sidebar" ? "sidebar-collapsed" : ""
      }`}
    >
      {mobileOpen && (
        <div
          className="mobile-sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span
            className="brand-mark"
            onClick={() => navigate(`/${portalSlug}`)}
            title="Go to Home"
          >
            <Command size={18} />
          </span>
          <div className="brand-title-wrap">
            <span>Talent Network</span>
            <small>Intelligence OS</small>
          </div>
          <button
            type="button"
            className="collapse-rail-btn"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <PanelLeftOpen size={15} />
            ) : (
              <PanelLeftClose size={15} />
            )}
          </button>
          <Button
            variant="ghost"
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </Button>
        </div>
        <div className="workspace-switcher">
          <Button variant="ghost" onClick={() => setSwitchOpen(!switchOpen)}>
            <span className="workspace-logo">
              {isAdmin
                ? "TN"
                : portal === "Employer"
                  ? "NL"
                  : portal === "Recruiter"
                    ? "AP"
                    : "PS"}
            </span>
            <span>
              <small>{portal}</small>
              <strong>
                {isAdmin
                  ? "Talent Network HQ"
                  : portal === "Employer"
                    ? "Nexora Labs"
                    : portal === "Recruiter"
                      ? "Apex Talent Partners"
                      : "Priya Sharma"}
              </strong>
            </span>
            <ChevronDown size={15} />
          </Button>
          {switchOpen && (
            <div className="switch-menu">
              <div className="switch-menu-label">Switch Persona Portal</div>
              {["Candidate", "Employer", "Recruiter", "Platform Admin"].map(
                (item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    className={portal === item ? "switch-item-active" : ""}
                    onClick={() => switchPortal(item)}
                  >
                    {item}
                    {portal === item && <Badge tone="blue">Active</Badge>}
                  </Button>
                ),
              )}
              <div className="switch-menu-divider" />
              <div className="switch-menu-label">Auth & Onboarding Flows</div>
              <Button
                variant="ghost"
                onClick={() => {
                  setSwitchOpen(false)
                  navigate("/candidate/onboarding")
                }}
              >
                <Sparkles size={14} /> Candidate Onboarding
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSwitchOpen(false)
                  navigate("/employer/onboarding")
                }}
              >
                <BriefcaseBusiness size={14} /> Employer Onboarding
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSwitchOpen(false)
                  navigate(
                    `/${
                      portalSlug === "admin" ? "employer" : portalSlug
                    }/login`,
                  )
                }}
              >
                <LogIn size={14} /> Sign-in Screen
              </Button>
            </div>
          )}
        </div>
        <nav className="side-nav" aria-label={`${portal} navigation`}>
          {groupedNav.map((group) => (
            <div className="nav-cluster" key={group.name}>
              <div className="nav-cluster-label">{group.name}</div>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={item.description || item.label}
                  end={item.to.split("/").length < 3}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <span className="nav-icon-slot">{item.icon}</span>
                  <span className="nav-label-slot">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`nav-pill ${
                        item.badgeTone ? `tone-${item.badgeTone}` : ""
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div
            className="ai-credit"
            onClick={() => navigate(`/${portalSlug}/ux-analysis`)}
            role="button"
            tabIndex={0}
          >
            <span>
              <Sparkles size={14} />{" "}
              {portal === "Candidate"
                ? "Career Readiness"
                : "AI Copilot Credits"}
            </span>
            <strong>
              {portal === "Candidate" ? "92 / 100" : "7,420 / 10k"}
            </strong>
            <div>
              <i />
            </div>
          </div>
          <div className="user-card">
            <Avatar
              name={
                isAdmin
                  ? "Aditi Rao"
                  : portal === "Employer"
                    ? "Neha Kapoor"
                    : "Priya Sharma"
              }
              size="sm"
            />
            <span>
              <strong>
                {isAdmin
                  ? "Aditi Rao"
                  : portal === "Employer"
                    ? "Neha Kapoor"
                    : "Priya Sharma"}
              </strong>
              <small>
                {isAdmin
                  ? "Platform administrator"
                  : portal === "Employer"
                    ? "Talent acquisition lead"
                    : "Product designer"}
              </small>
            </span>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <Button
            variant="ghost"
            className="menu-btn"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </Button>

          {layout !== "sidebar" && (
            <button
              type="button"
              className="topnav-brand"
              onClick={() => navigate(`/${portalSlug}`)}
            >
              <span className="brand-mark">
                <Command size={16} />
              </span>
              <span className="topnav-brand-text">
                <strong>Talent Network</strong>
                <small>{portal}</small>
              </span>
            </button>
          )}

          {layout === "topnav" && (
            <nav className="topnav-groups" aria-label={`${portal} sections`}>
              {groupedNav.map((group) => {
                const groupActive = group.name === currentGroup?.name
                const isOpen = openGroup === group.name
                return (
                  <div
                    className="topnav-group"
                    key={group.name}
                    onMouseEnter={() => setOpenGroup(group.name)}
                    onMouseLeave={() => setOpenGroup(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      className={`topnav-group-btn ${
                        groupActive ? "active" : ""
                      } ${isOpen ? "open" : ""}`}
                      onClick={() => setOpenGroup(isOpen ? null : group.name)}
                    >
                      {group.name} <ChevronDown size={14} />
                    </button>
                    {isOpen && (
                      <div className="mega-menu">
                        <div className="mega-menu-head">
                          <small>{portal}</small>
                          <strong>{group.name}</strong>
                        </div>
                        <div className="mega-menu-grid">
                          {group.items.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              end={item.to.split("/").length < 3}
                              onClick={() => setOpenGroup(null)}
                              className={({ isActive }) =>
                                `mega-item ${isActive ? "active" : ""}`
                              }
                            >
                              <span className="mega-item-icon">
                                {item.icon}
                              </span>
                              <span className="mega-item-copy">
                                <strong>
                                  {item.label}
                                  {item.badge && (
                                    <span
                                      className={`nav-pill ${
                                        item.badgeTone
                                          ? `tone-${item.badgeTone}`
                                          : ""
                                      }`}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </strong>
                                <small>{item.description}</small>
                              </span>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          )}

          <button
            type="button"
            className={`global-search spotlight-trigger ${
              layout === "topnav" ? "compact" : ""
            }`}
            onClick={() => {
              setCommandQuery("")
              setSelectedIndex(0)
              setCommandOpen(true)
            }}
            aria-label="Global search"
          >
            {layout === "topnav" ? (
              <>
                <span className="spotlight-placeholder">
                  {portal === "Candidate"
                    ? "Search jobs here"
                    : portal === "Employer"
                      ? "Search candidates or jobs"
                      : "Search organizations or agents"}
                </span>
                <span className="search-go">
                  <Search size={15} />
                </span>
              </>
            ) : (
              <>
                <Search size={17} />
                <span className="spotlight-placeholder">
                  {portal === "Candidate"
                    ? "Search jobs, companies, or jump to any tool…"
                    : "Search candidates, jobs, agents, or actions…"}
                </span>
                <kbd>⌘ K</kbd>
              </>
            )}
          </button>

          {layout !== "topnav" && (
            <div
              className="persona-segmented"
              role="group"
              aria-label="Portal switcher"
            >
              {([
                ["Candidate", "Candidate", "/candidate"],
                ["Employer", "Employer", "/employer"],
                ["Platform Admin", "Admin", "/admin"],
              ] as const).map(([key, label, path]) => (
                <button
                  key={key}
                  type="button"
                  className={`seg-pill ${portal === key ? "active" : ""}`}
                  onClick={() => navigate(path)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <div className="top-actions">
            {layout !== "topnav" && (
              <Button
                variant="ghost"
                className="ux-lens-trigger"
                onClick={() => navigate(`/${portalSlug}/ux-analysis`)}
                title="Inspect Apple / Linear / Stripe UI/UX Redesign Benchmarks"
              >
                <Layers size={16} />
                <span>UX Lens</span>
              </Button>
            )}

            <div className="layout-anchor">
              {layout === "topnav" ? (
                <button
                  type="button"
                  className={`account-pill ${layoutOpen ? "is-open" : ""}`}
                  aria-label="Account and settings"
                  aria-expanded={layoutOpen}
                  onClick={() => setLayoutOpen(!layoutOpen)}
                >
                  <Menu size={18} />
                  <Avatar
                    name={
                      isAdmin
                        ? "Aditi Rao"
                        : portal === "Employer"
                          ? "Neha Kapoor"
                          : "Priya Sharma"
                    }
                    size="sm"
                  />
                </button>
              ) : (
                <Button
                  variant="ghost"
                  aria-label="Change navigation layout"
                  aria-expanded={layoutOpen}
                  title="Navigation layout"
                  className={layoutOpen ? "is-open" : ""}
                  onClick={() => setLayoutOpen(!layoutOpen)}
                >
                  <LayoutTemplate size={18} />
                </Button>
              )}
              {layoutOpen && (
                <div className="layout-popover">
                  <div className="layout-popover-head">
                    <strong>Workspace view</strong>
                    <small>Choose your portal and how you navigate</small>
                  </div>
                  <div className="layout-portal-row">
                    {([
                      ["Candidate", "/candidate"],
                      ["Employer", "/employer"],
                      ["Recruiter", "/recruiter"],
                      ["Platform Admin", "/admin"],
                    ] as const).map(([key, path]) => (
                      <button
                        key={key}
                        type="button"
                        className={portal === key ? "active" : ""}
                        onClick={() => navigate(path)}
                      >
                        {key === "Platform Admin" ? "Admin" : key}
                      </button>
                    ))}
                  </div>
                  <div className="layout-section-label">Navigation style</div>
                  {layoutOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`layout-option ${
                        layout === opt.id ? "active" : ""
                      }`}
                      onClick={() => {
                        setLayout(opt.id)
                        setLayoutOpen(false)
                      }}
                    >
                      <span className={`layout-preview preview-${opt.id}`}>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="layout-option-copy">
                        <strong>{opt.label}</strong>
                        <small>{opt.inspiration}</small>
                        <em>{opt.description}</em>
                      </span>
                      {layout === opt.id && <Check size={16} />}
                    </button>
                  ))}
                  <div className="layout-section-label">More</div>
                  <button
                    type="button"
                    className="layout-row"
                    onClick={() => setDark(!dark)}
                  >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                    <span>{dark ? "Light mode" : "Dark mode"}</span>
                  </button>
                  <button
                    type="button"
                    className="layout-row"
                    onClick={() => navigate(`/${portalSlug}/ux-analysis`)}
                  >
                    <Layers size={16} />
                    <span>UX design lens</span>
                  </button>
                </div>
              )}
            </div>

            {layout !== "topnav" && (
              <Button
                variant="ghost"
                aria-label={
                  dark ? "Switch to light mode" : "Switch to dark mode"
                }
                title={dark ? "Cupertino Light Mode" : "Obsidian Dark Mode"}
                onClick={() => setDark(!dark)}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            )}

            <div className="notif-anchor">
              <Button
                variant="ghost"
                aria-label="Notifications"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell size={19} />
                {unreadCount > 0 && <span className="notification-dot" />}
              </Button>
              {notifOpen && (
                <div className="notif-popover">
                  <div className="notif-head">
                    <div>
                      <strong>Notifications</strong>
                      <small>{portal} updates</small>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setReadIds(notifications.map((n) => n.id))}
                    >
                      <CheckCheck size={14} /> Mark read
                    </Button>
                  </div>
                  <div className="notif-list">
                    {notifications.map((item) => {
                      const isUnread = item.unread && !readIds.includes(item.id)
                      return (
                        <button
                          type="button"
                          key={item.id}
                          className={`notif-item ${isUnread ? "unread" : ""}`}
                          onClick={() => {
                            setReadIds([...readIds, item.id])
                            setNotifOpen(false)
                            navigate(item.to)
                          }}
                        >
                          <span className="notif-status-dot" />
                          <div>
                            <strong>{item.title}</strong>
                            <p>{item.detail}</p>
                            <small>{item.time}</small>
                          </div>
                          <ChevronRight size={15} />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {layout !== "topnav" && (
              <Button
                variant="primary"
                className="top-cta-btn"
                onClick={() =>
                  navigate(
                    portal === "Employer"
                      ? "/employer/jobs/new"
                      : portal === "Candidate"
                        ? "/candidate/jobs"
                        : "/admin/agents",
                  )
                }
              >
                <BriefcaseBusiness size={16} />
                {portal === "Employer"
                  ? "Create job"
                  : portal === "Candidate"
                    ? "Find jobs"
                    : "Agent catalog"}
              </Button>
            )}
          </div>
        </header>

        {location.pathname === "/candidate" && (
          <div className="promo-strip">
            <span className="promo-strip-mark">
              <WandSparkles size={16} /> New
            </span>
            <p>
              Application Studio: tailor your resume to any job in one click
            </p>
            <button
              type="button"
              onClick={() => navigate("/candidate/application-studio")}
            >
              Try it now <ArrowRight size={15} />
            </button>
          </div>
        )}

        {layout !== "topnav" && (
          <div className="wayfinding-bar">
            <div className="breadcrumbs" aria-label="Breadcrumb">
              <button
                type="button"
                className="crumb-root"
                onClick={() => navigate(`/${portalSlug}`)}
              >
                {portal}
              </button>
              <ChevronRight size={13} />
              <span className="crumb-group">
                {currentNavItem?.group || "Workspace"}
              </span>
              <ChevronRight size={13} />
              <strong className="crumb-current">
                {location.pathname.endsWith("/ux-analysis")
                  ? "UX Design Lens"
                  : currentNavItem?.label || "Overview"}
              </strong>
            </div>
            <div className="guided-next-step">
              <span className="guided-hint">
                <Sparkles size={13} /> {nextStep.hint}
              </span>
              <button
                type="button"
                className="guided-action-pill"
                onClick={() => navigate(nextStep.to)}
              >
                {nextStep.label} <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        <main key={location.pathname} className="page">
          {children}
        </main>

        {layout === "dock" && (
          <nav className="mac-dock" aria-label="Dock navigation">
            {groupedNav.map((group, gi) => (
              <Fragment key={group.name}>
                {gi > 0 && <span className="dock-divider" />}
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to.split("/").length < 3}
                    aria-label={item.label}
                    className={({ isActive }) =>
                      `dock-item ${isActive ? "active" : ""}`
                    }
                  >
                    <span className="dock-tooltip">{item.label}</span>
                    <span className={`dock-icon tone-${gi % 3}`}>
                      {item.icon}
                    </span>
                    {item.badge && item.badge.length <= 4 && (
                      <span className="dock-badge">{item.badge}</span>
                    )}
                    <span className="dock-indicator" />
                  </NavLink>
                ))}
              </Fragment>
            ))}
            <span className="dock-divider" />
            <button
              type="button"
              className="dock-item"
              aria-label="Search"
              onClick={() => setCommandOpen(true)}
            >
              <span className="dock-tooltip">Search ⌘K</span>
              <span className="dock-icon tone-search">
                <Search />
              </span>
            </button>
          </nav>
        )}

        {layout !== "topnav" && (
          <div
            className={`apple-tour-dock ${tourMinimized ? "minimized" : ""}`}
            role="region"
            aria-label="Interactive customer tour dock"
          >
            {tourMinimized ? (
              <button
                type="button"
                className="tour-expand-pill"
                onClick={() => setTourMinimized(false)}
              >
                <Sparkles size={14} />
                <span>Guided UX Tour ({currentTourIdx + 1}/6)</span>
              </button>
            ) : (
              <>
                <div className="tour-dock-brand">
                  <span className="tour-dock-badge">
                    <Sparkles size={12} /> {activeTourStep.company}
                  </span>
                  <div>
                    <strong>
                      Step {currentTourIdx + 1}/6 · {activeTourStep.title}
                    </strong>
                    <small>Click Next to tour redesigned customer flows</small>
                  </div>
                </div>
                <div className="tour-dock-dots">
                  {signatureTourSteps.map((s, idx) => (
                    <button
                      key={s.to}
                      type="button"
                      title={`${s.step}. ${s.title} (${s.company})`}
                      aria-label={s.title}
                      className={`tour-dot ${
                        idx === currentTourIdx ? "active" : ""
                      }`}
                      onClick={() => navigate(s.to)}
                    />
                  ))}
                </div>
                <div className="tour-dock-controls">
                  <button
                    type="button"
                    className="tour-nav-btn"
                    onClick={() => navigate(prevTour.to)}
                    title={`Previous: ${prevTour.title}`}
                  >
                    <ChevronLeft size={15} /> Prev
                  </button>
                  <button
                    type="button"
                    className="tour-nav-btn primary"
                    onClick={() => navigate(nextTour.to)}
                    title={`Next: ${nextTour.title}`}
                  >
                    Next: {nextTour.title} <ChevronRight size={15} />
                  </button>
                  <button
                    type="button"
                    className="tour-close-btn"
                    aria-label="Minimize tour dock"
                    title="Minimize tour dock"
                    onClick={() => setTourMinimized(true)}
                  >
                    <X size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <nav
          className="mobile-bottom-dock"
          aria-label="Mobile quick navigation"
        >
          {mobilePrimaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to.split("/").length < 3}
              className={({ isActive }) =>
                `mobile-dock-item ${isActive ? "active" : ""}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
          <button
            type="button"
            className="mobile-dock-item"
            onClick={() => setCommandOpen(true)}
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </nav>
      </div>

      {commandOpen && (
        <div
          className="spotlight-backdrop"
          onMouseDown={() => setCommandOpen(false)}
        >
          <div
            className="spotlight-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Spotlight command palette"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="spotlight-input-row">
              <Search size={18} />
              <Input
                autoFocus
                value={commandQuery}
                onChange={(e) => {
                  setCommandQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    setSelectedIndex((i) =>
                      Math.min(i + 1, Math.max(commandItems.length - 1, 0)),
                    )
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault()
                    setSelectedIndex((i) => Math.max(i - 1, 0))
                  } else if (e.key === "Enter" && commandItems[selectedIndex]) {
                    e.preventDefault()
                    navigate(commandItems[selectedIndex].to)
                    setCommandOpen(false)
                  }
                }}
                placeholder="Type a command, screen name, candidate, or role…"
              />
              <kbd onClick={() => setCommandOpen(false)}>ESC</kbd>
            </div>

            <div className="spotlight-quick-chips">
              <button
                type="button"
                onClick={() => {
                  navigate("/candidate/jobs")
                  setCommandOpen(false)
                }}
              >
                <Compass size={13} /> Find Jobs
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/candidate/application-studio")
                  setCommandOpen(false)
                }}
              >
                <WandSparkles size={13} /> Application Studio
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/employer/matching")
                  setCommandOpen(false)
                }}
              >
                <UserCheck size={13} /> AI Candidate Matching
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(`/${portalSlug}/ux-analysis`)
                  setCommandOpen(false)
                }}
              >
                <Layers size={13} /> UX Benchmark Analysis
              </button>
            </div>

            <div className="spotlight-results">
              {commandItems.map((item, idx) => (
                <button
                  type="button"
                  key={item.id}
                  className={`spotlight-item ${
                    idx === selectedIndex ? "selected" : ""
                  }`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    navigate(item.to)
                    setCommandOpen(false)
                  }}
                >
                  <div className="spotlight-item-main">
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </div>
                  <span className="spotlight-item-meta">
                    <Badge>{item.category}</Badge>
                    <CornerDownLeft size={14} />
                  </span>
                </button>
              ))}
            </div>

            <div className="spotlight-foot">
              <span>
                <kbd>↑</kbd> <kbd>↓</kbd> to navigate · <kbd>↵</kbd> to open ·{" "}
                <kbd>ESC</kbd> to dismiss
              </span>
              <span>Apple Spotlight + Linear ⌘K Architecture</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
