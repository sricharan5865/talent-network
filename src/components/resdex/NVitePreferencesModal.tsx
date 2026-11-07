import React, { useState, useEffect } from "react"
import { X, Info, Sparkles, MapPin, Check, Briefcase, IndianRupee } from "lucide-react"

export interface NVitePreferencesPayload {
  minExperience: number
  maxExperience: number
  location: string
  relocationLocations: string[]
  includeRelocation: boolean
  minSalaryLacs: number
  maxSalaryLacs: number
  includeUnspecifiedSalary: boolean
  targetAudienceCount: number
}

export interface NVitePreferencesModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (payload: NVitePreferencesPayload) => void
  onProceedToCampaign?: (payload: NVitePreferencesPayload) => void
  initialValues?: Partial<NVitePreferencesPayload>
}

const AVAILABLE_RELOCATION_CITIES = [
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Delhi NCR",
  "Chennai",
]

const EXPERIENCE_YEARS = Array.from({ length: 16 }, (_, i) => i) // 0 to 15

export function NVitePreferencesModal({
  isOpen,
  onClose,
  onSave,
  onProceedToCampaign,
  initialValues,
}: NVitePreferencesModalProps) {
  // Experience State
  const [minExp, setMinExp] = useState<number | "">(initialValues?.minExperience ?? 5)
  const [maxExp, setMaxExp] = useState<number | "">(initialValues?.maxExperience ?? 10)
  const [showMinExpDropdown, setShowMinExpDropdown] = useState(false)

  // Location & Relocation State
  const [location, setLocation] = useState(initialValues?.location ?? "Hyderabad")
  const [relocationCities, setRelocationCities] = useState<string[]>(
    initialValues?.relocationLocations ?? ["Bengaluru", "Pune"],
  )
  const [includeRelocation, setIncludeRelocation] = useState(
    initialValues?.includeRelocation ?? true,
  )

  // Salary State
  const [minSalary, setMinSalary] = useState<number | "">(initialValues?.minSalaryLacs ?? 8)
  const [maxSalary, setMaxSalary] = useState<number | "">(initialValues?.maxSalaryLacs ?? 18)
  const [includeUnspecifiedSalary, setIncludeUnspecifiedSalary] = useState(
    initialValues?.includeUnspecifiedSalary ?? true,
  )

  // Target count state
  const [targetCount, setTargetCount] = useState<number>(
    initialValues?.targetAudienceCount ?? 500,
  )

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSavedFeedback, setIsSavedFeedback] = useState(false)

  // Re-sync with initialValues if opened
  useEffect(() => {
    if (isOpen) {
      if (initialValues?.minExperience !== undefined) setMinExp(initialValues.minExperience)
      if (initialValues?.maxExperience !== undefined) setMaxExp(initialValues.maxExperience)
      if (initialValues?.location !== undefined) setLocation(initialValues.location)
      if (initialValues?.relocationLocations !== undefined)
        setRelocationCities(initialValues.relocationLocations)
      if (initialValues?.includeRelocation !== undefined)
        setIncludeRelocation(initialValues.includeRelocation)
      if (initialValues?.minSalaryLacs !== undefined) setMinSalary(initialValues.minSalaryLacs)
      if (initialValues?.maxSalaryLacs !== undefined) setMaxSalary(initialValues.maxSalaryLacs)
      if (initialValues?.includeUnspecifiedSalary !== undefined)
        setIncludeUnspecifiedSalary(initialValues.includeUnspecifiedSalary)
      if (initialValues?.targetAudienceCount !== undefined)
        setTargetCount(initialValues.targetAudienceCount)
      setErrors({})
      setIsSavedFeedback(false)
    }
  }, [isOpen, initialValues])

  // Sanitize non-negative numbers
  const sanitizeNonNegative = (val: number) => Math.max(0, val)

  // Sanitize location text (removes < and > per boundary requirements)
  const sanitizeLocation = (val: string) => val.replace(/[<>]/g, "").trim()

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Max exp required
    if (maxExp === "" || maxExp === null || maxExp === undefined) {
      newErrors.maxExp = "Max experience is required"
    } else {
      const minNum = typeof minExp === "number" ? sanitizeNonNegative(minExp) : 0
      const maxNum = sanitizeNonNegative(maxExp)
      if (minNum > maxNum) {
        newErrors.experience = "Min experience cannot be greater than Max experience"
      }
    }

    // Salary validation
    if (minSalary !== "" && maxSalary !== "") {
      const minSalNum = sanitizeNonNegative(minSalary)
      const maxSalNum = sanitizeNonNegative(maxSalary)
      if (minSalNum > maxSalNum) {
        newErrors.salary = "Min salary cannot be greater than Max salary"
      }
    }

    // Target count validation
    if (targetCount <= 0) {
      newErrors.targetCount = "Please specify at least 1 candidate"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Toggle Relocation City Chip
  const toggleRelocationCity = (city: string) => {
    setRelocationCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city],
    )
  }

  // Handle Submit / Proceed
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!validate()) return

    const minExpNum = typeof minExp === "number" ? sanitizeNonNegative(minExp) : 0
    const maxExpNum = typeof maxExp === "number" ? sanitizeNonNegative(maxExp) : 10
    const cleanLoc = sanitizeLocation(location)
    const minSalNum = typeof minSalary === "number" ? sanitizeNonNegative(minSalary) : 0
    const maxSalNum = typeof maxSalary === "number" ? sanitizeNonNegative(maxSalary) : 20

    const payload: NVitePreferencesPayload = {
      minExperience: minExpNum,
      maxExperience: maxExpNum,
      location: cleanLoc || "Hyderabad",
      relocationLocations: relocationCities,
      includeRelocation,
      minSalaryLacs: minSalNum,
      maxSalaryLacs: maxSalNum,
      includeUnspecifiedSalary,
      targetAudienceCount: targetCount,
    }

    setIsSavedFeedback(true)
    setTimeout(() => {
      if (onSave) onSave(payload)
      if (onProceedToCampaign) onProceedToCampaign(payload)
      onClose()
    }, 450)
  }

  if (!isOpen) return null

  const isFormValid =
    maxExp !== "" &&
    (minExp === "" || (typeof minExp === "number" && typeof maxExp === "number" && minExp <= maxExp)) &&
    targetCount > 0

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nvite-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
        {/* Header Section Matching Screenshot 180014 */}
        <div className="px-7 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 tracking-wide uppercase border border-amber-200">
                  NVite
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Targeting Preferences / Calibration
                </span>
              </div>
              <h2
                id="nvite-modal-title"
                className="text-xl sm:text-[22px] font-bold text-gray-900 tracking-tight leading-snug"
              >
                Before you proceed, add these preferences for relevant targeting
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="px-7 pb-6 space-y-6">
          {/* Experience Range Section */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800">
              Experience <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {/* Min Experience with Custom Dropdown Popover */}
              <div className="relative w-36">
                <input
                  type="text"
                  placeholder="Min experience"
                  value={minExp}
                  onClick={() => setShowMinExpDropdown((prev) => !prev)}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value)
                    if (val === "" || !isNaN(val)) setMinExp(val)
                  }}
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer ${
                    errors.experience ? "border-red-500 bg-red-50/20" : "border-blue-400 text-gray-900"
                  }`}
                />
                {showMinExpDropdown && (
                  <div className="absolute left-0 top-full mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                    {EXPERIENCE_YEARS.map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => {
                          setMinExp(yr)
                          setShowMinExpDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-1.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                          minExp === yr ? "bg-blue-100/60 font-semibold text-blue-700" : "text-gray-700"
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-sm font-medium text-gray-500">to</span>

              {/* Max Experience */}
              <div className="w-36">
                <input
                  type="text"
                  placeholder="Max experience"
                  value={maxExp}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value)
                    if (val === "" || !isNaN(val)) setMaxExp(val)
                  }}
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.maxExp || errors.experience
                      ? "border-red-500 ring-1 ring-red-400 bg-red-50/20"
                      : maxExp === ""
                      ? "border-red-400"
                      : "border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <span className="text-sm font-medium text-gray-600">Years</span>
            </div>

            {/* Experience Error Messages */}
            {errors.maxExp && (
              <p className="text-xs text-red-600 font-medium mt-1">{errors.maxExp}</p>
            )}
            {errors.experience && (
              <p className="text-xs text-red-600 font-medium mt-1">{errors.experience}</p>
            )}
          </div>

          {/* Current Location of Candidate Section */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-gray-800">
              Current Location of Candidate
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Relocation Quick Cities Chips */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>Target relocation cities:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_RELOCATION_CITIES.map((city) => {
                  const isSelected = relocationCities.includes(city)
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => toggleRelocationCity(city)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full font-medium transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      {city}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Include relocation checkbox */}
            <label className="flex items-start gap-2.5 text-sm text-gray-700 cursor-pointer pt-0.5">
              <input
                type="checkbox"
                checked={includeRelocation}
                onChange={(e) => setIncludeRelocation(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span>Include candidates who prefer to relocate to above locations</span>
            </label>
          </div>

          {/* Annual Salary Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Annual Salary (CTC in INR Lacs)
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-36">
                <input
                  type="text"
                  placeholder="Min salary"
                  value={minSalary}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value)
                    if (val === "" || !isNaN(val)) setMinSalary(val)
                  }}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              <span className="text-sm font-medium text-gray-500">to</span>

              <div className="w-36">
                <input
                  type="text"
                  placeholder="Max salary"
                  value={maxSalary}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value)
                    if (val === "" || !isNaN(val)) setMaxSalary(val)
                  }}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              <span className="text-sm font-medium text-gray-600">Lacs</span>
            </div>

            {errors.salary && (
              <p className="text-xs text-red-600 font-medium">{errors.salary}</p>
            )}

            {/* Helper Note Matching Screenshot 180014 */}
            <div className="flex items-start gap-1.5 text-xs text-gray-500 pt-1">
              <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span>
                Ensure that this is candidate's current annual salary and not the salary you will offer them
              </span>
            </div>

            {/* Checkbox Include unspecified */}
            <label className="flex items-start gap-2.5 text-sm text-gray-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={includeUnspecifiedSalary}
                onChange={(e) => setIncludeUnspecifiedSalary(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span>Include candidates who did not mention their current salary</span>
            </label>
          </div>

          {/* Target Audience Count Helper Strip */}
          <div className="flex items-center justify-between p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="font-medium">
                Calibrating targeted audience: <strong>{targetCount} candidates</strong>
              </span>
            </div>
            <span className="text-blue-700 font-semibold bg-white px-2 py-0.5 rounded shadow-2xs border border-blue-200">
              13,352 NVites Available
            </span>
          </div>

          {/* Action Buttons Footer */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
                isFormValid
                  ? "bg-[#1765e8] hover:bg-[#1351be] text-white active:scale-98"
                  : "bg-blue-300 text-white/90 cursor-not-allowed opacity-80"
              }`}
            >
              {isSavedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Preferences Applied...</span>
                </>
              ) : (
                <span>Save &amp; Proceed to Campaign</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NVitePreferencesModal
