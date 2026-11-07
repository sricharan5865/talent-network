import { Fragment, useState, type CSSProperties } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BellPlus,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Calendar,
  CalendarDays,
  CalendarPlus,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  Clock3,
  Edit3,
  FileText,
  GitCompareArrows,
  IndianRupee,
  Layers,
  LayoutGrid,
  List,
  MapPin,
  Search,
  Shield,
  Sparkles,
  Star,
  Target,
  UserRound,
  UsersRound,
  Zap,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Progress,
  Select,
} from "../components/ui"
import { jobs } from "../data/mockData"
import { FeatureDemoPage } from "./DemoPages"

function Header({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow: string
  title: string
  text: string
  action?: React.ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action}
    </div>
  )
}

const homeImages = {
  interview:
    "https://images.unsplash.com/photo-1612299273045-362a39972259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  article:
    "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
}

export function CandidateDashboard() {
  const navigate = useNavigate()
  const [saved, setSaved] = useState<string[]>([])
  const [prepOpen, setPrepOpen] = useState(false)
  const [articleOpen, setArticleOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [toast, setToast] = useState("")
  const profileScore = 82

  const recommended = jobs.slice(0, 3).map((job, i) => ({
    ...job,
    company: ["Nexora Labs", "PhonePe", "CRED"][i],
    initials: ["NL", "PP", "CR"][i],
    match: 94 - i * 4,
  }))

  const toggleSave = (title: string) => {
    const exists = saved.includes(title)
    setSaved(exists ? saved.filter((t) => t !== title) : [...saved, title])
    setToast(exists ? `Removed ${title} from saved jobs` : `Saved ${title}`)
  }

  const quickLinks: [string, string, typeof FileText, string][] = [
    ["My applications", "5", FileText, "/candidate/applications"],
    ["Interviews", "2", CalendarDays, "/candidate/interviews"],
    ["Saved jobs", String(7 + saved.length), Bookmark, "/candidate/jobs"],
    ["Profile views", "12", UsersRound, "/candidate/profile"],
  ]

  return (
    <div className="home-simple">
      <aside className="home-left">
        <Card className="home-profile">
          <div
            className="home-avatar-ring"
            style={{ "--p": profileScore } as CSSProperties}
          >
            <span>PS</span>
          </div>
          <small className="home-ring-label">{profileScore}% complete</small>
          <h2>Priya Sharma</h2>
          <p>Senior Product Designer</p>
          <p className="home-muted">Razorpay · Bengaluru</p>
          <small className="home-faint">Last updated 2 days ago</small>
          <Button
            className="home-pill-btn"
            onClick={() => navigate("/candidate/profile")}
          >
            Complete profile
          </Button>
        </Card>
        <Card className="home-links">
          {quickLinks.map(([label, count, Icon, to]) => (
            <button type="button" key={label} onClick={() => navigate(to)}>
              <Icon size={17} />
              <span>{label}</span>
              <b>{count}</b>
              <ChevronRight size={15} />
            </button>
          ))}
        </Card>
      </aside>

      <section className="home-center">
        <button
          type="button"
          className="home-hero"
          onClick={() => navigate("/candidate/radar")}
        >
          <h2>
            What’s your <span>market worth?</span>
          </h2>
          <p>See how your skills rank against designers in Bengaluru.</p>
          <div className="home-hero-chips">
            {[
              ["248", "open roles"],
              ["₹31.5L", "market midpoint"],
              ["Top 26%", "of candidates"],
              ["+31%", "AI design demand"],
            ].map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                <small>{label}</small>
              </span>
            ))}
          </div>
        </button>

        <Card className="home-feature">
          <span className="home-tag">Tomorrow</span>
          <div className="home-feature-copy">
            <h3>Your portfolio review is tomorrow</h3>
            <ul>
              <li>
                <CalendarDays size={17} /> 10:00 AM · 60 minutes · Google Meet
              </li>
              <li>
                <Building2 size={17} /> Nexora Labs · Senior Product Designer
              </li>
            </ul>
            <Button
              className="home-pill-btn lg"
              onClick={() => setPrepOpen(true)}
            >
              View preparation guide
            </Button>
          </div>
          <img
            src={homeImages.interview}
            alt="Candidate preparing for an interview on a laptop"
          />
        </Card>

        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <h3>Jobs picked for you</h3>
              <p>Based on your skills, salary range and location</p>
            </div>
            <button
              type="button"
              className="home-link"
              onClick={() => navigate("/candidate/jobs")}
            >
              View all
            </button>
          </div>
          <div className="home-job-row">
            {recommended.map((job) => (
              <div
                className="home-job-tile"
                key={job.title}
                role="button"
                tabIndex={0}
                onClick={() => navigate("/candidate/jobs")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate("/candidate/jobs")
                }}
              >
                <div className="home-job-top">
                  <span className="company-logo">{job.initials}</span>
                  <button
                    type="button"
                    className="home-save"
                    aria-label={`Save ${job.title}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSave(job.title)
                    }}
                  >
                    <Bookmark
                      size={17}
                      className={saved.includes(job.title) ? "filled" : ""}
                    />
                  </button>
                </div>
                <strong>{job.title}</strong>
                <small>
                  {job.company} · {job.location}
                </small>
                <div className="home-job-tags">
                  <span>{job.salary}</span>
                  <span className="match">{job.match}% match</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Your Applications */}
        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <h3>Your applications</h3>
              <p>Current status across your ongoing interview processes</p>
            </div>
            <button
              type="button"
              className="home-link"
              onClick={() => navigate("/candidate/applications")}
            >
              View all (5)
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                company: "Nexora Labs",
                initials: "NL",
                role: "Senior Product Designer",
                stage: "Portfolio Review",
                schedule: "Tomorrow at 10:00 AM",
                step: 3,
                total: 5,
                tone: "blue" as const,
              },
              {
                company: "PhonePe",
                initials: "PP",
                role: "Lead Interaction Designer",
                stage: "Technical Deep-Dive",
                schedule: "Friday, Nov 8 at 3:00 PM",
                step: 2,
                total: 5,
                tone: "purple" as const,
              },
              {
                company: "CRED",
                initials: "CR",
                role: "Principal Product Designer",
                stage: "Executive Leadership Alignment",
                schedule: "Tuesday, Nov 12 at 4:30 PM",
                step: 4,
                total: 5,
                tone: "amber" as const,
              },
              {
                company: "Swiggy",
                initials: "SW",
                role: "Staff Product Designer",
                stage: "Offer Extended",
                schedule: "Decision by Nov 15",
                step: 5,
                total: 5,
                tone: "green" as const,
              },
            ].map((app) => (
              <div
                key={app.company}
                onClick={() => navigate("/candidate/applications")}
                style={{
                  padding: "16px 18px",
                  borderRadius: 12,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span
                      className="company-logo"
                      style={{ width: 38, height: 38, fontSize: 13 }}
                    >
                      {app.initials}
                    </span>
                    <div>
                      <strong
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--ink)",
                          display: "block",
                          lineHeight: 1.3,
                        }}
                      >
                        {app.role}
                      </strong>
                      <span
                        style={{
                          fontSize: 13,
                          color: "var(--muted)",
                          lineHeight: 1.4,
                        }}
                      >
                        {app.company} · {app.stage}
                      </span>
                    </div>
                  </div>
                  <Badge tone={app.tone}>{app.schedule}</Badge>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    paddingTop: 2,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 5,
                      background: "var(--surface-2)",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${(app.step / app.total) * 100}%`,
                        height: "100%",
                        background:
                          app.tone === "green"
                            ? "var(--green)"
                            : app.tone === "purple"
                              ? "var(--purple)"
                              : app.tone === "amber"
                                ? "var(--amber)"
                                : "var(--primary)",
                        borderRadius: 999,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--faint)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Stage {app.step} of {app.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Skills in Demand */}
        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <h3>Top skills in demand</h3>
              <p>
                Frequently requested in Senior Product Designer roles in
                Bengaluru
              </p>
            </div>
            <button
              type="button"
              className="home-link"
              onClick={() => navigate("/candidate/radar")}
            >
              Opportunity radar
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: 14,
            }}
          >
            {[
              {
                title: "Design Tokens & System Ops",
                growth: "+42%",
                uplift: "+₹4.5L salary premium",
                description:
                  "Cross-platform token governance in Figma and React codebases.",
              },
              {
                title: "AI-Augmented Prototyping",
                growth: "+38%",
                uplift: "+₹6.0L salary premium",
                description:
                  "Building production-grade interactive concepts with AI tooling.",
              },
              {
                title: "Product Telemetry & Analytics",
                growth: "+27%",
                uplift: "+₹3.5L salary premium",
                description:
                  "Triangulating qualitative user research with funnel telemetry.",
              },
            ].map((skill) => (
              <div
                key={skill.title}
                style={{
                  padding: "16px 18px",
                  borderRadius: 12,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Badge tone="green">{skill.growth} growth</Badge>
                  </div>
                  <strong
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--ink)",
                      display: "block",
                      lineHeight: 1.35,
                    }}
                  >
                    {skill.title}
                  </strong>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 12.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {skill.description}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--primary)",
                    fontWeight: 600,
                    paddingTop: 4,
                  }}
                >
                  {skill.uplift}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Salary Benchmarks */}
        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <h3>Salary benchmarks</h3>
              <p>
                Verified offer ranges for Product Designers in Bengaluru and
                Remote India
              </p>
            </div>
            <Badge tone="neutral">Last 90 days</Badge>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                level: "Senior Product Designer",
                experience: "5–7 years",
                base: "₹28L – ₹36L base",
                total: "₹38L – ₹46L total comp",
                percentile: "Top 25%",
              },
              {
                level: "Lead / Staff Product Designer",
                experience: "7–10 years",
                base: "₹40L – ₹52L base",
                total: "₹55L – ₹70L total comp",
                percentile: "Top 12%",
              },
              {
                level: "Principal Designer / Design Director",
                experience: "10+ years",
                base: "₹58L – ₹75L base",
                total: "₹80L – ₹1.1Cr total comp",
                percentile: "Top 4%",
              },
            ].map((tier) => (
              <div
                key={tier.level}
                style={{
                  padding: "14px 18px",
                  borderRadius: 12,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <strong
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--ink)",
                      display: "block",
                      lineHeight: 1.3,
                    }}
                  >
                    {tier.level}
                  </strong>
                  <span
                    style={{
                      fontSize: 12.5,
                      color: "var(--muted)",
                      lineHeight: 1.4,
                    }}
                  >
                    {tier.experience} · {tier.base}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--primary)",
                      display: "block",
                      lineHeight: 1.3,
                    }}
                  >
                    {tier.total}
                  </strong>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--green)",
                      fontWeight: 600,
                    }}
                  >
                    {tier.percentile} bracket
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Candidate Questions & Advice */}
        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <h3>Frequently asked questions</h3>
              <p>
                Everything you need to know about interview stages, offers, and
                privacy
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                q: "How does the Career Passport protect my current employment privacy?",
                a: "Your current organization is automatically excluded from search results. Your profile and portfolio details are only revealed when you explicitly approve an introduction request from a verified employer.",
              },
              {
                q: "What is the typical interview turnaround time?",
                a: "Employers on TalentBridge commit to a standard turnaround of 14 to 21 business days from initial screening to final offer decision, with structured feedback at each milestone.",
              },
              {
                q: "How can I prepare for equity negotiation?",
                a: "You can use our Career Assistant to generate benchmarking talking points tailored to your role, company stage, vesting schedules, and verified startup salary data.",
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  style={{
                    borderRadius: 12,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    transition: "all 0.15s ease",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "16px 18px",
                      border: 0,
                      background: "transparent",
                      color: "var(--ink)",
                      fontSize: 14,
                      fontWeight: 600,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      cursor: "pointer",
                      lineHeight: 1.4,
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={17}
                      color="var(--muted)"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s ease",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 18px 16px",
                        color: "var(--muted)",
                        fontSize: 13.5,
                        lineHeight: 1.6,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      </section>

      <aside className="home-right">
        <Card className="home-article">
          <img
            src={homeImages.article}
            alt="Designer sketching on a drawing tablet beside a laptop"
          />
          <div>
            <span className="eyebrow">Career guide</span>
            <h3>How to ace a portfolio review: story, process and outcomes</h3>
            <p>
              Hiring panels decide in the first ten minutes. Lead with the
              problem, show how you got there, and close with measurable impact.
            </p>
            <button
              type="button"
              className="home-link"
              onClick={() => setArticleOpen(true)}
            >
              Read more
            </button>
          </div>
        </Card>

        {/* Action Items */}
        <Card className="home-side-card">
          <div className="home-section-head">
            <h3>Action items</h3>
            <Badge tone="blue">Upcoming</Badge>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 4,
            }}
          >
            {[
              {
                title: "Nexora Labs Portfolio Review",
                detail: "Tomorrow at 10:00 AM · Google Meet",
                badge: "Tomorrow",
                tone: "blue" as const,
              },
              {
                title: "Swiggy Offer Acceptance",
                detail: "Review compensation package before Nov 15",
                badge: "3 days left",
                tone: "amber" as const,
              },
              {
                title: "Portfolio Case Study",
                detail: "Add Blade 3.0 checkout metrics to profile",
                badge: "Recommended",
                tone: "neutral" as const,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  fontSize: 13,
                  lineHeight: 1.45,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <strong
                    style={{
                      fontSize: 13.5,
                      color: "var(--ink)",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </strong>
                  <Badge tone={item.tone}>{item.badge}</Badge>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    display: "block",
                  }}
                >
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Masterclass event card */}
        <Card className="home-side-card">
          <span className="eyebrow">Upcoming masterclass</span>
          <h3 style={{ marginTop: 2 }}>Scaling Multi-Squad Design Tokens</h3>
          <p>
            Hosted by Rahul Verma (VP Design, Razorpay) on live token
            architecture across web and mobile.
          </p>
          <div
            style={{ fontSize: 12, color: "var(--faint)", margin: "4px 0 8px" }}
          >
            Thursday at 6:30 PM IST · 45 mins
          </div>
          <Button style={{ width: "100%", height: 36, fontSize: 13 }}>
            Reserve free seat
          </Button>
        </Card>
      </aside>

      <Modal
        open={prepOpen}
        onClose={() => setPrepOpen(false)}
        title="Preparation guide · Nexora Labs"
        footer={
          <>
            <Button variant="secondary" onClick={() => setPrepOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setPrepOpen(false)
                navigate("/candidate/assistant")
              }}
            >
              Practise with AI <ArrowRight size={15} />
            </Button>
          </>
        }
      >
        <div className="suggestion-list">
          <div>
            <Badge tone="green">First 15 min</Badge>
            <p>Introduce your role and team setup at Razorpay.</p>
          </div>
          <div>
            <Badge tone="blue">Next 30 min</Badge>
            <p>
              Walk through the merchant onboarding redesign and the 24%
              activation lift.
            </p>
          </div>
          <div>
            <Badge tone="purple">Last 15 min</Badge>
            <p>
              Questions on design system governance and engineering handoff.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        open={articleOpen}
        onClose={() => setArticleOpen(false)}
        title="How to ace a portfolio review"
        footer={<Button onClick={() => setArticleOpen(false)}>Done</Button>}
      >
        <p>
          <strong>1. Start with the problem.</strong> One sentence on who was
          struggling and why it mattered to the business.
        </p>
        <p>
          <strong>2. Show two or three key decisions.</strong> Explain the
          options you considered and why you chose one.
        </p>
        <p>
          <strong>3. End with outcomes.</strong> Share a number, such as
          conversion, time saved or adoption, and what you would do next.
        </p>
      </Modal>

      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>
            ×
          </Button>
        </div>
      )}
    </div>
  )
}

