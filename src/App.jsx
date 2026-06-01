import { useState, useEffect } from "react";

import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import TimerScreen from "./pages/Timer/timer";
import HistoryScreen from "./pages/History/history";
import SubjectsScreen from "./pages/Subjects/subjects";
import SettingsScreen from "./pages/Settings/settings";

import Sidebar from "./components/layout/sidebar/sidebar";

import { SEED } from "./data/sessions";

function App() {
  const [logged, setLogged] = useState(false);
  const [screen, setScreen] = useState("dash");
  const [sessions, setSessions] = useState(SEED);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const dark = theme === "dark" || (theme === "system" && systemDark);

  const saveSession = (subj, sec) => {
    setSessions((prev) => [
      {
        id: Date.now(),
        subj,
        sec,
        dayIdx: 4,
        when: "Agora mesmo",
        group: "Hoje",
        note: "Sessão cronometrada",
      },
      ...prev,
    ]);

    setScreen("hist");
  };

  return (
    <div className="em" data-theme={dark ? "dark" : "light"}>
      {!logged ? (
        <Login onEnter={() => setLogged(true)} />
      ) : (
        <div className="em-shell">
          <Sidebar
            screen={screen}
            go={setScreen}
            onLogout={() => setLogged(false)}
          />

          <main className="em-main">
            {screen === "dash" && (
              <Dashboard sessions={sessions} go={setScreen} />
            )}

            {screen === "timer" && (
              <TimerScreen onSave={saveSession} />
            )}

            {screen === "hist" && (
              <HistoryScreen sessions={sessions} />
            )}

            {screen === "subj" && (
              <SubjectsScreen sessions={sessions} />
            )}

            {screen === "settings" && (
              <SettingsScreen theme={theme} setTheme={setTheme} />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;