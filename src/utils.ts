import { TimeFormatType } from "./hooks/useSettingsState";

interface IPartialListWithSeparator {
  items: {
    /** Element to be rendered */
    component: React.ReactNode;
    /** If `true` the component is displayed */
    display: boolean;
  }[];
  /** Element that must separate the elements from `items` */
  separator: (key: string) => React.ReactNode;
}

/**
 * Returns a list of components divided by a separator component.
 */
export const getSeparatedComponents = (
  componentsInfo: IPartialListWithSeparator
) =>
  componentsInfo.items
    .filter((obj) => obj.display)
    .reduce(
      (acc: React.ReactNode[], item, i, array) =>
        i === array.length - 1
          ? [...acc, item.component]
          : [...acc, item.component, componentsInfo.separator(i.toString())],
      []
    );

/**
 * Checks if `parameter` is not undefined, i.e. specified.
 * If it's specified, it returns the output of `transformFunction`.
 * Otherwise it returns `defaultValue`.
 */
export const checkIfSpecified = <T>(
  /** Query parameter  */
  parameter: unknown,
  /** Function transforming a query parameter */
  transformFunction: (parameter: unknown) => T,
  /** Value returned when query parameter is not specified */
  defaultValue: T
) => {
  if (parameter === undefined) return defaultValue;
  return transformFunction(parameter);
};

/** Returns pieces of information from date */
export const getDateInfo = (date: Date, timeFormat: TimeFormatType) => {
  const formatDate = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", options).format(date);

  return {
    month: formatDate({ month: "long" }),
    dayOfMonth: formatDate({ day: "numeric" }),
    year: formatDate({ year: "numeric" }),
    dayOfWeek: formatDate({ weekday: "long" }),
    hours:
      timeFormat === "12h"
        ? formatDate({ hour: "numeric", hour12: true })
            .slice(0, -3)
            .padStart(2, "0")
        : formatDate({ hour: "numeric", hour12: false }).padStart(2, "0"),
    minutes: formatDate({ minute: "numeric" }).padStart(2, "0"),
    seconds: formatDate({ second: "numeric" }).padStart(2, "0"),
    amPm: formatDate({ hour: "numeric", hour12: true }).slice(-2),
  };
};

/** Returns the date converted to the timezone */
export const convertDateToTimezone = (
  /** Date tha must be converted */
  date: Date | string,
  /** Timezone to which the date must be converted */
  timezone: string
): Date => {
  const correctDate = date instanceof Date ? date : new Date(date);
  return new Date(
    correctDate.toLocaleDateString("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
  );
};
