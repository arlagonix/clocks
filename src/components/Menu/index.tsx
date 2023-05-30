import { IconButton } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { useState } from "react";
import { clsx } from "clsx";
import classes from "./index.module.css";

interface MenuProps {
  /** Callback that opens the settings modal */
  openModalHandler: () => void;
}

const Menu = ({ openModalHandler }: MenuProps) => {
  const [hideMenu, setHideMenu] = useState<boolean>(false);
  return (
    <aside className={clsx(classes.actionPanel, hideMenu && classes.hide)}>
      <IconButton
        className={classes.removeButtonWhenCantHover}
        aria-label="turn off visibility"
        onClick={() => setHideMenu((prev) => !prev)}
      >
        {hideMenu ? (
          <VisibilityOffOutlinedIcon fontSize="large" />
        ) : (
          <VisibilityOutlinedIcon fontSize="large" />
        )}
      </IconButton>
      <IconButton aria-label="open settings" onClick={openModalHandler}>
        <TuneOutlinedIcon fontSize="large" />
      </IconButton>
    </aside>
  );
};

export default Menu;
