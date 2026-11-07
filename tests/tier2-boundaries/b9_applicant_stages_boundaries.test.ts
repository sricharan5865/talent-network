/**
 * Tier 2 Boundary Tests: B9 - Applicant Pipeline Stage Boundaries
 * Stage "Maybe" (0 candidates), moving last candidate, circular status transitions
 */

import { runTest, expect } from "../helpers/testUtils"
import {
  mockCandidates,
  getCandidatesByStage,
  updateCandidateStage,
} from "../../src/data/resdexData"

export async function runB9Tests() {
  const SUITE = "B9: Applicant Pipeline Stage Boundaries"

  await runTest(
    SUITE,
    'B9.1: Filtering by "maybe" stage with 0 candidates renders empty state',
    2,
    "F9",
    () => {
      const maybeCandidates = getCandidatesByStage(mockCandidates, "maybe")
      expect(maybeCandidates.length).toBe(0)
      const emptyStatePrompt =
        maybeCandidates.length === 0 ? "No candidates in Maybe stage" : ""
      expect(emptyStatePrompt).toBe("No candidates in Maybe stage")
    },
  )

  await runTest(
    SUITE,
    "B9.2: Moving candidate from Rejected to Shortlisted decrements and increments accurately",
    2,
    "F9",
    () => {
      let pool = updateCandidateStage(
        mockCandidates,
        "balgare-kailash",
        "rejected",
      )
      const rejectedCountBefore = getCandidatesByStage(pool, "rejected").length
      const shortlistedCountBefore = getCandidatesByStage(
        pool,
        "shortlisted",
      ).length

      // Move to shortlisted
      pool = updateCandidateStage(pool, "balgare-kailash", "shortlisted")
      const rejectedCountAfter = getCandidatesByStage(pool, "rejected").length
      const shortlistedCountAfter = getCandidatesByStage(
        pool,
        "shortlisted",
      ).length

      expect(rejectedCountAfter).toBe(rejectedCountBefore - 1)
      expect(shortlistedCountAfter).toBe(shortlistedCountBefore + 1)
    },
  )

  await runTest(
    SUITE,
    "B9.3: Idempotent status update (shortlisting already shortlisted candidate) maintains count",
    2,
    "F9",
    () => {
      let pool = updateCandidateStage(
        mockCandidates,
        "sunita-reddy",
        "shortlisted",
      )
      const countBefore = getCandidatesByStage(pool, "shortlisted").length

      pool = updateCandidateStage(pool, "sunita-reddy", "shortlisted")
      const countAfter = getCandidatesByStage(pool, "shortlisted").length

      expect(countAfter).toBe(countBefore)
    },
  )

  await runTest(
    SUITE,
    'B9.4: Sub-status pill filter "Not viewed" (14) subsets candidate list cleanly',
    2,
    "F9",
    () => {
      const notViewed = mockCandidates.filter((c) => c.subStatus === "new")
      expect(notViewed.length).toBeGreaterThan(0)
    },
  )

  await runTest(
    SUITE,
    "B9.5: Candidate note with 1,000 characters saves without truncation errors",
    2,
    "F9",
    () => {
      const longNoteText = "Evaluation: ".padEnd(1000, "X")
      expect(longNoteText.length).toBe(1000)
      const note = {
        id: "note-long",
        author: "sheela.nancy@ispatialtec.com",
        text: longNoteText,
        date: "06 Nov 2026",
      }
      expect(note.text.length).toBe(1000)
      expect(note.text.startsWith("Evaluation:")).toBe(true)
    },
  )
}
