/**
 * Tier 1 Feature Tests: F5 - Dashboard Job Postings & Resdex Folders
 * Authoritative Source: ORIGINAL_REQUEST.md, PROJECT.md F5, Screenshots 175546.png, 175553.png, 175557.png
 */

import { runTest, expect } from "../helpers/testUtils"
import {
  mockJobRequisitions,
  mockRecentSearches,
  mockSavedSearches,
  mockResdexFolders,
} from "../../src/data/resdexData"

export async function runF5Tests() {
  const SUITE = "F5: Dashboard Job Postings & Resdex Folders"

  await runTest(
    SUITE,
    "F5.1: Recently posted jobs includes Sr GIS Analyst and IoT Engineer",
    1,
    "F5",
    () => {
      const gis = mockJobRequisitions.find(
        (j) => j.title === "Sr GIS Analyst - Database",
      )
      const iot = mockJobRequisitions.find((j) =>
        j.title.includes("Iot Engineer"),
      )

      expect(gis).toBeTruthy()
      expect(iot).toBeTruthy()
    },
  )

  await runTest(
    SUITE,
    "F5.2: Posted jobs table displays applies (144, 72) and CVs (150, 7)",
    1,
    "F5",
    () => {
      const gis = mockJobRequisitions.find(
        (j) => j.title === "Sr GIS Analyst - Database",
      )!
      const iot = mockJobRequisitions.find((j) =>
        j.title.includes("Iot Engineer"),
      )!

      expect(gis.appliesCount).toBe(144)
      expect(gis.cvsCount).toBe(150)

      expect(iot.appliesCount).toBe(72)
      expect(iot.cvsCount).toBe(7)
    },
  )

  await runTest(
    SUITE,
    "F5.3: Recent searches card contains all 4 screenshot queries",
    1,
    "F5",
    () => {
      expect(mockRecentSearches.length).toBeGreaterThanOrEqual(4)
      const texts = mockRecentSearches.map((s) => s.displayText)

      expect(texts[0]).toContain("aws, azure, oci")
      expect(texts[1]).toContain('IT, "rfp writer"')
      expect(texts[2]).toContain('"pre sales"')
      expect(texts[3]).toContain("it products | rfq")
    },
  )

  await runTest(
    SUITE,
    "F5.4: Saved searches card lists GIS Developer with raw query",
    1,
    "F5",
    () => {
      const gisSaved = mockSavedSearches.find((s) => s.name === "GIS Developer")
      expect(gisSaved).toBeTruthy()
      expect(gisSaved!.rawQuery).toBe('"GIS Developer", esri, html, javascript')
      expect(gisSaved!.lastRunDate).toContain("Nov 2026")
    },
  )

  await runTest(
    SUITE,
    "F5.5: Resdex folders card lists PCB, Program Manager, sitecore, Office admin",
    1,
    "F5",
    () => {
      const folderNames = mockResdexFolders.map((f) => f.name)
      expect(folderNames).toContain("PCB")
      expect(folderNames).toContain("Program Manager")
      expect(folderNames).toContain("sitecore")
      expect(folderNames).toContain("Office administrator")

      const pcb = mockResdexFolders.find((f) => f.name === "PCB")!
      const pm = mockResdexFolders.find((f) => f.name === "Program Manager")!
      const sitecore = mockResdexFolders.find((f) => f.name === "sitecore")!
      const office = mockResdexFolders.find(
        (f) => f.name === "Office administrator",
      )!

      expect(pcb.count).toBe(138)
      expect(pm.count).toBe(0)
      expect(sitecore.count).toBe(152)
      expect(office.count).toBe(40)
    },
  )

  await runTest(
    SUITE,
    "F5.6: Folder dates match screenshot records (25-Jun-26, 09-Sept-23)",
    1,
    "F5",
    () => {
      const pcb = mockResdexFolders.find((f) => f.name === "PCB")!
      const sitecore = mockResdexFolders.find((f) => f.name === "sitecore")!

      expect(pcb.updatedDate).toBe("25-Jun-26")
      expect(sitecore.updatedDate).toBe("09-Sept-23")
    },
  )
}
