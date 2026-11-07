import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import {
  Activity,
  ArrowRight,
  Award,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  FileCheck2,
  Filter,
  Layers,
  Mail,
  MessageCircle,
  MessageSquareText,
  Plus,
  Search,
  Send,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react"
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

export function RecruiterDashboard() {
  const navigate = useNavigate()

  // State
  const [activeTab, setActiveTab] =
    useState<"mandates" | "sourcing" | "outreach" | "shortlists" | "placements">(
      "mandates",
    )
  const [searchQuery, setSearchQuery] = useState("")
  const [toast, setToast] = useState("")

  // Modals state
  const [intakeModalOpen, setIntakeModalOpen] = useState(false)
  const [submitShortlistOpen, setSubmitShortlistOpen] = useState(false)
  const [createSequenceOpen, setCreateSequenceOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null)

  // Interactive Mandates Data (TN-062, TN-063, TN-065)
  const [mandates, setMandates] = useState([
    {
      id: "man-1",
      client: "Nexora Labs",
      clientInitials: "NL",
      role: "Staff Backend Architect",
      dept: "Engineering",
      ctc: "₹45L",
      feePct: "22%",
      projectedFee: "₹9.90L",
      status: "Active",
      slaDays: 3,
      slaUrgent: true,
      submitted: 4,
      targetSubmissions: 5,
      interviews: 2,
    },
    {
      id: "man-2",
      client: "CRED",
      clientInitials: "CR",
      role: "Principal Product Designer",
      dept: "Design",
      ctc: "₹40L",
      feePct: "20%",
      projectedFee: "₹8.00L",
      status: "Active",
      slaDays: 5,
      slaUrgent: false,
      submitted: 6,
      targetSubmissions: 6,
      interviews: 3,
    },
    {
      id: "man-3",
      client: "Razorpay",
      clientInitials: "RZ",
      role: "Lead Site Reliability Engineer",
      dept: "Infrastructure",
      ctc: "₹38L",
      feePct: "20%",
      projectedFee: "₹7.60L",
      status: "Urgent",
      slaDays: 1,
      slaUrgent: true,
      submitted: 3,
      targetSubmissions: 4,
      interviews: 1,
    },
    {
      id: "man-4",
      client: "PhonePe",
      clientInitials: "PP",
      role: "Engineering Manager - Payments",
      dept: "Engineering",
      ctc: "₹60L",
      feePct: "25%",
      projectedFee: "₹15.00L",
      status: "Active",
      slaDays: 7,
      slaUrgent: false,
      submitted: 5,
      targetSubmissions: 6,
      interviews: 2,
    },
    {
      id: "man-5",
      client: "Swiggy",
      clientInitials: "SW",
      role: "Senior Growth Product Manager",
      dept: "Product",
      ctc: "₹35L",
      feePct: "20%",
      projectedFee: "₹7.00L",
      status: "Active",
      slaDays: 4,
      slaUrgent: false,
      submitted: 4,
      targetSubmissions: 5,
      interviews: 2,
    },
  ])

  // New Mandate Form State (TN-064)
  const [newClient, setNewClient] = useState("Nexora Labs")
  const [newRole, setNewRole] = useState("")
  const [newCtc, setNewCtc] = useState("35")
  const [newFeePct, setNewFeePct] = useState("20")
  const [newSkills, setNewSkills] = useState(
    "Distributed Systems, Go, Kubernetes",
  )
  const [newNotes, setNewNotes] = useState("")

  // AI Sourcing Candidates (TN-066, TN-067)
  const sourcingPool = useMemo(
    () => [
      {
        id: "c-1",
        name: "Siddharth Verma",
        role: "Staff Distributed Systems Engineer",
        currentCompany: "PhonePe",
        exp: "9 years",
        city: "Bengaluru",
        match: 95,
        targetClient: "Nexora Labs",
        notice: "30 days",
        skills: ["Go", "Kafka", "Kubernetes", "High-Throughput"],
        status: "Shortlist Ready",
      },
      {
        id: "c-2",
        name: "Pooja Hegde",
        role: "Principal UX / Product Designer",
        currentCompany: "Urban Company",
        exp: "8 years",
        city: "Bengaluru",
        match: 92,
        targetClient: "CRED",
        notice: "Immediate",
        skills: ["Design Systems", "Figma", "Fintech UX"],
        status: "Outreach Sent",
      },
      {
        id: "c-3",
        name: "Karan Johar",
        role: "Lead DevOps / Platform Architect",
        currentCompany: "Groww",
        exp: "7 years",
        city: "Hyderabad",
        match: 89,
        targetClient: "Razorpay",
        notice: "45 days",
        skills: ["Terraform", "AWS", "ArgoCD", "Kubernetes"],
        status: "Interviewing",
      },
      {
        id: "c-4",
        name: "Deepika Padukone",
        role: "Engineering Manager - Core Scale",
        currentCompany: "Flipkart",
        exp: "11 years",
        city: "Bengaluru",
        match: 94,
        targetClient: "PhonePe",
        notice: "60 days",
        skills: ["Engineering Leadership", "Java", "Microservices"],
        status: "Shortlist Ready",
      },
    ],
    [],
  )

  // Outreach Sequences (TN-068)
  const [sequences, setSequences] = useState([
    {
      id: "seq-1",
      title: "Fintech Staff Engineers - 3 Step Multi-Channel",
      audience: "Go / Kubernetes Backend Engineers with 7+ yrs",
      channels: ["LinkedIn InMail", "WhatsApp", "Email"],
      enrolled: 142,
      openRate: "72%",
      replyRate: "46%",
      qualifiedLeads: 24,
      status: "Active",
    },
    {
      id: "seq-2",
      title: "Design Leadership Executive Headhunt",
      audience: "Design Leads / Principal Designers in tier-1 tech",
      channels: ["Personal Email", "LinkedIn InMail"],
      enrolled: 86,
      openRate: "81%",
      replyRate: "54%",
      qualifiedLeads: 18,
      status: "Active",
    },
  ])

  // Placements & Closed Revenue (TN-071, TN-072)
  const placements = [
    {
      id: "pl-1",
      candidate: "Priya Sharma",
      role: "Senior Product Designer",
      client: "Nexora Labs",
      ctc: "₹36.00L",
      fee: "₹7.92L",
      joined: "15 Oct 2026",
      status: "Paid",
      invoice: "INV-2026-088",
    },
    {
      id: "pl-2",
      candidate: "Vikram Malhotra",
      role: "Staff Backend Engineer",
      client: "Nexora Labs",
      ctc: "₹44.00L",
      fee: "₹9.68L",
      joined: "01 Nov 2026",
      status: "Invoice Sent",
      invoice: "INV-2026-094",
    },
    {
      id: "pl-3",
      candidate: "Ananya Sengupta",
      role: "Principal Product Designer",
      client: "CRED",
      ctc: "₹40.00L",
      fee: "₹8.00L",
      joined: "05 Nov 2026",
      status: "Under Guarantee",
      invoice: "INV-2026-102",
    },
    {
      id: "pl-4",
      candidate: "Rahul Deshmukh",
      role: "Lead Platform Engineer",
      client: "Razorpay",
      ctc: "₹42.00L",
      fee: "₹9.24L",
      joined: "15 Nov 2026",
      status: "Offer Accepted",
      invoice: "Draft",
    },
  ]

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => {
      setToast((prev) => (prev === msg ? "" : prev))
    }, 4000)
  }

  const handleCreateMandate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRole.trim()) {
      showToast("Please enter a role title")
      return
    }
    const feeNum = (parseFloat(newCtc) * (parseFloat(newFeePct) / 100)).toFixed(
      2,
    )
    const newM = {
      id: `man-${Date.now()}`,
      client: newClient,
      clientInitials: newClient
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join(""),
      role: newRole,
      dept: "Engineering",
      ctc: `₹${newCtc}L`,
      feePct: `${newFeePct}%`,
      projectedFee: `₹${feeNum}L`,
      status: "Active",
      slaDays: 7,
      slaUrgent: false,
      submitted: 0,
      targetSubmissions: 5,
      interviews: 0,
    }
    setMandates([newM, ...mandates])
    setIntakeModalOpen(false)
    setNewRole("")
    showToast(`✅ Mandate intake completed: "${newRole}" for ${newClient}!`)
  }

  // Filtered mandates
  const filteredMandates = useMemo(() => {
    if (!searchQuery.trim()) return mandates
    const q = searchQuery.toLowerCase()
    return mandates.filter(
      (m) =>
        m.role.toLowerCase().includes(q) ||
        m.client.toLowerCase().includes(q) ||
        m.dept.toLowerCase().includes(q),
    )
  }, [mandates, searchQuery])

  // Google-style quick shortcuts with vibrant modern gradients
  const shortcuts = [
    {
      label: "Mandates",
      count: `${mandates.length} Active`,
      icon: BriefcaseBusiness,
      gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
      shadow: "rgba(99, 102, 241, 0.35)",
      action: () => setActiveTab("mandates"),
    },
    {
      label: "Clients",
      count: "5 Accounts",
      icon: Building2,
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      shadow: "rgba(16, 185, 129, 0.35)",
      action: () => setActiveTab("mandates"),
    },
    {
      label: "AI Sourcing",
      count: "Radar",
      icon: Sparkles,
      gradient: "linear-gradient(135deg, #ec4899, #db2777)",
      shadow: "rgba(236, 72, 153, 0.35)",
      action: () => setActiveTab("sourcing"),
    },
    {
      label: "Talent CRM",
      count: "3,420",
      icon: Users,
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      shadow: "rgba(59, 130, 246, 0.35)",
      action: () => setActiveTab("sourcing"),
    },
    {
      label: "Outreach",
      count: "2 Active",
      icon: MessageSquareText,
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      shadow: "rgba(245, 158, 11, 0.35)",
      action: () => setActiveTab("outreach"),
    },
    {
      label: "Shortlists",
      count: "6 Ready",
      icon: FileCheck2,
      gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
      shadow: "rgba(6, 182, 212, 0.35)",
      action: () => setActiveTab("shortlists"),
    },
    {
      label: "Placements",
      count: "14 Closed",
      icon: Award,
      gradient: "linear-gradient(135deg, #16a34a, #15803d)",
      shadow: "rgba(22, 163, 74, 0.35)",
      action: () => setActiveTab("placements"),
    },
    {
      label: "Revenue",
      count: "₹34.8L",
      icon: WalletCards,
      gradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
      shadow: "rgba(168, 85, 247, 0.35)",
      action: () => setActiveTab("placements"),
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
          "radial-gradient(circle at 50% -10%, rgba(99, 102, 241, 0.16) 0%, rgba(168, 85, 247, 0.1) 30%, rgba(6, 182, 212, 0.05) 60%, transparent 80%)",
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

      {/* TOP FLOATING CONTROLS: AGENCY RADAR & THEME PILLS */}
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
              background: "#3b82f6",
              boxShadow: "0 0 10px #3b82f6",
              display: "inline-block",
            }}
          />
          <span>Agency Mandate Engine Active</span>
          <span style={{ color: "var(--muted)", fontWeight: 400 }}>
            · 5 Clients Connected
          </span>
        </div>

        {/* Quick Theme Switcher */}
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
            }}
          >
            ☀️ Light
          </button>
          <button
            type="button"
            title="Google Violet Theme"
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
            <span style={{ color: "var(--ink)" }}>Apex</span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Recruiter
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
            Agency Talent Workspace ·{" "}
            <strong style={{ color: "var(--ink)" }}>
              5 Enterprise Accounts
            </strong>{" "}
            ·{" "}
            <span style={{ color: "#3b82f6", fontWeight: 700 }}>
              8 Active Mandates
            </span>{" "}
            · ₹34.8L Q4 Bookings
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
                "0 8px 30px rgba(59, 130, 246, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)",
              display: "flex",
              alignItems: "center",
              padding: "0 22px",
              gap: 14,
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Search size={22} style={{ color: "#3b82f6", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search client mandates, candidates, outreach campaigns..."
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
              onClick={() => setActiveTab("sourcing")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                color: "#ffffff",
                border: "none",
                padding: "8px 18px",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
              }}
            >
              <Sparkles size={15} />
              <span>AI Sourcing</span>
            </button>
          </div>
        </div>

        {/* 3. GOOGLE-STYLE PROMPT CHIP CARDS */}
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
            onClick={() => setIntakeModalOpen(true)}
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
              e.currentTarget.style.borderColor = "#3b82f6"
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(59, 130, 246, 0.15)"
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
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
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
                Intake New Mandate
              </div>
              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
                20–22% Placement Fee
              </div>
            </div>
          </div>

          <div
            onClick={() => setSubmitShortlistOpen(true)}
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
              <Send size={18} />
            </div>
            <div>
              <div
                style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}
              >
                Submit Shortlist
              </div>
              <div
                style={{ fontSize: 11.5, color: "#a855f7", fontWeight: 600 }}
              >
                Deliver to Nexora / CRED
              </div>
            </div>
          </div>

          <div
            onClick={() => setCreateSequenceOpen(true)}
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
              e.currentTarget.style.borderColor = "#f59e0b"
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(245, 158, 11, 0.15)"
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
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                display: "grid",
                placeItems: "center",
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              <Zap size={18} />
            </div>
            <div>
              <div
                style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}
              >
                AI Outreach Sequence
              </div>
              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
                Consented Multi-Channel
              </div>
            </div>
          </div>
        </div>

        {/* 4. CIRCULAR SHORTCUTS GRID (Vibrant Gradient Circles) */}
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
                onClick={sc.action}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                }}
              >
                <div
                  style={{
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

        {/* 5. VIEW TOGGLE PILLS */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            background: "var(--surface-2)",
            padding: "5px 6px",
            borderRadius: 9999,
            border: "1px solid var(--border)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { id: "mandates", label: `Client Mandates (${mandates.length})` },
            { id: "sourcing", label: "AI Sourcing Radar" },
            { id: "outreach", label: "Outreach Sequencer" },
            { id: "shortlists", label: "Shortlists & Delivery" },
            { id: "placements", label: "Placements & Revenue" },
          ].map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: "none",
                  fontSize: 13.5,
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? "var(--surface)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--muted)",
                  boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* 6. NEAT SINGLE-COLUMN CONTENT CONTAINER */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* TAB 1: CLIENT MANDATES (TN-061, TN-062, TN-065) */}
          {activeTab === "mandates" && (
            <div
              style={{
                padding: "24px 26px",
                borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
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
                <div>
                  <strong style={{ fontSize: 15 }}>
                    Active Client Requisitions
                  </strong>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12.5,
                      color: "var(--muted)",
                    }}
                  >
                    Track submission SLAs, candidate shortlists, and placement
                    fees
                  </p>
                </div>
                <Button
                  variant="primary"
                  style={{ height: 34, fontSize: 12.5 }}
                  onClick={() => setIntakeModalOpen(true)}
                >
                  <Plus size={14} /> New Mandate
                </Button>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {filteredMandates.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 18px",
                      borderRadius: 12,
                      background: "var(--surface-2)",
                      border: m.slaUrgent
                        ? "1px solid rgba(239, 68, 68, 0.25)"
                        : "1px solid transparent",
                      gap: 16,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <strong style={{ fontSize: 14, color: "var(--ink)" }}>
                          {m.role}
                        </strong>
                        <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
                          · {m.client}
                        </span>
                        {m.slaUrgent && (
                          <Badge tone="red">{m.slaDays}d SLA Left</Badge>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: "var(--muted)",
                          marginTop: 4,
                        }}
                      >
                        CTC: <strong>{m.ctc}</strong> · Fee:{" "}
                        <strong style={{ color: "var(--primary)" }}>
                          {m.feePct} ({m.projectedFee})
                        </strong>
                        <span style={{ marginLeft: 8 }}>
                          · Submissions: {m.submitted}/{m.targetSubmissions}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button
                        variant="secondary"
                        style={{
                          height: 32,
                          fontSize: 12.5,
                          padding: "0 14px",
                        }}
                        onClick={() => {
                          setSelectedCandidate(sourcingPool[0])
                          setSubmitShortlistOpen(true)
                        }}
                      >
                        Deliver Shortlist
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: AI SOURCING RADAR (TN-066, TN-067) */}
          {activeTab === "sourcing" && (
            <div
              style={{
                padding: "24px 26px",
                borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
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
                <div>
                  <strong style={{ fontSize: 15 }}>
                    AI Candidate Discovery across Talent Network
                  </strong>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12.5,
                      color: "var(--muted)",
                    }}
                  >
                    Verified profiles matched against active client requisition
                    briefs
                  </p>
                </div>
                <Badge tone="purple">3,420 Network Profiles</Badge>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {sourcingPool.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: "16px 18px",
                      borderRadius: 12,
                      background: "var(--surface-2)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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
                          <strong style={{ fontSize: 14 }}>{c.name}</strong>
                          <span
                            style={{
                              fontSize: 12.5,
                              color: "var(--muted)",
                              marginLeft: 8,
                            }}
                          >
                            · {c.role} ({c.currentCompany})
                          </span>
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--muted)",
                              marginTop: 2,
                            }}
                          >
                            📍 {c.city} · ⏱ {c.exp} · ⏳ Notice: {c.notice} ·
                            Target:{" "}
                            <strong style={{ color: "var(--primary)" }}>
                              {c.targetClient}
                            </strong>
                          </div>
                        </div>
                      </div>
                      <Badge tone="green">{c.match}% Match</Badge>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 4,
                        paddingTop: 10,
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      <div
                        style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                      >
                        {c.skills.map((s) => (
                          <span
                            key={s}
                            style={{
                              fontSize: 11.5,
                              background: "white",
                              padding: "3px 8px",
                              borderRadius: 6,
                              border: "1px solid var(--border)",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Button
                          variant="secondary"
                          style={{
                            height: 30,
                            fontSize: 12,
                            padding: "0 12px",
                          }}
                          onClick={() =>
                            showToast(
                              `Enrolled ${c.name} into Outreach Sequence!`,
                            )
                          }
                        >
                          Enroll in Sequence
                        </Button>
                        <Button
                          variant="primary"
                          style={{
                            height: 30,
                            fontSize: 12,
                            padding: "0 12px",
                          }}
                          onClick={() => {
                            setSelectedCandidate(c)
                            setSubmitShortlistOpen(true)
                          }}
                        >
                          Submit to {c.targetClient}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: OUTREACH SEQUENCER (TN-068) */}
          {activeTab === "outreach" && (
            <div
              style={{
                padding: "24px 26px",
                borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
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
                <div>
                  <strong style={{ fontSize: 15 }}>
                    Automated Multi-Channel Sequences
                  </strong>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12.5,
                      color: "var(--muted)",
                    }}
                  >
                    Consented candidate outreach across LinkedIn, WhatsApp &
                    Direct Email
                  </p>
                </div>
                <Button
                  variant="primary"
                  style={{ height: 34, fontSize: 12.5 }}
                  onClick={() => setCreateSequenceOpen(true)}
                >
                  <Plus size={14} /> New Campaign
                </Button>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {sequences.map((seq) => (
                  <div
                    key={seq.id}
                    style={{
                      padding: "16px 18px",
                      borderRadius: 12,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <strong style={{ fontSize: 14, color: "var(--ink)" }}>
                        {seq.title}
                      </strong>
                      <Badge tone="green">{seq.status}</Badge>
                    </div>
                    <p
                      style={{
                        margin: "0 0 12px",
                        fontSize: 12.5,
                        color: "var(--muted)",
                      }}
                    >
                      Audience: {seq.audience}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 10,
                        background: "white",
                        padding: "12px 14px",
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        <small
                          style={{ fontSize: 11.5, color: "var(--muted)" }}
                        >
                          Enrolled
                        </small>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            marginTop: 2,
                          }}
                        >
                          {seq.enrolled}
                        </div>
                      </div>
                      <div>
                        <small
                          style={{ fontSize: 11.5, color: "var(--muted)" }}
                        >
                          Open Rate
                        </small>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: "var(--primary)",
                            marginTop: 2,
                          }}
                        >
                          {seq.openRate}
                        </div>
                      </div>
                      <div>
                        <small
                          style={{ fontSize: 11.5, color: "var(--muted)" }}
                        >
                          Reply Rate
                        </small>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#059669",
                            marginTop: 2,
                          }}
                        >
                          {seq.replyRate}
                        </div>
                      </div>
                      <div>
                        <small
                          style={{ fontSize: 11.5, color: "var(--muted)" }}
                        >
                          Qualified Leads
                        </small>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#7c3aed",
                            marginTop: 2,
                          }}
                        >
                          {seq.qualifiedLeads}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SHORTLIST SUBMISSIONS & CLIENT FEEDBACK (TN-069, TN-070) */}
          {activeTab === "shortlists" && (
            <div
              style={{
                padding: "24px 26px",
                borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
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
                <div>
                  <strong style={{ fontSize: 15 }}>
                    Candidate Submissions to Client Hiring Managers
                  </strong>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12.5,
                      color: "var(--muted)",
                    }}
                  >
                    Formatted candidate packets sent with compensation
                    expectations & verification evidence
                  </p>
                </div>
                <Badge tone="blue">6 Active In Review</Badge>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  {
                    client: "Nexora Labs",
                    candidate: "Siddharth Verma",
                    role: "Staff Backend Architect",
                    date: "Yesterday",
                    status: "Interview Scheduled",
                    note: "Client feedback: Strong architecture background, proceeding to panel.",
                  },
                  {
                    client: "CRED",
                    candidate: "Pooja Hegde",
                    role: "Principal UX Designer",
                    date: "2 days ago",
                    status: "Under Manager Review",
                    note: "Awaiting VP Product scorecard review.",
                  },
                  {
                    client: "Razorpay",
                    candidate: "Karan Johar",
                    role: "Lead SRE",
                    date: "3 days ago",
                    status: "Client Feedback Needed",
                    note: "Feedback calibration: Requested additional Terraform examples.",
                  },
                ].map((sub, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 12,
                      background: "var(--surface-2)",
                      fontSize: 13,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 700,
                      }}
                    >
                      <span>
                        {sub.candidate} → {sub.client}
                      </span>
                      <Badge tone="blue">{sub.status}</Badge>
                    </div>
                    <div
                      style={{
                        color: "var(--muted)",
                        margin: "4px 0 8px",
                        fontSize: 12.5,
                      }}
                    >
                      {sub.role} · Submitted {sub.date}
                    </div>
                    <div
                      style={{
                        background: "white",
                        padding: "8px 12px",
                        borderRadius: 8,
                        fontSize: 12.5,
                        color: "var(--ink)",
                        border: "1px solid var(--border)",
                        lineHeight: 1.5,
                      }}
                    >
                      💬 {sub.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PLACEMENTS & COMMISSIONS REVENUE (TN-071, TN-072) */}
          {activeTab === "placements" && (
            <div
              style={{
                padding: "24px 26px",
                borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
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
                <div>
                  <strong style={{ fontSize: 15 }}>
                    Closed Placements & Agency Fees
                  </strong>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12.5,
                      color: "var(--muted)",
                    }}
                  >
                    Q4 Total Revenue: <strong>₹34.84L</strong> · Invoiced &
                    Pending Collections
                  </p>
                </div>
                <Badge tone="green">14 Placements YTD</Badge>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {placements.map((pl) => (
                  <div
                    key={pl.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 18px",
                      borderRadius: 12,
                      background: "var(--surface-2)",
                      gap: 16,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>
                        {pl.candidate} → {pl.client}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: "var(--muted)",
                          marginTop: 4,
                        }}
                      >
                        {pl.role} · CTC: {pl.ctc} · Joined: {pl.joined}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontWeight: 800,
                          color: "#166534",
                          fontSize: 15,
                        }}
                      >
                        {pl.fee}
                      </div>
                      <Badge tone={pl.status === "Paid" ? "green" : "neutral"}>
                        {pl.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: REQUISITION INTAKE (TN-064) */}
      <Modal
        open={intakeModalOpen}
        onClose={() => setIntakeModalOpen(false)}
        title="Capture New Client Mandate"
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
              onClick={() => setIntakeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateMandate}>
              Save Mandate
            </Button>
          </div>
        }
      >
        <form
          onSubmit={handleCreateMandate}
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
              Client Organization *
            </label>
            <Select
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
            >
              <option value="Nexora Labs">Nexora Labs</option>
              <option value="CRED">CRED</option>
              <option value="Razorpay">Razorpay</option>
              <option value="PhonePe">PhonePe</option>
              <option value="Swiggy">Swiggy</option>
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
              Role Mandate Title *
            </label>
            <Input
              placeholder="e.g. Senior Distributed Database Engineer"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
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
                Target CTC (LPA)
              </label>
              <Input
                type="number"
                value={newCtc}
                onChange={(e) => setNewCtc(e.target.value)}
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
                Agency Fee %
              </label>
              <Select
                value={newFeePct}
                onChange={(e) => setNewFeePct(e.target.value)}
              >
                <option value="18">18% (Standard)</option>
                <option value="20">20% (Preferred)</option>
                <option value="22">22% (Senior Exclusive)</option>
                <option value="25">25% (Executive Retained)</option>
              </Select>
            </div>
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
              Key Skill Requirements
            </label>
            <Input
              value={newSkills}
              onChange={(e) => setNewSkills(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* MODAL 2: SHORTLIST SUBMISSION TO CLIENT (TN-069) */}
      <Modal
        open={submitShortlistOpen}
        onClose={() => setSubmitShortlistOpen(false)}
        title="Submit Candidate Shortlist Packet to Client"
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
              onClick={() => setSubmitShortlistOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                showToast(
                  `Shortlist packet for ${selectedCandidate?.name || "candidate"} sent to client hiring manager!`,
                )
                setSubmitShortlistOpen(false)
              }}
            >
              <Send size={15} /> Send Formatted Packet
            </Button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {selectedCandidate && (
            <div
              style={{
                padding: 12,
                borderRadius: 10,
                background: "var(--surface-2)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Avatar name={selectedCandidate.name} size="md" />
              <div>
                <strong>{selectedCandidate.name}</strong> ·{" "}
                {selectedCandidate.role}
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  Current: {selectedCandidate.currentCompany} · Notice:{" "}
                  {selectedCandidate.notice}
                </div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Badge tone="green">{selectedCandidate.match}% Match</Badge>
              </div>
            </div>
          )}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Client Hiring Manager Email
            </label>
            <Input defaultValue="talent.lead@nexoralabs.com" />
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
              Recruiter Executive Recommendation
            </label>
            <textarea
              className="input"
              rows={3}
              style={{ width: "100%", height: "auto", resize: "vertical" }}
              defaultValue="Exceptional candidate with deep distributed scale architecture experience. Fully aligned with target compensation band and immediately available for technical panel review."
            />
          </div>
        </div>
      </Modal>

      {/* MODAL 3: OUTREACH SEQUENCE (TN-068) */}
      <Modal
        open={createSequenceOpen}
        onClose={() => setCreateSequenceOpen(false)}
        title="Create Automated Outreach Campaign"
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
              onClick={() => setCreateSequenceOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                showToast(
                  "Outreach sequence launched successfully across LinkedIn & WhatsApp!",
                )
                setCreateSequenceOpen(false)
              }}
            >
              Launch Sequence
            </Button>
          </div>
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
              Campaign Name
            </label>
            <Input defaultValue="Q4 Staff Distributed Systems Headhunt" />
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
              Step 1: LinkedIn InMail (Day 1)
            </label>
            <textarea
              className="input"
              rows={2}
              style={{ width: "100%", height: "auto" }}
              defaultValue="Hi {{first_name}}, came across your architecture work at {{current_company}}. Apex is partnering with Nexora Labs on a Staff Systems role..."
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
              Step 2: WhatsApp Introduction (Day 3)
            </label>
            <textarea
              className="input"
              rows={2}
              style={{ width: "100%", height: "auto" }}
              defaultValue="Hi {{first_name}}, following up on my note regarding the Staff Architect role at Nexora Labs. Would love to share the compensation range..."
            />
          </div>
        </div>
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
