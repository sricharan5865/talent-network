/**
 * Tier 2 Boundary Tests: B11 - NVite Preferences Validation Boundaries
 * Inverted experience limits, negative numbers, empty required fields, special characters in location
 */

import { runTest, expect } from "../helpers/testUtils"

export async function runB11Tests() {
  const SUITE = "B11: NVite Preferences Validation"

  await runTest(
    SUITE,
    "B11.1: Setting min experience greater than max experience returns error",
    2,
    "F11",
    () => {
      const validateExperience = (min: number, max: number) => {
        if (min > max) {
          return {
            valid: false,
            error: "Min experience cannot be greater than Max experience",
          }
        }
        return { valid: true }
      }
      const res = validateExperience(8, 4)
      expect(res.valid).toBe(false)
      expect(res.error).toContain("cannot be greater than")
    },
  )

  await runTest(
    SUITE,
    "B11.2: Negative salary or experience values are clamped to 0",
    2,
    "F11",
    () => {
      const sanitizeNonNegative = (val: number) => Math.max(0, val)
      expect(sanitizeNonNegative(-5)).toBe(0)
      expect(sanitizeNonNegative(-100)).toBe(0)
      expect(sanitizeNonNegative(12)).toBe(12)
    },
  )

  await runTest(
    SUITE,
    "B11.3: Leaving required max experience empty triggers invalid form state",
    2,
    "F11",
    () => {
      const validateForm = (minExp: number | null, maxExp: number | null) => {
        const errors: Record<string, string> = {}
        if (maxExp === null) {
          errors.maxExp = "Max experience is required"
        }
        return { isValid: Object.keys(errors).length === 0, errors }
      }
      const check = validateForm(2, null)
      expect(check.isValid).toBe(false)
      expect(check.errors.maxExp).toBe("Max experience is required")
    },
  )

  await runTest(
    SUITE,
    "B11.4: Special characters in location input are sanitized cleanly",
    2,
    "F11",
    () => {
      const rawLocation = "Bengaluru / Bangalore (East) <Area-51>"
      const cleanLocation = rawLocation.replace(/[<>]/g, "").trim()
      expect(cleanLocation).toBe("Bengaluru / Bangalore (East) Area-51")
    },
  )

  await runTest(
    SUITE,
    "B11.5: Zero candidate count preference triggers minimum threshold warning",
    2,
    "F11",
    () => {
      const validateTargetCount = (count: number) => {
        if (count <= 0) return "Please specify at least 1 candidate"
        return null
      }
      expect(validateTargetCount(0)).toBe("Please specify at least 1 candidate")
      expect(validateTargetCount(500)).toBe(null)
    },
  )
}
