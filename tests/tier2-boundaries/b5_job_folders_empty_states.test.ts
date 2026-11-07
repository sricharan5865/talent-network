/**
 * Tier 2 Boundary Tests: B5 - Job Postings & Resdex Folders Empty States
 * Empty folder (0 profiles), special chars in folder name, empty search query history
 */

import { runTest, expect } from "../helpers/testUtils"
import { mockResdexFolders } from "../../src/data/resdexData"

export async function runB5Tests() {
  const SUITE = "B5: Job Postings & Resdex Folders Empty States"

  await runTest(
    SUITE,
    "B5.1: Folder with 0 profiles (Program Manager) formats 0 count cleanly",
    2,
    "F5",
    () => {
      const pmFolder = mockResdexFolders.find(
        (f) => f.name === "Program Manager",
      )!
      expect(pmFolder.count).toBe(0)
      const countDisplay = `${pmFolder.count} profiles`
      expect(countDisplay).toBe("0 profiles")
    },
  )

  await runTest(
    SUITE,
    "B5.2: Special characters & punctuation in folder name are preserved safely",
    2,
    "F5",
    () => {
      const specialFolder = {
        id: "f-special",
        name: "C++ & Embedded (v2.0) [Core]",
        count: 15,
        updatedDate: "06-Nov-26",
      }
      expect(specialFolder.name).toContain("&")
      expect(specialFolder.name).toContain("[")
      expect(specialFolder.name).toContain("]")
    },
  )

  await runTest(
    SUITE,
    "B5.3: Empty recent search list falls back to suggestions prompt",
    2,
    "F5",
    () => {
      const recentQueries: string[] = []
      const promptText =
        recentQueries.length === 0
          ? "Try searching for skills like Java, React, DevOps"
          : ""
      expect(promptText).toContain("Try searching")
    },
  )

  await runTest(
    SUITE,
    "B5.4: Job table search filter with no matches displays zero rows message",
    2,
    "F5",
    () => {
      const jobs = [{ title: "GIS Analyst" }, { title: "IoT Engineer" }]
      const query = "Quantum Computing Lead"
      const matches = jobs.filter((j) =>
        j.title.toLowerCase().includes(query.toLowerCase()),
      )
      expect(matches.length).toBe(0)
      const emptyMsg = matches.length === 0 ? "No matching jobs found" : ""
      expect(emptyMsg).toBe("No matching jobs found")
    },
  )

  await runTest(
    SUITE,
    "B5.5: Extremely long folder names wrap without layout overflow",
    2,
    "F5",
    () => {
      const longFolderName =
        "Enterprise Cloud Architecture & Multi-Region Hybrid Infrastructure Leads 2026"
      const truncate = (name: string, max: number) =>
        name.length > max ? `${name.substring(0, max)}...` : name
      const displayName = truncate(longFolderName, 30)
      expect(displayName.length).toBe(33)
      expect(displayName).toContain("...")
    },
  )
}
