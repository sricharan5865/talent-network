import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Clock,
  CheckCircle2,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
  MapPin,
  Award,
  Smile,
  ShieldAlert,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react"
import { Button, Card, Badge } from "../components/ui"

const funnelData = [
  { stage: "Applied", candidates: 1248, conv: "100%" },
  { stage: "Screened", candidates: 684, conv: "54.8%" },
  { stage: "Shortlisted", candidates: 312, conv: "25.0%" },
  { stage: "Interviewed", candidates: 146, conv: "11.7%" },
  { stage: "Offered", candidates: 48, conv: "3.8%" },
  { stage: "Hired", candidates: 31, conv: "2.5%" },
]

const monthlyTrend = [
  { month: "Jan", applicants: 480, hires: 12 },
  { month: "Feb", applicants: 620, hires: 18 },
  { month: "Mar", applicants: 580, hires: 16 },
  { month: "Apr", applicants: 760, hires: 22 },
  { month: "May", applicants: 820, hires: 28 },
  { month: "Jun", applicants: 910, hires: 31 },
]

const sourceData = [
  { name: "LinkedIn", value: 38, color: "#2563eb" },
  { name: "Career Page", value: 24, color: "#7c3aed" },
  { name: "Referrals", value: 18, color: "#059669" },
  { name: "Naukri", value: 12, color: "#d97706" },
  { name: "Others", value: 8, color: "#64748b" },
]

const deptData = [
  { dept: "Engineering", open: 14, filled: 12 },
  { dept: "Design", open: 6, filled: 8 },
  { dept: "Sales", open: 10, filled: 7 },
  { dept: "People Ops", open: 4, filled: 4 },
]

const cityDistribution = [
  { city: "Bengaluru", talent: 46, growth: "+24%", avgCTC: "₹34L" },
  { city: "Hyderabad", talent: 22, growth: "+18%", avgCTC: "₹31L" },
  { city: "Mumbai / Pune", talent: 16, growth: "+12%", avgCTC: "₹29L" },
  { city: "Delhi NCR", talent: 11, growth: "+9%", avgCTC: "₹28L" },
  { city: "Remote India", talent: 5, growth: "+42%", avgCTC: "₹36L" },
]

const recruiterLeaderboard = [
  { name: "Aditi Rao", hires: 14, timeToHire: 18, nps: "4.9/5", pipeline: 42 },
  {
    name: "Rahul Deshmukh",
    hires: 11,
    timeToHire: 21,
    nps: "4.7/5",
    pipeline: 38,
  },
  {
    name: "Kunal Singhania",
    hires: 9,
    timeToHire: 26,
    nps: "4.8/5",
    pipeline: 29,
  },
  { name: "Meera Nair", hires: 8, timeToHire: 24, nps: "4.6/5", pipeline: 31 },
]

const recentHires = [
  {
    name: "Priya Sharma",
    role: "Senior Product Designer",
    dept: "Design",
    source: "LinkedIn",
    days: 21,
    status: "Joined",
  },
  {
    name: "Vikram Malhotra",
    role: "Staff Backend Engineer",
    dept: "Engineering",
    source: "Referral",
    days: 18,
    status: "Joined",
  },
  {
    name: "Ananya Roy",
    role: "Product Manager",
    dept: "Product",
    source: "Career Page",
    days: 27,
    status: "Onboarding",
  },
  {
    name: "Siddharth Jain",
    role: "Account Executive",
    dept: "Sales",
    source: "Naukri",
    days: 16,
    status: "Joined",
  },
  {
    name: "Neha Verma",
    role: "Frontend Lead",
    dept: "Engineering",
    source: "LinkedIn",
    days: 29,
    status: "Offer Sent",
  },
  {
    name: "Tanvi Kulkarni",
    role: "People Operations Specialist",
    dept: "People",
    source: "Referral",
    days: 14,
    status: "Joined",
  },
  {
    name: "Kavya Menon",
    role: "Mobile Architect (React Native)",
    dept: "Engineering",
    source: "GitHub",
    days: 22,
    status: "Joined",
  },
  {
    name: "Rohan Oberoi",
    role: "Growth Marketing Lead",
    dept: "Marketing",
    source: "Referral",
    days: 19,
    status: "Joined",
  },
]

