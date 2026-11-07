/**
 * Adversarial Empirical Verification Suite for Milestone 1
 * Written by Challenger 1 (teamwork_challenger_m1_1)
 */

import React from "react"
import ReactDOMServer from "react-dom/server"
import { MemoryRouter } from "react-router"

// Mock document/window for Node.js execution before importing browser router
if (typeof globalThis.document === "undefined") {
  const fakeWindow: any = {
    location: { pathname: "/", search: "", hash: "" },
    history: { pushState: () => {}, replaceState: () => {}, state: null },
    addEventListener: () => {},
    removeEventListener: () => {},
    matchMedia: () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }),
  }
  ;(globalThis as any).window = fakeWindow
  ;(globalThis as any).document = {
    defaultView: fakeWindow,
    createElement: () => ({}),
  }
}

// Target modules under audit
import {
  mockCandidates,
  mockQuotas,
  mockResdexFolders,
  mockJobRequisitions,
  mockRecentSearches,
  mockSavedSearches,
  mockWebinars,
  getCandidatesByStage,
  updateCandidateStage,
  deductQuota,
  Candidate,
  QuotaUsage,
} from "../src/data/resdexData"

import { PublicLandingPage } from "../src/pages/resdex/PublicLandingPage"
import { TopNavigation } from "../src/components/layout/TopNavigation"

interface TestFailure {
  category: string
  testName: string
  error: string
}

const failures: TestFailure[] = []
let passCount = 0

function assert(
  condition: boolean,
  category: string,
  testName: string,
  message: string,
) {
  if (!condition) {
    failures.push({ category, testName, error: message })
    console.error(`  [FAIL] ${category} > ${testName}: ${message}`)
  } else {
    passCount++
    console.log(`  [PASS] ${category} > ${testName}`)
  }
}

