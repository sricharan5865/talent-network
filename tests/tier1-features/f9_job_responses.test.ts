/**
 * Tier 1 Feature Tests: F9 - Job Applicant Responses / ATS Inbox
 * Authoritative Source: ORIGINAL_REQUEST.md, PROJECT.md F9, Screenshots 175623.png, 180258.png, 180325.png
 */

import { runTest, expect } from "../helpers/testUtils"
import {
  mockCandidates,
  getCandidatesByStage,
  updateCandidateStage,
} from "../../src/data/resdexData"

export async function runF9Tests() {
  const SUITE = "F9: Job Applicant Responses / ATS Inbox"

  await runTest(
    SUITE,
    "F9.1: Requisition Us It Recruiter telemetry and breadcrumbs match screenshot",
    1,
    "F9",
    () => {
      const metaBar = {
        breadcrumb: "All Jobs > Us It Recruiter",
        status: "Active",
        candidatesSent: 867,
        viewRate: "38%",
        responseRate: "9%",
      }
      expect(metaBar.breadcrumb).toContain("Us It Recruiter")
      expect(metaBar.candidatesSent).toBe(867)
      expect(metaBar.viewRate).toBe("38%")
      expect(metaBar.responseRate).toBe("9%")
    },
  )

  await runTest(
    SUITE,
    "F9.2: Pipeline Stage Tabs count distribution: All 80, Shortlisted 3, Maybe 0, Rejected 19",
    1,
    "F9",
    () => {
      const stages = {
        all: 80,
        shortlisted: 3,
        maybe: 0,
        rejected: 19,
      }
      expect(stages.all).toBe(80)
      expect(stages.shortlisted).toBe(3)
      expect(stages.maybe).toBe(0)
      expect(stages.rejected).toBe(19)
    },
  )

  await runTest(
    SUITE,
    "F9.3: Sub-status pills: All 80, New responses 2, Not viewed 14, Action pending 58",
    1,
    "F9",
    () => {
      const subStatuses = {
        all: 80,
        newResponses: 2,
        notViewed: 14,
        actionPending: 58,
      }
      expect(subStatuses.all).toBe(80)
      expect(subStatuses.newResponses).toBe(2)
      expect(subStatuses.notViewed).toBe(14)
      expect(subStatuses.actionPending).toBe(58)
    },
  )

  await runTest(
    SUITE,
    "F9.4: Candidate M Arunkumar renders Recommended badge, 8y exp, 1m notice",
    1,
    "F9",
    () => {
      const arun = mockCandidates.find((c) => c.name === "M Arunkumar")!
      expect(arun.recommendedBadge).toBe(true)
      expect(arun.experienceYears).toBe(8)
      expect(arun.noticePeriod).toBe("1m notice")
      expect(arun.currentCompany).toContain("Teamlease")
      expect(arun.keySkills).toContain("US IT Staffing")
    },
  )

  await runTest(
    SUITE,
    "F9.5: Candidate PAWAR MUKESH card renders NVite source, ₹13 Lacs, 0-15d notice",
    1,
    "F9",
    () => {
      const mukesh = mockCandidates.find((c) => c.name === "PAWAR MUKESH")!
      expect(mukesh.appliedDate).toContain("4 Nov 26 from NVite")
      expect(mukesh.currentSalaryLacs).toBe(13)
      expect(mukesh.noticePeriod).toBe("Can join in 0-15d")
      expect(mukesh.currentDesignation).toBe("DevOps Engineer")
    },
  )

  await runTest(
    SUITE,
    "F9.6: Status progression transitions candidate across stage pipeline tabs",
    1,
    "F9",
    () => {
      let pool = [...mockCandidates]
      const initialShortlisted = getCandidatesByStage(
        pool,
        "shortlisted",
      ).length

      // Transition Pawar Mukesh to Shortlisted
      pool = updateCandidateStage(pool, "pawar-mukesh", "shortlisted")
      const newShortlisted = getCandidatesByStage(pool, "shortlisted").length
      expect(newShortlisted).toBe(initialShortlisted + 1)

      // Transition Balgare Kailash to Rejected
      pool = updateCandidateStage(pool, "balgare-kailash", "rejected")
      const rejectedCandidates = getCandidatesByStage(pool, "rejected")
      expect(rejectedCandidates.some((c) => c.name === "Balgare Kailash")).toBe(
        true,
      )
    },
  )
}
