import { useEffect, useState } from "react";
import type { TimeFormatType } from "./useSettingsState";
import { convertDateToTimezone, getDateInfo } from "../utils";
import useAddRemoveCssClass from "./useAddRemoveCssClass";
import useDelayedValue from "./useDelayedValue";
import classes from "../components/DigitUnit/index.module.css";

/**
 * Small hook that is later used to generate an object
 * with display information about hours, minutes, seconds */
const useGetDisplayInfo = (
  /** Hours, minutes, or seconds */
  displayParam: string
) => ({
  /** Value that must be displayed on the screen */
  value: displayParam,
  /** Ref for applying animations */
  ref: useAddRemoveCssClass(displayParam, classes.bounceAnimation, 900),
  /** Delayed value that must be displayed, used for smooth transition from old value to a new value */
  delayedValue: useDelayedValue<string>(displayParam, 500),
});

/** Based timezone and time format returns the date attributes  */
const useDetailedInfo = (timezoneName: string, timeFormat: TimeFormatType) => {
  const [date, setDate] = useState(
    convertDateToTimezone(new Date(), timezoneName)
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(convertDateToTimezone(new Date(), timezoneName));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timezoneName]);

  const { month, dayOfMonth, year, dayOfWeek, hours, minutes, seconds, amPm } =
    getDateInfo(date, timeFormat);

  return {
    year: year,
    month: month,
    dayOfMonth: dayOfMonth,
    dayOfWeek: dayOfWeek,
    amPm: amPm,
    secondsInfo: useGetDisplayInfo(seconds),
    minutesInfo: useGetDisplayInfo(minutes),
    hoursInfo: useGetDisplayInfo(hours),
  };
};

export default useDetailedInfo;
