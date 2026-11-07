import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  HelpCircle,
  Lock,
  Menu,
  Phone,
  PlayCircle,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react"

export function PublicLandingPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"login" | "sales">("login")
  const [offeringsOpen, setOfferingsOpen] = useState(false)
  const [cloudOpen, setCloudOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tutorialModalOpen, setTutorialModalOpen] = useState(false)

  // Sales form state
  const [salesName, setSalesName] = useState("")
  const [salesCompany, setSalesCompany] = useState("")
  const [salesEmail, setSalesEmail] = useState("")
  const [salesMobile, setSalesMobile] = useState("")
  const [salesSubmitted, setSalesSubmitted] = useState(false)

  const handleLauncherLogin = () => {
    // Navigate to Employer workspace dashboard
    navigate("/employer")
  }

  const handleSalesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSalesSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0c1021] text-white flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Top Utility Header */}
      <header className="w-full border-b border-white/10 bg-[#0c1021]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Brand & Offering Dropdowns */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                n
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                  naukri
                </span>
                <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase">
                  Talent Cloud
                </span>
              </div>
            </button>

            {/* Desktop Navigation Menus */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOfferingsOpen(!offeringsOpen)
                    setCloudOpen(false)
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition py-2"
                >
                  <span>Our offerings</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      offeringsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {offeringsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      type="button"
                      onClick={() => navigate("/employer/jobs")}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white transition flex flex-col"
                    >
                      <span className="font-semibold text-sm">
                        Resdex Database
                      </span>
                      <span className="text-xs text-slate-400">
                        Search India's 10 crore+ resume pool
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/employer/jobs")}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white transition flex flex-col"
                    >
                      <span className="font-semibold text-sm">
                        Job Postings & Hot Vacancies
                      </span>
                      <span className="text-xs text-slate-400">
                        Instant distribution & candidate responses
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/employer/matching")}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white transition flex flex-col"
                    >
                      <span className="font-semibold text-sm">
                        Send NVite Campaigns
                      </span>
                      <span className="text-xs text-slate-400">
                        Personalized outreach across email & push
                      </span>
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setCloudOpen(!cloudOpen)
                    setOfferingsOpen(false)
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition py-2"
                >
                  <span>Naukri Talent Cloud</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      cloudOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {cloudOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-2 z-50">
                    <button
                      type="button"
                      onClick={() => navigate("/employer")}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white transition flex flex-col"
                    >
                      <span className="font-semibold text-sm flex items-center justify-between">
                        Employer Dashboard
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                          Active
                        </span>
                      </span>
                      <span className="text-xs text-slate-400">
                        Quota usage, candidate pipeline & folders
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/candidate")}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white transition flex flex-col"
                    >
                      <span className="font-semibold text-sm">
                        Candidate Career Passport
                      </span>
                      <span className="text-xs text-slate-400">
                        Job marketplace & application tracker
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/recruiter")}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white transition flex flex-col"
                    >
                      <span className="font-semibold text-sm">
                        Agency Recruiter CRM
                      </span>
                      <span className="text-xs text-slate-400">
                        Client mandates & submission scorecards
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer transition">
              <Phone size={14} className="text-blue-400" />
              <span className="font-medium">1800-102-5558</span>
              <ChevronDown size={12} className="text-slate-400" />
            </div>

            <button
              type="button"
              onClick={() => navigate("/employer/jobs/new")}
              className="hidden md:inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition text-xs tracking-wide"
            >
              Buy online
            </button>

            <button
              type="button"
              aria-label="Shopping Cart"
              onClick={() => navigate("/employer/settings")}
              className="text-slate-300 hover:text-white transition p-1"
            >
              <ShoppingCart size={18} />
            </button>

            {/* Portal Jump Quick Switcher */}
            <div className="hidden lg:flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/60 text-xs">
              <button
                type="button"
                onClick={() => navigate("/employer")}
                className="px-2.5 py-1 rounded-md text-white font-semibold bg-blue-600 shadow-sm"
              >
                Employer
              </button>
              <button
                type="button"
                onClick={() => navigate("/candidate")}
                className="px-2.5 py-1 rounded-md text-slate-300 hover:text-white transition"
              >
                Jobseeker
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-slate-900 px-4 py-4 space-y-3">
            <button
              type="button"
              onClick={() => navigate("/employer")}
              className="block w-full text-left py-2 font-medium text-slate-200"
            >
              Employer Dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate("/employer/jobs")}
              className="block w-full text-left py-2 font-medium text-slate-200"
            >
              Manage Jobs & Responses
            </button>
            <button
              type="button"
              onClick={() => navigate("/candidate")}
              className="block w-full text-left py-2 font-medium text-slate-200"
            >
              Jobseeker Portal
            </button>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
              <span>Sales: 1800-102-5558</span>
              <button
                type="button"
                onClick={() => navigate("/employer")}
                className="text-blue-400 font-semibold"
              >
                Direct Login →
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section Container */}
      <main className="flex-1 flex flex-col justify-center relative overflow-hidden">
        {/* Subtle background tech ambient gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Copy & Value Props */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
                <Sparkles size={13} className="text-blue-400" />
                TALENT DECODED
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Decode India’s largest talent pool with the power of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 inline-flex items-center gap-1">
                  ✦ AI
                </span>
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-slate-300 font-normal max-w-xl">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Users size={15} />
                  </div>
                  <p>
                    <strong className="text-white font-semibold">
                      10 crore+ registered jobseekers
                    </strong>{" "}
                    for all your talent needs
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp size={15} />
                  </div>
                  <p>
                    <strong className="text-white font-semibold">
                      Most advanced recruitment AI
                    </strong>{" "}
                    with deep skill taxonomy & explainable match evidence
                  </p>
                </div>
              </div>

              {/* Primary Call To Action */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/employer")}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#1765e8] hover:bg-[#1351be] text-white font-semibold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all"
                >
                  <span>Explore our products</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/candidate/jobs")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-base transition"
                >
                  <Search size={16} />
                  <span>Looking for jobs?</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> 4,000+
                  Enterprises
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> 95%
                  Candidate Response
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> SOC-2
                  Type II Certified
                </span>
              </div>
            </div>

            {/* Right Column: Elevated Authentication & Launcher Login Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-gray-900 border border-slate-100 relative">
                {/* Segmented Switcher / Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6 text-xs sm:text-sm font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab("sales")}
                    className={`flex-1 py-2 text-center rounded-lg transition ${
                      activeTab === "sales"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Sales enquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className={`flex-1 py-2 text-center rounded-lg transition ${
                      activeTab === "login"
                        ? "bg-white text-gray-900 shadow-sm font-bold"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Register/Log in
                  </button>
                </div>

                {activeTab === "login" ? (
                  <div className="space-y-6">
                    {/* SSO Launcher Callout Box */}
                    <div className="bg-[#f0f4f9] border border-blue-100 rounded-xl p-4 sm:p-5 text-left transition-all">
                      <div className="flex items-center gap-2 mb-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider">
                        <ShieldCheck size={16} className="text-emerald-600" />
                        <span>Instant Enterprise SSO</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-snug">
                        Your account is Naukri Launcher enabled
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 font-mono break-all font-medium">
                        sheela.nancy@ispatialtec.com
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        iSpatial Techno Solutions Pvt Ltd
                      </p>
                    </div>

                    {/* Primary Launcher Login Button */}
                    <div>
                      <button
                        type="button"
                        onClick={handleLauncherLogin}
                        className="w-full py-3.5 px-4 rounded-lg bg-[#1765e8] hover:bg-[#1351be] active:bg-[#0f43a4] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <Lock
                          size={16}
                          className="text-blue-200 group-hover:scale-110 transition-transform"
                        />
                        <span>Login with Naukri Launcher</span>
                      </button>
                      <p className="text-[11px] text-gray-500 text-center mt-2">
                        Seamless 1-click authentication to Employer Portal
                      </p>
                    </div>

                    {/* Quick Help Links */}
                    <div className="pt-3 border-t border-gray-100 text-left space-y-2.5">
                      <div className="text-[11px] font-bold text-gray-500 tracking-wider uppercase flex items-center gap-1.5">
                        <HelpCircle size={12} className="text-gray-400" />
                        <span>⏱ QUICK HELP</span>
                      </div>

                      <a
                        href="#download"
                        onClick={(e) => {
                          e.preventDefault()
                          alert(
                            "Naukri Launcher Desktop Sidecar is ready and integrated.",
                          )
                        }}
                        className="flex items-center justify-between text-xs text-gray-700 hover:text-blue-600 font-medium py-1 transition group"
                      >
                        <span>Haven’t set up Naukri Launcher? Download it</span>
                        <Download
                          size={14}
                          className="text-gray-400 group-hover:text-blue-600 group-hover:translate-y-0.5 transition"
                        />
                      </a>

                      <button
                        type="button"
                        onClick={() => setTutorialModalOpen(true)}
                        className="w-full flex items-center justify-between text-xs text-gray-700 hover:text-blue-600 font-medium py-1 transition group text-left"
                      >
                        <span>
                          Not sure how to use it? Watch 1-min tutorial
                        </span>
                        <PlayCircle
                          size={14}
                          className="text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition"
                        />
                      </button>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
                      <span>Don’t have a registered email? </span>
                      <button
                        type="button"
                        onClick={() => navigate("/employer/register")}
                        className="font-semibold text-[#1765e8] hover:underline"
                      >
                        Create account
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Sales Enquiry Tab */
                  <form
                    onSubmit={handleSalesSubmit}
                    className="space-y-4 text-left"
                  >
                    {salesSubmitted ? (
                      <div className="p-6 text-center space-y-3">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 size={24} />
                        </div>
                        <h4 className="font-bold text-gray-900 text-base">
                          Thank you for your interest!
                        </h4>
                        <p className="text-xs text-gray-600">
                          Our enterprise talent consultant will reach out to{" "}
                          <strong className="text-gray-900">
                            {salesEmail || "you"}
                          </strong>{" "}
                          within 30 minutes.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSalesSubmitted(false)
                            setActiveTab("login")
                          }}
                          className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Back to Login
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-700">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sheela Nancy"
                            value={salesName}
                            onChange={(e) => setSalesName(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-700">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. iSpatial Techno Solutions"
                            value={salesCompany}
                            onChange={(e) => setSalesCompany(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-700">
                              Work Email *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="you@company.com"
                              value={salesEmail}
                              onChange={(e) => setSalesEmail(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-700">
                              Mobile *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 9876543210"
                              value={salesMobile}
                              onChange={(e) => setSalesMobile(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 px-4 rounded-lg bg-[#1765e8] hover:bg-[#1351be] text-white font-semibold text-xs tracking-wide uppercase transition shadow-md"
                        >
                          Request a Product Demo
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Tutorial Video Modal */}
      {tutorialModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setTutorialModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <PlayCircle size={18} className="text-blue-400" />
                1-Minute Naukri Launcher Tutorial
              </h3>
              <button
                type="button"
                onClick={() => setTutorialModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>
            <div className="py-6 space-y-4 text-left text-sm text-slate-300">
              <div className="aspect-video bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800 text-slate-400">
                <div className="text-center p-4">
                  <PlayCircle
                    size={48}
                    className="mx-auto text-blue-500 mb-2 hover:scale-110 transition cursor-pointer"
                  />
                  <p className="font-semibold text-white">
                    Naukri Launcher Video Guide
                  </p>
                  <p className="text-xs text-slate-500">
                    Secure hardware-bound SSO for employer accounts
                  </p>
                </div>
              </div>
              <ul className="text-xs space-y-2 text-slate-400 list-disc list-inside">
                <li>
                  Zero password friction — automatic token exchange with Talent
                  Cloud
                </li>
                <li>
                  Biometric & hardware authentication for company data safety
                </li>
                <li>
                  One click takes you right into your active candidate inbox
                </li>
              </ul>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setTutorialModalOpen(false)
                  handleLauncherLogin()
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition"
              >
                Got it, Login Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#080b16] py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">TalentFlow</span>
            <span>
              · All rights reserved © 2026 Info Edge (India) Ltd / Talent Cloud
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/employer")}
              className="hover:text-white transition"
            >
              Employer Portal
            </button>
            <button
              type="button"
              onClick={() => navigate("/candidate")}
              className="hover:text-white transition"
            >
              Jobseeker Portal
            </button>
            <button
              type="button"
              onClick={() => navigate("/recruiter")}
              className="hover:text-white transition"
            >
              Recruiter CRM
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="hover:text-white transition"
            >
              Platform Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