const npsBreakdown = [
  {
    touchpoint: "Application Experience",
    score: "4.8 / 5.0",
    positive: "96%",
    detail: "Streamlined 2-minute apply flow",
  },
  {
    touchpoint: "Recruiter Communication",
    score: "4.7 / 5.0",
    positive: "94%",
    detail: "WhatsApp & email notifications",
  },
  {
    touchpoint: "Technical Panel Quality",
    score: "4.5 / 5.0",
    positive: "90%",
    detail: "Fair & transparent rubric scoring",
  },
  {
    touchpoint: "Post-Interview Feedback",
    score: "4.2 / 5.0",
    positive: "84%",
    detail: "Constructive feedback dossiers",
  },
]

export function AnalyticsPage() {
  const [range, setRange] = useState<"7D" | "30D" | "90D" | "12M">("30D")

  return (
    <div
      className="page"
      style={{ display: "flex", flexDirection: "column", gap: 26 }}
    >
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, margin: 0, fontWeight: 700 }}>
            Talent Pipeline & Operations Analytics
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>
            Comprehensive reporting on recruitment velocity, channel
            effectiveness, team quotas, and candidate NPS
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              display: "inline-flex",
              padding: 3,
              borderRadius: 10,
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}
          >
            {(["7D", "30D", "90D", "12M"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                style={{
                  height: 30,
                  padding: "0 12px",
                  borderRadius: 7,
                  border: 0,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  background: range === item ? "var(--surface)" : "transparent",
                  color: range === item ? "var(--ink)" : "var(--muted)",
                  boxShadow:
                    range === item ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <Button
            variant="secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Download size={15} /> Export PDF/CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        <Card style={{ padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span
              style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}
            >
              Total Applicants
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "var(--primary-soft)",
                color: "var(--primary)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Users size={17} />
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}
          >
            3,248
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 6,
              fontSize: 12,
              color: "var(--green)",
            }}
          >
            <TrendingUp size={14} /> <strong>+18.4%</strong>{" "}
            <span style={{ color: "var(--faint)" }}>vs previous period</span>
          </div>
        </Card>

        <Card style={{ padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span
              style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}
            >
              Hires This Quarter
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "var(--green-soft)",
                color: "var(--green)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Briefcase size={17} />
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}
          >
            31
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 6,
              fontSize: 12,
              color: "var(--green)",
            }}
          >
            <Badge tone="green">94% of Target</Badge>{" "}
            <span style={{ color: "var(--faint)" }}>Goal: 33 hires</span>
          </div>
        </Card>

        <Card style={{ padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span
              style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}
            >
              Avg Time-to-Hire
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "var(--purple-soft)",
                color: "var(--purple)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Clock size={17} />
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}
          >
            24 days
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 6,
              fontSize: 12,
              color: "var(--green)",
            }}
          >
            <TrendingDown size={14} /> <strong>−3.2 days</strong>{" "}
            <span style={{ color: "var(--faint)" }}>industry avg: 36d</span>
          </div>
        </Card>

        <Card style={{ padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span
              style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}
            >
              Offer Acceptance Rate
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "var(--amber-soft)",
                color: "var(--amber)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <CheckCircle2 size={17} />
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}
          >
            87.5%
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 6,
              fontSize: 12,
              color: "var(--green)",
            }}
          >
            <TrendingUp size={14} /> <strong>+5.2%</strong>{" "}
            <span style={{ color: "var(--faint)" }}>42/48 offers accepted</span>
          </div>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: 16,
        }}
      >
        {/* Funnel Chart */}
        <Card style={{ padding: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>
                Recruitment Funnel & Conversion
              </h3>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                Drop-off progression across hiring stages
              </p>
            </div>
            <Badge tone="blue">1,248 Candidates</Badge>
          </div>

          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={funnelData}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="var(--border)"
                />
                <XAxis type="number" stroke="var(--muted)" fontSize={12} />
                <YAxis
                  dataKey="stage"
                  type="category"
                  stroke="var(--muted)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--surface)",
                    borderColor: "var(--border-strong)",
                    borderRadius: 8,
                    color: "var(--ink)",
                  }}
                  formatter={(val: any, _name: any, item: any) => [
                    `${val} candidates (${item.payload.conv})`,
                    "Volume",
                  ]}
                />
                <Bar
                  dataKey="candidates"
                  fill="var(--primary)"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Hiring Trend */}
        <Card style={{ padding: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>
                Applicant Volume vs Hires
              </h3>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                6-month performance timeline
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--primary)",
                }}
              >
                ● Applicants
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--green)",
                }}
              >
                ● Hires
              </span>
            </div>
          </div>

          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyTrend}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorApplicants"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} />
                <YAxis stroke="var(--muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--surface)",
                    borderColor: "var(--border-strong)",
                    borderRadius: 8,
                    color: "var(--ink)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="applicants"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorApplicants)"
                />
                <Area
                  type="monotone"
                  dataKey="hires"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorHires)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Secondary Insights Row: Source & Department */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {/* Source Breakdown */}
        <Card style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>
            Channel & Source Efficiency
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 140, height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {sourceData.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 12,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      color: "var(--muted)",
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: item.color,
                      }}
                    />
                    {item.name}
                  </span>
                  <strong style={{ color: "var(--ink)" }}>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Department Fill Rate */}
        <Card style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>
            Openings vs Hired by Department
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {deptData.map((d) => {
              const total = d.open + d.filled
              const pct = Math.round((d.filled / total) * 100)
              return (
                <div
                  key={d.dept}
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12.5,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{d.dept}</span>
                    <span style={{ color: "var(--muted)" }}>
                      {d.filled} filled / {d.open} open ({pct}%)
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 7,
                      background: "var(--surface-2)",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: "var(--primary)",
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card
          style={{
            padding: 20,
            background:
              "linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(37, 99, 235, 0.08))",
            borderColor: "rgba(124, 58, 237, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
              color: "var(--purple)",
            }}
          >
            <Sparkles size={18} />
            <strong style={{ fontSize: 14 }}>
              Talent Intelligence Signals
            </strong>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 12.5,
              color: "var(--ink)",
              lineHeight: 1.5,
            }}
          >
            <div
              style={{
                padding: 10,
                borderRadius: 8,
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              💡 <strong>Referrals yield 2.4× higher retention</strong> and
              close 9 days faster. Expand internal referral incentive bonuses.
            </div>
            <div
              style={{
                padding: 10,
                borderRadius: 8,
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              ⚡ <strong>Design candidates respond 40% faster</strong> via
              WhatsApp outreach than email sequences.
            </div>
            <div
              style={{
                padding: 10,
                borderRadius: 8,
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              🎯 <strong>Engineering stage bottleneck:</strong>{" "}
              Screening-to-Interview pass rate dropped 12% due to test
              difficulty.
            </div>
          </div>
        </Card>
      </div>

      {/* NEW SECTION 1: Geographic Talent Distribution & Regional Salary Medians */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: 16,
        }}
      >
        <Card style={{ padding: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>
                Geographic Talent Concentration
              </h3>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                Applicant pool density & median compensation by hub
              </p>
            </div>
            <Badge tone="purple">Pan-India Network</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cityDistribution.map((item) => (
              <div
                key={item.city}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "var(--primary-soft)",
                      color: "var(--primary)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <MapPin size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: 13 }}>{item.city}</strong>
                    <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
                      Avg Compensation: {item.avgCTC}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>
                    {item.talent}% pool
                  </span>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--green)",
                      fontWeight: 600,
                    }}
                  >
                    {item.growth} YoY
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Candidate NPS & Experience Health */}
        <Card style={{ padding: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>
                Candidate Experience NPS
              </h3>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                Post-interview sentiment & satisfaction index
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "var(--green)",
                fontWeight: 700,
              }}
            >
              <Smile size={18} /> +68 NPS
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {npsBreakdown.map((item) => (
              <div
                key={item.touchpoint}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <strong style={{ fontSize: 13 }}>{item.touchpoint}</strong>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--primary)",
                    }}
                  >
                    {item.score}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11.5,
                    color: "var(--muted)",
                  }}
                >
                  <span>{item.detail}</span>
                  <span style={{ color: "var(--green)", fontWeight: 600 }}>
                    {item.positive} positive
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* NEW SECTION 2: Recruiter Team Performance Leaderboard */}
      <Card style={{ padding: 22 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: 16 }}>
              Recruiter Operations & Quota Leaderboard
            </h3>
            <p
              style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}
            >
              Cycle velocity and offer conversion rates across talent
              specialists
            </p>
          </div>
          <Badge tone="green">All Quotas Met</Badge>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--border)",
                  color: "var(--muted)",
                  fontSize: 12,
                }}
              >
                <th style={{ padding: "10px 14px" }}>Talent Partner</th>
                <th style={{ padding: "10px 14px" }}>Filled Positions</th>
                <th style={{ padding: "10px 14px" }}>Avg Cycle (Days)</th>
                <th style={{ padding: "10px 14px" }}>Candidate CSAT</th>
                <th style={{ padding: "10px 14px" }}>
                  Active In-Flight Pipeline
                </th>
                <th style={{ padding: "10px 14px" }}>Efficiency Index</th>
              </tr>
            </thead>
            <tbody>
              {recruiterLeaderboard.map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td
                    style={{
                      padding: "12px 14px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "var(--primary-soft)",
                        color: "var(--primary)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {r.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    {r.name}
                  </td>
                  <td style={{ padding: "12px 14px", fontWeight: 700 }}>
                    {r.hires} hires
                  </td>
                  <td style={{ padding: "12px 14px", color: "var(--muted)" }}>
                    {r.timeToHire} days
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      color: "var(--green)",
                      fontWeight: 600,
                    }}
                  >
                    {r.nps}
                  </td>
                  <td style={{ padding: "12px 14px", color: "var(--ink)" }}>
                    {r.pipeline} active
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <Badge tone={i === 0 ? "green" : "blue"}>
                      {i === 0 ? "Top Performer ⭐" : "Exceeding"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Hires Table (Extended with 8 detailed rows) */}
      <Card style={{ padding: 22 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: 16 }}>
              Recent Placements & Activity Log
            </h3>
            <p
              style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}
            >
              Detailed requisition fulfillment timeline
            </p>
          </div>
          <Button variant="ghost" style={{ fontSize: 12 }}>
            Download Full Audit →
          </Button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--border)",
                  color: "var(--muted)",
                  fontSize: 12,
                }}
              >
                <th style={{ padding: "10px 12px" }}>Candidate</th>
                <th style={{ padding: "10px 12px" }}>Role</th>
                <th style={{ padding: "10px 12px" }}>Department</th>
                <th style={{ padding: "10px 12px" }}>Source</th>
                <th style={{ padding: "10px 12px" }}>Cycle Time</th>
                <th style={{ padding: "10px 12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentHires.map((h, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px", fontWeight: 600 }}>{h.name}</td>
                  <td style={{ padding: "12px", color: "var(--ink)" }}>
                    {h.role}
                  </td>
                  <td style={{ padding: "12px", color: "var(--muted)" }}>
                    {h.dept}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <Badge tone="neutral">{h.source}</Badge>
                  </td>
                  <td style={{ padding: "12px", color: "var(--ink)" }}>
                    {h.days} days
                  </td>
                  <td style={{ padding: "12px" }}>
                    <Badge
                      tone={
                        h.status === "Joined"
                          ? "green"
                          : h.status === "Onboarding"
                            ? "blue"
                            : "purple"
                      }
                    >
                      {h.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
