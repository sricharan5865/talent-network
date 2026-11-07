import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Bot,
  BriefcaseBusiness,
  Building,
  Calendar,
  CalendarDays,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  Download,
  ExternalLink,
  FileText,
  Filter,
  GripVertical,
  IndianRupee,
  Layers,
  ListFilter,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Send,
  Share2,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingDown,
  TrendingUp,
  Upload,
  UserCheck,
  UserPlus,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react"
import { candidates, jobs, performance } from "../data/mockData"
import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Progress,
  Select,
} from "../components/ui"
import { FeatureDemoPage } from "./DemoPages"

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description: string
  actions?: React.ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </div>
  )
}

const employerHomeImage =
  "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"

export function EmployerDashboard() {
  const navigate = useNavigate()

  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [toast, setToast] = useState("")
  const [activeView, setActiveView] = useState<"focus" | "jobs" | "matches">(
    "focus",
  )

  // Modals state
  const [postJobOpen, setPostJobOpen] = useState(false)
  const [offerModalOpen, setOfferModalOpen] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<{
    id: string
    candidate: string
    role: string
    dept: string
    base: string
    bonus: string
    equity: string
    total: string
    joining: string
    score: number
    recommendation: string
    notes: string
  } | null>(null)
  const [scorecardModalOpen, setScorecardModalOpen] = useState(false)
  const [aiBriefOpen, setAiBriefOpen] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [previewCandidate, setPreviewCandidate] = useState<any | null>(null)

  // Interactive data state
  const [pendingOffers, setPendingOffers] = useState([
    {
      id: "priya-offer",
      candidate: "Priya Sharma",
      role: "Senior Product Designer",
      dept: "Design",
      base: "₹28,00,000",
      bonus: "₹4,00,000",
      equity: "₹12,00,000 (4 yr vesting)",
      total: "₹36,00,000",
      joining: "1st of next month",
      score: 4.9,
      recommendation: "Strong Hire (4/4 panel votes)",
      notes:
        "Exceptional design system depth, strong strategic thinking. Ex-Razorpay.",
    },
    {
      id: "vikram-offer",
      candidate: "Vikram Malhotra",
      role: "Staff Backend Engineer",
      dept: "Engineering",
      base: "₹36,00,000",
      bonus: "₹4,00,000",
      equity: "₹16,00,000 (4 yr vesting)",
      total: "₹44,00,000",
      joining: "15th of next month",
      score: 4.8,
      recommendation: "Strong Hire (3/3 panel votes)",
      notes:
        "Deep distributed systems expertise, proven scale handling at PhonePe.",
    },
  ])

  const [overdueScorecards] = useState([
    {
      id: "sc-1",
      candidate: "Vikram Malhotra",
      role: "Staff Backend Engineer",
      interviewer: "Siddharth V (Engineering Lead)",
      round: "System Architecture",
      due: "Yesterday 4:00 PM",
    },
    {
      id: "sc-2",
      candidate: "Rohan Kapoor",
      role: "Design Lead",
      interviewer: "Anita M (VP Product)",
      round: "Product Leadership",
      due: "Yesterday 5:30 PM",
    },
    {
      id: "sc-3",
      candidate: "Sneha Iyer",
      role: "UX Designer",
      interviewer: "Rahul T (Staff Designer)",
      round: "Interaction & Design Sense",
      due: "Yesterday 2:00 PM",
    },
    {
      id: "sc-4",
      candidate: "Arjun Mehta",
      role: "Product Designer",
      interviewer: "Neha K (Talent Lead)",
      round: "Cultural Alignment",
      due: "Yesterday 11:30 AM",
    },
  ])

  const [openJobsList, setOpenJobsList] = useState([
    {
      id: "job-1",
      role: "Senior Product Designer",
      dept: "Design",
      location: "Bengaluru · Hybrid",
      salary: "₹28L–₹36L",
      apps: 128,
      pipeline: 18,
      velocity: "Fast",
      status: "green" as const,
    },
    {
      id: "job-2",
      role: "Staff Backend Engineer",
      dept: "Engineering",
      location: "Hyderabad · Hybrid",
      salary: "₹34L–₹44L",
      apps: 94,
      pipeline: 11,
      velocity: "Bottleneck",
      status: "amber" as const,
    },
    {
      id: "job-3",
      role: "Enterprise Account Executive",
      dept: "Sales",
      location: "Mumbai · On-site",
      salary: "₹18L–₹25L",
      apps: 67,
      pipeline: 9,
      velocity: "Friction",
      status: "amber" as const,
    },
    {
      id: "job-4",
      role: "People Operations Partner",
      dept: "People",
      location: "Gurugram · Hybrid",
      salary: "₹16L–₹22L",
      apps: 41,
      pipeline: 6,
      velocity: "Fast",
      status: "green" as const,
    },
    {
      id: "job-5",
      role: "AI / ML Research Engineer",
      dept: "Engineering",
      location: "Bengaluru · Remote",
      salary: "₹38L–₹52L",
      apps: 85,
      pipeline: 14,
      velocity: "Fast",
      status: "green" as const,
    },
  ])

  const topMatchesList = useMemo(
    () => [
      {
        id: "priya",
        name: "Priya Sharma",
        role: "Senior Product Designer",
        dept: "Design",
        city: "Bengaluru",
        exp: "7 years",
        match: 94,
        matchedSkills: [
          "Figma",
          "Design Systems",
          "User Research",
          "Prototyping",
        ],
        missingSkills: ["Framer"],
        currentCompany: "Razorpay",
        salaryExp: "₹32L–₹36L",
        notice: "30 days",
        fitReason:
          "100% core skill match; extensive B2B SaaS design system leadership at scale.",
      },
      {
        id: "vikram",
        name: "Vikram Malhotra",
        role: "Staff Backend Engineer",
        dept: "Engineering",
        city: "Hyderabad",
        exp: "9 years",
        match: 91,
        matchedSkills: ["Go", "Kubernetes", "Kafka", "Distributed Systems"],
        missingSkills: ["Rust"],
        currentCompany: "PhonePe",
        salaryExp: "₹40L–₹45L",
        notice: "45 days",
        fitReason:
          "Proven high-throughput transaction architecture; aligns with Core Platform team.",
      },
      {
        id: "arjun",
        name: "Arjun Mehta",
        role: "Product Designer",
        dept: "Design",
        city: "Mumbai",
        exp: "5 years",
        match: 89,
        matchedSkills: ["Figma", "Interaction Design", "UX Strategy"],
        missingSkills: ["Design Tokens"],
        currentCompany: "Swiggy",
        salaryExp: "₹24L–₹28L",
        notice: "Immediate",
        fitReason:
          "Immediate joiner; exceptional consumer interaction design portfolio.",
      },
      {
        id: "sneha",
        name: "Sneha Iyer",
        role: "UX Researcher",
        dept: "Design",
        city: "Chennai",
        exp: "6 years",
        match: 86,
        matchedSkills: ["Qualitative Research", "Usability Testing"],
        missingSkills: ["SQL"],
        currentCompany: "Freshworks",
        salaryExp: "₹22L–₹26L",
        notice: "45 days",
        fitReason: "Strong enterprise SaaS user research methodology.",
      },
    ],
    [],
  )

  // New Job Creation Form State
  const [newJobTitle, setNewJobTitle] = useState("")
  const [newJobDept, setNewJobDept] = useState("Engineering")
  const [newJobLocation, setNewJobLocation] = useState("Bengaluru · Hybrid")
  const [newJobMinSalary, setNewJobMinSalary] = useState("24")
  const [newJobMaxSalary, setNewJobMaxSalary] = useState("36")
  const [newJobDesc, setNewJobDesc] = useState("")

  // Invite Form State
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteName, setInviteName] = useState("")
  const [inviteRole, setInviteRole] = useState("Hiring Manager")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => {
      setToast((prev) => (prev === msg ? "" : prev))
    }, 4000)
  }

  const handleApproveOffer = (offer: typeof pendingOffers[0]) => {
    setPendingOffers((prev) => prev.filter((o) => o.id !== offer.id))
    setOfferModalOpen(false)
    showToast(`🎉 Offer approved & official letter sent to ${offer.candidate}!`)
  }

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newJobTitle.trim()) {
      showToast("Please enter a job title")
      return
    }
    const newJob = {
      id: `job-${Date.now()}`,
      role: newJobTitle,
      dept: newJobDept,
      location: newJobLocation,
      salary: `₹${newJobMinSalary}L–₹${newJobMaxSalary}L`,
      apps: 1,
      pipeline: 0,
      velocity: "Fast",
      status: "green" as const,
    }
    setOpenJobsList([newJob, ...openJobsList])
    setPostJobOpen(false)
    setNewJobTitle("")
    setNewJobDesc("")
    showToast(`✅ Requisition published: "${newJobTitle}" is live!`)
  }

  // Live Instant Search results when typing
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    const q = searchQuery.toLowerCase()
    const matchedJobs = openJobsList.filter(
      (j) =>
        j.role.toLowerCase().includes(q) || j.dept.toLowerCase().includes(q),
    )
    const matchedCandidates = topMatchesList.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.matchedSkills.some((s) => s.toLowerCase().includes(q)),
    )
    return { jobs: matchedJobs, candidates: matchedCandidates }
  }, [searchQuery, openJobsList, topMatchesList])

  // Google-style shortcuts with vibrant gradients
  const shortcuts = [
    {
      label: "Open Jobs",
      count: String(openJobsList.length),
      icon: BriefcaseBusiness,
      gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
      shadow: "rgba(99, 102, 241, 0.35)",
      to: "/employer/jobs",
    },
    {
      label: "Candidates",
      count: "1,248",
      icon: Users,
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      shadow: "rgba(16, 185, 129, 0.35)",
      to: "/employer/candidates",
    },
    {
      label: "Pipeline",
      count: "128",
      icon: Layers,
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      shadow: "rgba(59, 130, 246, 0.35)",
      to: "/employer/pipeline",
    },
    {
      label: "Interviews",
      count: "3 Today",
      icon: CalendarDays,
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      shadow: "rgba(245, 158, 11, 0.35)",
      to: "/employer/interviews",
    },
    {
      label: "Sign-offs",
      count: `${pendingOffers.length} Ready`,
      icon: Award,
      gradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
      shadow: "rgba(168, 85, 247, 0.35)",
      badge:
        pendingOffers.length > 0 ? String(pendingOffers.length) : undefined,
      action: () => {
        if (pendingOffers.length > 0) {
          setSelectedOffer(pendingOffers[0])
          setOfferModalOpen(true)
        } else {
          showToast("All offers have been signed off!")
        }
      },
    },
    {
      label: "AI Matches",
      count: "Top 4",
      icon: Sparkles,
      gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
      shadow: "rgba(139, 92, 246, 0.35)",
      action: () => setActiveView("matches"),
    },
    {
      label: "Analytics",
      count: "98.4%",
      icon: Activity,
      gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
      shadow: "rgba(6, 182, 212, 0.35)",
      to: "/employer/analytics",
    },
    {
      label: "Add Member",
      count: "Invite",
      icon: UserPlus,
      gradient: "linear-gradient(135deg, #64748b, #475569)",
      shadow: "rgba(100, 116, 139, 0.3)",
      action: () => setInviteModalOpen(true),
    },
  ]

  // Theme switcher helper
  const handleSetTheme = (themeName: "light" | "google-violet" | "dark") => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", themeName)
      showToast(
        `Switched theme to ${
          themeName === "google-violet"
            ? "🔮 Google Plum Violet"
            : themeName === "dark"
              ? "🌙 Obsidian Dark"
              : "☀️ Radiant Light"
        }`,
      )
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 100px)",
        background:
          "radial-gradient(circle at 50% -10%, rgba(139, 92, 246, 0.14) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 75%)",
        padding: "36px 20px 100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 30,
            zIndex: 100,
            background: "linear-gradient(135deg, #1e1b4b, #312e81)",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 14px 40px rgba(0, 0, 0, 0.28)",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "pulse-subtle 2s infinite ease-in-out",
          }}
        >
          <Sparkles size={16} style={{ color: "#c084fc" }} />
          <span>{toast}</span>
        </div>
      )}

      {/* TOP FLOATING CONTROLS: LIVE RADAR & THEME PILL */}
      <div
        style={{
          maxWidth: 740,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 9999,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            fontSize: 12.5,
            fontWeight: 600,
            color: "var(--ink)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 10px #10b981",
              display: "inline-block",
            }}
          />
          <span>AI Candidate Radar Active</span>
          <span style={{ color: "var(--muted)", fontWeight: 400 }}>
            · 1,248 Indexed
          </span>
        </div>

        {/* Quick Theme Switcher Pills */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 6px",
            borderRadius: 9999,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <button
            type="button"
            title="Radiant Light"
            onClick={() => handleSetTheme("light")}
            style={{
              border: "none",
              background: "transparent",
              color: "var(--ink)",
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 9999,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ☀️ Light
          </button>
          <button
            type="button"
            title="Google Violet Theme (as in screenshot)"
            onClick={() => handleSetTheme("google-violet")}
            style={{
              border: "none",
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 9999,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              boxShadow: "0 2px 8px rgba(168, 85, 247, 0.4)",
            }}
          >
            🔮 Google Violet
          </button>
          <button
            type="button"
            title="Obsidian Dark"
            onClick={() => handleSetTheme("dark")}
            style={{
              border: "none",
              background: "transparent",
              color: "var(--ink)",
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 9999,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            🌙 Dark
          </button>
        </div>
      </div>

      <div
        style={{
          maxWidth: 740,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 1. GOOGLE-STYLE VIBRANT BRANDING */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 54,
              fontWeight: 900,
              letterSpacing: "-2px",
              margin: 0,
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              lineHeight: 1.1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "var(--ink)" }}>Nexora</span>
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Talent
            </span>
          </h1>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: 15.5,
              color: "var(--muted)",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Good morning, <strong style={{ color: "var(--ink)" }}>Neha</strong>{" "}
            ·{" "}
            <span style={{ color: "#a855f7", fontWeight: 700 }}>
              2 Critical Offers
            </span>{" "}
            awaiting your sign-off today
          </p>
        </div>

        {/* 2. GOOGLE-STYLE PROMINENT SEARCH PILL */}
        <div style={{ width: "100%", position: "relative", marginBottom: 20 }}>
          <div
            style={{
              width: "100%",
              height: 60,
              borderRadius: 9999,
              background: "var(--surface)",
              border: "1.5px solid var(--border-strong)",
              boxShadow:
                "0 8px 30px rgba(99, 102, 241, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)",
              display: "flex",
              alignItems: "center",
              padding: "0 22px",
              gap: 14,
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Search size={22} style={{ color: "#8b5cf6", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search candidates, open jobs, skills, or ask AI Mode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 16,
                fontWeight: 500,
                color: "var(--ink)",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "var(--muted)",
                  cursor: "pointer",
                  padding: "6px",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <X size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={() => setAiBriefOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                color: "#ffffff",
                border: "none",
                padding: "8px 18px",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(168, 85, 247, 0.4)",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Sparkles size={15} />
              <span>AI Mode</span>
            </button>
          </div>

          {/* Live Search Autocomplete Dropdown */}
          {searchResults && (
            <div
              style={{
                position: "absolute",
                top: 70,
                left: 0,
                right: 0,
                background: "var(--surface)",
                borderRadius: 20,
                border: "1px solid var(--border-strong)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                padding: "18px",
                zIndex: 40,
                maxHeight: 400,
                overflowY: "auto",
                backdropFilter: "blur(20px)",
              }}
            >
              {searchResults.candidates.length === 0 &&
              searchResults.jobs.length === 0 ? (
                <div
                  style={{
                    padding: "28px",
                    textAlign: "center",
                    color: "var(--muted)",
                    fontSize: 14,
                  }}
                >
                  No candidates or jobs matching "{searchQuery}"
                </div>
              ) : (
                <>
                  {searchResults.candidates.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 11.5,
                          fontWeight: 800,
                          color: "#8b5cf6",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          padding: "4px 8px",
                          marginBottom: 8,
                        }}
                      >
                        Matching Candidates ({searchResults.candidates.length})
                      </div>
                      {searchResults.candidates.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            setPreviewCandidate(c)
                            setSearchQuery("")
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 14px",
                            borderRadius: 12,
                            cursor: "pointer",
                            fontSize: 13.5,
                            marginBottom: 6,
                            background: "var(--surface-2)",
                            transition: "background 0.15s ease",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}
                          >
                            <Avatar name={c.name} size="md" />
                            <div>
                              <strong
                                style={{ color: "var(--ink)", fontSize: 14 }}
                              >
                                {c.name}
                              </strong>
                              <span
                                style={{
                                  color: "var(--muted)",
                                  fontSize: 13,
                                  marginLeft: 6,
                                }}
                              >
                                · {c.role}
                              </span>
                              <div
                                style={{
                                  fontSize: 12,
                                  color: "var(--muted)",
                                  marginTop: 2,
                                }}
                              >
                                {c.city} · {c.currentCompany} · Expected:{" "}
                                {c.salaryExp}
                              </div>
                            </div>
                          </div>
                          <Badge tone="green">{c.match}% match</Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.jobs.length > 0 && (
                    <div>
                      <div
                        style={{
                          fontSize: 11.5,
                          fontWeight: 800,
                          color: "#3b82f6",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          padding: "4px 8px",
                          marginBottom: 8,
                        }}
                      >
                        Matching Requisitions ({searchResults.jobs.length})
                      </div>
                      {searchResults.jobs.map((j) => (
                        <div
                          key={j.id}
                          onClick={() => navigate("/employer/pipeline")}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 14px",
                            borderRadius: 12,
                            cursor: "pointer",
                            fontSize: 13.5,
                            marginBottom: 6,
                            background: "var(--surface-2)",
                          }}
                        >
                          <div>
                            <strong
                              style={{ color: "var(--ink)", fontSize: 14 }}
                            >
                              {j.role}
                            </strong>
                            <span
                              style={{
                                color: "var(--muted)",
                                fontSize: 13,
                                marginLeft: 6,
                              }}
                            >
                              ({j.dept})
                            </span>
                            <div
                              style={{
                                fontSize: 12,
                                color: "var(--muted)",
                                marginTop: 2,
                              }}
                            >
                              {j.apps} applicants · {j.salary} · {j.location}
                            </div>
                          </div>
                          <Badge tone={j.status}>{j.velocity}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* 3. GOOGLE-STYLE PROMPT CHIP CARDS (Like "Do more with AI Mode", "Create images") */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 12,
            width: "100%",
            marginBottom: 36,
          }}
        >
          <div
            onClick={() => setActiveView("matches")}
            style={{
              padding: "14px 18px",
              borderRadius: 16,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transition:
                "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.borderColor = "#a855f7"
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(168, 85, 247, 0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.borderColor = "var(--border)"
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)"
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                display: "grid",
                placeItems: "center",
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <div
                style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}
              >
                Top 4 AI Matches
              </div>
              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
                94% Fit · Priya & Vikram
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              if (pendingOffers.length > 0) {
                setSelectedOffer(pendingOffers[0])
                setOfferModalOpen(true)
              } else {
                showToast("All offers signed off!")
              }
            }}
            style={{
              padding: "14px 18px",
              borderRadius: 16,
              background: "var(--surface)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              boxShadow: "0 2px 10px rgba(168, 85, 247, 0.08)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(168, 85, 247, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow =
                "0 2px 10px rgba(168, 85, 247, 0.08)"
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                display: "grid",
                placeItems: "center",
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              <Award size={18} />
            </div>
            <div>
              <div
                style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}
              >
                Sign 2 Ready Offers
              </div>
              <div
                style={{ fontSize: 11.5, color: "#a855f7", fontWeight: 600 }}
              >
                ₹80L CTC · Immediate
              </div>
            </div>
          </div>

          <div
            onClick={() => setPostJobOpen(true)}
            style={{
              padding: "14px 18px",
              borderRadius: 16,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transition:
                "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.borderColor = "#6366f1"
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(99, 102, 241, 0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.borderColor = "var(--border)"
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)"
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                display: "grid",
                placeItems: "center",
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              <Plus size={18} />
            </div>
            <div>
              <div
                style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}
              >
                Post Requisition
              </div>
              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
                Instant AI Sourcing
              </div>
            </div>
          </div>
        </div>

        {/* 4. GOOGLE-STYLE CIRCULAR SHORTCUT TILES (Vibrant Modern Icons) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(78px, 1fr))",
            gap: "22px 16px",
            width: "100%",
            marginBottom: 36,
            padding: "0 4px",
          }}
        >
          {shortcuts.map((sc, i) => {
            const Icon = sc.icon
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (sc.action) sc.action()
                  else if (sc.to) navigate(sc.to)
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    background: sc.gradient,
                    boxShadow: `0 8px 20px -3px ${sc.shadow}`,
                    display: "grid",
                    placeItems: "center",
                    transition:
                      "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.05)"
                    e.currentTarget.style.boxShadow = `0 14px 28px -2px ${sc.shadow}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)"
                    e.currentTarget.style.boxShadow = `0 8px 20px -3px ${sc.shadow}`
                  }}
                >
                  <Icon size={24} style={{ color: "#ffffff" }} />
                  {sc.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: -2,
                        right: -2,
                        background: "#ef4444",
                        color: "#ffffff",
                        borderRadius: 9999,
                        width: 20,
                        height: 20,
                        fontSize: 11,
                        fontWeight: 800,
                        display: "grid",
                        placeItems: "center",
                        border: "2px solid var(--surface)",
                        boxShadow: "0 2px 6px rgba(239, 68, 68, 0.5)",
                      }}
                    >
                      {sc.badge}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "var(--ink)",
                    textAlign: "center",
                    lineHeight: 1.25,
                  }}
                >
                  {sc.label}
                </span>
                <small
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    marginTop: -4,
                    fontWeight: 500,
                  }}
                >
                  {sc.count}
                </small>
              </button>
            )
          })}
        </div>

        {/* 5. VIEW TOGGLE PILL (Today's Focus / Active Roles / Top Matches) */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            background: "var(--surface)",
            padding: "5px 6px",
            borderRadius: 9999,
            border: "1px solid var(--border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          {[
            { id: "focus", label: "Today's Focus", icon: Zap },
            {
              id: "jobs",
              label: `Active Roles (${openJobsList.length})`,
              icon: BriefcaseBusiness,
            },
            { id: "matches", label: "Top Talent Matches", icon: Sparkles },
          ].map((tab) => {
            const isActive = activeView === tab.id
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveView(tab.id as any)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "9px 22px",
                  borderRadius: 9999,
                  border: "none",
                  fontSize: 13.5,
                  fontWeight: isActive ? 700 : 500,
                  background: isActive
                    ? "linear-gradient(135deg, #a855f7, #6366f1)"
                    : "transparent",
                  color: isActive ? "#ffffff" : "var(--muted)",
                  boxShadow: isActive
                    ? "0 4px 14px rgba(168, 85, 247, 0.35)"
                    : "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <TabIcon
                  size={14}
                  style={{ color: isActive ? "#ffffff" : "var(--muted)" }}
                />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* 6. NEAT CONTENT SECTIONS */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* VIEW 1: TODAY'S FOCUS */}
          {activeView === "focus" && (
            <>
              {/* Urgent Sign-offs Card */}
              {pendingOffers.length > 0 && (
                <div
                  style={{
                    padding: "26px",
                    borderRadius: 20,
                    background: "var(--surface)",
                    border: "1px solid rgba(168, 85, 247, 0.35)",
                    boxShadow: "0 8px 30px rgba(168, 85, 247, 0.08)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: "linear-gradient(90deg, #8b5cf6, #6366f1)",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 18,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(168, 85, 247, 0.15)",
                          display: "grid",
                          placeItems: "center",
                          color: "#a855f7",
                        }}
                      >
                        <Award size={18} />
                      </div>
                      <div>
                        <strong style={{ fontSize: 16, color: "var(--ink)" }}>
                          Offers Awaiting Your Sign-off
                        </strong>
                        <div style={{ fontSize: 12, color: "var(--muted)" }}>
                          Official approval required before candidate letters
                          are dispatched
                        </div>
                      </div>
                    </div>
                    <Badge tone="purple">{pendingOffers.length} Urgent</Badge>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    {pendingOffers.map((o) => (
                      <div
                        key={o.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "16px 20px",
                          borderRadius: 14,
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          gap: 16,
                          flexWrap: "wrap",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                          }}
                        >
                          <Avatar name={o.candidate} size="md" />
                          <div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <strong
                                style={{ fontSize: 15, color: "var(--ink)" }}
                              >
                                {o.candidate}
                              </strong>
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 700,
                                  padding: "2px 8px",
                                  borderRadius: 9999,
                                  background: "rgba(16, 185, 129, 0.15)",
                                  color: "#10b981",
                                }}
                              >
                                ⭐ {o.score} / 5.0
                              </span>
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                color: "var(--muted)",
                                marginTop: 2,
                              }}
                            >
                              {o.role} · {o.dept}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: 8,
                                marginTop: 6,
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 11.5,
                                  padding: "2px 8px",
                                  borderRadius: 6,
                                  background: "var(--surface)",
                                  border: "1px solid var(--border)",
                                  color: "var(--ink)",
                                  fontWeight: 600,
                                }}
                              >
                                Base: {o.base}
                              </span>
                              <span
                                style={{
                                  fontSize: 11.5,
                                  padding: "2px 8px",
                                  borderRadius: 6,
                                  background: "var(--surface)",
                                  border: "1px solid var(--border)",
                                  color: "var(--ink)",
                                  fontWeight: 600,
                                }}
                              >
                                Total CTC:{" "}
                                <span style={{ color: "#a855f7" }}>
                                  {o.total}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          style={{
                            height: 38,
                            fontSize: 13,
                            padding: "0 20px",
                            background:
                              "linear-gradient(135deg, #a855f7, #7c3aed)",
                            boxShadow: "0 4px 14px rgba(168, 85, 247, 0.35)",
                          }}
                          onClick={() => {
                            setSelectedOffer(o)
                            setOfferModalOpen(true)
                          }}
                        >
                          Review & Sign Offer →
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Today's Scheduled Interviews Card */}
              <div
                style={{
                  padding: "26px",
                  borderRadius: 20,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "rgba(59, 130, 246, 0.15)",
                        display: "grid",
                        placeItems: "center",
                        color: "#3b82f6",
                      }}
                    >
                      <CalendarDays size={18} />
                    </div>
                    <div>
                      <strong style={{ fontSize: 16, color: "var(--ink)" }}>
                        Today's Scheduled Interviews
                      </strong>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>
                        Google Meet links auto-synced with panel scorecards
                      </div>
                    </div>
                  </div>
                  <Badge tone="blue">3 Today</Badge>
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {[
                    {
                      time: "11:00 AM",
                      candidate: "Arjun Mehta",
                      role: "Product Designer",
                      panel: "Design Lead",
                      tag: "In 35 mins",
                    },
                    {
                      time: "2:30 PM",
                      candidate: "Sneha Iyer",
                      role: "UX Designer",
                      panel: "Engineering Lead",
                      tag: "Technical Round",
                    },
                    {
                      time: "4:00 PM",
                      candidate: "Rohan Kapoor",
                      role: "Design Lead",
                      panel: "VP Product",
                      tag: "Culture & Leadership",
                    },
                  ].map((slot, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 20px",
                        borderRadius: 14,
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                        }}
                      >
                        <Avatar name={slot.candidate} size="md" />
                        <div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              color: "var(--ink)",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <span style={{ color: "#3b82f6", fontWeight: 800 }}>
                              {slot.time}
                            </span>
                            <span>{slot.candidate}</span>
                            <span
                              style={{
                                fontSize: 11,
                                padding: "2px 8px",
                                borderRadius: 9999,
                                background: "rgba(59, 130, 246, 0.12)",
                                color: "#3b82f6",
                                fontWeight: 600,
                              }}
                            >
                              {slot.tag}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: 12.5,
                              color: "var(--muted)",
                              marginTop: 3,
                            }}
                          >
                            {slot.role} · Panel: <strong>{slot.panel}</strong>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        style={{
                          height: 34,
                          fontSize: 12.5,
                          padding: "0 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                        onClick={() =>
                          showToast(
                            `Opening Google Meet room for ${slot.candidate}...`,
                          )
                        }
                      >
                        <ExternalLink size={14} /> Join Meet
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overdue Scorecards Alert */}
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 18,
                  background: "var(--surface)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(245, 158, 11, 0.15)",
                      display: "grid",
                      placeItems: "center",
                      color: "#d97706",
                    }}
                  >
                    <Clock3 size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: 14, color: "var(--ink)" }}>
                      4 Pending Interview Scorecards
                    </strong>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>
                      Nudge panel interviewers to submit feedback to unblock
                      pipeline
                    </div>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  style={{ height: 32, fontSize: 12.5 }}
                  onClick={() => setScorecardModalOpen(true)}
                >
                  Inspect & Send Nudge
                </Button>
              </div>
            </>
          )}

          {/* VIEW 2: ACTIVE ROLES LIST */}
          {activeView === "jobs" && (
            <div
              style={{
                padding: "26px",
                borderRadius: 20,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div>
                  <strong style={{ fontSize: 16, color: "var(--ink)" }}>
                    Open Requisitions ({openJobsList.length})
                  </strong>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12.5,
                      color: "var(--muted)",
                    }}
                  >
                    Live active vacancies with real-time pipeline velocity &
                    compensation bands
                  </p>
                </div>
                <Button
                  variant="primary"
                  style={{
                    height: 36,
                    fontSize: 13,
                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  }}
                  onClick={() => setPostJobOpen(true)}
                >
                  <Plus size={14} /> Add Role
                </Button>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {openJobsList.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "18px 20px",
                      borderRadius: 14,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 15,
                          color: "var(--ink)",
                        }}
                      >
                        {job.role}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: "var(--muted)",
                          marginTop: 4,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: 6,
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            fontWeight: 600,
                          }}
                        >
                          {job.dept}
                        </span>
                        <span>{job.location}</span>
                        <span style={{ color: "#6366f1", fontWeight: 700 }}>
                          {job.salary}
                        </span>
                        <span>
                          ·{" "}
                          <strong style={{ color: "var(--ink)" }}>
                            {job.apps} applicants
                          </strong>{" "}
                          ({job.pipeline} active)
                        </span>
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Badge tone={job.status}>{job.velocity}</Badge>
                      <Button
                        variant="secondary"
                        style={{
                          height: 34,
                          fontSize: 12.5,
                          padding: "0 16px",
                        }}
                        onClick={() => navigate("/employer/pipeline")}
                      >
                        Pipeline ({job.pipeline}) →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: TOP TALENT MATCHES (AI RADAR) */}
          {activeView === "matches" && (
            <div
              style={{
                padding: "26px",
                borderRadius: 20,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div>
                  <strong style={{ fontSize: 16, color: "var(--ink)" }}>
                    AI Sourcing Spotlight: Top Talent Matches
                  </strong>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12.5,
                      color: "var(--muted)",
                    }}
                  >
                    Ranked by verified skills, career history, and compensation
                    alignment across India
                  </p>
                </div>
                <Badge tone="green">4 High-Confidence Matches</Badge>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {topMatchesList.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: "20px",
                      borderRadius: 16,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                        }}
                      >
                        <Avatar name={c.name} size="lg" />
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <strong
                              style={{ fontSize: 16, color: "var(--ink)" }}
                            >
                              {c.name}
                            </strong>
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                padding: "2px 8px",
                                borderRadius: 9999,
                                background: "rgba(16, 185, 129, 0.15)",
                                color: "#10b981",
                              }}
                            >
                              {c.match}% Fit Score
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              color: "var(--muted)",
                              marginTop: 2,
                            }}
                          >
                            {c.role} · {c.city} · Currently at{" "}
                            <strong style={{ color: "var(--ink)" }}>
                              {c.currentCompany}
                            </strong>
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--muted)",
                              marginTop: 2,
                            }}
                          >
                            Experience: {c.exp} · Notice Period:{" "}
                            <strong style={{ color: "#a855f7" }}>
                              {c.notice}
                            </strong>{" "}
                            · Expected: {c.salaryExp}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Button
                          variant="secondary"
                          style={{ height: 34, fontSize: 12.5 }}
                          onClick={() =>
                            showToast(
                              `Initiating consented WhatsApp message to ${c.name}...`,
                            )
                          }
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </Button>
                        <Button
                          variant="primary"
                          style={{
                            height: 34,
                            fontSize: 12.5,
                            background:
                              "linear-gradient(135deg, #a855f7, #6366f1)",
                          }}
                          onClick={() => setPreviewCandidate(c)}
                        >
                          Inspect Fit →
                        </Button>
                      </div>
                    </div>

                    {/* Skill Pills */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {c.matchedSkills.map((sk) => (
                        <span
                          key={sk}
                          style={{
                            fontSize: 11.5,
                            padding: "3px 10px",
                            borderRadius: 9999,
                            background: "rgba(99, 102, 241, 0.1)",
                            color: "#6366f1",
                            fontWeight: 600,
                          }}
                        >
                          ✓ {sk}
                        </span>
                      ))}
                      {c.missingSkills.map((sk) => (
                        <span
                          key={sk}
                          style={{
                            fontSize: 11.5,
                            padding: "3px 10px",
                            borderRadius: 9999,
                            background: "rgba(244, 63, 94, 0.08)",
                            color: "#f43f5e",
                            fontWeight: 500,
                          }}
                        >
                          + {sk} (learnable)
                        </span>
                      ))}
                    </div>

                    {/* AI Fit Rationale */}
                    <div
                      style={{
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        fontSize: 12.5,
                        color: "var(--ink)",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Sparkles
                        size={14}
                        style={{ color: "#a855f7", flexShrink: 0 }}
                      />
                      <span>{c.fitReason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: POST A REQUISITION */}
      <Modal
        open={postJobOpen}
        onClose={() => setPostJobOpen(false)}
        title="Post a New Job"
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              width: "100%",
            }}
          >
            <Button variant="secondary" onClick={() => setPostJobOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateJob}>
              Publish Job
            </Button>
          </div>
        }
      >
        <form
          onSubmit={handleCreateJob}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Job Title *
            </label>
            <Input
              placeholder="e.g. Senior Frontend Engineer"
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              required
            />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Department
              </label>
              <Select
                value={newJobDept}
                onChange={(e) => setNewJobDept(e.target.value)}
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Sales">Sales</option>
                <option value="People">People Ops</option>
              </Select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Location
              </label>
              <Select
                value={newJobLocation}
                onChange={(e) => setNewJobLocation(e.target.value)}
              >
                <option value="Bengaluru · Hybrid">Bengaluru · Hybrid</option>
                <option value="Hyderabad · Hybrid">Hyderabad · Hybrid</option>
                <option value="Remote India">Remote India</option>
              </Select>
            </div>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Min CTC (LPA)
              </label>
              <Input
                type="number"
                value={newJobMinSalary}
                onChange={(e) => setNewJobMinSalary(e.target.value)}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Max CTC (LPA)
              </label>
              <Input
                type="number"
                value={newJobMaxSalary}
                onChange={(e) => setNewJobMaxSalary(e.target.value)}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* MODAL: OFFER APPROVAL */}
      <Modal
        open={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        title="Candidate Offer Approval"
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              width: "100%",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => setOfferModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => selectedOffer && handleApproveOffer(selectedOffer)}
            >
              <Check size={15} /> Sign & Dispatch Offer
            </Button>
          </div>
        }
      >
        {selectedOffer && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 12,
                borderRadius: 10,
                background: "var(--surface-2)",
              }}
            >
              <Avatar name={selectedOffer.candidate} size="md" />
              <div>
                <strong style={{ fontSize: 14 }}>
                  {selectedOffer.candidate}
                </strong>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {selectedOffer.role} · {selectedOffer.dept}
                </div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Badge tone="green">{selectedOffer.recommendation}</Badge>
              </div>
            </div>

            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px 12px", color: "var(--muted)" }}>
                      Base Salary
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      {selectedOffer.base}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px 12px", color: "var(--muted)" }}>
                      Performance Bonus
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      {selectedOffer.bonus}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px 12px", color: "var(--muted)" }}>
                      ESOPs (4 Years)
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      {selectedOffer.equity}
                    </td>
                  </tr>
                  <tr style={{ background: "var(--surface-2)" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 700 }}>
                      Total Annualized CTC
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        textAlign: "right",
                        fontWeight: 800,
                        color: "var(--primary)",
                      }}
                    >
                      {selectedOffer.total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL: PENDING SCORECARDS */}
      <Modal
        open={scorecardModalOpen}
        onClose={() => setScorecardModalOpen(false)}
        title="Pending Interview Scorecards"
        footer={
          <Button
            variant="primary"
            onClick={() => {
              showToast("Slack reminder dispatched to 4 panel interviewers!")
              setScorecardModalOpen(false)
            }}
          >
            Send Team Reminder
          </Button>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {overdueScorecards.map((sc) => (
            <div
              key={sc.id}
              style={{
                padding: 10,
                borderRadius: 8,
                background: "var(--surface-2)",
                fontSize: 12.5,
              }}
            >
              <div style={{ fontWeight: 700 }}>
                {sc.candidate} ({sc.role})
              </div>
              <div style={{ color: "var(--muted)", marginTop: 2 }}>
                Panelist: {sc.interviewer} · {sc.round}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* MODAL: AI BRIEFING */}
      <Modal
        open={aiBriefOpen}
        onClose={() => setAiBriefOpen(false)}
        title="Nexora Talent AI Brief"
        footer={
          <Button variant="primary" onClick={() => setAiBriefOpen(false)}>
            Close
          </Button>
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          <p style={{ margin: 0 }}>
            ✨ <strong>Hiring Pulse:</strong> Sourcing volume is up +18% MoM. 2
            candidate offers are pending sign-off with 98% predicted acceptance
            rate.
          </p>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            ⚡ <strong>Bottleneck Notice:</strong> Technical evaluations are
            averaging 6.4 days turnaround. Consider using asynchronous coding
            screen to shorten cycle to 2 days.
          </p>
        </div>
      </Modal>

      {/* MODAL: INVITE MEMBER */}
      <Modal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite Teammate"
        footer={
          <Button
            variant="primary"
            onClick={() => {
              if (!inviteEmail) {
                showToast("Please enter an email")
                return
              }
              showToast(`Invitation sent to ${inviteEmail}!`)
              setInviteModalOpen(false)
            }}
          >
            Send Invite
          </Button>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Work Email
            </label>
            <Input
              type="email"
              placeholder="name@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Role
            </label>
            <Select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
            >
              <option value="Hiring Manager">Hiring Manager</option>
              <option value="Panel Interviewer">Panel Interviewer</option>
              <option value="Recruiter">Recruiter</option>
            </Select>
          </div>
        </div>
      </Modal>

      {/* MODAL: CANDIDATE FIT EVIDENCE */}
      <Modal
        open={!!previewCandidate}
        onClose={() => setPreviewCandidate(null)}
        title={
          previewCandidate
            ? `Fit Evidence: ${previewCandidate.name}`
            : "Candidate Details"
        }
        footer={
          <Button
            variant="primary"
            onClick={() => {
              showToast(`Scheduled interview with ${previewCandidate?.name}!`)
              setPreviewCandidate(null)
            }}
          >
            Schedule Interview
          </Button>
        }
      >
        {previewCandidate && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name={previewCandidate.name} size="md" />
              <div>
                <strong>{previewCandidate.name}</strong> ·{" "}
                {previewCandidate.role}
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {previewCandidate.city} · {previewCandidate.currentCompany}
                </div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Badge tone="green">{previewCandidate.match}% Match</Badge>
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "var(--muted)",
                lineHeight: 1.5,
              }}
            >
              {previewCandidate.fitReason}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {previewCandidate.matchedSkills.map((s: string) => (
                <Badge key={s} tone="green">
                  ✓ {s}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* TOAST CONTAINER */}
      {toast && (
        <div className="toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ minHeight: "auto", padding: "2px 6px" }}
            onClick={() => setToast("")}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  )
}

export function JobsPage() {
  const [query, setQuery] = useState("")
  const [toast, setToast] = useState("")
  const navigate = useNavigate()
  const shown = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <>
      <PageHeader
        eyebrow="Recruitment"
        title="Jobs"
        description="Create, publish, and track every open role."
        actions={
          <Button onClick={() => navigate("/employer/jobs/new")}>
            <Plus size={16} /> Create job
          </Button>
        }
      />
      <Card className="table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs…"
            />
          </div>
          <div>
            <Button variant="secondary">
              <Filter size={16} /> Filters
            </Button>
            <Button variant="secondary">
              All statuses <ChevronRight size={15} />
            </Button>
          </div>
        </div>
        <div className="tabs-row">
          <Button variant="ghost" className="tab-active">
            All jobs <Badge>28</Badge>
          </Button>
          <Button variant="ghost">
            Active <Badge tone="green">24</Badge>
          </Button>
          <Button variant="ghost">
            Drafts <Badge>3</Badge>
          </Button>
          <Button variant="ghost">
            Closed <Badge>48</Badge>
          </Button>
        </div>
        <div className="data-table jobs-table">
          <div className="table-row table-head-row">
            <span>Role</span>
            <span>Candidates</span>
            <span>Pipeline</span>
            <span>Status</span>
            <span>Published</span>
            <span />
          </div>
          {shown.map((job) => (
            <div
              className="table-row"
              key={job.title}
              onClick={() => setToast(`Opened ${job.title}`)}
            >
              <div className="job-title-cell">
                <span className="job-icon">
                  <BriefcaseBusiness />
                </span>
                <span>
                  <strong>{job.title}</strong>
                  <small>
                    {job.department} · {job.location}
                  </small>
                </span>
              </div>
              <span>
                <strong>{job.applicants}</strong> applicants
              </span>
              <span>{job.shortlisted} shortlisted</span>
              <span>
                <Badge tone={job.status === "Active" ? "green" : "neutral"}>
                  {job.status}
                </Badge>
              </span>
              <span>{job.age} ago</span>
              <Button variant="ghost">
                <MoreHorizontal />
              </Button>
            </div>
          ))}
        </div>
        <div className="table-footer">
          <span>Showing {shown.length} of 28 jobs</span>
          <div>
            <Button variant="secondary">
              <ChevronLeft size={15} />
            </Button>
            <Button variant="secondary">1</Button>
            <Button variant="secondary">2</Button>
            <Button variant="secondary">
              <ChevronRight size={15} />
            </Button>
          </div>
        </div>
      </Card>
      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>
            <X />
          </Button>
        </div>
      )}
    </>
  )
}

export function CreateJobPage() {
  const [step, setStep] = useState(1)
  const [assistant, setAssistant] = useState(false)
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <div className="back-row">
        <Button variant="ghost" onClick={() => navigate("/employer/jobs")}>
          <ArrowLeft size={16} /> Back to jobs
        </Button>
        <span>Draft saved just now</span>
      </div>
      <PageHeader
        eyebrow="New requisition"
        title="Create a new job"
        description="Define the role, requirements, and hiring workflow."
        actions={
          <Button variant="secondary" onClick={() => setSaved(true)}>
            Save draft
          </Button>
        }
      />
      <div className="stepper">
        {["Job details", "Requirements", "Screening", "Workflow", "Review"].map(
          (label, i) => (
            <div className={step >= i + 1 ? "step active" : "step"} key={label}>
              <span>{step > i + 1 ? <Check size={14} /> : i + 1}</span>
              <strong>{label}</strong>
            </div>
          ),
        )}
      </div>
      <div className="form-layout">
        <Card className="job-form-card">
          <div className="section-title">
            <span>01</span>
            <div>
              <h2>Role details</h2>
              <p>Start with the basics candidates need to understand.</p>
            </div>
          </div>
          <div className="form-grid">
            <label className="span-2">
              Job title
              <Input defaultValue="Senior Product Designer" />
            </label>
            <label>
              Department
              <Select defaultValue="design">
                <option value="design">Product & Design</option>
                <option>Engineering</option>
              </Select>
            </label>
            <label>
              Employment type
              <Select>
                <option>Full-time</option>
                <option>Contract</option>
              </Select>
            </label>
            <label>
              Workplace type
              <Select>
                <option>Hybrid</option>
                <option>Remote</option>
                <option>On-site</option>
              </Select>
            </label>
            <label>
              Primary location
              <Input defaultValue="Bengaluru, Karnataka" />
            </label>
            <label>
              Minimum salary
              <Input defaultValue="₹28,00,000" />
            </label>
            <label>
              Maximum salary
              <Input defaultValue="₹36,00,000" />
            </label>
            <label className="span-2">
              Job description
              <div className="editor-toolbar">
                <Button variant="ghost">
                  <b>B</b>
                </Button>
                <Button variant="ghost">
                  <i>I</i>
                </Button>
                <Button variant="ghost">
                  <ListFilter />
                </Button>
                <Button variant="ghost" onClick={() => setAssistant(true)}>
                  <WandSparkles /> Improve with AI
                </Button>
              </div>
              <textarea
                className="textarea"
                defaultValue={
                  "As a Senior Product Designer, you will shape end-to-end experiences for our enterprise platform. You will partner closely with product and engineering to turn complex hiring workflows into clear, intuitive products.\\n\\nWhat you’ll do\\n• Lead discovery and design for high-impact product areas\\n• Evolve our design system and raise product quality\\n• Mentor designers and champion customer insight"
                }
              />
            </label>
          </div>
          <div className="form-actions">
            <Button
              variant="secondary"
              onClick={() => navigate("/employer/jobs")}
            >
              Cancel
            </Button>
            <Button onClick={() => setStep(Math.min(step + 1, 5))}>
              Continue to requirements <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
        <aside className="form-aside">
          <Card className="quality-card">
            <div className="quality-score">
              <span>86</span>
              <div>
                <strong>Strong job brief</strong>
                <small>Quality score</small>
              </div>
            </div>
            <Progress value={86} tone="green" />
            <ul>
              <li>
                <Check /> Clear role outcomes
              </li>
              <li>
                <Check /> Inclusive language
              </li>
              <li>
                <CircleAlert /> Add success measures
              </li>
            </ul>
          </Card>
          <Card>
            <h3>Hiring team</h3>
            <div className="mini-person">
              <Avatar name="Neha Kapoor" size="sm" />
              <span>
                <strong>Neha Kapoor</strong>
                <small>Recruiter</small>
              </span>
            </div>
            <Button variant="ghost">
              <Plus size={15} /> Add hiring manager
            </Button>
          </Card>
        </aside>
      </div>
      <Modal
        open={assistant}
        onClose={() => setAssistant(false)}
        title="AI job description assistant"
        footer={
          <>
            <Button variant="secondary" onClick={() => setAssistant(false)}>
              Keep original
            </Button>
            <Button onClick={() => setAssistant(false)}>
              <Sparkles size={15} /> Apply suggestions
            </Button>
          </>
        }
      >
        <div className="ai-callout">
          <Sparkles />
          <div>
            <strong>3 suggestions ready</strong>
            <p>
              These suggestions improve clarity and inclusivity. You remain in
              control of every change.
            </p>
          </div>
        </div>
        <div className="suggestion-list">
          <div>
            <Badge tone="purple">Clarity</Badge>
            <p>Add measurable 90-day outcomes for the role.</p>
          </div>
          <div>
            <Badge tone="blue">Inclusivity</Badge>
            <p>
              Replace “rockstar” language with specific collaboration
              expectations.
            </p>
          </div>
          <div>
            <Badge tone="green">Market insight</Badge>
            <p>The salary range is competitive for Bengaluru at this level.</p>
          </div>
        </div>
      </Modal>
      <Modal open={saved} onClose={() => setSaved(false)} title="Draft saved">
        <p>
          Your job draft is safe. You can return and continue editing anytime.
        </p>
      </Modal>
    </>
  )
}

export function CandidatesPage() {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState(false)
  const navigate = useNavigate()
  const shown = candidates.filter((c) =>
    `${c.name} ${c.role} ${c.skills.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )
  return (
    <>
      <PageHeader
        eyebrow="Talent CRM"
        title="Candidates"
        description="Search, review, and nurture your entire talent network."
        actions={
          <>
            <Button variant="secondary">
              <Upload size={16} /> Bulk upload
            </Button>
            <Button>
              <Plus size={16} /> Add candidate
            </Button>
          </>
        }
      />
      <Card className="table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, title, skill…"
            />
          </div>
          <div>
            <Button
              variant={filters ? "primary" : "secondary"}
              onClick={() => setFilters(!filters)}
            >
              <SlidersHorizontal size={16} /> Advanced filters
            </Button>
            <Button variant="secondary">Sort: Best match</Button>
          </div>
        </div>
        {filters && (
          <div className="filter-strip">
            <Select>
              <option>All locations</option>
              <option>Bengaluru</option>
              <option>Mumbai</option>
            </Select>
            <Select>
              <option>Any experience</option>
              <option>5–8 years</option>
            </Select>
            <Select>
              <option>All stages</option>
              <option>Shortlisted</option>
            </Select>
            <Button variant="ghost">Clear all</Button>
          </div>
        )}
        <div className="candidate-table">
          {shown.map((c) => (
            <div
              className="candidate-row"
              key={c.id}
              onClick={() => navigate(`/employer/candidates/${c.id}`)}
            >
              <Input
                aria-label={`Select ${c.name}`}
                type="checkbox"
                onClick={(e) => e.stopPropagation()}
              />
              <Avatar name={c.name} />
              <div className="candidate-main">
                <strong>{c.name}</strong>
                <span>{c.role}</span>
                <small>
                  <MapPin /> {c.city} · {c.exp}
                </small>
              </div>
              <div className="skill-cell">
                {c.skills.slice(0, 2).map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
                <Badge>+{c.skills.length - 2}</Badge>
              </div>
              <div>
                <span className="match-score">{c.match}%</span>
                <small>role match</small>
              </div>
              <Badge
                tone={
                  c.stage === "Interview"
                    ? "purple"
                    : c.stage === "Shortlisted"
                      ? "green"
                      : "blue"
                }
              >
                {c.stage}
              </Badge>
              <Button variant="ghost">
                <MoreHorizontal />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}

export function CandidateProfilePage() {
  const { id } = useParams()
  const c = candidates.find((item) => item.id === id) || candidates[0]
  const navigate = useNavigate()
  return (
    <>
      <div className="back-row">
        <Button
          variant="ghost"
          onClick={() => navigate("/employer/candidates")}
        >
          <ArrowLeft /> Back to candidates
        </Button>
        <span>Profile updated 2 hours ago</span>
      </div>
      <Card className="profile-hero">
        <Avatar name={c.name} size="lg" />
        <div className="profile-info">
          <div>
            <h1>{c.name}</h1>
            <Badge tone="green">Open to opportunities</Badge>
          </div>
          <p>
            {c.role} · {c.exp}
          </p>
          <span>
            <MapPin /> {c.city}
            <Mail /> priya.sharma@email.com
          </span>
        </div>
        <div className="profile-actions">
          <Button variant="secondary">
            <MessageCircle /> Message
          </Button>
          <Button>
            <UserCheck /> Shortlist
          </Button>
          <Button variant="ghost">
            <MoreHorizontal />
          </Button>
        </div>
      </Card>
      <div className="profile-grid">
        <div className="profile-content">
          <Card>
            <div className="card-head">
              <h2>Professional overview</h2>
              <Button variant="ghost">Edit</Button>
            </div>
            <p>
              Product designer with 7 years of experience crafting B2B SaaS
              products. Strong track record simplifying complex enterprise
              workflows and scaling design systems across product teams.
            </p>
            <h3>Core skills</h3>
            <div className="skill-cloud">
              {[
                ...c.skills,
                "Product Strategy",
                "Prototyping",
                "Facilitation",
                "B2B SaaS",
              ].map((s) => (
                <Badge key={s} tone="blue">
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
          <Card>
            <h2>Experience</h2>
            <div className="timeline">
              <div>
                <i />
                <span>
                  <strong>Lead Product Designer</strong>
                  <b>Razorpay · Bengaluru</b>
                  <small>Apr 2022 – Present · 3 yrs 2 mos</small>
                  <p>
                    Led design for merchant onboarding, improving activation by
                    24%. Built and governed a multi-product design system.
                  </p>
                </span>
              </div>
              <div>
                <i />
                <span>
                  <strong>Senior UX Designer</strong>
                  <b>Freshworks · Chennai</b>
                  <small>Jul 2019 – Mar 2022 · 2 yrs 9 mos</small>
                </span>
              </div>
            </div>
          </Card>
          <Card>
            <h2>Activity timeline</h2>
            <div className="plain-timeline">
              <p>
                <CheckCircle2 /> Shortlisted for Senior Product Designer{" "}
                <small>Today, 10:42 AM</small>
              </p>
              <p>
                <FileText /> Resume information extracted{" "}
                <small>Yesterday, 4:18 PM</small>
              </p>
              <p>
                <MessageCircle /> Replied to outreach message{" "}
                <small>10 June, 2:20 PM</small>
              </p>
            </div>
          </Card>
        </div>
        <aside className="profile-side">
          <Card className="match-summary">
            <span className="eyebrow">AI-assisted match</span>
            <div className="big-score">
              {c.match}
              <small>%</small>
            </div>
            <strong>Strong potential fit</strong>
            <p>
              Based on role requirements and profile evidence. Review context
              before deciding.
            </p>
            <Button
              variant="secondary"
              onClick={() => navigate("/employer/matching")}
            >
              View match explanation
            </Button>
          </Card>
          <Card>
            <h3>Candidate details</h3>
            <dl>
              <div>
                <dt>Notice period</dt>
                <dd>{c.notice}</dd>
              </div>
              <div>
                <dt>Current CTC</dt>
                <dd>₹24L</dd>
              </div>
              <div>
                <dt>Expected CTC</dt>
                <dd>₹32L</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>{c.source}</dd>
              </div>
            </dl>
          </Card>
          <Card className="resume-card">
            <div>
              <FileText />
              <span>
                <strong>Priya_Sharma_Resume.pdf</strong>
                <small>PDF · 1.8 MB</small>
              </span>
            </div>
            <Button variant="secondary">Preview resume</Button>
          </Card>
        </aside>
      </div>
    </>
  )
}

export function MatchingPage() {
  const [selected, setSelected] = useState(candidates[0])
  return (
    <>
      <PageHeader
        eyebrow="Talent intelligence"
        title="AI candidate matching"
        description="Review explainable recommendations for Senior Product Designer."
        actions={
          <Button variant="secondary">
            <SlidersHorizontal /> Matching preferences
          </Button>
        }
      />
      <div className="responsible-note">
        <Sparkles />
        <div>
          <strong>AI assists, your team decides</strong>
          <p>
            Recommendations surface relevant evidence and should not replace
            structured human review.
          </p>
        </div>
        <Button variant="ghost">Learn about responsible AI</Button>
      </div>
      <div className="matching-layout">
        <Card className="recommendations">
          <div className="card-head">
            <div>
              <h2>Recommended candidates</h2>
              <p>38 profiles evaluated · Updated 12 min ago</p>
            </div>
            <Select>
              <option>Best match</option>
              <option>Recently active</option>
            </Select>
          </div>
          {candidates.map((c, i) => (
            <button
              className={`recommendation-item ${
                selected.id === c.id ? "selected" : ""
              }`}
              onClick={() => setSelected(c)}
              key={c.id}
            >
              <span className="rank">#{i + 1}</span>
              <Avatar name={c.name} />
              <span>
                <strong>{c.name}</strong>
                <small>
                  {c.role} · {c.city}
                </small>
                <span>
                  {c.skills.slice(0, 2).map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </span>
              </span>
              <b>{c.match}%</b>
              <ChevronRight />
            </button>
          ))}
        </Card>
        <Card className="match-detail">
          <div className="match-person">
            <Avatar name={selected.name} size="lg" />
            <div>
              <span className="eyebrow">Recommendation details</span>
              <h2>{selected.name}</h2>
              <p>
                {selected.role} · {selected.exp} · {selected.city}
              </p>
            </div>
            <div className="score-ring">
              <strong>{selected.match}%</strong>
              <small>overall match</small>
            </div>
          </div>
          <div className="compat-grid">
            {[
              ["Skills", 96, "green"],
              ["Experience", 90, "blue"],
              ["Education", 82, "purple"],
              ["Location", 100, "green"],
            ].map(([l, v, t]) => (
              <div key={String(l)}>
                <span>
                  <strong>{l}</strong>
                  <b>{v}%</b>
                </span>
                <Progress
                  value={Number(v)}
                  tone={t as "green" | "blue" | "purple"}
                />
              </div>
            ))}
          </div>
          <div className="explanation">
            <h3>Why this candidate stands out</h3>
            <p>
              Priya has led end-to-end design for complex B2B SaaS products and
              has direct evidence of scaling a design system—both high-priority
              outcomes for this role.
            </p>
            <div className="evidence-grid">
              <div>
                <Badge tone="green">
                  <Check /> Strong evidence
                </Badge>
                <strong>Enterprise design systems</strong>
                <p>
                  “Built and governed a multi-product design system used by 12
                  squads.”
                </p>
                <small>Razorpay · Work experience</small>
              </div>
              <div>
                <Badge tone="green">
                  <Check /> Strong evidence
                </Badge>
                <strong>Product strategy</strong>
                <p>
                  Led discovery and design for merchant onboarding, improving
                  activation by 24%.
                </p>
                <small>Razorpay · Work experience</small>
              </div>
              <div>
                <Badge tone="amber">
                  <CircleAlert /> Partial evidence
                </Badge>
                <strong>People leadership</strong>
                <p>
                  Mentoring experience found; direct team management is not
                  explicit.
                </p>
                <small>Resume · Professional summary</small>
              </div>
              <div>
                <Badge tone="red">
                  <X /> Missing skill
                </Badge>
                <strong>Fintech compliance</strong>
                <p>
                  No explicit evidence of regulatory or compliance design work.
                </p>
                <small>Needs human verification</small>
              </div>
            </div>
          </div>
          <div className="review-actions">
            <Button variant="secondary">Not a fit</Button>
            <Button variant="secondary">Save for later</Button>
            <Button>
              <UserCheck /> Move to shortlist
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

const initialColumns = [
  { name: "New Applications", items: [candidates[4], candidates[2]] },
  { name: "Screening", items: [candidates[3]] },
  { name: "Shortlisted", items: [candidates[0]] },
  { name: "Interview", items: [candidates[1]] },
  { name: "Offer", items: [] },
]
export function PipelinePage() {
  const [columns, setColumns] = useState(initialColumns)
  const [drawer, setDrawer] = useState<typeof candidates[0] | null>(null)
  const move = (candidate: typeof candidates[0], from: number, to: number) =>
    setColumns((cols) =>
      cols.map((col, i) =>
        i === from
          ? { ...col, items: col.items.filter((x) => x.id !== candidate.id) }
          : i === to
            ? { ...col, items: [...col.items, candidate] }
            : col,
      ),
    )
  return (
    <>
      <PageHeader
        eyebrow="Applicant tracking"
        title="Senior Product Designer"
        description="128 candidates · Bengaluru · Updated just now"
        actions={
          <>
            <Button variant="secondary">
              <ListFilter /> Filter
            </Button>
            <Button>
              <Plus /> Add candidate
            </Button>
          </>
        }
      />
      <div className="pipeline-top">
        <div>
          {["All candidates", "My candidates", "Needs review"].map((t, i) => (
            <Button
              key={t}
              variant="ghost"
              className={i === 0 ? "tab-active" : ""}
            >
              {t}
            </Button>
          ))}
        </div>
        <span>
          <span className="color-dot green" /> Pipeline health:{" "}
          <strong>On track</strong>
        </span>
      </div>
      <div className="kanban">
        {columns.map((col, ci) => (
          <section
            className="kanban-column"
            key={col.name}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const [id, from] = e.dataTransfer.getData("text/plain").split("|")
              const c = candidates.find((x) => x.id === id)
              if (c) move(c, Number(from), ci)
            }}
          >
            <div className="kanban-head">
              <span>
                <i className={`stage-dot s${ci}`} />
                <strong>{col.name}</strong>
                <b>{col.items.length}</b>
              </span>
              <Button variant="ghost">
                <MoreHorizontal />
              </Button>
            </div>
            <div className="kanban-stack">
              {col.items.map((c) => (
                <article
                  className="kanban-card"
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", `${c.id}|${ci}`)
                  }
                  onClick={() => setDrawer(c)}
                  key={c.id}
                >
                  <div className="drag-row">
                    <GripVertical />
                    <Badge tone={c.match > 90 ? "green" : "blue"}>
                      {c.match}% match
                    </Badge>
                    <Button variant="ghost">
                      <MoreHorizontal />
                    </Button>
                  </div>
                  <div className="candidate-mini">
                    <Avatar name={c.name} />
                    <span>
                      <strong>{c.name}</strong>
                      <small>{c.role}</small>
                    </span>
                  </div>
                  <div className="card-tags">
                    {c.skills.slice(0, 2).map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                  <div className="kanban-foot">
                    <span>
                      <Clock3 /> {c.notice}
                    </span>
                    <span>
                      <MessageCircle /> {ci + 1}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <Button variant="ghost" className="add-stage">
              <Plus /> Add candidate
            </Button>
          </section>
        ))}
      </div>
      {drawer && (
        <div className="drawer-backdrop" onClick={() => setDrawer(null)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <h2>Candidate quick view</h2>
              <Button variant="ghost" onClick={() => setDrawer(null)}>
                <X />
              </Button>
            </div>
            <div className="drawer-profile">
              <Avatar name={drawer.name} size="lg" />
              <h2>{drawer.name}</h2>
              <p>
                {drawer.role} · {drawer.city}
              </p>
              <Badge tone="green">{drawer.match}% match</Badge>
            </div>
            <div className="drawer-section">
              <h3>Snapshot</h3>
              <dl>
                <div>
                  <dt>Experience</dt>
                  <dd>{drawer.exp}</dd>
                </div>
                <div>
                  <dt>Notice period</dt>
                  <dd>{drawer.notice}</dd>
                </div>
                <div>
                  <dt>Current stage</dt>
                  <dd>{drawer.stage}</dd>
                </div>
              </dl>
            </div>
            <div className="drawer-section">
              <h3>Internal note</h3>
              <textarea
                className="textarea"
                placeholder="Add a note for your team…"
              />
              <Button>Save note</Button>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

const chats = [
  ["Priya Sharma", "Thanks, Neha. Tuesday at 11 works for me.", "2m", "PS"],
  ["Arjun Mehta", "I’ve completed the assessment.", "1h", "AM"],
  ["Sneha Iyer", "Could we move the call to Thursday?", "3h", "SI"],
  ["Rohan Kapoor", "Looking forward to speaking with the team.", "1d", "RK"],
]
export function CommunicationPage() {
  const [active, setActive] = useState(0)
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState<string[]>([])
  return (
    <>
      <PageHeader
        eyebrow="Candidate engagement"
        title="Communication center"
        description="Manage consented WhatsApp and email conversations in one place."
      />
      <Card className="chat-shell">
        <aside className="chat-list">
          <div className="chat-search">
            <Search />
            <Input placeholder="Search conversations…" />
          </div>
          <div className="chat-tabs">
            <Button variant="ghost" className="tab-active">
              All
            </Button>
            <Button variant="ghost">Unread</Button>
            <Button variant="ghost">Automated</Button>
          </div>
          {chats.map((c, i) => (
            <button
              className={`chat-item ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              key={c[0]}
            >
              <Avatar name={c[0]} />
              <span>
                <strong>
                  {c[0]}
                  <small>{c[2]}</small>
                </strong>
                <b>Senior Product Designer</b>
                <p>{c[1]}</p>
              </span>
              {i === 0 && <i />}
            </button>
          ))}
        </aside>
        <section className="conversation">
          <header>
            <Avatar name={chats[active][0]} />
            <div>
              <strong>{chats[active][0]}</strong>
              <span>
                <span className="color-dot green" /> Online ·{" "}
                <Badge tone="green">WhatsApp consented</Badge>
              </span>
            </div>
            <div>
              <Button variant="secondary">
                <UserCheck /> View candidate
              </Button>
              <Button variant="ghost">
                <MoreHorizontal />
              </Button>
            </div>
          </header>
          <div className="messages">
            <span className="date-pill">Today</span>
            <div className="message outbound">
              <p>
                Hi {chats[active][0].split(" ")[0]}, your profile looks relevant
                for our Senior Product Designer role at Nexora Labs. Would you
                be open to a short conversation?
              </p>
              <small>10:24 AM · Delivered</small>
            </div>
            <div className="message inbound">
              <p>
                Hi Neha, thank you for reaching out. Yes, I’d be happy to learn
                more about the role.
              </p>
              <small>10:31 AM</small>
            </div>
            <div className="message outbound">
              <p>
                Great. I have Tuesday at 11:00 AM or Wednesday at 3:30 PM
                available. Which works better?
              </p>
              <small>10:34 AM · Read</small>
            </div>
            <div className="message inbound">
              <p>{chats[active][1]}</p>
              <small>10:36 AM</small>
            </div>
            {sent.map((m, i) => (
              <div className="message outbound" key={i}>
                <p>{m}</p>
                <small>Just now · Sent</small>
              </div>
            ))}
          </div>
          <footer>
            <div>
              <Button variant="ghost">
                <Plus />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message) {
                    setSent([...sent, message])
                    setMessage("")
                  }
                }}
                placeholder="Write a message…"
              />
              <Button
                onClick={() => {
                  if (message) {
                    setSent([...sent, message])
                    setMessage("")
                  }
                }}
              >
                <Send />
              </Button>
            </div>
            <small>
              Messages are sent only through consented channels.{" "}
              <Button variant="ghost">Use template</Button>
            </small>
          </footer>
        </section>
        <aside className="chat-context">
          <h3>Conversation details</h3>
          <div className="channel-card">
            <MessageCircle />
            <span>
              <strong>WhatsApp</strong>
              <small>Preferred channel</small>
            </span>
            <Badge tone="green">Consented</Badge>
          </div>
          <h3>Automation</h3>
          <div className="automation-card">
            <span>
              <Sparkles /> Interview scheduling
            </span>
            <p>Human takeover is active. Automated replies are paused.</p>
            <Button variant="secondary">Resume automation</Button>
          </div>
          <h3>Candidate context</h3>
          <dl>
            <div>
              <dt>Role</dt>
              <dd>Senior Product Designer</dd>
            </div>
            <div>
              <dt>Stage</dt>
              <dd>Shortlisted</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>Neha Kapoor</dd>
            </div>
          </dl>
        </aside>
      </Card>
    </>
  )
}

