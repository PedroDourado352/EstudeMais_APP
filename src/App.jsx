import { useState } from "react";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import TimerScreen from "./pages/Timer/Timer";
import HistoryScreen from "./pages/History/History";
import SubjectsScreen from "./pages/Subjects/Subjects";

import Sidebar from "./components/layout/Sidebar/Sidebar";

import { SEED } from "./data/sessions";

function App() {
  const [logged, setLogged] = useState(false);
  const [screen, setScreen] = useState("dash");
  const [sessions, setSessions] = useState(SEED);

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
    <div className="em">
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
          </main>
        </div>
      )}
    </div>
  );
}

export default App;