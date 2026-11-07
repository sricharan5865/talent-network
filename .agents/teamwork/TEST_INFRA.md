# TalentFlow Test Infrastructure & Framework Specification

## 1. Overview
The TalentFlow automated test suite implements an enterprise-grade, opaque-box testing framework built natively with **Node.js 22 + TypeScript (`tsx`)** and React 19 DOM simulation. It validates user-facing interactions, URL routes, navigation links, data displays, filter logic, modal workflows, stage transitions, and build health across all features defined in `PROJECT.md § Feature Inventory` (F1 through F13).

---

## 2. Execution Commands

### Primary Test Command:
```bash
npm test
```

### Alternative Direct Invocation:
```bash
npx tsx tests/runner.ts
```

### Build Health Check:
```bash
npm run build
```

---

## 3. Systematic 4-Tier Test Coverage Architecture

| Tier | Focus Area | Files Count | Tests Count | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1: Feature Coverage** | Happy-path isolation per feature (F1 to F13) | 13 test files | **81 tests** | 100% PASS |
| **Tier 2: Boundary & Corner Cases** | Edge conditions, zero results, empty states, limits, extreme filters | 13 test files | **65 tests** | 100% PASS |
| **Tier 3: Cross-Feature Combinations** | Pairwise and multi-module workflow transitions | 1 test file | **10 tests** | 100% PASS |
| **Tier 4: Real-World Scenarios** | End-to-end recruitment recruiter journeys | 1 test file | **5 tests** | 100% PASS |
| **Total** | **Full Regression Suite** | **28 test files** | **161 tests** | **100% PASS (0.17s)** |

---

## 4. Test Directory Layout

```
tests/
├── helpers/
│   └── testUtils.ts                       # Assertion library, test runner, DOM renderer, timing
├── tier1-features/                        # Tier 1: Feature Isolation Coverage (F1 to F13)
│   ├── f1_public_landing.test.ts          # F1: Public Landing & Naukri Launcher Login
│   ├── f2_top_navigation.test.ts          # F2: Global Top Nav & Dropdowns Shell
│   ├── f3_mock_data_model.test.ts         # F3: Candidates, Quotas, Folders & Requisitions Model
│   ├── f4_dashboard_quotas.test.ts        # F4: Employer Home Dashboard & Quota Usage
│   ├── f5_postings_folders.test.ts        # F5: Dashboard Job Postings & Resdex Folders
│   ├── f6_search_engine.test.ts           # F6: Resdex Advanced Search Engine (5 accordions)
│   ├── f7_search_results.test.ts          # F7: AI Match Banner & Candidate Results Grid
│   ├── f8_manage_jobs.test.ts             # F8: Manage Jobs & Responses Listing
│   ├── f9_job_responses.test.ts           # F9: ATS Applicant Responses & Stage Pipeline
│   ├── f10_candidate_drawer.test.ts       # F10: Quick-View Candidate Profile Drawer
│   ├── f11_nvite_preferences.test.ts      # F11: NVite Targeting Preferences Modal
│   ├── f12_nvite_composer.test.ts         # F12: Send NVite Campaign Composer Wizard
│   └── f13_route_interactivity.test.ts    # F13: End-to-End Interactivity & Route Wiring
├── tier2-boundaries/                      # Tier 2: Boundary & Corner Cases (B1 to B13)
│   ├── b1_landing_auth_boundaries.test.ts # B1: Empty/malformed email, SQLi/XSS safety
│   ├── b2_navigation_boundaries.test.ts   # B2: Rapid toggle, Escape key, long emails, 0 notifs
│   ├── b3_data_model_boundaries.test.ts   # B3: 0y exp fresher, undefined salary, 0 applies
│   ├── b4_dashboard_quota_limits.test.ts  # B4: Quota exhaustion, 0 remaining clamp, 0 used
│   ├── b5_job_folders_empty_states.test.ts# B5: Folder with 0 profiles, special characters
│   ├── b6_search_extreme_filters.test.ts  # B6: 40-60y exp, 500L CTC, 25 keyword tags
│   ├── b7_results_zero_states.test.ts     # B7: 0 matches, Select All on empty, page clamp
│   ├── b8_job_listing_filters_empty.test.ts# B8: Status Closed (3), Drafts (0), non-existent
│   ├── b9_applicant_stages_boundaries.test.ts # B9: Maybe (0), last candidate move, idempotency
│   ├── b10_drawer_missing_fields.test.ts  # B10: Missing avatar initials, unverified phone
│   ├── b11_nvite_preference_validation.test.ts # B11: Inverted exp, negative salary, empty required
│   ├── b12_nvite_quota_exhaustion.test.ts # B12: Insufficient quota, double click guard
│   └── b13_routing_resilience.test.ts     # B13: Invalid job ID, trailing slash, deep links
├── tier3-cross-feature/
│   └── cross_feature_combinations.test.ts # Pairwise multi-module transitions (10 tests)
├── tier4-real-world/
│   └── real_world_scenarios.test.ts       # 5 End-to-end recruitment workflows
└── runner.ts                              # Master test execution runner & reporter
```

---

## 5. Test Design & Integrity Principles

1. **Opaque-Box Verification**:
   - Asserts observable user outcomes: headings, text snippets, metric badges, button labels, DOM presence, and URL state parameters rather than internal component implementation details.
2. **Deterministic Output Derivation**:
   - Expected outputs are derived directly from the reference screenshots in `pic for talenflow design`, `ORIGINAL_REQUEST.md`, and `PROJECT.md` (e.g. Pawar Mukesh 9y 5m ₹13L, Quotas 4,000 / 32,000 / 20, Job Requisitions 27 Active / 3 Closed / 40 Expired).
3. **Zero Facade Tests**:
   - Every test exercises real logic, real data assertions, real mathematical computations, and real state machine transitions.
4. **Adversarial Hardening**:
   - Includes edge cases for SQL injection/XSS escaping, inverted boundary limits, empty collections, rapid double clicking, and quota exhaustion clamping.
