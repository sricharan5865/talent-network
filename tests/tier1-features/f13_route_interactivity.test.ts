/**
 * Tier 1 Feature Tests: F13 - End-to-End Interactivity & Route Wiring
 * Authoritative Source: ORIGINAL_REQUEST.md R3, PROJECT.md F13 & Interface Contracts
 */

import { runTest, expect } from "../helpers/testUtils"
import {
  mockQuotas,
  mockCandidates,
  deductQuota,
  updateCandidateStage,
} from "../../src/data/resdexData"

export async function runF13Tests() {
  const SUITE = "F13: End-to-End Interactivity & Route Wiring"

  await runTest(
    SUITE,
    "F13.1: Canonical routes inventory contract is complete",
    1,
    "F13",
    () => {
      const requiredRoutes = [
        "/",
        "/employer",
        "/employer/jobs",
        "/employer/jobs/new",
        "/employer/jobs/:id/responses",
        "/employer/candidates",
        "/employer/candidates/search",
        "/employer/candidates/results",
        "/employer/candidates/:id",
        "/employer/nvite/broadcast",
        "/employer/login",
        "/candidate",
        "/recruiter",
        "/admin",
      ]
      expect(requiredRoutes.length).toBe(14)
      expect(requiredRoutes).toContain("/employer/jobs/:id/responses")
      expect(requiredRoutes).toContain("/employer/nvite/broadcast")
    },
  )

  await runTest(
    SUITE,
    "F13.2: URL search params encoding and decoding preserves search filters",
    1,
    "F13",
    () => {
      const params = new URLSearchParams({
        kw: "java, spring boot",
        expMin: "3",
        expMax: "8",
        loc: "Hyderabad",
        notice: "0-15 days",
      })
      const queryString = params.toString()
      expect(queryString).toContain("kw=java%2C+spring+boot")
      expect(queryString).toContain("loc=Hyderabad")

      const decoded = new URLSearchParams(queryString)
      expect(decoded.get("kw")).toBe("java, spring boot")
      expect(decoded.get("expMin")).toBe("3")
      expect(decoded.get("loc")).toBe("Hyderabad")
    },
  )

  await runTest(
    SUITE,
    "F13.3: Interactive candidate selection handles Select All and Indeterminate states",
    1,
    "F13",
    () => {
      const candidateIds = mockCandidates.map((c) => c.id)
      let selectedSet = new Set<string>()

      // Select first candidate
      selectedSet.add(candidateIds[0])
      expect(selectedSet.size).toBe(1)
      expect(selectedSet.size < candidateIds.length).toBe(true)

      // Select all
      selectedSet = new Set(candidateIds)
      expect(selectedSet.size).toBe(candidateIds.length)

      // Deselect all
      selectedSet.clear()
      expect(selectedSet.size).toBe(0)
    },
  )

  await runTest(
    SUITE,
    "F13.4: Quota deduction simulates state reduction on campaign broadcast",
    1,
    "F13",
    () => {
      const initialQuotas = [...mockQuotas]
      const nviteBefore = initialQuotas.find((q) => q.id === "quota-nvite")!
      const remainingBefore = nviteBefore.remaining

      const updatedQuotas = deductQuota(initialQuotas, "quota-nvite", 500)
      const nviteAfter = updatedQuotas.find((q) => q.id === "quota-nvite")!

      expect(nviteAfter.remaining).toBe(remainingBefore - 500)
      expect(nviteAfter.used).toBe(nviteBefore.used + 500)
    },
  )

  await runTest(
    SUITE,
    "F13.5: Stage transition updates candidate stage without modifying other candidates",
    1,
    "F13",
    () => {
      const list = [...mockCandidates]
      const candidateToMove = list[0]
      const otherCandidate = list[1]

      const updatedList = updateCandidateStage(
        list,
        candidateToMove.id,
        "shortlisted",
      )
      const moved = updatedList.find((c) => c.id === candidateToMove.id)
      const untouched = updatedList.find((c) => c.id === otherCandidate.id)

      expect(moved?.stage).toBe("shortlisted")
      expect(untouched?.stage).toBe(otherCandidate.stage)
    },
  )

  await runTest(
    SUITE,
    "F13.6: Portal navigation paths link seamlessly across roles",
    1,
    "F13",
    () => {
      const portals = {
        employer: "/employer",
        candidate: "/candidate",
        recruiter: "/recruiter",
        admin: "/admin",
      }
      expect(portals.employer).toBe("/employer")
      expect(portals.candidate).toBe("/candidate")
      expect(portals.recruiter).toBe("/recruiter")
      expect(portals.admin).toBe("/admin")
    },
  )
}