async function runEmpiricalSuite() {
  console.log(
    "==================================================================",
  )
  console.log(" ADVERSARIAL CHALLENGER EMPIRICAL VERIFICATION — MILESTONE 1")
  console.log(
    "==================================================================\n",
  )

  // -------------------------------------------------------------
  // SUITE 1: CANDIDATE DATA INTEGRITY & MODEL VALIDATION
  // -------------------------------------------------------------
  console.log(">>> [1/5] Auditing Candidate Data Models & Fields <<<")

  assert(
    Array.isArray(mockCandidates) && mockCandidates.length >= 8,
    "Candidate Integrity",
    "Candidates Array Length",
    `Expected at least 8 candidates, got ${mockCandidates?.length}`,
  )

  const requiredStringFields: keyof Candidate[] = [
    "id",
    "name",
    "headline",
    "noticePeriod",
    "currentLocation",
    "currentCompany",
    "currentDesignation",
    "appliedDate",
  ]

  mockCandidates.forEach((candidate, idx) => {
    const label = candidate.name || `Candidate #${idx}`

    requiredStringFields.forEach((field) => {
      const val = candidate[field]
      assert(
        typeof val === "string" && val.trim().length > 0,
        "Candidate Integrity",
        `Candidate [${label}] has valid ${String(field)}`,
        `Field ${String(field)} is missing or empty on candidate ${candidate.id || idx}`,
      )
    })

    assert(
      typeof candidate.experienceYears === "number" &&
        candidate.experienceYears >= 0,
      "Candidate Integrity",
      `Candidate [${label}] valid experienceYears`,
      `Invalid experienceYears: ${candidate.experienceYears}`,
    )

    assert(
      typeof candidate.experienceMonths === "number" &&
        candidate.experienceMonths >= 0 &&
        candidate.experienceMonths <= 11,
      "Candidate Integrity",
      `Candidate [${label}] valid experienceMonths (0-11)`,
      `Invalid experienceMonths: ${candidate.experienceMonths}`,
    )

    assert(
      typeof candidate.currentSalaryLacs === "number" &&
        candidate.currentSalaryLacs > 0,
      "Candidate Integrity",
      `Candidate [${label}] valid currentSalaryLacs (>0)`,
      `Invalid currentSalaryLacs: ${candidate.currentSalaryLacs}`,
    )

    assert(
      Array.isArray(candidate.keySkills) && candidate.keySkills.length > 0,
      "Candidate Integrity",
      `Candidate [${label}] has non-empty keySkills array`,
      `keySkills is empty or not an array for ${label}`,
    )

    assert(
      ["all", "shortlisted", "maybe", "rejected"].includes(candidate.stage),
      "Candidate Integrity",
      `Candidate [${label}] valid stage`,
      `Invalid stage value: ${candidate.stage}`,
    )

    assert(
      ["new", "viewed", "action_pending"].includes(candidate.subStatus),
      "Candidate Integrity",
      `Candidate [${label}] valid subStatus`,
      `Invalid subStatus value: ${candidate.subStatus}`,
    )

    // Education check
    const edu = candidate.education
    if (typeof edu === "object" && edu !== null) {
      assert(
        Boolean(
          edu.degree && edu.institution && edu.year > 1950 && edu.year < 2035,
        ),
        "Candidate Integrity",
        `Candidate [${label}] education object integrity`,
        `Education object has invalid fields: ${JSON.stringify(edu)}`,
      )
    } else {
      assert(
        typeof edu === "string" && edu.trim().length > 0,
        "Candidate Integrity",
        `Candidate [${label}] education string non-empty`,
        `Education string is empty`,
      )
    }
  })

  // Specific canonical candidates check
  const pawar = mockCandidates.find((c) => c.name === "PAWAR MUKESH")
  assert(
    Boolean(pawar),
    "Canonical Candidates",
    "Pawar Mukesh Exists",
    "Pawar Mukesh record not found",
  )
  if (pawar) {
    assert(
      pawar.experienceYears === 9 && pawar.experienceMonths === 5,
      "Canonical Candidates",
      "Pawar Mukesh Experience 9y 5m",
      `Expected 9y 5m, got ${pawar.experienceYears}y ${pawar.experienceMonths}m`,
    )
    assert(
      pawar.currentSalaryLacs === 13,
      "Canonical Candidates",
      "Pawar Mukesh Salary 13 Lacs",
      `Expected 13 Lacs, got ${pawar.currentSalaryLacs}`,
    )
    assert(
      pawar.noticePeriod === "Can join in 0-15d",
      "Canonical Candidates",
      "Pawar Mukesh Notice Period 0-15d",
      `Expected 'Can join in 0-15d', got '${pawar.noticePeriod}'`,
    )
    assert(
      pawar.currentLocation === "Bengaluru",
      "Canonical Candidates",
      "Pawar Mukesh Location Bengaluru",
      `Expected Bengaluru, got ${pawar.currentLocation}`,
    )
  }

  const kailash = mockCandidates.find((c) => c.name === "Balgare Kailash")
  assert(
    Boolean(kailash),
    "Canonical Candidates",
    "Balgare Kailash Exists",
    "Balgare Kailash not found",
  )
  if (kailash) {
    assert(
      kailash.experienceYears === 5 && kailash.experienceMonths === 2,
      "Canonical Candidates",
      "Balgare Kailash Experience 5y 2m",
      `Expected 5y 2m, got ${kailash.experienceYears}y ${kailash.experienceMonths}m`,
    )
    assert(
      kailash.currentCompany === "HCLTech",
      "Canonical Candidates",
      "Balgare Kailash Company HCLTech",
      `Expected HCLTech, got ${kailash.currentCompany}`,
    )
  }

  const arun = mockCandidates.find((c) => c.name === "M Arunkumar")
  assert(
    Boolean(arun),
    "Canonical Candidates",
    "M Arunkumar Exists",
    "M Arunkumar not found",
  )
  if (arun) {
    assert(
      arun.recommendedBadge === true,
      "Canonical Candidates",
      "M Arunkumar Recommended Badge True",
      `Expected recommendedBadge true, got ${arun.recommendedBadge}`,
    )
    assert(
      arun.experienceYears === 8,
      "Canonical Candidates",
      "M Arunkumar Experience 8 Years",
      `Expected 8y, got ${arun.experienceYears}`,
    )
  }

  // -------------------------------------------------------------
  // SUITE 2: QUOTA MATHEMATICAL CONSISTENCY
  // -------------------------------------------------------------
  console.log("\n>>> [2/5] Auditing Quotas Mathematical Integrity <<<")

  assert(
    Array.isArray(mockQuotas) && mockQuotas.length === 3,
    "Quota Integrity",
    "Quotas Array Length",
    `Expected exactly 3 quota types, got ${mockQuotas?.length}`,
  )

  mockQuotas.forEach((quota) => {
    assert(
      quota.total === quota.used + quota.remaining,
      "Quota Integrity",
      `Quota [${quota.name}] Equation: total = used + remaining`,
      `Math mismatch: total (${quota.total}) != used (${quota.used}) + remaining (${quota.remaining})`,
    )

    assert(
      quota.total > 0 && quota.used >= 0 && quota.remaining >= 0,
      "Quota Integrity",
      `Quota [${quota.name}] Non-negative values`,
      `Values invalid: total=${quota.total}, used=${quota.used}, remaining=${quota.remaining}`,
    )
  })

  const cvQuota = mockQuotas.find((q) => q.id === "quota-cv-access")
  assert(
    cvQuota?.total === 4000 &&
      cvQuota?.used === 2228 &&
      cvQuota?.remaining === 1772,
    "Quota Integrity",
    "CV Access Exact Numbers 4000/2228/1772",
    `CV Quota numbers mismatch: ${JSON.stringify(cvQuota)}`,
  )

  const nviteQuota = mockQuotas.find((q) => q.id === "quota-nvite")
  assert(
    nviteQuota?.total === 32000 &&
      nviteQuota?.used === 18648 &&
      nviteQuota?.remaining === 13352,
    "Quota Integrity",
    "NVite Exact Numbers 32000/18648/13352",
    `NVite Quota numbers mismatch: ${JSON.stringify(nviteQuota)}`,
  )

  const hotQuota = mockQuotas.find((q) => q.id === "quota-hot-vacancies")
  assert(
    hotQuota?.total === 20 &&
      hotQuota?.used === 18 &&
      hotQuota?.remaining === 2,
    "Quota Integrity",
    "Hot Vacancies Exact Numbers 20/18/2",
    `Hot Vacancies Quota numbers mismatch: ${JSON.stringify(hotQuota)}`,
  )

  // -------------------------------------------------------------
  // SUITE 3: REQUISITIONS & FOLDERS INTEGRITY
  // -------------------------------------------------------------
  console.log("\n>>> [3/5] Auditing Requisitions, Folders & Searches <<<")

  assert(
    mockJobRequisitions.length === 70,
    "Requisitions Integrity",
    "Total Requisitions Count 70",
    `Expected 70 requisitions, got ${mockJobRequisitions.length}`,
  )

  const activeJobs = mockJobRequisitions.filter((j) => j.status === "active")
  const closedJobs = mockJobRequisitions.filter((j) => j.status === "closed")
  const expiredJobs = mockJobRequisitions.filter((j) => j.status === "expired")

  assert(
    activeJobs.length === 27,
    "Requisitions Integrity",
    "Active Jobs Count 27",
    `Expected 27 active jobs, got ${activeJobs.length}`,
  )
  assert(
    closedJobs.length === 3,
    "Requisitions Integrity",
    "Closed Jobs Count 3",
    `Expected 3 closed jobs, got ${closedJobs.length}`,
  )
  assert(
    expiredJobs.length === 40,
    "Requisitions Integrity",
    "Expired Jobs Count 40",
    `Expected 40 expired jobs, got ${expiredJobs.length}`,
  )

  assert(
    mockResdexFolders.length === 4,
    "Folders Integrity",
    "Folders Count 4",
    `Expected 4 folders, got ${mockResdexFolders.length}`,
  )
  const pcbFolder = mockResdexFolders.find((f) => f.name === "PCB")
  const pmFolder = mockResdexFolders.find((f) => f.name === "Program Manager")
  assert(
    pcbFolder?.count === 138,
    "Folders Integrity",
    "PCB folder count 138",
    `PCB folder count: ${pcbFolder?.count}`,
  )
  assert(
    pmFolder?.count === 0,
    "Folders Integrity",
    "Program Manager count 0",
    `PM folder count: ${pmFolder?.count}`,
  )

  assert(
    mockRecentSearches.length >= 4,
    "Recent Searches Integrity",
    "Recent Searches Count >= 4",
    `Expected >= 4 recent searches, got ${mockRecentSearches.length}`,
  )

  assert(
    mockWebinars.length === 4,
    "Webinars Integrity",
    "Webinars Count 4",
    `Expected 4 webinars, got ${mockWebinars.length}`,
  )

  // -------------------------------------------------------------
  // SUITE 4: HELPER FUNCTIONS & ADVERSARIAL STRESS TESTING
  // -------------------------------------------------------------
  console.log("\n>>> [4/5] Adversarial Stress Testing on Helper Functions <<<")

  // Stress test getCandidatesByStage
  const defaultList = getCandidatesByStage()
  assert(
    defaultList.length === mockCandidates.length,
    "Stress getCandidatesByStage",
    "Default invocation returns mockCandidates",
    `Expected ${mockCandidates.length}, got ${defaultList.length}`,
  )

  const emptyList = getCandidatesByStage([])
  assert(
    emptyList.length === 0,
    "Stress getCandidatesByStage",
    "Empty array input returns empty array without throwing",
    `Expected 0, got ${emptyList.length}`,
  )

  const shortlistedOnly = getCandidatesByStage(mockCandidates, "shortlisted")
  assert(
    Array.isArray(shortlistedOnly),
    "Stress getCandidatesByStage",
    "Filtered array is valid array",
    "Return is not an array",
  )

  // Stress test updateCandidateStage
  const testCandidateId = mockCandidates[0].id
  const updatedList = updateCandidateStage(
    mockCandidates,
    testCandidateId,
    "shortlisted",
  )
  const targetUpdated = updatedList.find((c) => c.id === testCandidateId)
  assert(
    targetUpdated?.stage === "shortlisted",
    "Stress updateCandidateStage",
    "Target candidate updated to shortlisted",
    `Candidate stage is ${targetUpdated?.stage}`,
  )

  // Immutability check: original list must not be mutated!
  assert(
    mockCandidates[0].stage === "all",
    "Stress updateCandidateStage",
    "Immutability: Original mockCandidates preserved",
    `Original was mutated to ${mockCandidates[0].stage}`,
  )

  // Edge case: Non-existent candidate ID
  const nonexistentUpdated = updateCandidateStage(
    mockCandidates,
    "non-existent-candidate-id-9999",
    "rejected",
  )
  assert(
    nonexistentUpdated.length === mockCandidates.length,
    "Stress updateCandidateStage",
    "Non-existent candidate ID returns equal length array without exception",
    `Expected length ${mockCandidates.length}, got ${nonexistentUpdated.length}`,
  )

  // Edge case: empty list update
  const emptyUpdated = updateCandidateStage([], "any-id", "shortlisted")
  assert(
    emptyUpdated.length === 0,
    "Stress updateCandidateStage",
    "Empty candidate list returns empty array cleanly",
    `Expected 0, got ${emptyUpdated.length}`,
  )

  // Stress test deductQuota
  const initialQuotas = JSON.parse(JSON.stringify(mockQuotas)) as QuotaUsage[]
  const initialNvite = initialQuotas.find((q) => q.id === "quota-nvite")!
  const deducted = deductQuota(initialQuotas, "quota-nvite", 500)
  const deductedNvite = deducted.find((q) => q.id === "quota-nvite")!

  assert(
    deductedNvite.used === initialNvite.used + 500,
    "Stress deductQuota",
    "Used quota incremented accurately by 500",
    `Expected ${initialNvite.used + 500}, got ${deductedNvite.used}`,
  )
  assert(
    deductedNvite.remaining === initialNvite.remaining - 500,
    "Stress deductQuota",
    "Remaining quota decremented accurately by 500",
    `Expected ${initialNvite.remaining - 500}, got ${deductedNvite.remaining}`,
  )
  assert(
    deductedNvite.total === initialNvite.total,
    "Stress deductQuota",
    "Total quota invariant preserved",
    `Total changed from ${initialNvite.total} to ${deductedNvite.total}`,
  )

  // Edge case: Deduct more than total / remaining!
  const overDeducted = deductQuota(initialQuotas, "quota-nvite", 999999)
  const overNvite = overDeducted.find((q) => q.id === "quota-nvite")!
  assert(
    overNvite.remaining === 0,
    "Stress deductQuota",
    "Over-deduction clamps remaining to 0 (no negative balance)",
    `Remaining went negative: ${overNvite.remaining}`,
  )

  // Edge case: Deduct 0
  const zeroDeducted = deductQuota(initialQuotas, "quota-nvite", 0)
  const zeroNvite = zeroDeducted.find((q) => q.id === "quota-nvite")!
  assert(
    zeroNvite.used === initialNvite.used &&
      zeroNvite.remaining === initialNvite.remaining,
    "Stress deductQuota",
    "Zero deduction keeps balances identical",
    `Balances changed on zero deduction`,
  )

  // Edge case: Non-existent quota ID
  const invalidQuotaDeducted = deductQuota(
    initialQuotas,
    "quota-does-not-exist",
    100,
  )
  assert(
    invalidQuotaDeducted.length === initialQuotas.length,
    "Stress deductQuota",
    "Non-existent quota ID returns array safely without exception",
    `Array length changed`,
  )

  // Edge case: Empty quotas list
  const emptyQuotasDeducted = deductQuota([], "quota-nvite", 50)
  assert(
    emptyQuotasDeducted.length === 0,
    "Stress deductQuota",
    "Empty quotas list returns empty array",
    `Expected empty array`,
  )

  // Edge case: Quota refund / rollback (negative amount)
  const refunded = deductQuota(initialQuotas, "quota-nvite", -200)
  const refundedNvite = refunded.find((q) => q.id === "quota-nvite")!
  assert(
    refundedNvite.used === initialNvite.used - 200 &&
      refundedNvite.remaining === initialNvite.remaining + 200,
    "Stress deductQuota",
    "Negative deduction acts as refund/rollback and restores remaining quota",
    `Refund calculation unexpected: used=${refundedNvite.used}, remaining=${refundedNvite.remaining}`,
  )

  // Stress test: Candidate with string-based education vs object-based education
  const stringEduCandidate: Candidate = {
    id: "cand-string-edu",
    name: "String Edu Candidate",
    headline: "Frontend Engineer",
    experienceYears: 4,
    experienceMonths: 0,
    currentSalaryLacs: 12,
    noticePeriod: "Immediate",
    currentLocation: "Delhi",
    currentCompany: "Acme Corp",
    currentDesignation: "Engineer",
    education: "B.Tech Computer Science from Delhi University, 2020",
    keySkills: ["React", "TypeScript"],
    stage: "all",
    subStatus: "new",
    appliedDate: "1 Nov 2026",
  }

  const hybridList = [...mockCandidates, stringEduCandidate]
  const stageFiltered = getCandidatesByStage(hybridList, "all")
  assert(
    stageFiltered.length === mockCandidates.length + 1,
    "Stress Data Polymorphism",
    "Supports candidates with string education alongside object education",
    `Length mismatch`,
  )

  // Stress test: Chained stage transitions
  let chainedList = mockCandidates
  chainedList = updateCandidateStage(chainedList, "pawar-mukesh", "shortlisted")
  chainedList = updateCandidateStage(chainedList, "pawar-mukesh", "maybe")
  chainedList = updateCandidateStage(chainedList, "pawar-mukesh", "rejected")
  const finalPawar = chainedList.find((c) => c.id === "pawar-mukesh")
  assert(
    finalPawar?.stage === "rejected",
    "Stress updateCandidateStage",
    "Chained state transitions (all -> shortlisted -> maybe -> rejected) work seamlessly",
    `Final stage unexpected: ${finalPawar?.stage}`,
  )
  // Verify original data unmutated
  assert(
    mockCandidates.find((c) => c.id === "pawar-mukesh")?.stage === "all",
    "Stress updateCandidateStage",
    "Immutability preserved across chained transitions",
    "Original mockCandidates was mutated",
  )

  // -------------------------------------------------------------
  // SUITE 5: COMPONENT RENDERING & ROUTE INTEGRITY
  // -------------------------------------------------------------
  console.log("\n>>> [5/5] Auditing Component Renders & Route Graphs <<<")

  // SSR Render PublicLandingPage
  try {
    const landingHtml = ReactDOMServer.renderToString(
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/"] },
        React.createElement(PublicLandingPage),
      ),
    )

    assert(
      landingHtml.includes("TALENT DECODED") &&
        landingHtml.includes("sheela.nancy@ispatialtec.com") &&
        landingHtml.includes("10 crore+ registered jobseekers") &&
        landingHtml.includes("Login with Naukri Launcher"),
      "Component Rendering",
      "PublicLandingPage renders complete HTML shell with Launcher SSO",
      "Missing expected SSR content in PublicLandingPage",
    )
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    assert(
      false,
      "Component Rendering",
      "PublicLandingPage SSR Render",
      `Threw error: ${errMsg}`,
    )
  }

  // SSR Render TopNavigation
  try {
    const navHtml = ReactDOMServer.renderToString(
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/employer"] },
        React.createElement(TopNavigation),
      ),
    )

    assert(
      navHtml.includes("naukri") &&
        navHtml.includes("Talent Cloud") &&
        navHtml.includes("Jobs &amp; Responses") &&
        navHtml.includes("Resdex") &&
        navHtml.includes("1,772") &&
        navHtml.includes("sheela.nancy@ispatialtec.com"),
      "Component Rendering",
      "TopNavigation renders brand, navigation menus, quota pill, and profile",
      "Missing expected SSR content in TopNavigation",
    )
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    assert(
      false,
      "Component Rendering",
      "TopNavigation SSR Render",
      `Threw error: ${errMsg}`,
    )
  }

  // Check router routes definition
  let router: any = null
  try {
    const routesModule = await import("../src/app/routes")
    router = routesModule.router
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    assert(
      false,
      "Routing Integrity",
      "Import routes module",
      `Failed to import routes: ${errMsg}`,
    )
  }
  assert(
    Boolean(router && router.routes),
    "Routing Integrity",
    "Router initialized with routes",
    "Router is not defined or has no routes",
  )

  const flatPaths: string[] = []
  function collectPaths(routes: any[], prefix = "") {
    routes.forEach((r) => {
      let currentPath = r.path || ""
      if (prefix && currentPath) {
        if (!currentPath.startsWith("/")) {
          currentPath = `${prefix}/${currentPath}`
        }
      } else if (!currentPath && prefix) {
        currentPath = prefix
      }
      if (currentPath) flatPaths.push(currentPath)
      if (r.children) collectPaths(r.children, currentPath)
    })
  }
  collectPaths(router.routes)

  const expectedPaths = [
    "/",
    "/landing",
    "/employer/login",
    "/employer",
    "/employer/jobs",
    "/employer/candidates/search",
    "/employer/candidates/results",
    "/employer/nvite/broadcast",
  ]

  expectedPaths.forEach((expected) => {
    assert(
      flatPaths.includes(expected),
      "Routing Integrity",
      `Route exists: ${expected}`,
      `Route ${expected} not found in router paths: ${flatPaths.join(", ")}`,
    )
  })

  // Summary
  console.log(
    "\n==================================================================",
  )
  console.log(` EMPIRICAL VERIFICATION COMPLETE`)
  console.log(` PASSED: ${passCount}`)
  console.log(` FAILED: ${failures.length}`)
  console.log(
    "==================================================================",
  )

  if (failures.length > 0) {
    console.error("\nFAILURES ENCOUNTERED:")
    failures.forEach((f, idx) => {
      console.error(`  ${idx + 1}. [${f.category}] ${f.testName} -> ${f.error}`)
    })
    process.exit(1)
  } else {
    console.log(
      "\nVERDICT: 100% EMPIRICAL CONFIRMATION — ALL ASSERTIONS PASSED!",
    )
    process.exit(0)
  }
}

runEmpiricalSuite().catch((err) => {
  console.error("Unhandled test harness crash:", err)
  process.exit(1)
})
