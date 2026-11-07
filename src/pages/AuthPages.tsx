import { useState } from "react"
import { Link, useNavigate } from "react-router"
import {
  ArrowRight,
  Check,
  Command,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Button, Input } from "../components/ui"

export function LoginPage({ type }: { type: "employer" | "candidate" }) {
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const isEmployer = type === "employer"
  const submit = () => {
    const email = (document.getElementById(`${type}-email`) as HTMLInputElement)
      ?.value
    if (!email?.includes("@"))
      return setError("Enter a valid work email address.")
    navigate(isEmployer ? "/employer" : "/candidate")
  }
  return (
    <div className="auth-page">
      <section className="auth-story">
        <div className="auth-brand">
          <span>
            <Command size={20} />
          </span>
          Talent Network
        </div>
        <div className="story-copy">
          <span className="eyebrow light">
            <Sparkles size={15} /> Responsible AI for better hiring
          </span>
          <h1>
            {isEmployer
              ? "Build exceptional teams, with confidence."
              : "Your next career move starts here."}
          </h1>
          <p>
            {isEmployer
              ? "A unified talent intelligence platform for faster, fairer, and more human hiring."
              : "Discover roles that fit your ambitions and prepare for every opportunity."}
          </p>
          <div className="trust-list">
            <span>
              <Check /> Explainable candidate matching
            </span>
            <span>
              <Check /> Human decisions at every step
            </span>
            <span>
              <Check /> Enterprise-grade privacy
            </span>
          </div>
        </div>
        <div className="story-proof">
          <div className="proof-avatars">
            <i>AS</i>
            <i>RM</i>
            <i>NK</i>
          </div>
          <p>Trusted by talent teams at 250+ growing companies across India</p>
        </div>
      </section>
      <section className="auth-form-wrap">
        <div className="auth-form">
          <div className="mobile-auth-brand">
            <Command size={20} /> Talent Network
          </div>
          <div className="auth-quick-switcher">
            <button
              type="button"
              className={!isEmployer ? "active" : ""}
              onClick={() => navigate("/candidate/login")}
            >
              Candidate
            </button>
            <button
              type="button"
              className={isEmployer ? "active" : ""}
              onClick={() => navigate("/employer/login")}
            >
              Employer
            </button>
            <button
              type="button"
              onClick={() => navigate(isEmployer ? "/employer" : "/candidate")}
            >
              Open Workspace →
            </button>
          </div>
          <span className="eyebrow">
            {isEmployer ? "Employer workspace" : "Candidate portal"}
          </span>
          <h2>Welcome back</h2>
          <p>
            Enter your details to access your{" "}
            {isEmployer ? "hiring workspace" : "career dashboard"}.
          </p>
          <div className="form-stack">
            <label>
              Email address
              <Input
                id={`${type}-email`}
                type="email"
                placeholder={isEmployer ? "you@company.com" : "you@email.com"}
                defaultValue={
                  isEmployer ? "neha@nexoralabs.in" : "priya.sharma@email.com"
                }
              />
            </label>
            <label>
              Password
              <div className="password-field">
                <Input
                  type={show ? "text" : "password"}
                  defaultValue="talentnetwork"
                />
                <Button
                  variant="ghost"
                  aria-label="Toggle password"
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </label>
            {error && <span className="form-error">{error}</span>}
            <div className="form-row">
              <label className="check-row">
                <Input type="checkbox" defaultChecked /> Keep me signed in
              </label>
              <Link to={`/${type}/forgot`}>Forgot password?</Link>
            </div>
            <Button className="full-btn" onClick={submit}>
              Sign in <ArrowRight size={17} />
            </Button>
            <div className="or">
              <span />
              or continue with
              <span />
            </div>
            <Button variant="secondary" className="full-btn">
              <span className="google-g">G</span> Continue with Google
            </Button>
          </div>
          <p className="auth-bottom">
            New to Talent Network?{" "}
            <Link to={`/${type}/register`}>Create an account</Link>
          </p>
          <div className="security-note">
            <ShieldCheck size={15} /> Your data is encrypted and protected.
          </div>
        </div>
      </section>
    </div>
  )
}

export function SimpleAuthPage({
  kind,
  portal = "employer",
}: {
  kind: "register" | "forgot"
  portal?: "employer" | "candidate"
}) {
  const navigate = useNavigate()
  return (
    <div className="center-auth">
      <div className="simple-auth">
        <div className="auth-brand dark">
          <span>
            <Command size={20} />
          </span>
          Talent Network
        </div>
        <span className="eyebrow">
          {kind === "register" ? "Create your workspace" : "Account recovery"}
        </span>
        <h1>
          {kind === "register"
            ? "Start hiring with clarity"
            : "Reset your password"}
        </h1>
        <p>
          {kind === "register"
            ? "Set up your organization and invite your hiring team."
            : "We’ll send a secure reset link to your email address."}
        </p>
        <div className="form-stack">
          <label>
            Work email
            <Input placeholder="you@company.com" />
          </label>
          {kind === "register" && (
            <>
              <label>
                Full name
                <Input placeholder="Your name" />
              </label>
              <label>
                Organization
                <Input placeholder="Company name" />
              </label>
            </>
          )}
          <Button
            className="full-btn"
            onClick={() =>
              navigate(
                kind === "register"
                  ? `/${portal}/onboarding`
                  : `/${portal}/login`,
              )
            }
          >
            {kind === "register" ? "Create account" : "Send reset link"}{" "}
            <ArrowRight size={17} />
          </Button>
        </div>
        <Link to={`/${portal}/login`}>Back to sign in</Link>
      </div>
    </div>
  )
}