export function MarketplacePage() {
  const [query, setQuery] = useState("React developer")
  const [saved, setSaved] = useState<string[]>([])
  const [apply, setApply] = useState<string | null>(null)
  const [alertCreated, setAlertCreated] = useState(false)
  const [filters, setFilters] = useState(["Hybrid", "React", "Bengaluru"])
  const [location, setLocation] = useState("")
  const [sort, setSort] = useState("match")
  const [compare, setCompare] = useState<string[]>([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [insightJob, setInsightJob] = useState<string | null>(null)
  const [toast, setToast] = useState("")
  const marketJobs = [
    {
      title: "Senior React Developer",
      company: "Zentrix Labs",
      initial: "Z",
      rating: "4.3",
      location: "Bengaluru",
      mode: "Hybrid",
      salary: "18–26 LPA",
      experience: "4–7 yrs",
      skills: ["React", "TypeScript", "GraphQL", "Jest"],
      match: 92,
      posted: "2 days ago",
      postedDays: 2,
      salaryMin: 18,
      response: "Usually responds in 2 days",
      applicants: 38,
      commute: "28 min from your preference",
      verified: true,
      missing: "AWS",
      culture: "4.6",
      growth: "High",
    },
    {
      title: "Frontend Engineer II",
      company: "Paytrail",
      initial: "P",
      rating: "4.1",
      location: "Pune",
      mode: "Remote",
      salary: "14–20 LPA",
      experience: "3–5 yrs",
      skills: ["React", "Redux", "CSS", "Webpack"],
      match: 86,
      posted: "1 day ago",
      postedDays: 1,
      salaryMin: 14,
      response: "Usually responds in 4 days",
      applicants: 64,
      commute: "Remote-first team",
      verified: true,
      missing: "Testing strategy",
      culture: "4.3",
      growth: "High",
    },
    {
      title: "React Native Engineer",
      company: "Cleartrip",
      initial: "C",
      rating: "4.4",
      location: "Bengaluru",
      mode: "Hybrid",
      salary: "16–24 LPA",
      experience: "4–6 yrs",
      skills: ["React Native", "TypeScript", "iOS", "Android"],
      match: 84,
      posted: "3 days ago",
      postedDays: 3,
      salaryMin: 16,
      response: "Usually responds in 3 days",
      applicants: 47,
      commute: "34 min from your preference",
      verified: true,
      missing: "Native iOS",
      culture: "4.4",
      growth: "Medium",
    },
  ]
  const workModeFilters = filters.filter((item) =>
    ["Remote", "Hybrid", "On-site"].includes(item),
  )
  const salaryFilters = filters.filter((item) =>
    ["0–10 LPA", "10–20 LPA", "20+ LPA"].includes(item),
  )
  const shown = marketJobs
    .filter((job) =>
      `${job.title} ${job.company} ${job.skills.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().replace(" developer", "")),
    )
    .filter(
      (job) =>
        !location ||
        `${job.location} ${job.mode}`
          .toLowerCase()
          .includes(location.toLowerCase()),
    )
    .filter(
      (job) => !workModeFilters.length || workModeFilters.includes(job.mode),
    )
    .filter(
      (job) =>
        !salaryFilters.length ||
        salaryFilters.some((filter) =>
          filter === "20+ LPA"
            ? job.salaryMin >= 20
            : filter === "10–20 LPA"
              ? job.salaryMin >= 10 && job.salaryMin < 20
              : job.salaryMin < 10,
        ),
    )
    .sort((a, b) =>
      sort === "salary"
        ? b.salaryMin - a.salaryMin
        : sort === "recent"
          ? a.postedDays - b.postedDays
          : b.match - a.match,
    )
  const toggleFilter = (filter: string) =>
    setFilters(
      filters.includes(filter)
        ? filters.filter((item) => item !== filter)
        : [...filters, filter],
    )
  const selectedInsight = marketJobs.find((job) => job.title === insightJob)
  const comparedJobs = marketJobs.filter((job) => compare.includes(job.title))

  return (
    <>
      <div className="marketplace-heading">
        <div>
          <span className="eyebrow">Discover opportunities</span>
          <h1>Find jobs</h1>
          <p>1,240 jobs for “{query || "all roles"}”</p>
        </div>
        <Select
          aria-label="Sort jobs"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="match">Sort: Best match</option>
          <option value="recent">Sort: Most recent</option>
          <option value="salary">Sort: Salary</option>
        </Select>
      </div>
      <Card className="market-search">
        <div className="search-box">
          <Search />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Job title, skill, or company"
          />
        </div>
        <div className="search-box">
          <MapPin />
          <Input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Bengaluru, Mumbai, Remote"
          />
        </div>
        <Button
          onClick={() => setToast(`${shown.length} matching roles found`)}
        >
          Search jobs
        </Button>
      </Card>
      <div className="market-layout reference-market-layout">
        <aside>
          <Card className="job-filters reference-job-filters">
            {[
              ["Work mode", ["Remote", "Hybrid", "On-site"]],
              ["Salary", ["0–10 LPA", "10–20 LPA", "20+ LPA"]],
              ["Freshness", ["Today", "Last 3 days", "Last week"]],
              ["Job type", ["Full-time", "Contract", "Internship"]],
            ].map(([group, options]) => (
              <div className="market-filter-group" key={group as string}>
                <h3>{group as string}</h3>
                {(options as string[]).map((option) => (
                  <label className="market-check-row" key={option}>
                    <Input
                      type="checkbox"
                      checked={filters.includes(option)}
                      onChange={() => toggleFilter(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
          </Card>
        </aside>
        <section className="job-results reference-job-results">
          <div className="active-filter-row">
            <div>
              {filters.slice(0, 3).map((filter) => (
                <Button
                  variant="ghost"
                  className="filter-chip"
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter} <span>×</span>
                </Button>
              ))}
              <Button variant="ghost" onClick={() => setFilters([])}>
                Clear all
              </Button>
            </div>
          </div>
          <div className="job-alert-banner">
            <BellPlus />
            <span>
              <strong>
                {alertCreated
                  ? "Your alert is active."
                  : "Get notified when new jobs match this search."}
              </strong>
              {alertCreated && (
                <small>We’ll notify you about relevant roles.</small>
              )}
            </span>
            <Button onClick={() => setAlertCreated(!alertCreated)}>
              {alertCreated ? "Alert created" : "Create alert"}
            </Button>
          </div>
          {shown.map((job) => (
            <Card className="market-job reference-market-job" key={job.title}>
              <div className="market-job-top">
                <span className="company-logo">{job.initial}</span>
                <div>
                  <h2>{job.title}</h2>
                  <p>
                    {job.company}
                    {job.verified && (
                      <BadgeCheck className="verified-company" />
                    )}
                    · <Star className="rating-star" /> {job.rating}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="match-detail-button"
                  onClick={() => setInsightJob(job.title)}
                >
                  <Badge tone="green">{job.match}% match</Badge>
                  <ChevronRight />
                </Button>
              </div>
              <div className="job-meta">
                <span>
                  <MapPin /> {job.location} · {job.mode}
                </span>
                <span>
                  <IndianRupee /> {job.salary}
                </span>
                <span>
                  <BriefcaseBusiness /> {job.experience}
                </span>
              </div>
              <div className="market-skill-row">
                {job.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
              <div className="market-job-foot">
                <span className="compare-control">
                  <Input
                    type="checkbox"
                    checked={compare.includes(job.title)}
                    onChange={() =>
                      setCompare(
                        compare.includes(job.title)
                          ? compare.filter((item) => item !== job.title)
                          : compare.length < 3
                            ? [...compare, job.title]
                            : compare,
                      )
                    }
                  />
                  Compare
                  <small>{job.posted}</small>
                </span>
                <span>
                  <Button
                    variant="secondary"
                    aria-label={`Save ${job.title}`}
                    onClick={() =>
                      setSaved(
                        saved.includes(job.title)
                          ? saved.filter((item) => item !== job.title)
                          : [...saved, job.title],
                      )
                    }
                  >
                    <Bookmark
                      className={saved.includes(job.title) ? "filled" : ""}
                    />
                  </Button>
                  <Button onClick={() => setApply(job.title)}>
                    Easy apply
                  </Button>
                </span>
              </div>
            </Card>
          ))}
          {!shown.length && (
            <Card className="market-no-results">
              <Search />
              <h2>No exact matches found</h2>
              <p>Try removing a keyword or clearing your filters.</p>
              <Button variant="secondary" onClick={() => setQuery("")}>
                Clear search
              </Button>
            </Card>
          )}
        </section>
      </div>
      {compare.length > 0 && (
        <div className="compare-dock">
          <span className="compare-dock-icon">
            <GitCompareArrows />
          </span>
          <span>
            <strong>
              {compare.length} role{compare.length > 1 ? "s" : ""} selected
            </strong>
            <small>Select up to 3 jobs for side-by-side comparison</small>
          </span>
          <div className="compare-company-list">
            {comparedJobs.map((job) => (
              <span className="company-logo" key={job.title}>
                {job.initial}
              </span>
            ))}
          </div>
          <Button variant="ghost" onClick={() => setCompare([])}>
            Clear
          </Button>
          <Button
            disabled={compare.length < 2}
            onClick={() => setCompareOpen(true)}
          >
            Compare jobs
          </Button>
        </div>
      )}
      <Modal
        open={!!selectedInsight}
        onClose={() => setInsightJob(null)}
        title={`Why this role matches you`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setInsightJob(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setApply(selectedInsight?.title || null)
                setInsightJob(null)
              }}
            >
              Apply with this profile
            </Button>
          </>
        }
      >
        {selectedInsight && (
          <div className="fit-insight">
            <div className="fit-insight-hero">
              <span>
                <strong>{selectedInsight.match}%</strong>
                <small>evidence-based fit</small>
              </span>
              <div>
                <Badge tone="purple">Advisory, not a hiring decision</Badge>
                <h3>{selectedInsight.title}</h3>
                <p>{selectedInsight.company}</p>
              </div>
            </div>
            {[
              [
                "Skills evidence",
                94,
                "Your React and TypeScript work samples strongly support this role.",
              ],
              [
                "Experience alignment",
                88,
                "Your 6 years of product experience sits within the requested range.",
              ],
              [
                "Work preferences",
                96,
                `${selectedInsight.mode} and ${selectedInsight.location} match your preferences.`,
              ],
            ].map(([label, value, text]) => (
              <div className="fit-factor" key={String(label)}>
                <span>
                  <strong>{label}</strong>
                  <b>{value}%</b>
                </span>
                <Progress value={Number(value)} tone="purple" />
                <p>{text}</p>
              </div>
            ))}
            <div className="fit-gap">
              <CircleAlert />
              <span>
                <strong>Potential gap: {selectedInsight.missing}</strong>
                <p>
                  This skill was not found in your profile. You can still apply
                  and add relevant evidence if available.
                </p>
              </span>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        title="Compare opportunities"
        footer={<Button onClick={() => setCompareOpen(false)}>Done</Button>}
      >
        <div className="job-compare-grid">
          <span />
          {comparedJobs.map((job) => (
            <div className="compare-job-head" key={job.title}>
              <span className="company-logo">{job.initial}</span>
              <strong>{job.title}</strong>
              <small>{job.company}</small>
            </div>
          ))}
          {[
            ["Profile match", "match", "%"],
            ["Salary", "salary", ""],
            ["Culture", "culture", "/5"],
            ["Growth", "growth", ""],
            ["Response", "response", ""],
          ].map(([label, key, suffix]) => (
            <Fragment key={label}>
              <strong className="compare-label">{label}</strong>
              {comparedJobs.map((job) => (
                <span key={`${job.title}-${key}`}>
                  {String(job[(key as keyof typeof job)])}
                  {suffix}
                </span>
              ))}
            </Fragment>
          ))}
        </div>
      </Modal>
      <Modal
        open={!!apply}
        onClose={() => setApply(null)}
        title={`Apply to ${apply}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setApply(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setToast(`Application submitted to ${apply}`)
                setApply(null)
              }}
            >
              Submit application
            </Button>
          </>
        }
      >
        <div className="application-preview">
          <CheckCircle2 />
          <div>
            <strong>Your profile is ready</strong>
            <p>
              We’ll share your Talent Network profile and selected resume with
              this employer.
            </p>
          </div>
        </div>
        <label>
          Resume
          <Select>
            <option>Priya_Sharma_Product_Designer.pdf</option>
          </Select>
        </label>
        <label>
          Why are you interested?
          <textarea className="textarea" placeholder="Share a short note…" />
        </label>
        <label className="application-consent-row">
          <Input type="checkbox" defaultChecked />
          <span>
            <strong>Share my verified Career Passport</strong>
            <small>
              Includes work-sample evidence, verified skills, and profile
              preferences.
            </small>
          </span>
        </label>
      </Modal>
      {toast && (
        <div className="toast">
          <CheckCircle2 /> {toast}
          <Button variant="ghost" onClick={() => setToast("")}>
            ×
          </Button>
        </div>
      )}
    </>
  )
}

