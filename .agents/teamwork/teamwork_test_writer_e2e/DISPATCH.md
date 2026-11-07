## 2026-11-06T13:05:19Z
You are the E2E Test Writer for the TalentFlow project.

## Mandatory Reading
Read the authoritative user request at:
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\ORIGINAL_REQUEST.md`
Also read:
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\PROJECT.md`
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_explorer_survey_1\report.md`
`c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_explorer_survey_3\report.md`

## Your Identity & Working Directory
- Identity: teamwork_test_writer_e2e
- Working directory: `c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_test_writer_e2e`
- Parent Orchestrator Conversation ID: `5f22dc5b-73ae-4760-a282-e67479601cde`

## Mission & Scope
Design and implement a comprehensive opaque-box test suite for TalentFlow that verifies all features in `PROJECT.md § Feature Inventory` (F1 through F13):
1. **Test Infrastructure**:
   - Create tests in a standard test directory (e.g. `tests/` or `src/tests/` or automated node/ts test runner script) that can be run via an npm command or automated node test runner (e.g. `npm test` or `npx tsx tests/runner.ts` or vitest).
   - Test cases must be opaque-box, verifying user-facing interactions, URL routes, navigation links, data display elements, search filters, modal workflows, stage transitions, and build health.
2. **Systematic 4-Tier Test Coverage**:
   - **Tier 1 (Feature Coverage)**: >=5 test cases per feature (F1 to F13) testing happy-path isolation.
   - **Tier 2 (Boundary & Corner Cases)**: >=5 test cases per feature testing boundary conditions, empty states, limits, zero results, extreme filters.
   - **Tier 3 (Cross-Feature Combinations)**: Pairwise interactions (e.g., search -> filter -> select candidate -> open NVite wizard -> quota check; job listing -> filter -> open applicant inbox -> shortlist -> stage update).
   - **Tier 4 (Real-World Application Scenarios)**: >=5 end-to-end recruitment workflows simulating actual recruiter tasks.
3. **Artifacts to Publish**:
   - Create `c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\TEST_INFRA.md` following the template in the project guide.
   - Once all test suites and runner are ready and verified, create `c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\TEST_READY.md` summarizing the test runner command and tier counts.
   - Write your handoff to `c:\Users\SRI CHARAN\Desktop\talent\.agents\teamwork\teamwork_test_writer_e2e\handoff.md`.
4. **Completion**:
   - Use `send_message` to notify parent orchestrator (`5f22dc5b-73ae-4760-a282-e67479601cde`) when `TEST_READY.md` is published.
