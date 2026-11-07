import { useState } from "react"
import {
  Sparkles,
  Download,
  Share2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  User,
  CheckCircle,
  FileText,
} from "lucide-react"
import { Button, Input, Card, Badge, Progress } from "../components/ui"

interface Experience {
  id: string
  company: string
  role: string
  period: string
  bullets: string[]
}

export function ResumeBuilderPage() {
  const [template, setTemplate] = useState<"modern" | "classic" | "minimal">(
    "modern",
  )

  // Resume form state
  const [personal, setPersonal] = useState({
    name: "Priya Sharma",
    title: "Senior Product Designer",
    email: "priya.sharma@nexus.design",
    phone: "+91 98450 12890",
    location: "Bengaluru, India",
    linkedin: "linkedin.com/in/priyasharma-ux",
  })

  const [summary, setSummary] = useState(
    "Senior Product Designer with 7+ years of experience leading cross-functional teams across fintech, B2B SaaS, and consumer marketplace platforms. Proven track record scaling design systems from zero to 100+ components and driving 34% onboarding conversion improvements.",
  )

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "exp1",
      company: "Razorpay",
      role: "Senior Product Designer",
      period: "2022 — Present",
      bullets: [
        "Led the end-to-end design of Merchant Checkout 3.0, increasing checkout velocity by 22%",
        "Architected Blade Design System components adopted across 14 product squads",
        "Mentored 4 junior and mid-level designers in interaction design and user testing",
      ],
    },
    {
      id: "exp2",
      company: "Swiggy",
      role: "Product Designer II",
      period: "2019 — 2022",
      bullets: [
        "Designed Swiggy Instamart cart and checkout flow during early product rollout",
        "Ran 40+ usability tests to identify delivery tracking friction, decreasing cancellation by 8%",
      ],
    },
  ])

  const [education, setEducation] = useState([
    {
      degree: "Master of Design (Interaction)",
      institution: "National Institute of Design (NID)",
      year: "2017 — 2019",
    },
    {
      degree: "B.Tech in Computer Science",
      institution: "BITS Pilani",
      year: "2013 — 2017",
    },
  ])

  const [skills, setSkills] = useState([
    "Design Systems",
    "Figma",
    "User Research",
    "Rapid Prototyping",
    "Interaction Design",
    "Information Architecture",
    "Design Ops",
  ])

  const [projects, setProjects] = useState([
    {
      title: "Merchant Checkout 3.0 (Razorpay)",
      link: "razorpay.com/checkout",
      impact:
        "Increased checkout velocity by 22% across 4.2M daily transactions",
      tools: "Figma, React Tokens, Mixpanel",
    },
    {
      title: "Instamart Order Live Tracking (Swiggy)",
      link: "swiggy.com/instamart",
      impact:
        "Reduced delivery status inquiries by 31% with real-time micro-animations",
      tools: "Lottie, After Effects, Protopie",
    },
  ])

  const [certifications, setCertifications] = useState([
    {
      title: "Google UX Design Professional Certificate",
      issuer: "Coursera",
      year: "2023",
    },
    {
      title: "Enterprise Design Thinking Co-Creator",
      issuer: "IBM",
      year: "2021",
    },
  ])

  const [accentColor, setAccentColor] = useState("#2563eb")
  const [newSkill, setNewSkill] = useState("")

  const [expandedSection, setExpandedSection] = useState<string>("personal")

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
  }

  return (
    <div
      className="page"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
            AI Resume Studio
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>
            Tailor, score, and format your career credentials with real-time ATS
            optimization
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            variant="secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Share2 size={15} /> Share Link
          </Button>
          <Button
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Download size={15} /> Download PDF
          </Button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Left Column: Editor & AI Assistant */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* AI Score Banner */}
          <Card
            style={{
              padding: 16,
              background:
                "linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(37, 99, 235, 0.08))",
              borderColor: "rgba(124, 58, 237, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Sparkles size={18} color="var(--purple)" />
                <strong style={{ fontSize: 14 }}>ATS Readiness Score</strong>
              </div>
              <Badge tone="purple">88 / 100 · Strong</Badge>
            </div>
            <div
              style={{
                width: "100%",
                height: 6,
                background: "var(--surface-2)",
                borderRadius: 999,
                overflow: "hidden",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: "88%",
                  height: "100%",
                  background: "linear-gradient(90deg, #7c3aed, #2563eb)",
                  borderRadius: 999,
                }}
              />
            </div>
            <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>
              ✓ High keyword match for Senior Product Designer roles. Suggest
              adding 1 more metric to recent projects.
            </p>
          </Card>

          {/* Section: Personal Details */}
          <Card style={{ padding: 18 }}>
            <div
              onClick={() =>
                setExpandedSection(
                  expandedSection === "personal" ? "" : "personal",
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <User size={16} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: 15 }}>
                  Personal & Contact Details
                </h3>
              </div>
              {expandedSection === "personal" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSection === "personal" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginTop: 14,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Full Name
                  </label>
                  <Input
                    value={personal.name}
                    onChange={(e) =>
                      setPersonal({ ...personal, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Target Role
                  </label>
                  <Input
                    value={personal.title}
                    onChange={(e) =>
                      setPersonal({ ...personal, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Email
                  </label>
                  <Input
                    value={personal.email}
                    onChange={(e) =>
                      setPersonal({ ...personal, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Phone
                  </label>
                  <Input
                    value={personal.phone}
                    onChange={(e) =>
                      setPersonal({ ...personal, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Location
                  </label>
                  <Input
                    value={personal.location}
                    onChange={(e) =>
                      setPersonal({ ...personal, location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    LinkedIn / Portfolio
                  </label>
                  <Input
                    value={personal.linkedin}
                    onChange={(e) =>
                      setPersonal({ ...personal, linkedin: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Section: Professional Summary */}
          <Card style={{ padding: 18 }}>
            <div
              onClick={() =>
                setExpandedSection(
                  expandedSection === "summary" ? "" : "summary",
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FileText size={16} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: 15 }}>Executive Summary</h3>
              </div>
              {expandedSection === "summary" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSection === "summary" && (
              <div style={{ marginTop: 14 }}>
                <textarea
                  className="textarea"
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  style={{ width: "100%", fontSize: 12.5 }}
                />
                <Button
                  variant="secondary"
                  style={{
                    marginTop: 8,
                    height: 32,
                    fontSize: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Sparkles size={14} color="var(--purple)" /> Enhance with AI
                </Button>
              </div>
            )}
          </Card>

          {/* Section: Experience */}
          <Card style={{ padding: 18 }}>
            <div
              onClick={() =>
                setExpandedSection(
                  expandedSection === "experience" ? "" : "experience",
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Briefcase size={16} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: 15 }}>
                  Work Experience ({experiences.length})
                </h3>
              </div>
              {expandedSection === "experience" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSection === "experience" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginTop: 14,
                }}
              >
                {experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <strong style={{ fontSize: 13 }}>
                        {exp.role} · {exp.company}
                      </strong>
                      <span style={{ fontSize: 11.5, color: "var(--muted)" }}>
                        {exp.period}
                      </span>
                    </div>
                    <ul
                      style={{
                        margin: "6px 0 0",
                        paddingLeft: 16,
                        fontSize: 12,
                        color: "var(--ink)",
                        lineHeight: 1.5,
                      }}
                    >
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  style={{
                    height: 32,
                    fontSize: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Plus size={14} /> Add Experience
                </Button>
              </div>
            )}
          </Card>

          {/* Section: Skills */}
          <Card style={{ padding: 18 }}>
            <div
              onClick={() =>
                setExpandedSection(expandedSection === "skills" ? "" : "skills")
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Wrench size={16} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: 15 }}>
                  Skills & Core Competencies
                </h3>
              </div>
              {expandedSection === "skills" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSection === "skills" && (
              <div style={{ marginTop: 14 }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 12,
                  }}
                >
                  {skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        fontSize: 12,
                      }}
                    >
                      {s}
                      <button
                        onClick={() => handleRemoveSkill(s)}
                        style={{
                          border: 0,
                          background: "transparent",
                          color: "var(--faint)",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Input
                    placeholder="Add a new skill (e.g. Next.js, Design Sprints)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                    style={{ height: 34, fontSize: 12 }}
                  />
                  <Button
                    variant="secondary"
                    onClick={handleAddSkill}
                    style={{ height: 34, fontSize: 12 }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Section: Featured Projects */}
          <Card style={{ padding: 18 }}>
            <div
              onClick={() =>
                setExpandedSection(
                  expandedSection === "projects" ? "" : "projects",
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Award size={16} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: 15 }}>
                  Featured Case Studies & Projects ({projects.length})
                </h3>
              </div>
              {expandedSection === "projects" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSection === "projects" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 14,
                }}
              >
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <strong style={{ fontSize: 13 }}>{proj.title}</strong>
                      <span style={{ fontSize: 11, color: "var(--primary)" }}>
                        {proj.link}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "4px 0 2px",
                        fontSize: 12,
                        color: "var(--muted)",
                      }}
                    >
                      {proj.impact}
                    </p>
                    <span style={{ fontSize: 11, color: "var(--faint)" }}>
                      Stack: {proj.tools}
                    </span>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  style={{
                    height: 32,
                    fontSize: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Plus size={14} /> Add Project
                </Button>
              </div>
            )}
          </Card>

          {/* Section: Certifications & Credentials */}
          <Card style={{ padding: 18 }}>
            <div
              onClick={() =>
                setExpandedSection(expandedSection === "certs" ? "" : "certs")
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <GraduationCap size={16} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: 15 }}>
                  Certifications & Honors ({certifications.length})
                </h3>
              </div>
              {expandedSection === "certs" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSection === "certs" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginTop: 14,
                }}
              >
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 10,
                      borderRadius: 8,
                      background: "var(--surface-2)",
                      fontSize: 12,
                    }}
                  >
                    <div>
                      <strong>{cert.title}</strong>
                      <div style={{ color: "var(--muted)", fontSize: 11 }}>
                        {cert.issuer}
                      </div>
                    </div>
                    <Badge tone="green">{cert.year}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* ATS Keyword Optimizer Widget */}
          <Card style={{ padding: 18, background: "var(--surface-2)" }}>
            <h4
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--muted)",
              }}
            >
              ATS Keyword Density Match
            </h4>
            <p
              style={{ margin: "0 0 10px", fontSize: 12, color: "var(--ink)" }}
            >
              Targeting:{" "}
              <strong>Senior / Lead Product Designer (Fintech & SaaS)</strong>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[
                { term: "Design Systems", found: true },
                { term: "Figma Tokens", found: true },
                { term: "User Research", found: true },
                { term: "A/B Testing", found: true },
                { term: "Stakeholder Alignment", found: true },
                { term: "Design Sprints", found: false },
                { term: "Accessibility WCAG 2.1", found: false },
              ].map((kw, i) => (
                <span
                  key={i}
                  style={{
                    padding: "3px 8px",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    background: kw.found
                      ? "var(--green-soft)"
                      : "var(--amber-soft)",
                    color: kw.found ? "var(--green)" : "var(--amber)",
                    border: `1px solid ${
                      kw.found
                        ? "rgba(5, 150, 105, 0.2)"
                        : "rgba(217, 119, 6, 0.2)"
                    }`,
                  }}
                >
                  {kw.found ? "✓ " : "+ Add "} {kw.term}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Live Paper Preview */}
        <div
          style={{
            position: "sticky",
            top: 88,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Template Switcher & Styling Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: "var(--muted)",
                }}
              >
                PALETTE
              </span>
              {["#2563eb", "#7c3aed", "#059669", "#0f172a"].map((c) => (
                <button
                  key={c}
                  onClick={() => setAccentColor(c)}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: c,
                    border: accentColor === c ? "2px solid #fff" : "none",
                    boxShadow: accentColor === c ? "0 0 0 2px " + c : "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: 4 }}>
              {(["modern", "classic", "minimal"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  style={{
                    height: 26,
                    padding: "0 10px",
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    background:
                      template === t ? "var(--primary-soft)" : "transparent",
                    color: template === t ? "var(--primary)" : "var(--muted)",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Document */}
          <div
            style={{
              background: "#ffffff",
              color: "#1e293b",
              borderRadius: 12,
              padding: "36px 32px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              border: "1px solid rgba(0,0,0,0.06)",
              minHeight: 760,
              fontSize: 11.5,
              lineHeight: 1.5,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {/* Header */}
            <div
              style={{
                borderBottom: `2px solid ${accentColor}`,
                paddingBottom: 14,
                marginBottom: 16,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                }}
              >
                {personal.name}
              </h2>
              <div
                style={{
                  fontSize: 13,
                  color: accentColor,
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                {personal.title}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 8,
                  fontSize: 10.5,
                  color: "#64748b",
                }}
              >
                <span>{personal.email}</span>
                <span>•</span>
                <span>{personal.phone}</span>
                <span>•</span>
                <span>{personal.location}</span>
                <span>•</span>
                <span>{personal.linkedin}</span>
              </div>
            </div>

            {/* Summary */}
            <div style={{ marginBottom: 16 }}>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#475569",
                }}
              >
                Executive Profile
              </h4>
              <p style={{ margin: 0, color: "#334155" }}>{summary}</p>
            </div>

            {/* Experience */}
            <div style={{ marginBottom: 16 }}>
              <h4
                style={{
                  margin: "0 0 8px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#475569",
                }}
              >
                Work Experience
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      <span>
                        {exp.role} —{" "}
                        <span style={{ color: accentColor }}>
                          {exp.company}
                        </span>
                      </span>
                      <span style={{ fontSize: 10.5, color: "#64748b" }}>
                        {exp.period}
                      </span>
                    </div>
                    <ul
                      style={{
                        margin: "4px 0 0",
                        paddingLeft: 14,
                        color: "#334155",
                      }}
                    >
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: 2 }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div style={{ marginBottom: 16 }}>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#475569",
                }}
              >
                Key Projects & Impact
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {projects.map((p, idx) => (
                  <div key={idx}>
                    <strong style={{ color: "#0f172a" }}>{p.title}</strong> —{" "}
                    <span style={{ color: "#334155" }}>{p.impact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: 16 }}>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#475569",
                }}
              >
                Core Competencies & Tools
              </h4>
              <p style={{ margin: 0, color: "#334155" }}>
                {skills.join(" • ")}
              </p>
            </div>

            {/* Education & Certs */}
            <div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#475569",
                }}
              >
                Education & Credentials
              </h4>
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 3,
                  }}
                >
                  <span style={{ color: "#0f172a", fontWeight: 600 }}>
                    {edu.degree},{" "}
                    <span style={{ color: "#64748b", fontWeight: 400 }}>
                      {edu.institution}
                    </span>
                  </span>
                  <span style={{ color: "#64748b", fontSize: 10.5 }}>
                    {edu.year}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: 6, fontSize: 10.5, color: "#475569" }}>
                <strong>Certifications:</strong>{" "}
                {certifications
                  .map((c) => `${c.title} (${c.issuer})`)
                  .join("; ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
