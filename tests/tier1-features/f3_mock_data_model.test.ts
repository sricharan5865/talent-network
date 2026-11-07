/**
 * Tier 1 Feature Tests: F3 - Enterprise Mock Data Model
 * Authoritative Source: ORIGINAL_REQUEST.md, PROJECT.md F3, Screenshots 175541.png, 175623.png, 180258.png
 */

import { runTest, expect } from "../helpers/testUtils"
import {
  mockCandidates,
  mockQuotas,
  mockResdexFolders,
  mockJobRequisitions,
  mockRecentSearches,
  mockSavedSearches,
  getCandidatesByStage,
  updateCandidateStage,
  deductQuota,
} from "../../src/data/resdexData"

export async function runF3Tests() {
  const SUITE = "F3: Enterprise Mock Data Model"

  await runTest(
    SUITE,
    "F3.1: Candidate PAWAR MUKESH conforms to verbatim screenshot data",
    1,
    "F3",
    () => {
      const mukesh = mockCandidates.find((c) => c.name === "PAWAR MUKESH")
      expect(mukesh).toBeTruthy()
      expect(mukesh!.experienceYears).toBe(9)
      expect(mukesh!.experienceMonths).toBe(5)
      expect(mukesh!.currentSalaryLacs).toBe(13)
      expect(mukesh!.noticePeriod).toBe("Can join in 0-15d")
      expect(mukesh!.currentLocation).toBe("Bengaluru")
      expect(mukesh!.currentCompany).toBe("TalentPull & Infrastructure Pvt Ltd")
      expect(mukesh!.currentDesignation).toBe("DevOps Engineer")
      expect(mukesh!.keySkills).toContain("Azure Cloud")
      expect(mukesh!.keySkills).toContain("Terraform")
    },
  )

  await runTest(
    SUITE,
    "F3.2: Candidate Balgare Kailash conforms to verbatim screenshot data",
    1,
    "F3",
    () => {
      const kailash = mockCandidates.find((c) => c.name === "Balgare Kailash")
      expect(kailash).toBeTruthy()
      expect(kailash!.experienceYears).toBe(5)
      expect(kailash!.experienceMonths).toBe(2)
      expect(kailash!.currentSalaryLacs).toBe(8)
      expect(kailash!.noticePeriod).toBe("Serving notice")
      expect(kailash!.currentLocation).toBe("Hyderabad (Lingampally)")
      expect(kailash!.currentCompany).toBe("HCLTech")
      expect(kailash!.currentDesignation).toBe("Specialist")
      expect(kailash!.keySkills).toContain("Control-M")
      expect(kailash!.keySkills).toContain("Job Scheduling")
    },
  )

  await runTest(
    SUITE,
    "F3.3: Candidate M Arunkumar conforms to verbatim screenshot data",
    1,
    "F3",
    () => {
      const arun = mockCandidates.find((c) => c.name === "M Arunkumar")
      expect(arun).toBeTruthy()
      expect(arun!.experienceYears).toBe(8)
      expect(arun!.currentSalaryLacs).toBe(8)
      expect(arun!.noticePeriod).toBe("1m notice")
      expect(arun!.currentLocation).toBe("Hyderabad (Goshamahal)")
      expect(arun!.currentCompany).toBe("Teamlease Services Pvt Ltd")
      expect(arun!.recommendedBadge).toBe(true)
      expect(arun!.keySkills).toContain("US IT Staffing")
    },
  )

  await runTest(
    SUITE,
    "F3.4: Quota subscriptions conform to exact screenshot metrics",
    1,
    "F3",
    () => {
      const cvAccess = mockQuotas.find((q) => q.id === "quota-cv-access")
      const nvite = mockQuotas.find((q) => q.id === "quota-nvite")
      const hotVacancies = mockQuotas.find(
        (q) => q.id === "quota-hot-vacancies",
      )

      expect(cvAccess).toBeTruthy()
      expect(cvAccess!.total).toBe(4000)
      expect(cvAccess!.used).toBe(2228)
      expect(cvAccess!.remaining).toBe(1772)

      expect(nvite).toBeTruthy()
      expect(nvite!.total).toBe(32000)
      expect(nvite!.used).toBe(18648)
      expect(nvite!.remaining).toBe(13352)

      expect(hotVacancies).toBeTruthy()
      expect(hotVacancies!.total).toBe(20)
      expect(hotVacancies!.used).toBe(18)
      expect(hotVacancies!.remaining).toBe(2)
    },
  )

  await runTest(
    SUITE,
    "F3.5: Resdex folders conform to screenshot folders and counts",
    1,
    "F3",
    () => {
      const pcb = mockResdexFolders.find((f) => f.name === "PCB")
      const pm = mockResdexFolders.find((f) => f.name === "Program Manager")
      const sitecore = mockResdexFolders.find((f) => f.name === "sitecore")
      const officeAdmin = mockResdexFolders.find(
        (f) => f.name === "Office administrator",
      )

      expect(pcb).toBeTruthy()
      expect(pcb!.count).toBe(138)

      expect(pm).toBeTruthy()
      expect(pm!.count).toBe(0)

      expect(sitecore).toBeTruthy()
      expect(sitecore!.count).toBe(152)

      expect(officeAdmin).toBeTruthy()
      expect(officeAdmin!.count).toBe(40)
    },
  )

  await runTest(
    SUITE,
    "F3.6: Job requisitions contain active (27), closed (3), expired (40) totaling 70",
    1,
    "F3",
    () => {
      const active = mockJobRequisitions.filter((j) => j.status === "active")
      const closed = mockJobRequisitions.filter((j) => j.status === "closed")
      const expired = mockJobRequisitions.filter((j) => j.status === "expired")

      expect(mockJobRequisitions.length).toBe(70)
      expect(active.length).toBe(27)
      expect(closed.length).toBe(3)
      expect(expired.length).toBe(40)
    },
  )

  await runTest(
    SUITE,
    "F3.7: State helpers update candidate stage and deduct quota correctly",
    1,
    "F3",
    () => {
      // Stage update
      const updated = updateCandidateStage(
        mockCandidates,
        "pawar-mukesh",
        "shortlisted",
      )
      const mukeshUpdated = updated.find((c) => c.id === "pawar-mukesh")
      expect(mukeshUpdated?.stage).toBe("shortlisted")

      // Quota deduction
      const deducted = deductQuota(mockQuotas, "quota-nvite", 500)
      const nviteDeducted = deducted.find((q) => q.id === "quota-nvite")
      expect(nviteDeducted?.used).toBe(18648 + 500)
      expect(nviteDeducted?.remaining).toBe(13352 - 500)
    },
  )
}
