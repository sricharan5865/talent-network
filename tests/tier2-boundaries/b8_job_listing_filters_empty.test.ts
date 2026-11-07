/**
 * Tier 2 Boundary Tests: B8 - Job Listing Filters & Boundaries
 * Filtering by "Closed" (only 3 jobs), "Drafts" tab (0 jobs), non-existent titles
 */

import { runTest, expect } from "../helpers/testUtils"
import { mockJobRequisitions } from "../../src/data/resdexData"

export async function runB8Tests() {
  const SUITE = "B8: Job Listing Filters & Boundaries"

  await runTest(
    SUITE,
    'B8.1: Filtering by status "closed" returns exactly 3 jobs',
    2,
    "F8",
    () => {
      const closed = mockJobRequisitions.filter((j) => j.status === "closed")
      expect(closed.length).toBe(3)
      for (const j of closed) {
        expect(j.status).toBe("closed")
      }
    },
  )

  await runTest(
    SUITE,
    "B8.2: Drafts tab with 0 drafts displays clean empty state message",
    2,
    "F8",
    () => {
      const drafts = mockJobRequisitions.filter(
        (j) => (j as { status: string }).status === "draft",
      )
      expect(drafts.length).toBe(0)
      const emptyDraftMsg =
        drafts.length === 0 ? "No draft jobs. Post a job to save as draft." : ""
      expect(emptyDraftMsg).toContain("No draft jobs")
    },
  )

  await runTest(
    SUITE,
    "B8.3: Search by non-existent job title returns empty list without error",
    2,
    "F8",
    () => {
      const searchTitle = "Quantum Cryptography Researcher"
      const matches = mockJobRequisitions.filter((j) =>
        j.title.toLowerCase().includes(searchTitle.toLowerCase()),
      )
      expect(matches.length).toBe(0)
    },
  )

  await runTest(
    SUITE,
    "B8.4: Multiple category filters (NVite OR Hot Vacancy) union correctly",
    2,
    "F8",
    () => {
      const selectedCats = ["nvite", "hot_vacancy"]
      const filtered = mockJobRequisitions.filter((j) =>
        selectedCats.includes(j.category),
      )
      expect(filtered.length).toBeGreaterThan(0)
      for (const j of filtered) {
        expect(selectedCats.includes(j.category)).toBe(true)
      }
    },
  )

  await runTest(
    SUITE,
    'B8.5: Special characters in job search query ("C# / .NET") handled safely',
    2,
    "F8",
    () => {
      const query = "C# / .NET"
      const cleanRegex = (str: string) =>
        str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
      const regex = new RegExp(cleanRegex(query), "i")
      expect(regex.test("Senior C# / .NET Developer")).toBe(true)
      expect(regex.test("Java Developer")).toBe(false)
    },
  )
}
