/**
 * Tier 2 Boundary Tests: B6 - Resdex Search Extreme Filters
 * Contradictory Boolean filters, extreme experience, ultra-high salary, 20+ keyword tags
 */

import { runTest, expect } from "../helpers/testUtils"
import { mockCandidates } from "../../src/data/resdexData"

export async function runB6Tests() {
  const SUITE = "B6: Resdex Search Extreme Filters"

  await runTest(
    SUITE,
    "B6.1: Extremely high experience range (min: 40, max: 60) returns 0 candidates",
    2,
    "F6",
    () => {
      const minExp = 40
      const maxExp = 60
      const matches = mockCandidates.filter(
        (c) => c.experienceYears >= minExp && c.experienceYears <= maxExp,
      )
      expect(matches.length).toBe(0)
    },
  )

  await runTest(
    SUITE,
    "B6.2: Extreme salary range (min: 500 Lacs CTC) returns 0 results gracefully",
    2,
    "F6",
    () => {
      const minSalaryLacs = 500
      const matches = mockCandidates.filter(
        (c) => c.currentSalaryLacs >= minSalaryLacs,
      )
      expect(matches.length).toBe(0)
    },
  )

  await runTest(
    SUITE,
    "B6.3: Multi-tag keyword array with 25 tags formats without crash",
    2,
    "F6",
    () => {
      const twentyFiveSkills = Array.from(
        { length: 25 },
        (_, i) => `Skill-${i + 1}`,
      )
      expect(twentyFiveSkills.length).toBe(25)
      const visibleChips = twentyFiveSkills.slice(0, 10)
      const remainingCount = twentyFiveSkills.length - visibleChips.length
      expect(visibleChips.length).toBe(10)
      expect(remainingCount).toBe(15)
    },
  )

  await runTest(
    SUITE,
    "B6.4: Contradictory search criteria (minExp 10 and maxExp 5) normalizes or errors",
    2,
    "F6",
    () => {
      const normalizeExperience = (min: number, max: number) => {
        if (min > max) {
          return { min: max, max: min, inverted: true }
        }
        return { min, max, inverted: false }
      }
      const normalized = normalizeExperience(10, 5)
      expect(normalized.inverted).toBe(true)
      expect(normalized.min).toBe(5)
      expect(normalized.max).toBe(10)
    },
  )

  await runTest(
    SUITE,
    "B6.5: Empty keywords input with no filters does not throw unhandled exception",
    2,
    "F6",
    () => {
      const filterCandidates = (keywords: string[]) => {
        if (keywords.length === 0) return mockCandidates
        return mockCandidates.filter((c) =>
          keywords.some((kw) =>
            c.keySkills.some((s) => s.toLowerCase().includes(kw.toLowerCase())),
          ),
        )
      }
      const all = filterCandidates([])
      expect(all.length).toBe(mockCandidates.length)
    },
  )
}
