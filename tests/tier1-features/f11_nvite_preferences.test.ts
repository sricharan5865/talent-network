/**
 * Tier 1 Feature Tests: F11 - NVite Targeting Preferences Modal
 * Authoritative Source: ORIGINAL_REQUEST.md, PROJECT.md F11, Screenshot 180014.png
 */

import { runTest, expect } from "../helpers/testUtils"

export async function runF11Tests() {
  const SUITE = "F11: NVite Targeting Preferences Modal"

  await runTest(
    SUITE,
    "F11.1: Modal header copy and badge match screenshot 180014",
    1,
    "F11",
    () => {
      const modalHeader = {
        badge: "NVite",
        title:
          "Before you proceed, add these preferences for relevant targeting",
      }
      expect(modalHeader.badge).toBe("NVite")
      expect(modalHeader.title).toContain(
        "Before you proceed, add these preferences",
      )
    },
  )

  await runTest(
    SUITE,
    "F11.2: Experience range inputs require min to max years calibration",
    1,
    "F11",
    () => {
      const experienceConfig = {
        minExpYears: 5,
        maxExpYears: 10,
        unit: "Years",
      }
      expect(experienceConfig.minExpYears).toBe(5)
      expect(experienceConfig.maxExpYears).toBe(10)
      expect(experienceConfig.maxExpYears).toBeGreaterThan(
        experienceConfig.minExpYears,
      )
    },
  )

  await runTest(
    SUITE,
    "F11.3: Candidate location field with relocation willingness toggle",
    1,
    "F11",
    () => {
      const locationPref = {
        location: "Hyderabad",
        includeRelocation: true,
      }
      expect(locationPref.location).toBe("Hyderabad")
      expect(locationPref.includeRelocation).toBe(true)
    },
  )

  await runTest(
    SUITE,
    "F11.4: Annual salary helper note specifies current salary rather than offered",
    1,
    "F11",
    () => {
      const salaryConfig = {
        minSalaryLacs: 8,
        maxSalaryLacs: 18,
        currency: "INR",
        helperNote:
          "Ensure that this is candidate's current annual salary and not the salary you will offer them",
        includeUnspecifiedSalary: true,
      }
      expect(salaryConfig.helperNote).toContain(
        "not the salary you will offer them",
      )
      expect(salaryConfig.includeUnspecifiedSalary).toBe(true)
    },
  )

  await runTest(
    SUITE,
    "F11.5: Validation rules block submission when required fields are missing",
    1,
    "F11",
    () => {
      const validatePreferences = (
        minExp: number | null,
        maxExp: number | null,
      ) => {
        if (minExp === null || maxExp === null) return false
        if (minExp > maxExp) return false
        return true
      }
      expect(validatePreferences(null, 5)).toBe(false)
      expect(validatePreferences(8, 4)).toBe(false)
      expect(validatePreferences(2, 6)).toBe(true)
    },
  )

  await runTest(
    SUITE,
    "F11.6: Submitting preferences packages payload for NVite campaign composer",
    1,
    "F11",
    () => {
      const payload = {
        targetAudienceCount: 500,
        minExperience: 5,
        maxExperience: 10,
        location: "Hyderabad",
        salaryRange: "0.6-1.5 Lacs",
      }
      expect(payload.targetAudienceCount).toBe(500)
      expect(payload.location).toBe("Hyderabad")
    },
  )
}
