/**
 * Master E2E Test Runner for TalentFlow
 * Systematic 4-Tier Automated Opaque-Box Test Suite
 */

import { globalResults, TestResult } from "./helpers/testUtils"

// Tier 1 Suites (Feature Coverage F1 to F13)
import { runF1Tests } from "./tier1-features/f1_public_landing.test"
import { runF2Tests } from "./tier1-features/f2_top_navigation.test"
import { runF3Tests } from "./tier1-features/f3_mock_data_model.test"
import { runF4Tests } from "./tier1-features/f4_dashboard_quotas.test"
import { runF5Tests } from "./tier1-features/f5_postings_folders.test"
import { runF6Tests } from "./tier1-features/f6_search_engine.test"
import { runF7Tests } from "./tier1-features/f7_search_results.test"
import { runF8Tests } from "./tier1-features/f8_manage_jobs.test"
import { runF9Tests } from "./tier1-features/f9_job_responses.test"
import { runF10Tests } from "./tier1-features/f10_candidate_drawer.test"
import { runF11Tests } from "./tier1-features/f11_nvite_preferences.test"
import { runF12Tests } from "./tier1-features/f12_nvite_composer.test"
import { runF13Tests } from "./tier1-features/f13_route_interactivity.test"

// Tier 2 Suites (Boundary & Corner Cases B1 to B13)
import { runB1Tests } from "./tier2-boundaries/b1_landing_auth_boundaries.test"
import { runB2Tests } from "./tier2-boundaries/b2_navigation_boundaries.test"
import { runB3Tests } from "./tier2-boundaries/b3_data_model_boundaries.test"
import { runB4Tests } from "./tier2-boundaries/b4_dashboard_quota_limits.test"
import { runB5Tests } from "./tier2-boundaries/b5_job_folders_empty_states.test"
import { runB6Tests } from "./tier2-boundaries/b6_search_extreme_filters.test"
import { runB7Tests } from "./tier2-boundaries/b7_results_zero_states.test"
import { runB8Tests } from "./tier2-boundaries/b8_job_listing_filters_empty.test"
import { runB9Tests } from "./tier2-boundaries/b9_applicant_stages_boundaries.test"
import { runB10Tests } from "./tier2-boundaries/b10_drawer_missing_fields.test"
import { runB11Tests } from "./tier2-boundaries/b11_nvite_preference_validation.test"
import { runB12Tests } from "./tier2-boundaries/b12_nvite_quota_exhaustion.test"
import { runB13Tests } from "./tier2-boundaries/b13_routing_resilience.test"

// Tier 3 Suite (Cross-Feature Combinations)
import { runTier3Tests } from "./tier3-cross-feature/cross_feature_combinations.test"

// Tier 4 Suite (Real-World Application Scenarios)
import { runTier4Tests } from "./tier4-real-world/real_world_scenarios.test"

async function main() {
  console.log(
    "================================================================",
  )
  console.log(" TALENTFLOW COMPREHENSIVE 4-TIER E2E TEST SUITE RUNNER")
  console.log(
    "================================================================",
  )
  console.log(`Starting test run at ${new Date().toISOString()}`)
  console.log(
    "Framework: Node.js 22 + tsx runner with opaque-box DOM simulation\n",
  )

  const overallStartTime = Date.now()

  // Tier 1 Execution
  console.log(">>> EXECUTING TIER 1: FEATURE COVERAGE (F1 to F13) <<<")
  await runF1Tests()
  await runF2Tests()
  await runF3Tests()
  await runF4Tests()
  await runF5Tests()
  await runF6Tests()
  await runF7Tests()
  await runF8Tests()
  await runF9Tests()
  await runF10Tests()
  await runF11Tests()
  await runF12Tests()
  await runF13Tests()

  // Tier 2 Execution
  console.log(">>> EXECUTING TIER 2: BOUNDARY & CORNER CASES (B1 to B13) <<<")
  await runB1Tests()
  await runB2Tests()
  await runB3Tests()
  await runB4Tests()
  await runB5Tests()
  await runB6Tests()
  await runB7Tests()
  await runB8Tests()
  await runB9Tests()
  await runB10Tests()
  await runB11Tests()
  await runB12Tests()
  await runB13Tests()

  // Tier 3 Execution
  console.log(
    ">>> EXECUTING TIER 3: CROSS-FEATURE INTEGRATION COMBINATIONS <<<",
  )
  await runTier3Tests()

  // Tier 4 Execution
  console.log(">>> EXECUTING TIER 4: REAL-WORLD APPLICATION SCENARIOS <<<")
  await runTier4Tests()

  const totalDurationMs = Date.now() - overallStartTime

  // Breakdown by Tier
  const tier1Tests = globalResults.filter((r) => r.tier === 1)
  const tier2Tests = globalResults.filter((r) => r.tier === 2)
  const tier3Tests = globalResults.filter((r) => r.tier === 3)
  const tier4Tests = globalResults.filter((r) => r.tier === 4)

  const tier1Passed = tier1Tests.filter((r) => r.passed).length
  const tier2Passed = tier2Tests.filter((r) => r.passed).length
  const tier3Passed = tier3Tests.filter((r) => r.passed).length
  const tier4Passed = tier4Tests.filter((r) => r.passed).length

  const totalTests = globalResults.length
  const totalPassed = globalResults.filter((r) => r.passed).length
  const totalFailed = totalTests - totalPassed

  console.log(
    "\n================================================================",
  )
  console.log(" 4-TIER TEST EXECUTION SUMMARY REPORT")
  console.log(
    "================================================================",
  )
  console.log(
    ` Tier 1 (Feature Coverage F1-F13):    ${tier1Passed} / ${tier1Tests.length} Passed`,
  )
  console.log(
    ` Tier 2 (Boundary & Corner Cases):    ${tier2Passed} / ${tier2Tests.length} Passed`,
  )
  console.log(
    ` Tier 3 (Cross-Feature Combinations): ${tier3Passed} / ${tier3Tests.length} Passed`,
  )
  console.log(
    ` Tier 4 (Real-World Scenarios):       ${tier4Passed} / ${tier4Tests.length} Passed`,
  )
  console.log(
    "----------------------------------------------------------------",
  )
  console.log(` TOTAL TESTS EXECUTED:                ${totalTests}`)
  console.log(` PASSED:                              ${totalPassed}`)
  console.log(` FAILED:                              ${totalFailed}`)
  console.log(
    ` DURATION:                            ${totalDurationMs} ms (${(totalDurationMs / 1000).toFixed(2)}s)`,
  )
  console.log(
    "================================================================\n",
  )

  if (totalFailed > 0) {
    console.error("FAILED TESTS DETAILS:")
    globalResults
      .filter((r) => !r.passed)
      .forEach((r, idx) => {
        console.error(`\n[${idx + 1}] [${r.suite}] ${r.name}`)
        console.error(`Error: ${r.error}`)
      })
    process.exit(1)
  } else {
    console.log(
      "✓ ALL TESTS PASSED SUCCESSFULLY! 100% SPECIFICATION CONFORMANCE VERIFIED.",
    )
    process.exit(0)
  }
}

main().catch((err) => {
  console.error("Test runner fatal error:", err)
  process.exit(1)
})
