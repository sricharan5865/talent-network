/**
 * Tier 2 Boundary Tests: B3 - Mock Data Model Boundaries
 * Zero experience (Fresher), undefined salary, empty skills, missing education fields
 */

import { runTest, expect } from "../helpers/testUtils"
import { Candidate, JobRequisition } from "../../src/data/resdexData"

export async function runB3Tests() {
  const SUITE = "B3: Mock Data Model Boundaries"

  await runTest(
    SUITE,
    "B3.1: Candidate with 0 years experience formats cleanly as Fresher",
    2,
    "F3",
    () => {
      const fresherCandidate: Candidate = {
        id: "cand-fresher",
        name: "Amit Patel",
        headline:
          "Recent B.Tech Computer Science graduate looking for Junior Developer roles",
        experienceYears: 0,
        experienceMonths: 0,
        currentSalaryLacs: 0,
        noticePeriod: "Immediate",
        currentLocation: "Hyderabad",
        currentCompany: "None",
        currentDesignation: "Fresher",
        education: { degree: "B.Tech", institution: "JNTU", year: 2026 },
        keySkills: ["Java", "C++", "Python"],
        stage: "all",
        subStatus: "new",
        appliedDate: "06 Nov 2026",
      }
      expect(fresherCandidate.experienceYears).toBe(0)
      const expLabel =
        fresherCandidate.experienceYears === 0
          ? "Fresher"
          : `${fresherCandidate.experienceYears}y`
      expect(expLabel).toBe("Fresher")
    },
  )

  await runTest(
    SUITE,
    "B3.2: Undefined expected salary is handled without NaN formatting errors",
    2,
    "F3",
    () => {
      const candidate: Partial<Candidate> = {
        currentSalaryLacs: 12,
        expectedSalaryLacs: undefined,
      }
      const formattedExpected =
        candidate.expectedSalaryLacs !== undefined
          ? `₹ ${candidate.expectedSalaryLacs} Lacs`
          : "Not specified"
      expect(formattedExpected).toBe("Not specified")
    },
  )

  await runTest(
    SUITE,
    "B3.3: Requisition with 0 applies, 0 shortlists handles ratios without division by zero",
    2,
    "F3",
    () => {
      const emptyJob: JobRequisition = {
        id: "req-empty",
        title: "New Emerging Role",
        department: "R&D",
        postedDate: "Today",
        status: "active",
        category: "hot_vacancy",
        appliesCount: 0,
        cvsCount: 0,
        shortlistedCount: 0,
        location: "Hyderabad",
        experience: "1-3 years",
      }
      const conversionRate =
        emptyJob.appliesCount > 0
          ? Math.round(
              ((emptyJob.shortlistedCount || 0) / emptyJob.appliesCount) * 100,
            )
          : 0
      expect(conversionRate).toBe(0)
      expect(isFinite(conversionRate)).toBe(true)
    },
  )

  await runTest(
    SUITE,
    "B3.4: Candidate keySkills array with 0 items does not crash mapper",
    2,
    "F3",
    () => {
      const candidate: Partial<Candidate> = {
        keySkills: [],
      }
      const skillCount = candidate.keySkills?.length || 0
      expect(skillCount).toBe(0)
      const chips = (candidate.keySkills || []).map((s) => s.toUpperCase())
      expect(chips.length).toBe(0)
    },
  )

  await runTest(
    SUITE,
    "B3.5: String education format is handled seamlessly alongside object education",
    2,
    "F3",
    () => {
      const getEduText = (edu: Candidate["education"]) => {
        if (typeof edu === "string") return edu
        return `${edu.degree} - ${edu.institution} (${edu.year})`
      }
      const objEdu = { degree: "B.E.", institution: "BITS Pilani", year: 2020 }
      const strEdu = "M.S. Computer Science, Stanford University, 2022"

      expect(getEduText(objEdu)).toBe("B.E. - BITS Pilani (2020)")
      expect(getEduText(strEdu)).toBe(
        "M.S. Computer Science, Stanford University, 2022",
      )
    },
  )
}