export function CandidateApplicationsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] =
    useState<"all" | "interview" | "offer" | "review">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedId, setSelectedId] = useState("app-1")
  const [viewMode, setViewMode] = useState<"split" | "grid">("split")
  const [sortBy, setSortBy] = useState("Recent")
  const [checkedAgenda, setCheckedAgenda] = useState<Record<string, boolean>>(
    {},
  )

  const toggleCheck = (idx: number) => {
    setCheckedAgenda((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const applicationData = [
    {
      id: "app-1",
      company: "Nexora Labs",
      initials: "NL",
      avatarBg: "#7c3aed",
      role: "Senior Product Designer",
      location: "Bengaluru · Hybrid",
      salary: "₹28L – ₹36L",
      appliedDate: "Oct 18, 2026",
      statusLabel: "Interview Scheduled",
      statusType: "interview",
      badgeBg: "rgba(124, 58, 237, 0.1)",
      badgeColor: "#7c3aed",
      currentStageIndex: 3, // 0-indexed: 3 = Portfolio Review (4th step)
      steps: [
        { label: "Applied", date: "Oct 18", state: "done" },
        { label: "Resume Screening", date: "Oct 20", state: "done" },
        { label: "Recruiter Chat", date: "Oct 24", state: "done" },
        { label: "Portfolio Review", date: "Nov 5", state: "current" },
        { label: "Executive Alignment", date: "Pending", state: "pending" },
        { label: "Final Offer", date: "Pending", state: "pending" },
      ],
      nextInterview: {
        title: "Technical Portfolio Deep-Dive with Design Lead",
        time: "Tomorrow, Nov 5 at 10:00 AM IST",
        contact: "Contact: Neha Kapoor / Lead Talent Partner",
      },
      agenda: [
        "Portfolio walkthrough (15 min)",
        "Design process & decisions (15 min)",
        "Problem-solving discussion (15 min)",
        "Q&A (10 min)",
      ],
      notes: "Focus on checkout telemetry and Blade Design System scale.",
    },
    {
      id: "app-2",
      company: "Swiggy",
      initials: "SW",
      avatarBg: "#ea580c",
      role: "Staff Product Designer",
      location: "Bengaluru · Hybrid",
      salary: "₹38L – ₹48L + ESOPs",
      appliedDate: "Oct 2, 2026",
      statusLabel: "Offer Extended",
      statusType: "offer",
      badgeBg: "rgba(16, 185, 129, 0.12)",
      badgeColor: "#059669",
      currentStageIndex: 5,
      steps: [
        { label: "Applied", date: "Oct 2", state: "done" },
        { label: "Resume Screening", date: "Oct 5", state: "done" },
        { label: "Recruiter Chat", date: "Oct 12", state: "done" },
        { label: "Design Challenge", date: "Oct 19", state: "done" },
        { label: "Leadership Alignment", date: "Oct 26", state: "done" },
        { label: "Offer Extended", date: "Nov 2", state: "current" },
      ],
      nextInterview: {
        title: "Formal Offer Packet & Equity Structure Discussion",
        time: "Offer Acceptance Deadline: Nov 15",
        contact: "Contact: Meera Shah / Senior People Partner",
      },
      agenda: [
        "Compensation breakdown review (15 min)",
        "ESOP vesting & cliff structure (15 min)",
        "Benefits, insurance & perks (10 min)",
        "Joining date & team onboarding (10 min)",
      ],
      notes:
        "Competitive package with standard 4-year vesting and joining bonus.",
    },
    {
      id: "app-3",
      company: "PhonePe",
      initials: "PP",
      avatarBg: "#4f46e5",
      role: "Lead Interaction Designer",
      location: "Hyderabad · Hybrid",
      salary: "₹34L – ₹44L",
      appliedDate: "Oct 22, 2026",
      statusLabel: "Technical Round",
      statusType: "interview",
      badgeBg: "rgba(37, 99, 235, 0.12)",
      badgeColor: "#2563eb",
      currentStageIndex: 2,
      steps: [
        { label: "Applied", date: "Oct 22", state: "done" },
        { label: "Resume Screening", date: "Oct 25", state: "done" },
        { label: "Recruiter Screen", date: "Oct 29", state: "done" },
        { label: "Interaction Deep-Dive", date: "Nov 8", state: "current" },
        { label: "VP Product Review", date: "Pending", state: "pending" },
        { label: "Offer Decision", date: "Pending", state: "pending" },
      ],
      nextInterview: {
        title: "System Architecture & Interaction Prototype Presentation",
        time: "Friday, Nov 8 at 3:00 PM IST",
        contact: "Contact: Arvind R / Engineering & Design Recruiter",
      },
      agenda: [
        "Offline-first payment prototype demo (20 min)",
        "Interaction architecture review (15 min)",
        "Scalability & edge cases review (15 min)",
        "Q&A with engineering panel (10 min)",
      ],
      notes: "Prepare offline-first micro-interaction demo on Figma.",
    },
    {
      id: "app-4",
      company: "CRED",
      initials: "CR",
      avatarBg: "#18181b",
      role: "Principal Product Designer",
      location: "Bengaluru · On-site",
      salary: "₹45L – ₹60L",
      appliedDate: "Oct 12, 2026",
      statusLabel: "Final Stage",
      statusType: "interview",
      badgeBg: "rgba(124, 58, 237, 0.12)",
      badgeColor: "#7c3aed",
      currentStageIndex: 4,
      steps: [
        { label: "Applied", date: "Oct 12", state: "done" },
        { label: "Portfolio Screen", date: "Oct 16", state: "done" },
        { label: "Domain Deep-Dive", date: "Oct 23", state: "done" },
        { label: "Cross-Functional Panel", date: "Oct 30", state: "done" },
        { label: "Executive Alignment", date: "Nov 12", state: "current" },
        { label: "Offer Decision", date: "Pending", state: "pending" },
      ],
      nextInterview: {
        title: "Executive Panel with Kunal Shah & Design Leadership",
        time: "Tuesday, Nov 12 at 4:30 PM IST",
        contact: "Contact: Aditya Roy / Leadership Talent Partner",
      },
      agenda: [
        "Design philosophy & taste alignment (20 min)",
        "High-trust financial product thesis (20 min)",
        "Culture & leadership expectations (15 min)",
        "Mutual Q&A (10 min)",
      ],
      notes:
        "Lead with first-principles business thesis and member experience craft.",
    },
    {
      id: "app-5",
      company: "Razorpay",
      initials: "RZ",
      avatarBg: "#2563eb",
      role: "Lead Design Architect",
      location: "Bengaluru · Hybrid",
      salary: "₹40L – ₹52L",
      appliedDate: "Oct 28, 2026",
      statusLabel: "In Review",
      statusType: "review",
      badgeBg: "rgba(245, 158, 11, 0.14)",
      badgeColor: "#d97706",
      currentStageIndex: 1,
      steps: [
        { label: "Applied", date: "Oct 28", state: "done" },
        { label: "Portfolio Review", date: "In Progress", state: "current" },
        { label: "Hiring Manager Screen", date: "Pending", state: "pending" },
        { label: "System Design Panel", date: "Pending", state: "pending" },
        { label: "Founder Alignment", date: "Pending", state: "pending" },
        { label: "Offer Decision", date: "Pending", state: "pending" },
      ],
      nextInterview: {
        title: "Resume & Portfolio Screening Review",
        time: "Expected feedback by Nov 7",
        contact: "Contact: Talent Acquisition Team",
      },
      agenda: [
        "Application dossier under hiring manager review",
        "Design system metrics verification",
        "Initial recruiter outreach call pending",
        "Target team fit alignment",
      ],
      notes: "Resume tailored with Blade 3.0 metrics.",
    },
  ]

  const filteredApps = applicationData.filter((app) => {
    const matchesSearch =
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false

    if (filter === "interview") return app.statusType === "interview"
    if (filter === "offer") return app.statusType === "offer"
    if (filter === "review") return app.statusType === "review"
    return true
  })

  const selectedApp =
    applicationData.find((a) => a.id === selectedId) || applicationData[0]

  return (
    <div
      className="page"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Top Header Bar matching Mockup */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(124, 58, 237, 0.12)",
              color: "#7c3aed",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                margin: 0,
                color: "var(--ink)",
                letterSpacing: "normal",
              }}
            >
              My Applications
            </h1>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 13.5,
                margin: "2px 0 0",
              }}
            >
              Track stage progression, review interview agendas, and manage
              active offer packets.
            </p>
          </div>
        </div>

        {/* Search, Notifications & Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 12px",
              height: 38,
              borderRadius: 999,
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              width: 280,
            }}
          >
            <Search size={15} color="var(--faint)" />
            <input
              type="text"
              placeholder="Search applications, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 0,
                outline: 0,
                background: "transparent",
                fontSize: 13,
                width: "100%",
                color: "var(--ink)",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "var(--muted)",
                background: "var(--surface-2)",
                padding: "2px 6px",
                borderRadius: 4,
                border: "1px solid var(--border)",
                whiteSpace: "nowrap",
                fontWeight: 600,
              }}
            >
              Ctrl + K
            </span>
          </div>

          <button
            type="button"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--ink)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Bell size={17} />
            <span
              style={{
                position: "absolute",
                top: 8,
                right: 9,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#7c3aed",
              }}
            />
          </button>

          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "#7c3aed",
              color: "#ffffff",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            SC
          </div>
        </div>
      </div>

      {/* 4 KPI Cards with Exact Waves matching Figma */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        style={{ width: "100%" }}
      >
        {/* Card 1: Total Applications */}
        <Card
          className="flex items-center gap-3.5"
          style={{
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderRadius: 16,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#f5f3ff",
              color: "#7c3aed",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Layers size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontSize: 12.5,
                color: "#64748b",
                fontWeight: 500,
                display: "block",
              }}
            >
              Total Applications
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 2,
                gap: 8,
              }}
            >
              <strong
                style={{
                  fontSize: 21,
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "normal",
                }}
              >
                5 submitted
              </strong>
              <svg
                width="50"
                height="20"
                viewBox="0 0 50 20"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M2 14 C 12 14, 18 4, 28 10 C 38 16, 44 4, 48 6"
                  stroke="#8b5cf6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 11.5,
                color: "#94a3b8",
                display: "block",
                marginTop: 2,
              }}
            >
              All verified employers
            </span>
          </div>
        </Card>

        {/* Card 2: Active Interviews */}
        <Card
          className="flex items-center gap-3.5"
          style={{
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderRadius: 16,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#eff6ff",
              color: "#2563eb",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <CalendarDays size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontSize: 12.5,
                color: "#64748b",
                fontWeight: 500,
                display: "block",
              }}
            >
              Active Interviews
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 2,
                gap: 8,
              }}
            >
              <strong
                style={{
                  fontSize: 21,
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "normal",
                }}
              >
                3 scheduled
              </strong>
              <svg
                width="50"
                height="20"
                viewBox="0 0 50 20"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M2 15 C 14 15, 20 18, 29 9 C 37 2, 43 14, 48 6"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 11.5,
                color: "#94a3b8",
                display: "block",
                marginTop: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Nexora Labs, PhonePe, CRED
            </span>
          </div>
        </Card>

        {/* Card 3: Offers In Hand */}
        <Card
          className="flex items-center gap-3.5"
          style={{
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderRadius: 16,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#f0fdf4",
              color: "#16a34a",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <CheckCircle2 size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontSize: 12.5,
                color: "#64748b",
                fontWeight: 500,
                display: "block",
              }}
            >
              Offers In Hand
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 2,
                gap: 8,
              }}
            >
              <strong
                style={{
                  fontSize: 21,
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "normal",
                }}
              >
                1 extended
              </strong>
              <svg
                width="50"
                height="20"
                viewBox="0 0 50 20"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M2 17 C 12 17, 20 13, 30 9 C 38 5, 43 3, 48 2"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 11.5,
                color: "#94a3b8",
                display: "block",
                marginTop: 2,
              }}
            >
              Swiggy (₹38L – ₹48L)
            </span>
          </div>
        </Card>

        {/* Card 4: Avg Response Speed */}
        <Card
          className="flex items-center gap-3.5"
          style={{
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderRadius: 16,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#fff7ed",
              color: "#ea580c",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontSize: 12.5,
                color: "#64748b",
                fontWeight: 500,
                display: "block",
              }}
            >
              Avg Response Speed
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 2,
                gap: 8,
              }}
            >
              <strong
                style={{
                  fontSize: 21,
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "normal",
                }}
              >
                3.2 days
              </strong>
              <svg
                width="50"
                height="20"
                viewBox="0 0 50 20"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M2 14 C 12 14, 18 16, 28 11 C 36 6, 42 10, 48 7"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 11.5,
                color: "#94a3b8",
                display: "block",
                marginTop: 2,
              }}
            >
              Industry standard: 7–10 days
            </span>
          </div>
        </Card>
      </div>

      {/* Filter and View Controls Row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        {/* Left Filter Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {[
            {
              id: "all",
              label: "All Applications",
              count: applicationData.length,
            },
            { id: "interview", label: "Interviews", count: 3 },
            { id: "offer", label: "Offers", count: 1 },
            { id: "review", label: "In Review", count: 1 },
          ].map((tab) => {
            const isActive = filter === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                style={{
                  height: 36,
                  padding: "0 16px",
                  borderRadius: 999,
                  border: isActive ? "0" : "1px solid var(--border-strong)",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  background: isActive ? "#7c3aed" : "var(--surface)",
                  color: isActive ? "#ffffff" : "var(--ink)",
                  boxShadow: isActive
                    ? "0 4px 12px rgba(124, 58, 237, 0.25)"
                    : "0 1px 2px rgba(0,0,0,0.04)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.15s ease",
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 999,
                    background: isActive
                      ? "rgba(255, 255, 255, 0.25)"
                      : "var(--surface-2)",
                    color: isActive ? "#ffffff" : "var(--muted)",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right Sort & View Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              height: 36,
              padding: "0 14px",
              borderRadius: 10,
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "var(--ink)",
              fontWeight: 500,
            }}
          >
            <span style={{ color: "var(--muted)" }}>Sort:</span>
            <strong>{sortBy}</strong>
            <ChevronDown size={14} color="var(--muted)" />
          </div>

          <div
            style={{
              display: "inline-flex",
              padding: 2,
              borderRadius: 10,
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode("split")}
              style={{
                width: 32,
                height: 30,
                borderRadius: 8,
                border: 0,
                background:
                  viewMode === "split"
                    ? "rgba(124, 58, 237, 0.12)"
                    : "transparent",
                color: viewMode === "split" ? "#7c3aed" : "var(--muted)",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              style={{
                width: 32,
                height: 30,
                borderRadius: 8,
                border: 0,
                background:
                  viewMode === "grid"
                    ? "rgba(124, 58, 237, 0.12)"
                    : "transparent",
                color: viewMode === "grid" ? "#7c3aed" : "var(--muted)",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Split View Layout (Master-Detail) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "360px minmax(0, 1fr)",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN: Applications List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredApps.map((app) => {
            const isSelected = app.id === selectedId
            return (
              <div
                key={app.id}
                onClick={() => setSelectedId(app.id)}
                style={{
                  padding: "16px 18px",
                  borderRadius: 16,
                  background: "var(--surface)",
                  border: isSelected
                    ? "2px solid #7c3aed"
                    : "1px solid var(--border)",
                  boxShadow: isSelected
                    ? "0 4px 16px rgba(124, 58, 237, 0.12)"
                    : "var(--shadow)",
                  cursor: "pointer",
                  transition: "all 0.16s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {/* Top Row: Avatar + Titles + Status Badge */}
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: app.avatarBg,
                      color: "#ffffff",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {app.initials}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <strong
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--ink)",
                          display: "block",
                          lineHeight: 1.3,
                        }}
                      >
                        {app.role}
                      </strong>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 8px",
                          borderRadius: 999,
                          background: app.badgeBg,
                          color: app.badgeColor,
                          whiteSpace: "nowrap",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {app.statusType === "interview" && (
                          <Calendar size={11} />
                        )}
                        {app.statusType === "offer" && (
                          <CheckCircle2 size={11} />
                        )}
                        {app.statusType === "review" && <Star size={11} />}
                        {app.statusLabel}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--muted)",
                        display: "block",
                        marginTop: 2,
                      }}
                    >
                      {app.company}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Metadata Chips */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 8,
                    borderTop: "1px solid var(--border)",
                    fontSize: 11.5,
                    color: "var(--muted)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <MapPin size={12} color="var(--faint)" />
                      {app.location}
                    </span>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <IndianRupee size={12} color="var(--faint)" />
                      {app.salary}
                    </span>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Calendar size={12} color="var(--faint)" />
                      Applied {app.appliedDate.replace(", 2026", "")}
                    </span>
                  </div>
                  <ChevronRight
                    size={15}
                    color={isSelected ? "#7c3aed" : "var(--faint)"}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT COLUMN: Selected Application Master Detail */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Header Card for Selected Application */}
          <Card
            style={{
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Company & Role Details Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: selectedApp.avatarBg,
                    color: "#ffffff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    fontSize: 17,
                    flexShrink: 0,
                  }}
                >
                  {selectedApp.initials}
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      margin: 0,
                      color: "var(--ink)",
                      letterSpacing: "normal",
                    }}
                  >
                    {selectedApp.company}
                  </h2>
                  <div
                    style={{
                      fontSize: 14.5,
                      color: "var(--ink)",
                      fontWeight: 500,
                      marginTop: 2,
                    }}
                  >
                    {selectedApp.role}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginTop: 6,
                      fontSize: 12,
                      color: "var(--muted)",
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <MapPin size={13} color="var(--faint)" />
                      {selectedApp.location}
                    </span>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <IndianRupee size={13} color="var(--faint)" />
                      {selectedApp.salary}
                    </span>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Calendar size={13} color="var(--faint)" />
                      Applied on {selectedApp.appliedDate}
                    </span>
                  </div>
                </div>
              </div>

              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: 999,
                  background: selectedApp.badgeBg,
                  color: selectedApp.badgeColor,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {selectedApp.statusType === "interview" && (
                  <Calendar size={13} />
                )}
                {selectedApp.statusType === "offer" && (
                  <CheckCircle2 size={13} />
                )}
                {selectedApp.statusType === "review" && <Star size={13} />}
                {selectedApp.statusLabel}
              </span>
            </div>

            {/* Application Progress Stepper */}
            <div
              style={{ paddingTop: 10, borderTop: "1px solid var(--border)" }}
            >
              <strong
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "var(--ink)",
                  display: "block",
                  marginBottom: 18,
                }}
              >
                Application Progress
              </strong>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  position: "relative",
                  padding: "0 10px",
                }}
              >
                {/* Horizontal connecting background line */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 30,
                    right: 30,
                    height: 2,
                    background: "var(--border)",
                    zIndex: 0,
                  }}
                />

                {selectedApp.steps.map((step, idx) => {
                  const isDone = step.state === "done"
                  const isCurrent = step.state === "current"
                  return (
                    <div
                      key={step.label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 6,
                        position: "relative",
                        zIndex: 1,
                        width: 90,
                      }}
                    >
                      {/* Circle Node */}
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: isDone
                            ? "#7c3aed"
                            : isCurrent
                              ? "#ffffff"
                              : "#ffffff",
                          border: isDone
                            ? "2px solid #7c3aed"
                            : isCurrent
                              ? "2px solid #7c3aed"
                              : "2px solid var(--border-strong)",
                          color: isDone
                            ? "#ffffff"
                            : isCurrent
                              ? "#7c3aed"
                              : "var(--faint)",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          boxShadow: isCurrent
                            ? "0 0 0 4px rgba(124, 58, 237, 0.15)"
                            : "none",
                        }}
                      >
                        {isDone ? (
                          <Check size={14} strokeWidth={3} />
                        ) : isCurrent ? (
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "#7c3aed",
                            }}
                          />
                        ) : (
                          idx + 1
                        )}
                      </div>

                      {/* Step Title & Subtitle */}
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: isCurrent ? 700 : 500,
                          color: isCurrent
                            ? "var(--ink)"
                            : isDone
                              ? "var(--ink)"
                              : "var(--faint)",
                          lineHeight: 1.25,
                        }}
                      >
                        {step.label}
                      </span>
                      <small
                        style={{
                          fontSize: 11,
                          color: isCurrent
                            ? "var(--ink)"
                            : isDone
                              ? "var(--muted)"
                              : "var(--faint)",
                          fontWeight: isCurrent ? 700 : 400,
                        }}
                      >
                        {step.date}
                      </small>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Two Cards Row: Next Interview + Interview Agenda */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr",
                gap: 14,
              }}
            >
              {/* Next Interview Card */}
              <div
                style={{
                  padding: 18,
                  borderRadius: 14,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: "#7c3aed",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      <Calendar size={15} />
                      <span>Next Interview</span>
                    </div>
                  </div>

                  <strong
                    style={{
                      fontSize: 14.5,
                      color: "var(--ink)",
                      fontWeight: 700,
                      lineHeight: 1.35,
                      display: "block",
                    }}
                  >
                    {selectedApp.nextInterview.title}
                  </strong>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      marginTop: 10,
                      fontSize: 12,
                      color: "var(--muted)",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <Calendar size={13} color="var(--faint)" />
                      <span>{selectedApp.nextInterview.time}</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <UserRound size={13} color="var(--faint)" />
                      <span>{selectedApp.nextInterview.contact}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Button
                    onClick={() => navigate("/candidate/interviews")}
                    style={{
                      flex: 1,
                      height: 36,
                      fontSize: 12.5,
                      background: "#7c3aed",
                      color: "#ffffff",
                      borderRadius: 10,
                      border: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <span>Prepare Round</span>
                    <ArrowRight size={14} />
                  </Button>
                  <Button
                    variant="secondary"
                    style={{
                      height: 36,
                      fontSize: 12.5,
                      borderRadius: 10,
                      borderColor: "#7c3aed",
                      color: "#7c3aed",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <CalendarPlus size={14} />
                    <span>Add to Calendar</span>
                  </Button>
                </div>
              </div>

              {/* Interview Agenda Card */}
              <div
                style={{
                  padding: 18,
                  borderRadius: 14,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--ink)",
                    fontWeight: 700,
                    fontSize: 13.5,
                  }}
                >
                  <ClipboardList size={16} color="#7c3aed" />
                  <span>Interview Agenda</span>
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {selectedApp.agenda.map((item, idx) => {
                    const isChecked =
                      !!checkedAgenda[`${selectedApp.id}-${idx}`]
                    return (
                      <label
                        key={idx}
                        onClick={() => toggleCheck(idx)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          fontSize: 12.5,
                          color: isChecked ? "var(--muted)" : "var(--ink)",
                          textDecoration: isChecked ? "line-through" : "none",
                          cursor: "pointer",
                          lineHeight: 1.4,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          style={{
                            accentColor: "#7c3aed",
                            width: 14,
                            height: 14,
                            cursor: "pointer",
                          }}
                        />
                        <span>{item}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Bottom 3 Quick-Action Cards Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
              }}
            >
              {/* Card 1: Ask Copilot */}
              <div
                onClick={() => navigate("/candidate/assistant")}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(124, 58, 237, 0.12)",
                      color: "#7c3aed",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <strong
                      style={{
                        fontSize: 13,
                        color: "var(--ink)",
                        display: "block",
                      }}
                    >
                      Ask Copilot for Tips
                    </strong>
                    <span
                      style={{
                        fontSize: 11.5,
                        color: "var(--muted)",
                        lineHeight: 1.4,
                        display: "block",
                        marginTop: 2,
                      }}
                    >
                      Get preparation resources, common questions, and
                      round-specific tips.
                    </span>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  color="var(--muted)"
                  style={{ flexShrink: 0 }}
                />
              </div>

              {/* Card 2: View Details */}
              <div
                onClick={() => navigate("/candidate/radar")}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(124, 58, 237, 0.12)",
                      color: "#7c3aed",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FileText size={16} />
                  </div>
                  <div>
                    <strong
                      style={{
                        fontSize: 13,
                        color: "var(--ink)",
                        display: "block",
                      }}
                    >
                      View Details
                    </strong>
                    <span
                      style={{
                        fontSize: 11.5,
                        color: "var(--muted)",
                        lineHeight: 1.4,
                        display: "block",
                        marginTop: 2,
                      }}
                    >
                      Role, JD, requirements, and company notes.
                    </span>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  color="var(--muted)"
                  style={{ flexShrink: 0 }}
                />
              </div>

              {/* Card 3: Update Notes */}
              <div
                onClick={() => navigate("/candidate/profile")}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(124, 58, 237, 0.12)",
                      color: "#7c3aed",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Edit3 size={16} />
                  </div>
                  <div>
                    <strong
                      style={{
                        fontSize: 13,
                        color: "var(--ink)",
                        display: "block",
                      }}
                    >
                      Update Notes
                    </strong>
                    <span
                      style={{
                        fontSize: 11.5,
                        color: "var(--muted)",
                        lineHeight: 1.4,
                        display: "block",
                        marginTop: 2,
                      }}
                    >
                      Add your preparation, learnings, or interviewer notes.
                    </span>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  color="var(--muted)"
                  style={{ flexShrink: 0 }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function CandidateProfileSelfPage() {
  const [saved, setSaved] = useState(false)
  return (
    <>
      <Header
        eyebrow="Your professional profile"
        title="My profile"
        text="Keep your experience current to improve job recommendations."
        action={<Button onClick={() => setSaved(true)}>Save changes</Button>}
      />
      <div className="self-profile-grid">
        <aside>
          <Card className="profile-nav">
            <Button variant="ghost" className="active">
              <UserRound /> Personal information
            </Button>
            <Button variant="ghost">
              <FileText /> Professional summary
            </Button>
            <Button variant="ghost">
              <BriefcaseBusiness /> Experience
            </Button>
            <Button variant="ghost">
              <Target /> Skills
            </Button>
            <Button variant="ghost">
              <Star /> Certifications
            </Button>
          </Card>
          <Card>
            <strong>Profile strength</strong>
            <div className="big-progress">
              <span>82%</span>
              <Progress value={82} />
            </div>
            <p>Add one project and a certification to reach “Standout”.</p>
          </Card>
        </aside>
        <Card className="profile-form">
          <div className="card-head">
            <div>
              <h2>Personal information</h2>
              <p>Visible to employers based on your privacy settings.</p>
            </div>
            <Badge tone="green">Profile visible</Badge>
          </div>
          <div className="form-grid">
            <label>
              First name
              <Input defaultValue="Priya" />
            </label>
            <label>
              Last name
              <Input defaultValue="Sharma" />
            </label>
            <label>
              Email address
              <Input defaultValue="priya.sharma@email.com" />
            </label>
            <label>
              Phone
              <Input defaultValue="+91 98765 43210" />
            </label>
            <label>
              Current location
              <Input defaultValue="Bengaluru, Karnataka" />
            </label>
            <label>
              Preferred locations
              <Input defaultValue="Bengaluru, Remote" />
            </label>
            <label className="span-2">
              Professional headline
              <Input defaultValue="Senior Product Designer · B2B SaaS · Design Systems" />
            </label>
            <label className="span-2">
              Professional summary
              <textarea
                className="textarea"
                defaultValue="Product designer with 7 years of experience crafting thoughtful B2B SaaS products. I enjoy simplifying complex workflows, building scalable design systems, and partnering closely with product and engineering teams."
              />
            </label>
          </div>
          <div className="form-actions">
            <Button variant="secondary">Discard changes</Button>
            <Button onClick={() => setSaved(true)}>Save changes</Button>
          </div>
        </Card>
      </div>
      <Modal
        open={saved}
        onClose={() => setSaved(false)}
        title="Profile updated"
      >
        <div className="application-preview">
          <CheckCircle2 />
          <div>
            <strong>Your changes are live</strong>
            <p>Recruiters with permission can now see your updated profile.</p>
          </div>
        </div>
      </Modal>
    </>
  )
}

export function GenericCandidatePage({ title }: { title: string }) {
  return <FeatureDemoPage portal="Candidate" title={title} />
}
