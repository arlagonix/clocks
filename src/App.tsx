import { useState } from "react";
import SettingsModal from "./components/SettingsModal";
import useSettingsState from "./hooks/useSettingsState";
import Menu from "./components/Menu";
import Clocks from "./components/Clocks";

function App() {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const { settingsState, setSettingsState } = useSettingsState();

  return (
    <>
      <Clocks settingsState={settingsState} />
      <Menu openModalHandler={() => setSettingsOpen(true)} />
      <SettingsModal
        open={settingsOpen}
        handleClose={() => setSettingsOpen(false)}
        settingsState={settingsState}
        setSettingsState={setSettingsState}
      />
    </>
  );
}

export default App;