const days = Array.from({ length: 30 }, (_, i) => i + 1)
export function InterviewsPage() {
  const [month, setMonth] = useState(0)
  const [schedule, setSchedule] = useState(false)
  return (
    <>
      <PageHeader
        eyebrow="Interview operations"
        title="Interview calendar"
        description="Coordinate interviews, panels, and feedback."
        actions={
          <Button onClick={() => setSchedule(true)}>
            <Plus /> Schedule interview
          </Button>
        }
      />
      <div className="calendar-layout">
        <Card className="calendar-card">
          <div className="calendar-toolbar">
            <div>
              <Button variant="secondary" onClick={() => setMonth(month - 1)}>
                <ChevronLeft />
              </Button>
              <h2>
                {month === 0
                  ? "June 2025"
                  : month > 0
                    ? "July 2025"
                    : "May 2025"}
              </h2>
              <Button variant="secondary" onClick={() => setMonth(month + 1)}>
                <ChevronRight />
              </Button>
              <Button variant="ghost" onClick={() => setMonth(0)}>
                Today
              </Button>
            </div>
            <div>
              <Button variant="ghost" className="tab-active">
                Month
              </Button>
              <Button variant="ghost">Week</Button>
              <Button variant="ghost">Day</Button>
            </div>
          </div>
          <div className="calendar-grid">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <strong className="day-name" key={d}>
                {d}
              </strong>
            ))}
            {days.map((day) => (
              <div
                className={`calendar-day ${day === 12 ? "today" : ""}`}
                key={day}
              >
                <span>{day}</span>
                {day === 12 && (
                  <>
                    <button className="event blue">10:00 · Priya Sharma</button>
                    <button className="event purple">
                      14:30 · Arjun Mehta
                    </button>
                  </>
                )}
                {day === 16 && (
                  <button className="event green">11:00 · Sneha Iyer</button>
                )}
                {day === 19 && (
                  <button className="event amber">
                    15:00 · Panel interview
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>
        <aside className="interview-aside">
          <Card>
            <div className="card-head">
              <div>
                <h2>Today</h2>
                <p>Thursday, 12 June</p>
              </div>
              <Badge tone="blue">2 interviews</Badge>
            </div>
            <div className="agenda-item">
              <span>10:00</span>
              <i />
              <div>
                <strong>Priya Sharma</strong>
                <p>Portfolio review · 60 min</p>
                <small>
                  <Avatar name="Neha Kapoor" size="sm" /> Neha + 2 interviewers
                </small>
              </div>
            </div>
            <div className="agenda-item">
              <span>14:30</span>
              <i className="purple" />
              <div>
                <strong>Arjun Mehta</strong>
                <p>Hiring manager round · 45 min</p>
                <small>
                  <Avatar name="Vikram S" size="sm" /> Vikram Singh
                </small>
              </div>
            </div>
          </Card>
          <Card className="feedback-card">
            <CircleAlert />
            <div>
              <strong>3 feedback forms overdue</strong>
              <p>Pending scorecards can slow hiring decisions.</p>
              <Button variant="ghost">
                Review scorecards <ArrowRight />
              </Button>
            </div>
          </Card>
        </aside>
      </div>
      <Modal
        open={schedule}
        onClose={() => setSchedule(false)}
        title="Schedule interview"
        footer={
          <>
            <Button variant="secondary" onClick={() => setSchedule(false)}>
              Cancel
            </Button>
            <Button onClick={() => setSchedule(false)}>Send invitation</Button>
          </>
        }
      >
        <div className="form-grid">
          <label>
            Candidate
            <Select>
              <option>Priya Sharma</option>
              <option>Arjun Mehta</option>
            </Select>
          </label>
          <label>
            Interview type
            <Select>
              <option>Portfolio review</option>
              <option>Hiring manager round</option>
            </Select>
          </label>
          <label>
            Date
            <Input type="date" defaultValue="2025-06-16" />
          </label>
          <label>
            Time
            <Input type="time" defaultValue="11:00" />
          </label>
          <label className="span-2">
            Interviewers
            <Input defaultValue="Neha Kapoor, Vikram Singh" />
          </label>
        </div>
      </Modal>
    </>
  )
}

export function GenericEmployerPage({ title }: { title: string }) {
  return <FeatureDemoPage portal="Employer" title={title} />
}
