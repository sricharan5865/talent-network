import { useState } from "react"
import { useNavigate } from "react-router"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  Activity,
  AlertTriangle,
  ChevronRight,
  Bot,
  Building2,
  CheckCircle2,
  Clock3,
  Filter,
  MoreHorizontal,
  Pause,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"
import { agentCatalog, performance } from "../data/mockData"
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Progress,
  Select,
} from "../components/ui"
import { FeatureDemoPage } from "./DemoPages"

function Header({
  title,
  text,
  action,
}: {
  title: string
  text: string
  action?: React.ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">Platform administration</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action}
    </div>
  )
}

export function AdminDashboard() {
  const navigate = useNavigate()
  const quickLinks: [string, string, typeof Building2, string][] = [
    ["Organizations", "286", Building2, "/admin/organizations"],
    ["Users", "12,842", Users, "/admin/users"],
    ["AI agents", "14", Bot, "/admin/agents"],
    ["Audit logs", "Live", Activity, "/admin/audit"],
  ]
  const services = [
    ["Application API", "Operational"],
    ["AI orchestration", "Operational"],
    ["Message queue", "Operational"],
    ["Document processing", "Operational"],
    ["Analytics pipeline", "Minor latency"],
  ]
  const orgs: [string, string, number][] = [
    ["Nexora Labs", "4,280 users", 86],
    ["Aarav Fintech", "2,914 users", 72],
    ["Sarva Health", "2,102 users", 64],
  ]

  return (
    <div className="home-simple">
      <aside className="home-left">
        <Card className="home-profile">
          <div
            className="home-avatar-ring"
            style={{ "--p": 99 } as React.CSSProperties}
          >
            <span>TN</span>
          </div>
          <small className="home-ring-label">Platform health 99%</small>
          <h2>Talent Network HQ</h2>
          <p>Aditi Rao · Administrator</p>
          <p className="home-muted">All regions · 5 services</p>
          <Button
            className="home-pill-btn"
            onClick={() => navigate("/admin/security")}
          >
            <ShieldCheck size={16} /> Security center
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
          onClick={() => navigate("/admin/analytics")}
        >
          <h2>
            Platform <span>at a glance</span>
          </h2>
          <p>Tenant growth, usage and reliability this month.</p>
          <div className="home-hero-chips">
            {[
              ["286", "organizations"],
              ["12.8k", "active users"],
              ["1.2M", "agent runs"],
              ["99.99%", "uptime"],
            ].map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                <small>{label}</small>
              </span>
            ))}
          </div>
        </button>

        <Card className="home-feature no-media">
          <span className="home-tag">Needs review</span>
          <div className="home-feature-copy">
            <h3>18 agent actions are waiting for approval</h3>
            <ul>
              {agentCatalog
                .filter((a) => a[4].toLowerCase().includes("approval"))
                .slice(0, 3)
                .map((a) => (
                  <li key={a[0]}>
                    <Bot size={17} /> {a[0]}
                    <Badge tone="amber">{a[4]}</Badge>
                  </li>
                ))}
            </ul>
            <Button
              className="home-pill-btn lg"
              onClick={() => navigate("/admin/agents")}
            >
              Review approvals
            </Button>
          </div>
        </Card>

        <Card className="home-section">
          <div className="home-section-head">
            <div>
              <h3>Platform usage</h3>
              <p>Monthly active users across all tenants</p>
            </div>
            <button
              type="button"
              className="home-link"
              onClick={() => navigate("/admin/analytics")}
            >
              View analytics
            </button>
          </div>
          <div className="chart-wrap home-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performance.map((x, i) => ({
                  ...x,
                  users: x.applicants * 12 + i * 600,
                }))}
              >
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} width={44} />
                <Tooltip />
                <Area
                  dataKey="users"
                  stroke="var(--primary)"
                  fill="var(--primary-soft)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <aside className="home-right">
        <Card className="home-side-card">
          <div className="home-section-head">
            <h3>System health</h3>
            <Badge tone="green">Operational</Badge>
          </div>
          {services.map(([name, status]) => (
            <div className="home-status-row" key={name}>
              <i className={status === "Operational" ? "ok" : "warn"} />
              <span>{name}</span>
              <small>{status}</small>
            </div>
          ))}
        </Card>
        <Card className="home-side-card">
          <div className="home-section-head">
            <h3>Top organizations</h3>
            <button
              type="button"
              className="home-link"
              onClick={() => navigate("/admin/organizations")}
            >
              All
            </button>
          </div>
          {orgs.map(([name, users, usage]) => (
            <div className="home-org-row" key={name}>
              <span>
                <strong>{name}</strong>
                <small>{users}</small>
              </span>
              <Progress value={usage} />
            </div>
          ))}
        </Card>
      </aside>
    </div>
  )
}

