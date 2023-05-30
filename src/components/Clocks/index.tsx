import useDetailedInfo from "../../hooks/useDetailedDateInfo";
import { SettingsState } from "../../hooks/useSettingsState";
import { getSeparatedComponents } from "../../utils";
import DateItem from "../DateItem";
import DigitUnit from "../DigitUnit";
import classes from "./index.module.css";

interface ClocksProps {
  settingsState: SettingsState;
}

const Clocks = ({ settingsState }: ClocksProps) => {
  const {
    month,
    dayOfMonth,
    year,
    dayOfWeek,
    amPm,
    hoursInfo,
    minutesInfo,
    secondsInfo,
  } = useDetailedInfo(settingsState.timezoneName, settingsState.timeFormat);

  const displayedDateComponents = getSeparatedComponents({
    items: [
      {
        component: (
          <DateItem value={`${month} ${dayOfMonth}`} key="day and month" />
        ),
        display: settingsState.displayDayAndMonth,
      },
      {
        component: <DateItem value={year} key="year" />,
        display: settingsState.displayYear,
      },
      {
        component: <DateItem value={dayOfWeek} key="day of week" />,
        display: settingsState.displayDayOfWeek,
      },
    ],
    separator: (key) => (
      <span className={classes.separationDot} key={key}></span>
    ),
  });

  const displayedTimeComponents = getSeparatedComponents({
    items: [
      {
        component: (
          <DigitUnit
            ref={hoursInfo.ref}
            value={hoursInfo.value}
            delayedValue={hoursInfo.delayedValue}
            key="hours"
          />
        ),
        display: settingsState.displayHours,
      },
      {
        component: (
          <DigitUnit
            ref={minutesInfo.ref}
            value={minutesInfo.value}
            delayedValue={minutesInfo.delayedValue}
            key="minutes"
          />
        ),
        display: settingsState.displayMinutes,
      },
      {
        component: (
          <DigitUnit
            ref={secondsInfo.ref}
            value={secondsInfo.value}
            delayedValue={secondsInfo.delayedValue}
            key="seconds"
          />
        ),
        display: settingsState.displaySeconds,
      },
    ],
    separator: (key) => (
      <span className={classes.twoDotsSeparator} key={key}>
        :
      </span>
    ),
  });

  return (
    <main className={classes.mainContainer}>
      {/* Date information*/}
      {settingsState.displayDate && (
        <article>
          {settingsState.displayDateWord && (
            <h2 className={classes.header}>Date</h2>
          )}
          <div className={classes.dayContainer}>{displayedDateComponents}</div>
        </article>
      )}

      {/* Time infromation */}
      {settingsState.displayTime && (
        <article className={classes.timeContainer}>
          {displayedTimeComponents}
          {settingsState.timeFormat === "12h" && (
            <p className={classes.amPm}>{amPm}</p>
          )}
        </article>
      )}

      {/* Timezone information */}
      {settingsState.displayTimezone && (
        <article>
          <p className={classes.highlight}>{settingsState.timezoneName}</p>
          {settingsState.displayTimezoneWord && (
            <h2 className={classes.header}>Timezone</h2>
          )}
        </article>
      )}
    </main>
  );
};

export default Clocks;
