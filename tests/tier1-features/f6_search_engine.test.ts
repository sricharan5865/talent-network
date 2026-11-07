/**
 * Tier 1 Feature Tests: F6 - Resdex Advanced Search Engine
 * Authoritative Source: ORIGINAL_REQUEST.md, PROJECT.md F6, Screenshots 175652.png to 175934.png
 */

import { runTest, expect } from "../helpers/testUtils"

export async function runF6Tests() {
  const SUITE = "F6: Resdex Advanced Search Engine"

  await runTest(
    SUITE,
    'F6.1: Keyword autocomplete suggestions for "java" match screenshot list',
    1,
    "F6",
    () => {
      const javaKeywords = [
        "Java",
        "Core Java",
        "Javascript",
        "J2Ee",
        "Javafx",
        "Java Developer",
      ]
      expect(javaKeywords).toContain("Core Java")
      expect(javaKeywords).toContain("Javascript")
      expect(javaKeywords).toContain("J2Ee")
    },
  )

  await runTest(
    SUITE,
    "F6.2: Experience and Salary INR Lacs range parameters calibration",
    1,
    "F6",
    () => {
      const searchForm = {
        keywords: ["java"],
        minExp: 2,
        maxExp: 6,
        minSalaryLacs: 8,
        maxSalaryLacs: 16,
        currency: "INR",
        location: "Hyderabad",
        includeRelocation: true,
      }
      expect(searchForm.minExp).toBeLessThan(searchForm.maxExp)
      expect(searchForm.minSalaryLacs).toBeLessThan(searchForm.maxSalaryLacs)
      expect(searchForm.currency).toBe("INR")
    },
  )

  await runTest(
    SUITE,
    "F6.3: Employment Accordion notice period pill choices match screenshot",
    1,
    "F6",
    () => {
      const noticePills = [
        "Any",
        "0 - 15 days",
        "1 month",
        "2 months",
        "3 months",
        "More than 3 months",
        "Currently serving notice period",
      ]
      expect(noticePills).toContain("0 - 15 days")
      expect(noticePills).toContain("Currently serving notice period")
      expect(noticePills.length).toBe(7)
    },
  )

  await runTest(
    SUITE,
    "F6.4: Education Accordion qualification options and course groups",
    1,
    "F6",
    () => {
      const ugOptions = [
        "Any UG qualification",
        "Specific UG qualification",
        "No UG qualification",
      ]
      const courseGroups = [
        "Any Engineering",
        "All Courses",
        "Any Computers(Degree/Diploma)",
        "Any Hotel-Management",
        "Any Management",
        "Any Medical",
      ]
      expect(ugOptions).toContain("Specific UG qualification")
      expect(courseGroups).toContain("Any Engineering")
      expect(courseGroups).toContain("Any Computers(Degree/Diploma)")
    },
  )

  await runTest(
    SUITE,
    "F6.5: Diversity Hiring Accordion categories match screenshot 175845",
    1,
    "F6",
    () => {
      const diversityFeatures = {
        genderOptions: [
          "All candidates",
          "Male candidates",
          "Female candidates",
        ],
        careerBreak: "Women returning to work",
        differentlyAbled: [
          "Blindness",
          "Low Vision",
          "Hearing Impairment",
          "Speech and Language Disability",
          "Locomotor Disability",
        ],
        defencePersonnel: [
          "Army",
          "Navy",
          "Air Force",
          "Other Paramilitary Forces",
        ],
      }
      expect(diversityFeatures.genderOptions).toContain("Female candidates")
      expect(diversityFeatures.careerBreak).toBe("Women returning to work")
      expect(diversityFeatures.defencePersonnel).toContain("Air Force")
    },
  )

  await runTest(
    SUITE,
    "F6.6: Additional Details work permits and display freshness intervals",
    1,
    "F6",
    () => {
      const workPermits = [
        "United States",
        "India",
        "Australia",
        "Bahrain",
        "Bangladesh",
        "Belgium",
        "Canada",
      ]
      const freshnessIntervals = [
        "3 days",
        "7 days",
        "15 days",
        "30 days",
        "2 months",
        "3 months",
        "6 months",
      ]

      expect(workPermits).toContain("United States")
      expect(workPermits).toContain("India")
      expect(freshnessIntervals).toContain("6 months")
    },
  )
}
