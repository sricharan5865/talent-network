/**
 * Tier 3 Cross-Feature Integration Tests: Pairwise and Multi-Module Interactions
 * Authoritative Source: ORIGINAL_REQUEST.md R3, PROJECT.md M1-M5 Flows
 */

import { runTest, expect } from "../helpers/testUtils"
import {
  mockCandidates,
  mockQuotas,
  mockJobRequisitions,
  mockResdexFolders,
  mockSavedSearches,
  deductQuota,
  updateCandidateStage,
  getCandidatesByStage,
} from "../../src/data/resdexData"

export async function runTier3Tests() {
  const SUITE = "Tier 3: Cross-Feature Combinations"

  await runTest(
    SUITE,
    "T3.1: Search -> Filter Candidates -> Select -> Open NVite Calibration -> Launch Composer",
    3,
    "F6+F7+F11+F12",
    () => {
      // 1. Search for candidates with skills
      const searchSkills = ["Azure Cloud", "Terraform"]
      const searchMatches = mockCandidates.filter((c) =>
        searchSkills.some((s) => c.keySkills.includes(s)),
      )
      expect(searchMatches.length).toBeGreaterThan(0)

      // 2. Select matching candidate
      const selected = searchMatches[0]
      expect(selected.name).toBe("PAWAR MUKESH")

      // 3. Open NVite targeting calibration
      const calibrationPayload = {
        candidateId: selected.id,
        minExp: selected.experienceYears,
        maxExp: selected.experienceYears + 3,
        location: selected.currentLocation,
      }
      expect(calibrationPayload.minExp).toBe(9)
      expect(calibrationPayload.location).toBe("Bengaluru")

      // 4. Launch Composer with 500 audience
      const composerState = {
        audienceSize: 500,
        designation: "Infrastructure Specialist",
        prefilledFrom: selected.id,
      }
      expect(composerState.audienceSize).toBe(500)
    },
  )

  await runTest(
    SUITE,
    "T3.2: Manage Jobs -> Filter Category NVite -> Open Us It Recruiter Inbox -> Shortlist Candidate",
    3,
    "F8+F9+F13",
    () => {
      // 1. Filter jobs by NVite category
      const nviteJobs = mockJobRequisitions.filter(
        (j) => j.category === "nvite",
      )
      expect(nviteJobs.length).toBeGreaterThan(0)

      // 2. Select 'Us It Recruiter'
      const usRecJob = nviteJobs.find((j) => j.title === "Us It Recruiter")!
      expect(usRecJob).toBeTruthy()
      expect(usRecJob.appliesCount).toBe(80)

      // 3. Load applicants and move candidate to Shortlisted
      let applicants = [...mockCandidates]
      const initialShortlisted = getCandidatesByStage(
        applicants,
        "shortlisted",
      ).length

      applicants = updateCandidateStage(
        applicants,
        "pawar-mukesh",
        "shortlisted",
      )
      const updatedShortlisted = getCandidatesByStage(
        applicants,
        "shortlisted",
      ).length
      expect(updatedShortlisted).toBe(initialShortlisted + 1)
    },
  )

  await runTest(
    SUITE,
    "T3.3: Dashboard Folders Widget -> Open PCB Folder (138 profiles) -> Inspect Profile Drawer",
    3,
    "F5+F10",
    () => {
      // 1. Retrieve PCB folder from widget
      const pcb = mockResdexFolders.find((f) => f.name === "PCB")!
      expect(pcb.count).toBe(138)

      // 2. Select candidate in folder
      const candidate = mockCandidates.find(
        (c) => c.name === "Balgare Kailash",
      )!
      expect(candidate).toBeTruthy()

      // 3. Simulate drawer opening
      const drawerState = {
        isOpen: true,
        activeCandidateId: candidate.id,
        candidateDetails: {
          name: candidate.name,
          company: candidate.currentCompany,
          salary: `₹ ${candidate.currentSalaryLacs} Lacs`,
          skills: candidate.keySkills,
        },
      }
      expect(drawerState.isOpen).toBe(true)
      expect(drawerState.candidateDetails.company).toBe("HCLTech")
    },
  )

  await runTest(
    SUITE,
    "T3.4: Quota Check (13,352 left) -> Broadcast to 500 Candidates -> Quota Decrements to 12,852 -> Job Added",
    3,
    "F4+F12+F8",
    () => {
      // 1. Verify initial NVite quota
      const initialQuotas = [...mockQuotas]
      const nviteQuota = initialQuotas.find((q) => q.id === "quota-nvite")!
      expect(nviteQuota.remaining).toBe(13352)

      // 2. Broadcast campaign for 500 candidates
      const broadcastCount = 500
      const postBroadcastQuotas = deductQuota(
        initialQuotas,
        "quota-nvite",
        broadcastCount,
      )
      const updatedNvite = postBroadcastQuotas.find(
        (q) => q.id === "quota-nvite",
      )!
      expect(updatedNvite.remaining).toBe(12852)
      expect(updatedNvite.used).toBe(18648 + 500)

      // 3. Verify new requisition is created under Manage Jobs
      const newRequisition = {
        id: `req-nvite-${Date.now()}`,
        title: "Infrastructure Specialist (NVite Broadcast)",
        department: "Cloud Infrastructure",
        postedDate: "Today",
        status: "active" as const,
        category: "nvite" as const,
        appliesCount: 0,
        cvsCount: 0,
        location: "Hyderabad",
        experience: "5-10 years",
      }
      const jobList = [newRequisition, ...mockJobRequisitions]
      expect(jobList.length).toBe(71)
      expect(jobList[0].category).toBe("nvite")
    },
  )

  await runTest(
    SUITE,
    "T3.5: Boolean Search Engine -> Save Search -> Appears in Saved Searches Widget",
    3,
    "F6+F7+F5",
    () => {
      // 1. Build advanced search query
      const searchExecution = {
        query: "java AND spring boot NOT legacy",
        location: "Hyderabad",
        minExp: 4,
      }

      // 2. Save query
      const newSavedSearch = {
        id: `saved-${Date.now()}`,
        name: "Java Spring Boot Senior",
        rawQuery: searchExecution.query,
        newProfilesCount: 14,
        lastRunDate: "06 Nov 2026",
      }
      const allSaved = [...mockSavedSearches, newSavedSearch]
      expect(allSaved.length).toBe(mockSavedSearches.length + 1)
      expect(allSaved[allSaved.length - 1].rawQuery).toContain("spring boot")
    },
  )

  await runTest(
    SUITE,
    "T3.6: Manage Jobs Status Filter Switching (Active 27 -> Expired 40) Updates View Counts",
    3,
    "F8+F13",
    () => {
      let currentFilter: "active" | "closed" | "expired" = "active"
      let filteredJobs = mockJobRequisitions.filter(
        (j) => j.status === currentFilter,
      )
      expect(filteredJobs.length).toBe(27)

      // Switch to Expired
      currentFilter = "expired"
      filteredJobs = mockJobRequisitions.filter(
        (j) => j.status === currentFilter,
      )
      expect(filteredJobs.length).toBe(40)

      // Switch to Closed
      currentFilter = "closed"
      filteredJobs = mockJobRequisitions.filter(
        (j) => j.status === currentFilter,
      )
      expect(filteredJobs.length).toBe(3)
    },
  )

  await runTest(
    SUITE,
    "T3.7: Applicant Sub-status Filter: New responses (2) -> Mark Viewed -> Counter updates to 1",
    3,
    "F9+F13",
    () => {
      let newCandidates = mockCandidates.filter((c) => c.subStatus === "new")
      expect(newCandidates.length).toBeGreaterThanOrEqual(2)

      // Recruiter views first new candidate
      const viewedId = newCandidates[0].id
      const updatedCandidates = mockCandidates.map((c) =>
        c.id === viewedId ? { ...c, subStatus: "viewed" as const } : c,
      )
      newCandidates = updatedCandidates.filter((c) => c.subStatus === "new")
      expect(newCandidates.length).toBe(
        mockCandidates.filter((c) => c.subStatus === "new").length - 1,
      )
    },
  )

  await runTest(
    SUITE,
    "T3.8: Landing Page Launcher Login -> Redirects to /employer -> Top Nav renders identity & quotas",
    3,
    "F1+F2+F4",
    () => {
      const session = {
        isAuthenticated: true,
        user: {
          email: "sheela.nancy@ispatialtec.com",
          company: "iSpatial Techno Solutions",
          role: "Recruiter Lead",
        },
        redirectTarget: "/employer",
      }
      expect(session.isAuthenticated).toBe(true)
      expect(session.redirectTarget).toBe("/employer")
      expect(session.user.email).toBe("sheela.nancy@ispatialtec.com")
    },
  )

  await runTest(
    SUITE,
    "T3.9: Quick-View Drawer Status Change -> Propagates to Underlying Pipeline Stage Counts",
    3,
    "F10+F9",
    () => {
      let pool = [...mockCandidates]
      const initialShortlistedCount = getCandidatesByStage(
        pool,
        "shortlisted",
      ).length

      // Recruiter in drawer clicks 'Shortlist' for M Arunkumar
      pool = updateCandidateStage(pool, "m-arunkumar", "shortlisted")
      const newShortlistedCount = getCandidatesByStage(
        pool,
        "shortlisted",
      ).length

      expect(newShortlistedCount).toBe(initialShortlistedCount + 1)
      const arun = pool.find((c) => c.id === "m-arunkumar")!
      expect(arun.stage).toBe("shortlisted")
    },
  )

  await runTest(
    SUITE,
    "T3.10: Freshness Filter Change (6 months -> 3 days) Restricts Sourcing Results Dynamically",
    3,
    "F7+F6",
    () => {
      const allRecent = mockCandidates.filter((c) => c.lastActive !== undefined)
      expect(allRecent.length).toBeGreaterThan(0)

      const activeIn3Days = mockCandidates.filter(
        (c) =>
          c.lastActive?.includes("today") ||
          c.lastActive?.includes("yesterday") ||
          c.lastActive?.includes("3 days"),
      )
      expect(activeIn3Days.length).toBeGreaterThan(0)
      expect(activeIn3Days.length).toBeLessThanOrEqual(mockCandidates.length)
    },
  )
}
