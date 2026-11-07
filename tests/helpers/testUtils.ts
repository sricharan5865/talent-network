/**
 * TalentFlow E2E Test Utilities & Assertion Framework
 * Lightweight, zero-dependency, type-safe test harness for Node.js + tsx
 */

import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

export interface TestResult {
  suite: string
  name: string
  tier: 1 | 2 | 3 | 4
  feature?: string
  passed: boolean
  error?: string
  durationMs: number
}

export interface SuiteSummary {
  name: string
  total: number
  passed: number
  failed: number
  tests: TestResult[]
}

export const globalResults: TestResult[] = []

/**
 * Custom Assertion Library
 */
export const expect = (actual: unknown) => ({
  toBe: (expected: unknown) => {
    if (actual !== expected) {
      throw new Error(
        `Expected [${JSON.stringify(expected)}] but got [${JSON.stringify(actual)}]`,
      )
    }
  },
  toEqual: (expected: unknown) => {
    const act = JSON.stringify(actual)
    const exp = JSON.stringify(expected)
    if (act !== exp) {
      throw new Error(`Expected equality:\nExpected: ${exp}\nReceived: ${act}`)
    }
  },
  toBeTruthy: () => {
    if (!actual) {
      throw new Error(`Expected truthy value but got: ${actual}`)
    }
  },
  toBeFalsy: () => {
    if (actual) {
      throw new Error(`Expected falsy value but got: ${actual}`)
    }
  },
  toBeUndefined: () => {
    if (actual !== undefined) {
      throw new Error(`Expected undefined but got ${JSON.stringify(actual)}`)
    }
  },
  toBeDefined: () => {
    if (actual === undefined) {
      throw new Error(`Expected defined value but got undefined`)
    }
  },
  toBeGreaterThan: (expected: number) => {
    if (typeof actual !== "number" || actual <= expected) {
      throw new Error(`Expected ${actual} > ${expected}`)
    }
  },
  toBeGreaterThanOrEqual: (expected: number) => {
    if (typeof actual !== "number" || actual < expected) {
      throw new Error(`Expected ${actual} >= ${expected}`)
    }
  },
  toBeLessThan: (expected: number) => {
    if (typeof actual !== "number" || actual >= expected) {
      throw new Error(`Expected ${actual} < ${expected}`)
    }
  },
  toBeLessThanOrEqual: (expected: number) => {
    if (typeof actual !== "number" || actual > expected) {
      throw new Error(`Expected ${actual} <= ${expected}`)
    }
  },
  toContain: (substringOrItem: string | unknown) => {
    if (typeof actual === "string" && typeof substringOrItem === "string") {
      if (!actual.includes(substringOrItem)) {
        throw new Error(
          `String does not contain "${substringOrItem}" in:\n${actual.slice(0, 300)}...`,
        )
      }
    } else if (Array.isArray(actual)) {
      if (!actual.includes(substringOrItem)) {
        throw new Error(
          `Array does not contain item: ${JSON.stringify(substringOrItem)}`,
        )
      }
    } else {
      throw new Error(
        `toContain called on non-string/non-array: ${typeof actual}`,
      )
    }
  },
  toNotContain: (substringOrItem: string | unknown) => {
    if (typeof actual === "string" && typeof substringOrItem === "string") {
      if (actual.includes(substringOrItem)) {
        throw new Error(`String should NOT contain "${substringOrItem}"`)
      }
    } else if (Array.isArray(actual)) {
      if (actual.includes(substringOrItem)) {
        throw new Error(
          `Array should NOT contain item: ${JSON.stringify(substringOrItem)}`,
        )
      }
    }
  },
  toHaveLength: (length: number) => {
    const len = (actual as { length?: number })?.length
    if (len !== length) {
      throw new Error(`Expected length ${length} but got ${len}`)
    }
  },
  toThrow: (expectedMessage?: string | RegExp) => {
    if (typeof actual !== "function") {
      throw new Error("toThrow must be called on a function")
    }
    let threw = false
    let thrownError: unknown
    try {
      actual()
    } catch (err) {
      threw = true
      thrownError = err
    }
    if (!threw) {
      throw new Error("Expected function to throw, but it did not throw")
    }
    if (expectedMessage && thrownError instanceof Error) {
      if (
        typeof expectedMessage === "string" &&
        !thrownError.message.includes(expectedMessage)
      ) {
        throw new Error(
          `Expected error message to contain "${expectedMessage}", got "${thrownError.message}"`,
        )
      } else if (
        expectedMessage instanceof RegExp &&
        !expectedMessage.test(thrownError.message)
      ) {
        throw new Error(
          `Expected error message to match ${expectedMessage}, got "${thrownError.message}"`,
        )
      }
    }
  },
})

/**
 * Synchronous / Asynchronous Test Runner
 */
export async function runTest(
  suiteName: string,
  testName: string,
  tier: 1 | 2 | 3 | 4,
  feature: string,
  fn: () => void | Promise<void>,
): Promise<TestResult> {
  const start = Date.now()
  try {
    await fn()
    const durationMs = Date.now() - start
    const res: TestResult = {
      suite: suiteName,
      name: testName,
      tier,
      feature,
      passed: true,
      durationMs,
    }
    globalResults.push(res)
    return res
  } catch (err: unknown) {
    const durationMs = Date.now() - start
    const errorMsg =
      err instanceof Error ? err.stack || err.message : String(err)
    const res: TestResult = {
      suite: suiteName,
      name: testName,
      tier,
      feature,
      passed: false,
      error: errorMsg,
      durationMs,
    }
    globalResults.push(res)
    return res
  }
}

/**
 * Render a React component to HTML string for opaque-box inspection
 */
export function renderComponent(element: React.ReactElement): string {
  try {
    return renderToStaticMarkup(element)
  } catch (err) {
    throw new Error(
      `Failed to render component: ${
        err instanceof Error ? err.message : String(err)
      }`,
    )
  }
}

/**
 * HTML Inspection Helpers
 */
export function assertContainsText(
  html: string,
  text: string,
  context?: string,
) {
  if (!html.includes(text)) {
    throw new Error(
      `Missing expected text "${text}"${context ? ` in ${context}` : ""}`,
    )
  }
}

export function assertMatchesRegex(
  html: string,
  regex: RegExp,
  context?: string,
) {
  if (!regex.test(html)) {
    throw new Error(
      `HTML does not match pattern ${regex}${context ? ` in ${context}` : ""}`,
    )
  }
}