export function AgentManagementPage() {
  const [query, setQuery] = useState("")
  const [agent, setAgent] = useState<typeof agentCatalog[0] | null>(null)
  const [states, setStates] = useState<Record<string, string>>({})
  const shown = agentCatalog.filter((a) =>
    a[0].toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <>
      <Header
        title="AI agent management"
        text="Monitor, govern, and configure every AI-assisted workflow."
        action={
          <Button>
            <Sparkles /> Configure policy
          </Button>
        }
      />
      <div className="responsible-note admin-note">
        <ShieldCheck />
        <div>
          <strong>Human oversight is enforced</strong>
          <p>
            High-impact actions require approval. Agents provide recommendations
            and cannot make final hiring decisions.
          </p>
        </div>
        <Button variant="ghost">View safety controls</Button>
      </div>
      <div className="agent-stats">
        <Card>
          <span>Active agents</span>
          <strong>12</strong>
          <small>
            <span className="color-dot green" /> Operating normally
          </small>
        </Card>
        <Card>
          <span>Executions today</span>
          <strong>48,291</strong>
          <small>99.4% successful</small>
        </Card>
        <Card>
          <span>Awaiting approval</span>
          <strong>18</strong>
          <small>Across 9 organizations</small>
        </Card>
        <Card>
          <span>Avg. response time</span>
          <strong>1.8s</strong>
          <small>Within target</small>
        </Card>
      </div>
      <Card className="table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search agent catalog…"
            />
          </div>
          <div>
            <Button variant="secondary">
              <Filter /> Filters
            </Button>
            <Select>
              <option>All statuses</option>
              <option>Active</option>
              <option>Paused</option>
            </Select>
          </div>
        </div>
        <div className="agent-table">
          <div className="agent-row agent-head">
            <span>Agent</span>
            <span>Trigger</span>
            <span>Status</span>
            <span>Executions (24h)</span>
            <span>Success rate</span>
            <span>Controls</span>
          </div>
          {shown.map((a, i) => {
            const status = states[a[0]] || a[3]
            return (
              <div className="agent-row" key={a[0]} onClick={() => setAgent(a)}>
                <div>
                  <span className="agent-icon">
                    <Bot />
                  </span>
                  <span>
                    <strong>{a[0]}</strong>
                    <small>{a[1]}</small>
                  </span>
                </div>
                <span>{a[2]}</span>
                <Badge tone={status === "Active" ? "green" : "amber"}>
                  {status}
                </Badge>
                <span>
                  <strong>{(4820 - i * 217).toLocaleString("en-IN")}</strong>
                </span>
                <span>{(99.8 - i * 0.08).toFixed(1)}%</span>
                <span>
                  <Button
                    variant="ghost"
                    aria-label={`${
                      status === "Active" ? "Pause" : "Start"
                    } ${a[0]}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setStates({
                        ...states,
                        [a[0]]: status === "Active" ? "Paused" : "Active",
                      })
                    }}
                  >
                    {status === "Active" ? <Pause /> : <Play />}
                  </Button>
                  <Button variant="ghost">
                    <MoreHorizontal />
                  </Button>
                </span>
              </div>
            )
          })}
        </div>
      </Card>
      <Modal
        open={!!agent}
        onClose={() => setAgent(null)}
        title={agent?.[0] || ""}
        footer={<Button onClick={() => setAgent(null)}>Done</Button>}
      >
        {agent && (
          <div className="agent-detail">
            <div className="agent-detail-icon">
              <Bot />
            </div>
            <p>{agent[1]}</p>
            <dl>
              <div>
                <dt>Trigger</dt>
                <dd>{agent[2]}</dd>
              </div>
              <div>
                <dt>Approval policy</dt>
                <dd>{agent[4]}</dd>
              </div>
              <div>
                <dt>Last execution</dt>
                <dd>2 minutes ago · Successful</dd>
              </div>
            </dl>
            <h3>Recent execution health</h3>
            <div className="execution-health">
              <CheckCircle2 />
              <span>
                <strong>99.6% successful</strong>
                <small>12,428 executions in the last 7 days</small>
              </span>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export function GenericAdminPage({ title }: { title: string }) {
  return <FeatureDemoPage portal="Platform administration" title={title} />
}
