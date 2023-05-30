import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkIfSpecified } from "../utils";
import timezones, { TimezoneNamesType } from "../timezones";

export type TimeFormatType = "12h" | "24h";

export interface SettingsState {
  /** In what timezone the time must be displayed */
  timezoneName: TimezoneNamesType;
  /** If `true` displays information about timezone */
  displayTimezone: boolean;
  /** If `true` displays the word "Timezone" on the main screen */
  displayTimezoneWord: boolean;
  /** If `true` displays the information about the current date */
  displayDate: boolean;
  /** If `true` displays the day and month */
  displayDayAndMonth: boolean;
  /** If `true` displays the day of week */
  displayDayOfWeek: boolean;
  /** If `true` displays the day of week */
  displayYear: boolean;
  /** If `true` displays the year */
  displayDateWord: boolean;
  /** If `true` displays time  */
  displayTime: boolean;
  /** If `true` displays hours */
  displayHours: boolean;
  /** If `true` displays minutes */
  displayMinutes: boolean;
  /** If `true` displays seconds */
  displaySeconds: boolean;
  /** `12h` displays AM, PM; `24h` doesn't display them */
  timeFormat: TimeFormatType;
}

/**
 * Gets the settings info from query params in URL
 * and defines the state based on that information.
 * Updates the query params when the state changes.
 */
function useSettingsState() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);

  const initialState: SettingsState = {
    timezoneName: checkIfSpecified<TimezoneNamesType>(
      queryParams.timezoneName,
      (param) =>
        timezones.some((tz) => tz.name === param)
          ? (param as TimezoneNamesType)
          : timezones[0].name,
      timezones[0].name
    ),
    displayTimezone: checkIfSpecified<boolean>(
      queryParams.displayTimezone,
      (param) => param !== "false",
      true
    ),
    displayTimezoneWord: checkIfSpecified<boolean>(
      queryParams.displayTimezoneWord,
      (param) => param !== "false",
      true
    ),
    displayDate: checkIfSpecified<boolean>(
      queryParams.displayDate,
      (param) => param !== "false",
      true
    ),
    displayDayAndMonth: checkIfSpecified<boolean>(
      queryParams.displayDayAndMonth,
      (param) => param !== "false",
      true
    ),
    displayDayOfWeek: checkIfSpecified<boolean>(
      queryParams.displayDayOfWeek,
      (param) => param !== "false",
      true
    ),
    displayYear: checkIfSpecified<boolean>(
      queryParams.displayYear,
      (param) => param !== "false",
      true
    ),
    displayDateWord: checkIfSpecified<boolean>(
      queryParams.displayDateWord,
      (param) => param !== "false",
      true
    ),
    displayTime: checkIfSpecified<boolean>(
      queryParams.displayTime,
      (param) => param !== "false",
      true
    ),
    displayHours: checkIfSpecified<boolean>(
      queryParams.displayHours,
      (param) => param !== "false",
      true
    ),
    displayMinutes: checkIfSpecified<boolean>(
      queryParams.displayMinutes,
      (param) => param !== "false",
      true
    ),
    displaySeconds: checkIfSpecified<boolean>(
      queryParams.displaySeconds,
      (param) => param !== "false",
      true
    ),
    timeFormat: checkIfSpecified<TimeFormatType>(
      queryParams.timeFormat,
      (param) =>
        typeof param === "string" && ["12h", "24h"].includes(param)
          ? (param as TimeFormatType)
          : "24h",
      "24h"
    ),
  };

  const [settingsState, setSettingsState] =
    useState<SettingsState>(initialState);

  useEffect(() => {
    navigate(`?${queryString.stringify(settingsState)}`);
  }, [settingsState, navigate]);

  return { settingsState, setSettingsState };
}

export default useSettingsState;
