import { useState, useEffect } from "react";
import { Play, Pause, Square, Check, ArrowLeft } from "lucide-react";

import { SUBJECTS, SMAP } from "../../data/subjects";
import { fmtClock } from "../../utils/time";

export default function TimerScreen({ onSave }) {
  const [picked, setPicked] = useState("mat");
  const [focus, setFocus] = useState(false);

  return focus ? (
    <FocusMode subject={SMAP[picked]} onExit={() => setFocus(false)}
      onSave={(sec) => { onSave(picked, sec); setFocus(false); }} />
  ) : (
    <div className="em-pad">
      <div className="em-top">
        <div>
          <div className="eyebrow">Cronômetro</div>
          <div className="em-h">Pronto para focar?</div>
        </div>
      </div>

      <div className="em-card" style={{ padding: "40px", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <div style={{ fontSize: 14.5, color: "var(--soft)", marginBottom: 18 }}>Escolha a matéria desta sessão</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 34 }}>
          {SUBJECTS.map((s) => (
            <div key={s.id} className={"em-chip" + (picked === s.id ? " on" : "")} onClick={() => setPicked(s.id)}>
              <span className="em-dot" style={{ background: picked === s.id ? "#F6F2E9" : s.color }} />
              {s.name}
            </div>
          ))}
        </div>

        <div style={{ position: "relative", width: 230, height: 230, margin: "0 auto 30px" }}>
          <svg width="230" height="230" viewBox="0 0 230 230">
            <circle cx="115" cy="115" r="100" fill="none" stroke="#EFEADD" strokeWidth="10" />
            <circle cx="115" cy="115" r="100" fill="none" stroke={SMAP[picked].color} strokeWidth="10"
              strokeLinecap="round" strokeDasharray="100 528" transform="rotate(-90 115 115)" opacity=".9" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <div>
              <div className="mono-num" style={{ fontSize: 46, fontWeight: 600 }}>00:00:00</div>
              <div style={{ fontSize: 13, color: "var(--soft)", marginTop: 4 }}>{SMAP[picked].name}</div>
            </div>
          </div>
        </div>

        <button className="em-btn em-btn-a" style={{ padding: "15px 32px", fontSize: 16 }} onClick={() => setFocus(true)}>
          <Play size={19} fill="#21160a" /> Começar a estudar
        </button>
        <div style={{ fontSize: 13, color: "var(--soft)", marginTop: 16 }}>
          O tempo conta para cima — pause e retome quando precisar.
        </div>
      </div>
    </div>
  );
}

function FocusMode({ subject, onExit, onSave }) {
  const [sec, setSec] = useState(0);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const R = 130, C = 2 * Math.PI * R;
  const prog = (sec % 3000) / 3000; // anel completa a cada 50 min

  return (
    <div className="em-focus">
      <div className="fx-top">
        <button className="fx-back" onClick={onExit}><ArrowLeft size={18} /> Descartar</button>
        <div className="fx-subj"><span className="em-dot" style={{ background: subject.color }} /> {subject.name}</div>
      </div>

      <div className="em-ringwrap">
        <svg width="330" height="330" viewBox="0 0 330 330" style={{ position: "absolute" }}>
          <circle cx="165" cy="165" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="6" />
          <circle cx="165" cy="165" r={R} fill="none" stroke={subject.color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * (1 - prog)} transform="rotate(-90 165 165)"
            style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
        <div className="lbl">Foco em andamento</div>
        <div className="big">{fmtClock(sec)}</div>
        <div className="state">{running ? "● gravando seu tempo" : "pausado"}</div>
      </div>

      <div className="em-fx-ctrl">
        <button className="em-fx-btn ghost" title="Encerrar e salvar" onClick={() => sec > 0 && onSave(sec)}>
          <Square size={22} fill="#EFEAD9" />
        </button>
        <button className="em-fx-btn main" onClick={() => setRunning((r) => !r)}>
          {running ? <Pause size={30} fill="#21160a" /> : <Play size={30} fill="#21160a" />}
        </button>
        <button className="em-fx-btn ghost" title="Concluir sessão" onClick={() => sec > 0 ? onSave(sec) : onExit()}>
          <Check size={24} />
        </button>
      </div>
    </div>
  );
}