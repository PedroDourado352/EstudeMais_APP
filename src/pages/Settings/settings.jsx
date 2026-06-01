import { useState } from "react";
import { User, Target, Bell, Palette, Save } from "lucide-react";

export default function SettingsScreen({ theme, setTheme }) {
  const [name, setName] = useState("Carlos Eduardo");
  const [email, setEmail] = useState("carlos@estudemais.app");
  const [goal, setGoal] = useState(12);
  const [notify, setNotify] = useState(true);
  const [sound, setSound] = useState(false);

  return (
    <div className="em-pad">
      <div className="em-top">
        <div>
          <div className="eyebrow">Configurações</div>
          <div className="em-h">Ajuste sua experiência</div>
        </div>
        <button className="em-btn em-btn-p">
          <Save size={17} /> Salvar alterações
        </button>
      </div>

      {/* Perfil */}
      <div className="em-card" style={{ padding: "22px 24px", marginBottom: 18 }}>
        <div className="em-sec-h">
          <h4><User size={16} style={{ verticalAlign: "-3px", marginRight: 8 }} />Perfil</h4>
        </div>
        <div className="em-field">
          <label>Nome</label>
          <input className="em-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="em-field">
          <label>E-mail</label>
          <input className="em-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      {/* Meta de estudo */}
      <div className="em-card" style={{ padding: "22px 24px", marginBottom: 18 }}>
        <div className="em-sec-h">
          <h4><Target size={16} style={{ verticalAlign: "-3px", marginRight: 8 }} />Meta de estudo</h4>
        </div>
        <div className="em-field">
          <label>Meta semanal (horas)</label>
          <input
            className="em-input"
            type="number"
            min={1}
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            style={{ maxWidth: 160 }}
          />
        </div>
      </div>

      {/* Notificações */}
      <div className="em-card" style={{ padding: "22px 24px", marginBottom: 18 }}>
        <div className="em-sec-h">
          <h4><Bell size={16} style={{ verticalAlign: "-3px", marginRight: 8 }} />Notificações</h4>
        </div>
        <ToggleRow
          label="Lembretes de estudo"
          desc="Receba avisos para manter sua sequência."
          on={notify}
          onToggle={() => setNotify((v) => !v)}
        />
        <ToggleRow
          label="Som ao finalizar sessão"
          desc="Toca um alerta quando o cronômetro encerra."
          on={sound}
          onToggle={() => setSound((v) => !v)}
        />
      </div>

      {/* Aparência */}
      <div className="em-card" style={{ padding: "22px 24px" }}>
        <div className="em-sec-h">
          <h4><Palette size={16} style={{ verticalAlign: "-3px", marginRight: 8 }} />Aparência</h4>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { id: "light", label: "Claro" },
            { id: "dark", label: "Escuro" },
            { id: "system", label: "Sistema" },
          ].map((t) => (
            <div
              key={t.id}
              className={"em-chip" + (theme === t.id ? " on" : "")}
              onClick={() => setTheme(t.id)}
            >
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, on, onToggle }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 14.5 }}>{label}</div>
        <div style={{ fontSize: 12.5, color: "var(--soft)", marginTop: 2 }}>{desc}</div>
      </div>
      <button
        onClick={onToggle}
        aria-pressed={on}
        style={{
          width: 46,
          height: 26,
          borderRadius: 20,
          border: "none",
          cursor: "pointer",
          flex: "none",
          background: on ? "var(--pine)" : "var(--bg2)",
          position: "relative",
          transition: ".18s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: on ? 23 : 3,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,.2)",
            transition: ".18s",
          }}
        />
      </button>
    </div>
  );
}
