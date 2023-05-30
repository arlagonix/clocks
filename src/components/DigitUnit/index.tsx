import { forwardRef } from "react";
import classes from "./index.module.css";

interface DigitUnitProps {
  /** Displayed value */
  value: string;
  /**
   * Same value, but with delay.
   * Required for smooth transition from old value to a new one.
   */
  delayedValue: string;
}

const DigitUnit = forwardRef<HTMLDivElement, DigitUnitProps>(
  ({ value, delayedValue }, ref) => {
    return (
      <div className={classes.timeItem} ref={ref}>
        <div className={classes.digitGroup}>
          <div className={classes.value}>{value}</div>
          <div className={classes.value}>{delayedValue}</div>
        </div>
      </div>
    );
  }
);

export default DigitUnit;
