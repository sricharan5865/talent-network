import { useState } from "react"
import {
  User,
  Bell,
  Link2,
  ShieldCheck,
  CreditCard,
  Camera,
  Check,
  Smartphone,
  Key,
  Globe,
  ExternalLink,
  Laptop,
} from "lucide-react"
import { Button, Input, Card, Badge } from "../components/ui"

export function SettingsPage() {
  const [activeTab, setActiveTab] =
    useState<"profile" | "notifications" | "integrations" | "security" | "billing">(
      "profile",
    )

  // Form states
  const [name, setName] = useState("Priya Sharma")
  const [email, setEmail] = useState("priya.sharma@talentbridge.io")
  const [role, setRole] = useState("Head of Talent Acquisition")
  const [company, setCompany] = useState("Nexus Tech Labs")
  const [bio, setBio] = useState(
    "Building high-performing engineering and design organizations with modern AI recruitment tools.",
  )

  // Toggles
  const [emailAlerts, setEmailAlerts] = useState({
    newApps: true,
    interviews: true,
    digests: false,
    aiAgents: true,
  })
  const [pushAlerts, setPushAlerts] = useState({
    messages: true,
    stageChanges: true,
    mentions: true,
  })

  // Integrations state
  const [integrations, setIntegrations] = useState([
    {
      id: "linkedin",
      name: "LinkedIn Recruiter",
      category: "Sourcing",
      connected: true,
      color: "#0a66c2",
    },
    {
      id: "slack",
      name: "Slack",
      category: "Collaboration",
      connected: true,
      color: "#4a154b",
    },
    {
      id: "google",
      name: "Google Workspace & Calendar",
      category: "Calendar",
      connected: true,
      color: "#ea4335",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business API",
      category: "Messaging",
      connected: false,
      color: "#25d366",
    },
    {
      id: "greenhouse",
      name: "Greenhouse ATS Sync",
      category: "ATS",
      connected: false,
      color: "#00b274",
    },
    {
      id: "zoom",
      name: "Zoom Video Meetings",
      category: "Interviews",
      connected: true,
      color: "#2d8cff",
    },
  ])

  return (
    <div
      className="page"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
          Organization & Personal Settings
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>
          Manage your account credentials, notifications, connected ATS tooling,
          and billing
        </p>
      </div>

      {/* Main Settings Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px minmax(0, 1fr)",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Navigation Sidebar */}
        <Card
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {[
            { id: "profile", label: "Profile & Identity", icon: User },
            {
              id: "notifications",
              label: "Notifications & Alerts",
              icon: Bell,
            },
            { id: "integrations", label: "Integrations & ATS", icon: Link2 },
            { id: "security", label: "Security & Sessions", icon: ShieldCheck },
            { id: "billing", label: "Plans & Invoicing", icon: CreditCard },
          ].map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 9,
                  border: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? "var(--primary-soft)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--muted)",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </Card>

        {/* Content Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {activeTab === "profile" && (
            <Card
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 16,
                }}
              >
                <h2 style={{ fontSize: 17, margin: 0 }}>
                  Personal & Profile Information
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    margin: "4px 0 0",
                  }}
                >
                  Your profile is visible across recruitment workspaces and
                  candidate communications.
                </p>
              </div>

              {/* Avatar section */}
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      width: 74,
                      height: 74,
                      borderRadius: "50%",
                      background: "var(--primary-soft)",
                      color: "var(--primary)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 24,
                      fontWeight: 700,
                      border: "2px solid var(--surface)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    PS
                  </div>
                  <button
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "var(--primary)",
                      color: "#fff",
                      border: "2px solid var(--surface)",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Camera size={13} />
                  </button>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15 }}>{name}</h3>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    {role} at {company}
                  </span>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <Button
                      variant="secondary"
                      style={{ height: 30, fontSize: 12, padding: "0 10px" }}
                    >
                      Upload photo
                    </Button>
                    <Button
                      variant="ghost"
                      style={{ height: 30, fontSize: 12, padding: "0 10px" }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      fontWeight: 600,
                      marginBottom: 5,
                    }}
                  >
                    Full Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      fontWeight: 600,
                      marginBottom: 5,
                    }}
                  >
                    Work Email
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      fontWeight: 600,
                      marginBottom: 5,
                    }}
                  >
                    Job Title
                  </label>
                  <Input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      fontWeight: 600,
                      marginBottom: 5,
                    }}
                  >
                    Company / Organization
                  </label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12.5,
                    fontWeight: 600,
                    marginBottom: 5,
                  }}
                >
                  Professional Bio
                </label>
                <textarea
                  className="textarea"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{ width: "100%", fontSize: 13 }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  paddingTop: 10,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <Button variant="secondary">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 16,
                }}
              >
                <h2 style={{ fontSize: 17, margin: 0 }}>
                  Notification Preferences
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    margin: "4px 0 0",
                  }}
                >
                  Fine-tune what updates reach your inbox and mobile push
                  notifications.
                </p>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: 14,
                    margin: "0 0 12px",
                    color: "var(--ink)",
                  }}
                >
                  Email Dispatches
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {[
                    {
                      key: "newApps",
                      label: "New Candidate Applications",
                      desc: "Get an email whenever a high-match candidate applies to open jobs.",
                    },
                    {
                      key: "interviews",
                      label: "Interview Confirmations & Rescheduling",
                      desc: "Immediate notices when candidates confirm calendar invites.",
                    },
                    {
                      key: "aiAgents",
                      label: "AI Agent Recommendations",
                      desc: "Alerts when sourcing agents discover top percentile candidate profiles.",
                    },
                    {
                      key: "digests",
                      label: "Weekly Talent Pipeline Summary",
                      desc: "Every Monday 9:00 AM overview of recruiter KPIs and open bottlenecks.",
                    },
                  ].map((row) => (
                    <label
                      key={row.key}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={(emailAlerts as any)[row.key]}
                        onChange={(e) =>
                          setEmailAlerts({
                            ...emailAlerts,
                            [row.key]: e.target.checked,
                          })
                        }
                        style={{ marginTop: 3 }}
                      />
                      <div>
                        <strong style={{ fontSize: 13, display: "block" }}>
                          {row.label}
                        </strong>
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>
                          {row.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div
                style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    margin: "0 0 12px",
                    color: "var(--ink)",
                  }}
                >
                  In-App & Push Notifications
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {[
                    {
                      key: "messages",
                      label: "Candidate Direct Messages",
                      desc: "Live ping when candidates reply to outbound messages.",
                    },
                    {
                      key: "stageChanges",
                      label: "Pipeline Stage Movements",
                      desc: "Pings when candidates move from screening to interview or offer.",
                    },
                    {
                      key: "mentions",
                      label: "Team Notes & @Mentions",
                      desc: "When team members mention you in interview scorecards.",
                    },
                  ].map((row) => (
                    <label
                      key={row.key}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={(pushAlerts as any)[row.key]}
                        onChange={(e) =>
                          setPushAlerts({
                            ...pushAlerts,
                            [row.key]: e.target.checked,
                          })
                        }
                        style={{ marginTop: 3 }}
                      />
                      <div>
                        <strong style={{ fontSize: 13, display: "block" }}>
                          {row.label}
                        </strong>
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>
                          {row.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  paddingTop: 10,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <Button>Save Preferences</Button>
              </div>
            </Card>
          )}

          {activeTab === "integrations" && (
            <Card
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 16,
                }}
              >
                <h2 style={{ fontSize: 17, margin: 0 }}>
                  Connected Tools & Services
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    margin: "4px 0 0",
                  }}
                >
                  Seamlessly bridge TalentBridge with your existing ATS,
                  communication, and calendar systems.
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 14,
                }}
              >
                {integrations.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--surface-2)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: item.color,
                            color: "#fff",
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <strong style={{ fontSize: 13, display: "block" }}>
                            {item.name}
                          </strong>
                          <span style={{ fontSize: 11, color: "var(--muted)" }}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <Badge tone={item.connected ? "green" : "neutral"}>
                        {item.connected ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant={item.connected ? "secondary" : "primary"}
                        style={{ height: 32, fontSize: 12 }}
                        onClick={() => {
                          setIntegrations(
                            integrations.map((int) =>
                              int.id === item.id
                                ? { ...int, connected: !int.connected }
                                : int,
                            ),
                          )
                        }}
                      >
                        {item.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 16,
                }}
              >
                <h2 style={{ fontSize: 17, margin: 0 }}>
                  Security & Authentication
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    margin: "4px 0 0",
                  }}
                >
                  Protect your team workspace with multi-factor authentication
                  and session monitoring.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 14, margin: "0 0 10px" }}>
                  Change Account Password
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    maxWidth: 540,
                  }}
                >
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                </div>
                <Button style={{ marginTop: 10, height: 34, fontSize: 12.5 }}>
                  Update Password
                </Button>
              </div>

              <div
                style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: 14, margin: 0 }}>
                      Two-Factor Authentication (2FA)
                    </h3>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: "var(--muted)",
                        margin: "3px 0 0",
                      }}
                    >
                      Require an authenticator code when signing into
                      unrecognized devices.
                    </p>
                  </div>
                  <Badge tone="green">Enforced</Badge>
                </div>
              </div>

              <div
                style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}
              >
                <h3 style={{ fontSize: 14, margin: "0 0 10px" }}>
                  Active Device Sessions
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 12,
                      borderRadius: 8,
                      background: "var(--surface-2)",
                      fontSize: 12.5,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Laptop size={18} color="var(--primary)" />
                      <div>
                        <strong>MacBook Pro 16″ (Current Session)</strong>
                        <div style={{ color: "var(--muted)", fontSize: 11.5 }}>
                          Bengaluru, India · Chrome 124.0
                        </div>
                      </div>
                    </div>
                    <Badge tone="blue">Active Now</Badge>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 12,
                      borderRadius: 8,
                      background: "var(--surface-2)",
                      fontSize: 12.5,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Smartphone size={18} color="var(--muted)" />
                      <div>
                        <strong>iPhone 15 Pro</strong>
                        <div style={{ color: "var(--muted)", fontSize: 11.5 }}>
                          Bengaluru, India · iOS App · 2 days ago
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" style={{ fontSize: 12 }}>
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "billing" && (
            <Card
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 16,
                }}
              >
                <h2 style={{ fontSize: 17, margin: 0 }}>
                  Subscription & Billing Details
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    margin: "4px 0 0",
                  }}
                >
                  Manage team seat allocations, enterprise AI credits, and
                  monthly invoices.
                </p>
              </div>

              {/* Current plan highlight */}
              <div
                style={{
                  padding: 18,
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.12))",
                  border: "1px solid rgba(37,99,235,0.2)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Badge tone="purple">Enterprise AI Tier</Badge>
                  <h3
                    style={{
                      margin: "8px 0 2px",
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    TalentBridge Scale
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
                    ₹49,999 / month · Renews on Dec 1, 2026
                  </p>
                </div>
                <Button>Manage Plan</Button>
              </div>

              {/* Payment Method */}
              <div>
                <h3 style={{ fontSize: 14, margin: "0 0 10px" }}>
                  Primary Payment Card
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 14,
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <CreditCard size={22} color="var(--primary)" />
                    <div>
                      <strong style={{ fontSize: 13 }}>
                        HDFC Corporate Visa ending in •••• 4821
                      </strong>
                      <div style={{ color: "var(--muted)", fontSize: 11.5 }}>
                        Expires 09/2028 · Primary billing method
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    style={{ height: 32, fontSize: 12 }}
                  >
                    Edit Card
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
