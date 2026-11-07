import { useState } from "react"
import {
  Calendar,
  Video,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Award,
  ArrowUpRight,
  Users,
  Mic,
  MessageSquare,
} from "lucide-react"
import { Button, Card, Badge } from "../components/ui"

export function InterviewCenterPage() {
  const [activeTab, setActiveTab] =
    useState<"questions" | "company" | "practice">("questions")
  const [expandedQ, setExpandedQ] = useState<number | null>(0)

  const upcoming = [
    {
      id: "int1",
      role: "Lead Product Designer",
      company: "Razorpay",
      time: "Tomorrow · 2:30 PM",
      duration: "45 mins",
      type: "Technical & Portfolio Deep Dive",
      interviewer: "Rahul Verma (Design Director)",
      status: "Ready",
      statusTone: "green" as const,
    },
    {
      id: "int2",
      role: "Staff UX Architect",
      company: "Zepto Labs",
      time: "Nov 8 · 11:00 AM",
      duration: "60 mins",
      type: "Systems & Architecture",
      interviewer: "Ananya Deshmukh (VP Product)",
      status: "Prep Needed",
      statusTone: "amber" as const,
    },
    {
      id: "int3",
      role: "Principal Designer",
      company: "CRED",
      time: "Nov 12 · 4:00 PM",
      duration: "30 mins",
      type: "Hiring Manager Alignment",
      interviewer: "Kunal Shah & Core Team",
      status: "Scheduled",
      statusTone: "blue" as const,
    },
  ]

  const questions = [
    {
      q: "Walk us through a time you handled strong pushback from Engineering on a design proposal.",
      category: "Behavioral & Stakeholder",
      difficulty: "Medium",
      aiAnswer:
        "Structure with STAR framework: Outline the engineering trade-off (performance/latency vs visual fidelity), how you organized a joint workshop, prototyped lightweight alternatives, and measured the final UX telemetry together.",
    },
    {
      q: "How do you systematically validate design decisions when quantitative user data is sparse?",
      category: "Design Strategy",
      difficulty: "Hard",
      aiAnswer:
        "Highlight qualitative triangulation: rapid moderated guerrilla tests (5 users identify 85% usability blockers), competitive heuristics, customer support query analysis, and staged rollout feedback loops.",
    },
    {
      q: "Describe your methodology for scaling design systems across multiple autonomous squad workflows.",
      category: "Design Systems",
      difficulty: "Hard",
      aiAnswer:
        "Focus on governance and tooling: Token architecture (Figma tokens to CSS/Tailwind), contribution guidelines, automated linting, deprecation cycles, and bi-weekly design system syncs with engineering champions.",
    },
  ]

  return (
    <div
      className="page"
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      {/* Page Header */}
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
            Candidate Interview Center
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>
            Track scheduled panels, practice AI mock questions, and review
            company intelligence dossiers
          </p>
        </div>
        <Button
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <Mic size={15} /> Start AI Mock Session
        </Button>
      </div>

      {/* Upcoming Interviews Strip */}
      <div>
        <h3 style={{ fontSize: 15, margin: "0 0 12px", color: "var(--ink)" }}>
          Upcoming Interview Rounds ({upcoming.length})
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
            gap: 14,
          }}
        >
          {upcoming.map((item) => (
            <Card
              key={item.id}
              style={{
                padding: 18,
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
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <strong
                      style={{
                        fontSize: 15,
                        color: "var(--ink)",
                        display: "block",
                      }}
                    >
                      {item.role}
                    </strong>
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--primary)",
                        fontWeight: 600,
                      }}
                    >
                      {item.company}
                    </span>
                  </div>
                  <Badge tone={item.statusTone}>{item.status}</Badge>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    fontSize: 12,
                    color: "var(--muted)",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Calendar size={13} color="var(--primary)" />
                    <span>
                      {item.time} ({item.duration})
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Video size={13} color="var(--muted)" />
                    <span>{item.type}</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Users size={13} color="var(--muted)" />
                    <span>Panel: {item.interviewer}</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  paddingTop: 10,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <Button
                  variant="secondary"
                  style={{ flex: 1, height: 32, fontSize: 12 }}
                >
                  Review Prep Pack
                </Button>
                <Button style={{ height: 32, fontSize: 12 }}>Join Room</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Two-Column Preparation Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Left Column: Prep Hub */}
        <Card style={{ padding: 20 }}>
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              borderBottom: "1px solid var(--border)",
              paddingBottom: 12,
              marginBottom: 16,
            }}
          >
            {[
              { id: "questions", label: "Top Role Questions" },
              { id: "company", label: "Razorpay Dossier" },
              { id: "practice", label: "AI Speech Practice" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: 0,
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: 600,
                  background:
                    activeTab === t.id ? "var(--primary-soft)" : "transparent",
                  color: activeTab === t.id ? "var(--primary)" : "var(--muted)",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "questions" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 14,
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    background:
                      expandedQ === idx ? "var(--surface-2)" : "var(--surface)",
                  }}
                >
                  <div
                    onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      gap: 10,
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                        <Badge tone="purple">{q.category}</Badge>
                        <Badge tone="neutral">{q.difficulty}</Badge>
                      </div>
                      <strong
                        style={{
                          fontSize: 13,
                          color: "var(--ink)",
                          lineHeight: 1.4,
                          display: "block",
                        }}
                      >
                        {q.q}
                      </strong>
                    </div>
                    <ChevronRight
                      size={16}
                      color="var(--muted)"
                      style={{
                        transform: expandedQ === idx ? "rotate(90deg)" : "none",
                        transition: "0.2s",
                      }}
                    />
                  </div>

                  {expandedQ === idx && (
                    <div
                      style={{
                        marginTop: 12,
                        paddingTop: 10,
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          color: "var(--purple)",
                          fontSize: 12,
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        <Sparkles size={14} /> AI Recommendation Framework
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 12,
                          color: "var(--muted)",
                          lineHeight: 1.55,
                        }}
                      >
                        {q.aiAnswer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "company" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: 16 }}>
                    Razorpay Software Pvt Ltd
                  </h4>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    Fintech Infrastructure · Series F · Bengaluru / Remote
                  </span>
                </div>
                <Badge tone="green">High Transparency</Badge>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  fontSize: 12.5,
                }}
              >
                <div
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    background: "var(--surface-2)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--muted)",
                      display: "block",
                      fontSize: 11,
                    }}
                  >
                    Typical Interview Rounds
                  </span>
                  <strong>3 Technical + 1 Culture Fit</strong>
                </div>
                <div
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    background: "var(--surface-2)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--muted)",
                      display: "block",
                      fontSize: 11,
                    }}
                  >
                    Offer Turnaround
                  </span>
                  <strong>Avg 7 business days</strong>
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                Company prioritizes first-principles problem solving and clear
                articulation of business metrics impacted by design decisions.
              </p>
            </div>
          )}

          {activeTab === "practice" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "20px 10px",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--primary-soft)",
                  color: "var(--primary)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Mic size={24} />
              </div>
              <h4 style={{ margin: 0, fontSize: 16 }}>
                Interactive AI Mock Interviewer
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "var(--muted)",
                  maxWidth: 380,
                }}
              >
                Answer realistic behavioral questions out loud. Get immediate
                feedback on conciseness, pacing, and keyword density.
              </p>
              <Button style={{ marginTop: 8 }}>Launch Audio Practice</Button>
            </div>
          )}
        </Card>

        {/* Right Column: Readiness Score & Past Feedback */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Readiness Score */}
          <Card style={{ padding: 20 }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>
              Interview Readiness
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  border: "4px solid var(--primary)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--primary)",
                }}
              >
                78%
              </div>
              <div>
                <strong style={{ fontSize: 14 }}>Strongly Prepared</strong>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: 12,
                    color: "var(--muted)",
                  }}
                >
                  Your portfolio case studies and metrics alignment are above
                  the 85th percentile.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                {
                  label: "Company & Culture Intel",
                  val: 90,
                  color: "var(--green)",
                },
                {
                  label: "Design Systems & Tech Prep",
                  val: 82,
                  color: "var(--primary)",
                },
                {
                  label: "Behavioral & STAR Answers",
                  val: 68,
                  color: "var(--amber)",
                },
              ].map((m) => (
                <div key={m.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                      marginBottom: 3,
                    }}
                  >
                    <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                      {m.label}
                    </span>
                    <strong style={{ color: m.color }}>{m.val}%</strong>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 6,
                      background: "var(--surface-2)",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${m.val}%`,
                        height: "100%",
                        background: m.color,
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Past Rounds History */}
          <Card style={{ padding: 20 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 15 }}>
              Past Interview Outcomes
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  padding: 10,
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  fontSize: 12,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>Swiggy · Senior UX Designer</strong>
                  <Badge tone="green">Offer Made</Badge>
                </div>
                <p
                  style={{
                    margin: "4px 0 0",
                    color: "var(--muted)",
                    fontSize: 11.5,
                  }}
                >
                  Panel highlighted outstanding user research depth and
                  pragmatic business trade-offs.
                </p>
              </div>
              <div
                style={{
                  padding: 10,
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  fontSize: 12,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>PhonePe · Product Designer II</strong>
                  <Badge tone="blue">Passed Round 2</Badge>
                </div>
                <p
                  style={{
                    margin: "4px 0 0",
                    color: "var(--muted)",
                    fontSize: 11.5,
                  }}
                >
                  Advanced to executive leadership review.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* NEW SECTION 1: Whiteboard & System Design Framework */}
      <Card style={{ padding: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: 17 }}>
              Portfolio & Whiteboard Interview Blueprint
            </h3>
            <p
              style={{ margin: "4px 0 0", fontSize: 13, color: "var(--muted)" }}
            >
              A battle-tested 5-phase methodology for tackling 45-minute live
              design and architecture scenarios
            </p>
          </div>
          <Badge tone="purple">STAR + Design Thinking</Badge>
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
              step: "Phase 1 (5m)",
              title: "Clarify & Constrain",
              desc: "Ask 3 clarifying questions on scale, target user personas, technical constraints, and primary success metrics.",
              tips: "Don't jump into sketches immediately.",
            },
            {
              step: "Phase 2 (10m)",
              title: "Jobs To Be Done",
              desc: "Map the critical user journey flow. Identify friction points, emotional highs/lows, and drop-off risks.",
              tips: "Anchor choices in business outcomes.",
            },
            {
              step: "Phase 3 (15m)",
              title: "Wireframing & States",
              desc: "Sketch primary screen transitions: Happy path, empty state, error state, and loading skeleton states.",
              tips: "Highlight accessibility & token reusability.",
            },
            {
              step: "Phase 4 (10m)",
              title: "Trade-offs & Tech",
              desc: "Explicitly articulate engineering feasibility, API latency considerations, and cross-platform edge cases.",
              tips: "Demonstrate mature cross-squad partnership.",
            },
            {
              step: "Phase 5 (5m)",
              title: "Telemetry & Review",
              desc: "Define the north-star A/B metric (e.g. checkout velocity, activation rate) to validate design success post-launch.",
              tips: "Show executive business acumen.",
            },
          ].map((phase, idx) => (
            <div
              key={idx}
              style={{
                padding: 16,
                borderRadius: 12,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Badge tone="blue">{phase.step}</Badge>
              <strong style={{ fontSize: 14, color: "var(--ink)" }}>
                {phase.title}
              </strong>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                {phase.desc}
              </p>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--primary)",
                  fontWeight: 600,
                  marginTop: "auto",
                }}
              >
                💡 {phase.tips}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* NEW SECTION 2: Negotiation Playbook & Pre-Call Checklist */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: 20,
        }}
      >
        {/* Negotiation Playbook */}
        <Card style={{ padding: 22 }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>
            Compensation & Offer Negotiation Playbook
          </h3>
          <p
            style={{
              margin: "0 0 14px",
              fontSize: 12.5,
              color: "var(--muted)",
              lineHeight: 1.5,
            }}
          >
            Practical talking points for handling salary discussions
            professionally without alienating hiring managers:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                scenario: "When asked for current CTC early on:",
                script:
                  "“I’m prioritizing finding the right mutual fit. Given the scope and impact of this Staff role, I’m targeting the market benchmark of ₹42L–₹50L.”",
              },
              {
                scenario: "Evaluating equity versus base salary trade-offs:",
                script:
                  "“Could you clarify the current valuation, last preferred price, and liquidity windows? I’d be open to an equity-heavy split if vesting is standard 4-year with 1-year cliff.”",
              },
              {
                scenario: "Countering an initial below-median offer:",
                script:
                  "“I’m very excited about the mission at Razorpay. Based on competing conversations and my proven track record in checkout systems, reaching ₹46L base would make this an immediate yes.”",
              },
            ].map((neg, idx) => (
              <div
                key={idx}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <strong
                  style={{
                    fontSize: 12.5,
                    color: "var(--ink)",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {neg.scenario}
                </strong>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "var(--muted)",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                  }}
                >
                  {neg.script}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pre-Call Checklist */}
        <Card style={{ padding: 22 }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>
            Pre-Interview 15-Minute Checklist
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                task: "Hardware & AV check (Camera at eye level, dedicated microphone tested)",
                checked: true,
              },
              {
                task: "Figma portfolio link open in incognito tab with view-only permissions verified",
                checked: true,
              },
              {
                task: "Three quantifiable business metric examples memorized (STAR stories)",
                checked: true,
              },
              {
                task: "Company recent launches and funding news reviewed",
                checked: false,
              },
              {
                task: "5 reverse-interview questions prepared for the panel",
                checked: false,
              },
            ].map((chk, i) => (
              <label
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  defaultChecked={chk.checked}
                  style={{ marginTop: 3 }}
                />
                <span style={{ color: "var(--ink)", lineHeight: 1.4 }}>
                  {chk.task}
                </span>
              </label>
            ))}
          </div>
          <div
            style={{
              marginTop: 18,
              padding: 12,
              borderRadius: 10,
              background: "var(--primary-soft)",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            <span
              style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}
            >
              🎯 Pro Tip: Always end by asking: “What does success look like for
              this designer within their first 90 days?”
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}
