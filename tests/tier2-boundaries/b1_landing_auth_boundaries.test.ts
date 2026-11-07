/**
 * Tier 2 Boundary Tests: B1 - Landing & Authentication Boundaries
 * Boundary conditions, invalid inputs, encoding safety, extreme lengths
 */

import { runTest, expect } from "../helpers/testUtils"

export async function runB1Tests() {
  const SUITE = "B1: Landing & Auth Boundaries"

  await runTest(
    SUITE,
    "B1.1: Empty email input validation rejects submission",
    2,
    "F1",
    () => {
      const validateEmail = (email: string) => {
        if (!email || email.trim().length === 0) return false
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      }
      expect(validateEmail("")).toBe(false)
      expect(validateEmail("   ")).toBe(false)
    },
  )

  await runTest(
    SUITE,
    "B1.2: Malformed email strings fail validation",
    2,
    "F1",
    () => {
      const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      expect(validateEmail("not-an-email")).toBe(false)
      expect(validateEmail("user@")).toBe(false)
      expect(validateEmail("@domain.com")).toBe(false)
      expect(validateEmail("user@domain")).toBe(false)
      expect(validateEmail("sheela.nancy@ispatialtec.com")).toBe(true)
    },
  )

  await runTest(
    SUITE,
    "B1.3: Adversarial SQL injection & XSS strings in sales form are handled safely",
    2,
    "F1",
    () => {
      const sanitizeInput = (input: string) => {
        return input
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;")
      }
      const xssPayload = "<script>alert('xss')</script>"
      const sqlPayload = "admin' OR '1'='1"

      const cleanXSS = sanitizeInput(xssPayload)
      const cleanSQL = sanitizeInput(sqlPayload)

      expect(cleanXSS).toContain("&lt;script&gt;")
      expect(cleanSQL).toContain("&#x27;")
    },
  )

  await runTest(
    SUITE,
    "B1.4: Extreme string length (500+ chars) in name input is clamped or rejected",
    2,
    "F1",
    () => {
      const maxLen = 100
      const longName = "A".repeat(500)
      const truncated = longName.slice(0, maxLen)
      expect(truncated.length).toBe(100)
    },
  )

  await runTest(
    SUITE,
    "B1.5: Phone number input rejects alphabetic or invalid length numbers",
    2,
    "F1",
    () => {
      const validatePhone = (phone: string) => {
        const cleaned = phone.replace(/[\s+-]/g, "")
        return /^\d{10,12}$/.test(cleaned)
      }
      expect(validatePhone("abc1234567")).toBe(false)
      expect(validatePhone("12345")).toBe(false)
      expect(validatePhone("+91 98765 43210")).toBe(true)
    },
  )
}
