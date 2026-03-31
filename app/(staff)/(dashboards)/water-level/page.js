"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../../_components/DashboardLayout";
import DatePicker from "../../../_components/DatePicker";
import InfoCard from "../../../_components/InfoCard";
import GraphPlaceholder from "../../../_components/GraphPlaceholder";
import { loadDashboardState, saveDashboardState } from "../../../utils/storage";
import { saveRecentDashboard } from "../../../utils/saveRecentDashboard";
import Carousel from "@/app/_components/Carousel";
import TimeGranularityDropdown from "@/app/_components/TimeGranularityDropdown";
import { useDateValidation } from "@/app/_components/hooks/useDateValidation";
import { getDataRange } from "@/app/_utils/get-data-range";

// *****BUG****Top-level await is not supported in "use client" components — getDataRange
// should be called inside a useEffect or fetched server-side and passed as a prop
const dataRange = await getDataRange();
// defaults
const stateDefaults = {
  fromDate: dataRange.oldest,
  toDate: dataRange.newest,
  visibleGraphs: {},
};
const STORAGE_KEY = "dashboard-water-level";

/**
 * WaterLevelDashboard
 *
 * Dashboard page for visualizing cistern water level readings.
 * Includes KPI stat cards for average, max, and min levels over
 * the selected date range, and a line chart showing level over time.
 * The date range is selectable via a DatePicker control, and the
 * dashboard state (including date range and visible graphs) can be saved to
 * localStorage and appears in the Recent Dashboards list for quick access.
 *
 * @author Cintya Lara Flores
 */
export default function WaterLevelDashboard() {
  const [state, setState] = useState(() =>
    loadDashboardState(STORAGE_KEY, stateDefaults),
  );

  // Initialised from saved state so controls restore immediately on page load
  const [appliedState, setAppliedState] = useState(() => {
    const saved = loadDashboardState(STORAGE_KEY, {
      fromDate: stateDefaults.fromDate,
      toDate: stateDefaults.toDate,
    });
    if (saved.fromDate && saved.toDate) {
      return { fromDate: saved.fromDate, toDate: saved.toDate };
    }
    return null;
  });

  // Errors from date validation
  // ****CHECK**** setErrors and validate are destructured but never used
  // Only errors and validateAll are actually called.
  // The unused destructures should be removed.
  const { errors, setErrors, validate, validateAll } = useDateValidation({
    earliestDate: "2018-10-13",
    latestDate: dataRange.forecast,
  });

  const { fromDate, toDate } = state;

  // Persists state to localStorage immediately on every change
  const handleStateChange = (newState) => {
    setState(newState);
    saveDashboardState(STORAGE_KEY, newState);
  };

  /**
   * parseLocalDate
   *
   * Parses a YYYY-MM-DD string as a local-time Date to avoid the UTC offset
   * shift that occurs with new Date(dateStr) on date-only strings.
   *
   * @param {string | null} dateStr - Date string in YYYY-MM-DD format
   * @returns {Date | null} Parsed local Date, or null if dateStr is falsy
   */
  const parseLocalDate = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day);
  };

  /**
   * formatDateRange
   *
   * Formats a from/to date pair into a compact range string used as the
   * subtitle on KPI stat cards.
   *
   * @param {string} from - Start date in YYYY-MM-DD format
   * @param {string} to   - End date in YYYY-MM-DD format
   * @returns {string | null} Formatted range string, or null if either date is falsy
   */
  const formatDateRange = (from, to) => {
    if (!from || !to) return null;
    const fromDate = parseLocalDate(from);
    const toDate = parseLocalDate(to);
    const fromFormatted = fromDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
    const toFormatted = toDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
    return `As of: ${fromFormatted} - ${toFormatted}`;
  };

  // Placeholder values — not yet fetched from the backend
  const stats = [
    {
      label: "Average Level",
      value: 82,
      unit: "%",
      subtitle: formatDateRange(appliedState?.fromDate, appliedState?.toDate),
    },
    {
      label: "Maximum Level",
      value: 78,
      unit: "%",
      subtitle: formatDateRange(appliedState?.fromDate, appliedState?.toDate),
    },
    {
      label: "Minimum Level",
      value: 95,
      unit: "%",
      subtitle: formatDateRange(appliedState?.fromDate, appliedState?.toDate),
    },
  ];

  // Re-run validation on every date change to keep error UI current
  useEffect(() => {
    if (state.fromDate && state.toDate) {
      validateAll(state.fromDate, state.toDate);
    }
  }, [state.fromDate, state.toDate, validateAll]);

  const handleSaveScreen = () => {
    saveDashboardState(STORAGE_KEY, state);
    saveRecentDashboard({
      id: "water-level",
      title: "Cistern Level Dashboard",
      path: "/water-level?from=staff-welcome-page",
      summary: {
        fromDate: state.fromDate,
        toDate: state.toDate,
        graphs: Object.keys(state.visibleGraphs || {}).filter(
          (g) => state.visibleGraphs[g],
        ),
      },
      saved: true,
    });
    alert(
      "Dashboard state saved! Your graph settings are restored for next login.",
    );
  };

  return (
    <DashboardLayout title="Cistern Level Dashboard">
      {/* ── Controls row: date range picker and time interval ── */}
      <div className="flex flex-wrap gap-6 mb-6 items-start">
        <div>
          <DatePicker
            fromDate={fromDate}
            toDate={toDate}
            errors={errors}
            onDateChange={(field, value) => {
              setState((prev) => ({
                ...prev,
                [field === "from" ? "fromDate" : "toDate"]: value,
              }));
            }}
            setDate={({ fromDate, toDate }) => {
              const nextState = { ...state, fromDate, toDate };
              handleStateChange(nextState);

              if (fromDate && toDate && validateAll(fromDate, toDate)) {
                setAppliedState({ fromDate, toDate });
              } else {
                // Invalid range — clear applied state
                setAppliedState(null);
              }
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Time Interval
          </label>
          {/* ***CHECK*** TimeGranularityDropdown receives no props
          Every other dashboard passes value and onChange to this component. 
          It's either incomplete or the component manages its own state 
          internally, worth checking */}
          <TimeGranularityDropdown />
        </div>
      </div>

      {/* Carousel on small screens, 3-column grid on large screens */}
      <div className="lg:hidden mb-6">
        <Carousel items={stats} horizontal />
      </div>
      <div className="hidden lg:block">
        <InfoCard
          colsClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          items={stats}
        />
      </div>

      {/* ── Chart placeholder — not yet implemented ── */}
      <GraphPlaceholder />

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSaveScreen}
          className="px-4 py-2 bg-[#005EB8] text-white font-semibold rounded hover:bg-[#004080] transition"
        >
          Save Screen
        </button>
      </div>
    </DashboardLayout>
  );
}
