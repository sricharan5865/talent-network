import { useState } from "react"
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Compass,
  MessageSquare,
  HelpCircle,
  Lightbulb,
} from "lucide-react"
import { Button, Input, Card, Badge } from "../components/ui"

interface Message {
  id: string
  sender: "ai" | "user"
  text: string
  time: string
  suggestions?: string[]
}

export function CareerAssistantPage() {
  const [inputVal, setInputVal] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "ai",
      text: "Hello Priya! 👋 I'm your TalentBridge Career Copilot. I've analyzed your profile (Senior Product Designer, 7+ yrs) and recent market intelligence. What would you like help with today?",
      time: "10:30 AM",
      suggestions: [
        "Benchmark my salary in Bengaluru & Remote",
        "How can I tailor my resume for Fintech Staff roles?",
        "Simulate an architectural design interview",
        "Identify high-demand skill gaps",
      ],
    },
    {
      id: "m2",
      sender: "user",
      text: "What are typical salary ranges for Staff/Lead Product Designers in Bengaluru with 7 years experience?",
      time: "10:31 AM",
    },
    {
      id: "m3",
      sender: "ai",
      text: "Based on verified hiring offers in our network across Tier-1 tech firms and unicorn startups over the past 90 days:\n\n• **Midpoint Base**: ₹38L – ₹46L per annum\n• **Total Comp with Equity/ESOPs**: ₹48L – ₹62L\n• **Top Quartile (Global SaaS/Fintech)**: Up to ₹70L+ total annual package\n\nYour profile demonstrates strong Design Systems leadership and payments domain depth, positioning you firmly in the top 15% tier.",
      time: "10:32 AM",
      suggestions: [
        "Show open roles matching this bracket",
        "How to negotiate equity vesting schedules?",
        "Review my portfolio talking points",
      ],
    },
  ])

  const handleSend = () => {
    if (!inputVal.trim()) return

    const userMsg: Message = {
      id: `m_${Date.now()}`,
      sender: "user",
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputVal("")

    // Generate responsive simulated reply
    setTimeout(() => {
      const aiReply: Message = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: `I've noted that! For "${userMsg.text}", our talent intelligence model highlights that emphasizing quantifiable business impact (e.g., conversion uplifts, cross-squad adoption) alongside leadership competencies yields the highest interview-to-offer ratio.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        suggestions: [
          "Explore recommended actions",
          "Save this to my career plan",
        ],
      }
      setMessages((prev) => [...prev, aiReply])
    }, 600)
  }

  return (
    <div
      className="page"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
          AI Career Assistant & Advisor
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>
          Get instant salary benchmarking, personalized resume feedback, and
          interview coaching
        </p>
      </div>

      {/* Main Layout Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 300px",
          gap: 22,
          alignItems: "start",
        }}
      >
        {/* Chat Stream Window */}
        <Card
          style={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: 580,
            overflow: "hidden",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--surface-2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <strong style={{ fontSize: 14, display: "block" }}>
                  TalentBridge Copilot
                </strong>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--green)",
                    fontWeight: 600,
                  }}
                >
                  ● Online & analyzing market signals
                </span>
              </div>
            </div>
            <Badge tone="purple">GPT-4.5 Talent Engine</Badge>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              overflowY: "auto",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  gap: 12,
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "82%",
                }}
              >
                {m.sender === "ai" && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--purple-soft)",
                      color: "var(--purple)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={16} />
                  </div>
                )}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: 14,
                      background:
                        m.sender === "user"
                          ? "var(--primary)"
                          : "var(--surface-2)",
                      color: m.sender === "user" ? "#ffffff" : "var(--ink)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                      border:
                        m.sender === "user"
                          ? "none"
                          : "1px solid var(--border)",
                    }}
                  >
                    {m.text}
                  </div>
                  <span
                    style={{
                      fontSize: 10.5,
                      color: "var(--faint)",
                      alignSelf:
                        m.sender === "user" ? "flex-end" : "flex-start",
                      paddingLeft: 4,
                      paddingRight: 4,
                    }}
                  >
                    {m.time}
                  </span>

                  {/* Suggestion Chips */}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginTop: 4,
                      }}
                    >
                      {m.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setInputVal(s)
                          }}
                          style={{
                            padding: "5px 11px",
                            borderRadius: 999,
                            background: "var(--surface)",
                            border: "1px solid var(--border-strong)",
                            fontSize: 11.5,
                            fontWeight: 500,
                            color: "var(--primary)",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          {s} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <Input
                placeholder="Ask anything about salary, mock questions, resume gaps, or company culture..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                style={{ flex: 1, height: 42 }}
              />
              <Button
                onClick={handleSend}
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <Send size={15} /> Send
              </Button>
            </div>
          </div>
        </Card>

        {/* Sidebar Intelligence Widgets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Quick Prompts */}
          <Card style={{ padding: 16 }}>
            <h4
              style={{
                margin: "0 0 10px",
                fontSize: 13,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Suggested Inquiries
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { title: "Review my portfolio hooks", icon: Compass },
                { title: "Evaluate market demand in SEA", icon: TrendingUp },
                {
                  title: "Craft an outreach note to VP Design",
                  icon: MessageSquare,
                },
                { title: "Common trap questions in Fintech", icon: HelpCircle },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <button
                    key={i}
                    onClick={() => setInputVal(item.title)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: "var(--surface-2)",
                      color: "var(--ink)",
                      fontSize: 12,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "0.15s ease",
                    }}
                  >
                    <Icon size={14} color="var(--primary)" />
                    <span>{item.title}</span>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Privacy Note */}
          <Card style={{ padding: 16, background: "var(--surface-2)" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <Lightbulb
                size={18}
                color="var(--amber)"
                style={{ flexShrink: 0 }}
              />
              <div
                style={{
                  fontSize: 11.5,
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                <strong
                  style={{
                    color: "var(--ink)",
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  Private & Anonymized
                </strong>
                Conversations are private to you. They are never shared with
                prospective employers or current organizations.
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* NEW SECTION 1: Career Progression Roadmap (Senior -> Staff -> Principal) */}
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
              Design IC & Leadership Career Pathway
            </h3>
            <p
              style={{ margin: "4px 0 0", fontSize: 13, color: "var(--muted)" }}
            >
              Competency benchmarks, scope evolution, and compensation
              milestones
            </p>
          </div>
          <Badge tone="purple">Verified Tech Rubrics</Badge>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {[
            {
              level: "L5 · Senior Product Designer",
              status: "Current Level (7 yrs)",
              badgeTone: "blue" as const,
              scope:
                "Autonomous execution on multi-squad core journeys (e.g. Checkout, Discovery)",
              impact:
                "Proven 15–25% lift in primary funnel KPIs; high prototyping velocity",
              leadership:
                "Mentoring 2–3 junior and associate product designers",
              comp: "₹28L – ₹38L base + equity",
            },
            {
              level: "L6 · Staff Product Designer",
              status: "Target Promotion (Next 12–18m)",
              badgeTone: "purple" as const,
              scope:
                "Cross-domain design systems, architectural governance & quarterly product roadmaps",
              impact:
                "Company-wide component reusability, multi-platform latency & consistency",
              leadership:
                "Shapes org design culture, partners closely with VP Engineering & Product",
              comp: "₹42L – ₹58L base + significant ESOPs",
            },
            {
              level: "L7 · Principal / Design Director",
              status: "Long-term Strategic Tier",
              badgeTone: "amber" as const,
              scope:
                "Multi-year category vision, strategic hiring, and international expansion",
              impact:
                "Defines the company's brand, customer trust, and market moat",
              leadership:
                "Manages multiple design leads and establishes design ops excellence",
              comp: "₹65L – ₹95L+ total annual package",
            },
          ].map((tier, idx) => (
            <div
              key={idx}
              style={{
                padding: 18,
                borderRadius: 12,
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
                    {tier.level}
                  </strong>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--primary)",
                      fontWeight: 600,
                    }}
                  >
                    {tier.status}
                  </span>
                </div>
                <Badge tone={tier.badgeTone}>{tier.comp}</Badge>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  fontSize: 12.5,
                  lineHeight: 1.5,
                }}
              >
                <div>
                  <span
                    style={{
                      color: "var(--muted)",
                      fontWeight: 600,
                      display: "block",
                      fontSize: 11,
                    }}
                  >
                    CORE SCOPE
                  </span>
                  <span style={{ color: "var(--ink)" }}>{tier.scope}</span>
                </div>
                <div>
                  <span
                    style={{
                      color: "var(--muted)",
                      fontWeight: 600,
                      display: "block",
                      fontSize: 11,
                    }}
                  >
                    MEASURABLE IMPACT
                  </span>
                  <span style={{ color: "var(--ink)" }}>{tier.impact}</span>
                </div>
                <div>
                  <span
                    style={{
                      color: "var(--muted)",
                      fontWeight: 600,
                      display: "block",
                      fontSize: 11,
                    }}
                  >
                    LEADERSHIP EXPECTATION
                  </span>
                  <span style={{ color: "var(--ink)" }}>{tier.leadership}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* NEW SECTION 2: Curated Executive Knowledge & Skill Playbooks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {[
          {
            title: "Navigating ESOP Vesting, Buybacks & Tax Traps",
            category: "Compensation",
            time: "8 min read",
            summary:
              "Everything you need to know about 4-year vesting schedules, exercise windows, and liquidity events in Indian tech startups.",
          },
          {
            title: "Structuring Design Systems for 50+ Engineers",
            category: "Architecture",
            time: "12 min read",
            summary:
              "From Figma tokens to multi-brand CSS styling: preventing component drift and ensuring accessibility compliance.",
          },
          {
            title: "The Staff Designer Interview Playbook",
            category: "Career Strategy",
            time: "10 min read",
            summary:
              "How to articulate non-linear career impact, cross-squad trade-offs, and design diplomacy during executive rounds.",
          },
        ].map((guide, idx) => (
          <Card
            key={idx}
            style={{
              padding: 18,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <Badge tone="neutral">{guide.category}</Badge>
                <span style={{ fontSize: 11, color: "var(--faint)" }}>
                  {guide.time}
                </span>
              </div>
              <strong
                style={{
                  fontSize: 14,
                  color: "var(--ink)",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {guide.title}
              </strong>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.55,
                }}
              >
                {guide.summary}
              </p>
            </div>
            <Button
              variant="ghost"
              style={{
                alignSelf: "flex-start",
                padding: "0 8px",
                height: 28,
                fontSize: 12,
              }}
            >
              Read guide →
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
