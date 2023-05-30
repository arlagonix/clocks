import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import timezones, { TimezoneNamesType, timezoneNames } from "../../timezones";
import classes from "./index.module.css";
import Snackbar from "@mui/material/Snackbar";
import {
  Autocomplete,
  Button,
  IconButton,
  Modal,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import type { SettingsState } from "../../hooks/useSettingsState";

interface SettingsModalProps {
  /** If `true` the modal is displayed, otherwise is hidden */
  open: boolean;
  /** Callback that closes the modal */
  handleClose: () => void;
  /** Global settings state, used in main App */
  settingsState: SettingsState;
  /** Setter for the global settings state */
  setSettingsState: (newState: SettingsState) => void;
}

const SettingsModal = ({
  open,
  handleClose,
  settingsState,
  setSettingsState,
}: SettingsModalProps) => {
  const [localSettingsState, setLocalSettingsState] =
    useState<SettingsState>(settingsState);

  const handleChange =
    <T,>(
      /** The key name in settings state object */
      settingsAttribute: keyof typeof localSettingsState,
      /** Optional modification function that allows to transform the new value before passing it to the state. E.g. I use it to forbid leaving Autocomplete empty */
      valueModifier?: (value: T) => T
    ) =>
    (_event: React.ChangeEvent<unknown>, newValue: T) => {
      setLocalSettingsState((oldState) => ({
        ...oldState,
        [settingsAttribute]:
          valueModifier === undefined ? newValue : valueModifier(newValue),
      }));
    };

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        message="Settings have been applied"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <article className={classes.container}>
          <div className={classes.headerContainer}>
            <h2 className={classes.header}>Settings</h2>
            <IconButton
              aria-label="open settings"
              onClick={handleClose}
              size="small"
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
          <hr className={classes.hr} />
          <div className={classes.scrollable}>
            <div className={classes.block}>
              <h3 className={classes.subheader}>Date</h3>

              {/* Display date */}
              <div className={classes.row}>
                <label className={classes.label} htmlFor="display-date">
                  Display date
                </label>
                <Switch
                  id="display-date"
                  checked={localSettingsState.displayDate}
                  onChange={handleChange<boolean>("displayDate")}
                />
              </div>

              {/* Display day and month */}
              <div className={classes.row}>
                <label
                  className={classes.label}
                  htmlFor="display-day-and-month"
                >
                  Display day and month
                </label>
                <Switch
                  id="display-day-and-month"
                  checked={localSettingsState.displayDayAndMonth}
                  onChange={handleChange<boolean>("displayDayAndMonth")}
                  disabled={!localSettingsState.displayDate}
                />
              </div>

              {/* Display day of week */}
              <div className={classes.row}>
                <label className={classes.label} htmlFor="display-day-of-week">
                  Display day of week
                </label>
                <Switch
                  id="display-day-of-week"
                  checked={localSettingsState.displayDayOfWeek}
                  onChange={handleChange<boolean>("displayDayOfWeek")}
                  disabled={!localSettingsState.displayDate}
                />
              </div>

              {/* Display year */}
              <div className={classes.row}>
                <label className={classes.label} htmlFor="display-year">
                  Display year
                </label>
                <Switch
                  id="display-year"
                  checked={localSettingsState.displayYear}
                  onChange={handleChange<boolean>("displayYear")}
                  disabled={!localSettingsState.displayDate}
                />
              </div>

              {/* Display "Date" word */}
              <div className={classes.row}>
                <label className={classes.label} htmlFor="display-date-word">
                  Display word "Date"
                </label>
                <Switch
                  id="display-date-word"
                  checked={localSettingsState.displayDateWord}
                  onChange={handleChange<boolean>("displayDateWord")}
                  disabled={!localSettingsState.displayDate}
                />
              </div>
            </div>
            <hr className={classes.hr} />
            <div className={classes.block}>
              <h3 className={classes.subheader}>Time</h3>

              {/* Display time */}
              <div className={classes.row}>
                <label className={classes.label} htmlFor="display-time">
                  Display time
                </label>
                <Switch
                  id="display-time"
                  checked={localSettingsState.displayTime}
                  onChange={handleChange<boolean>("displayTime")}
                />
              </div>

              {/* Display hours */}
              <div className={classes.row}>
                <label className={classes.label} htmlFor="display-hours">
                  Display hours
                </label>
                <Switch
                  id="display-hours"
                  checked={localSettingsState.displayHours}
                  onChange={handleChange<boolean>("displayHours")}
                  disabled={!localSettingsState.displayTime}
                />
              </div>

              {/* Display minutes */}
              <div className={classes.row}>
                <label className={classes.label} htmlFor="display-minutes">
                  Display minutes
                </label>
                <Switch
                  id="display-minutes"
                  checked={localSettingsState.displayMinutes}
                  onChange={handleChange<boolean>("displayMinutes")}
                  disabled={!localSettingsState.displayTime}
                />
              </div>

              {/* Display seconds */}
              <div className={classes.row}>
                <label className={classes.label} htmlFor="display-seconds">
                  Display seconds
                </label>
                <Switch
                  id="display-seconds"
                  checked={localSettingsState.displaySeconds}
                  onChange={handleChange<boolean>("displaySeconds")}
                  disabled={!localSettingsState.displayTime}
                />
              </div>

              {/* Time format */}
              <div className={classes.row}>
                <label className={classes.label}>Time format</label>
                <ToggleButtonGroup
                  color="primary"
                  value={localSettingsState.timeFormat}
                  exclusive
                  onChange={handleChange<"12h" | "24h">("timeFormat")}
                  disabled={!localSettingsState.displayTime}
                >
                  <ToggleButton value="12h">12h</ToggleButton>
                  <ToggleButton value="24h">24h</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            <hr className={classes.hr} />
            <div className={classes.block}>
              <h3 className={classes.subheader}>Timezone</h3>

              {/* Timezone */}
              <Autocomplete
                id="timezone"
                fullWidth={true}
                value={localSettingsState.timezoneName}
                onChange={handleChange<TimezoneNamesType | null>(
                  "timezoneName",
                  (newValue) => newValue ?? localSettingsState.timezoneName
                )}
                options={timezoneNames}
                groupBy={(option) =>
                  timezones.find((tz) => tz.name === option)?.group ??
                  timezones[0].group
                }
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Timezone" />
                )}
                clearIcon={null}
                isOptionEqualToValue={(option, value) => option === value}
                sx={{ marginTop: "8px" }}
              />

              {/* Display timezone */}
              <div className={classes.row}>
                <label className={classes.label} htmlFor="display-timezone">
                  Display timezone
                </label>
                <Switch
                  id="display-timezone"
                  checked={localSettingsState.displayTimezone}
                  onChange={handleChange<boolean>("displayTimezone")}
                />
              </div>

              {/* Display timezone word */}
              <div className={classes.row}>
                <label
                  className={classes.label}
                  htmlFor="display-timezone-word"
                >
                  Display word "Timezone"
                </label>
                <Switch
                  id="display-timezone-word"
                  checked={localSettingsState.displayTimezoneWord}
                  onChange={handleChange<boolean>("displayTimezoneWord")}
                  disabled={!localSettingsState.displayTimezone}
                />
              </div>
            </div>
          </div>
          <hr className={classes.hr} />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              onClick={() => {
                setSettingsState(localSettingsState);
                handleClose();
                setSnackbarOpen(true);
              }}
            >
              Apply
            </Button>
          </div>
        </article>
      </Modal>
    </>
  );
};

export default SettingsModal;
