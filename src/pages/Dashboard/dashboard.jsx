import { useMemo } from "react";

import {
  Clock,
  Flame,
  Target,
  BookOpen,
  Play,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

import { SMAP } from "../../data/subjects";
import { fmtDur } from "../../utils/time";

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const TODAY = 4;

export default function Dashboard({ sessions, go }) {
  const totalSec = useMemo(() => sessions.reduce((a, s) => a + s.sec, 0), [sessions]);
  const avg = sessions.length ? Math.round(totalSec / sessions.length) : 0;

  const week = useMemo(() => {
    const arr = [0, 0, 0, 0, 0, 0, 0];
    sessions.forEach((s) => (arr[s.dayIdx] += s.sec));
    return DAYS.map((d, i) => ({ d, h: +(arr[i] / 3600).toFixed(2), today: i === TODAY }));
  }, [sessions]);

  const bySubj = useMemo(() => {
    const m = {};
    sessions.forEach((s) => (m[s.subj] = (m[s.subj] || 0) + s.sec));
    return Object.entries(m).map(([id, sec]) => ({ ...SMAP[id], sec }))
      .sort((a, b) => b.sec - a.sec);
  }, [sessions]);
  const maxSubj = Math.max(...bySubj.map((s) => s.sec), 1);

  const goal = 12 * 3600; // meta semanal 12h
  const pct = Math.min(100, Math.round((totalSec / goal) * 100));

  const stats = [
    { ico: Clock, c: "var(--pine)", bg: "#E4ECE6", v: fmtDur(totalSec), l: "Estudadas esta semana", t: "+24% vs. semana passada" },
    { ico: Flame, c: "var(--amber)", bg: "#F7E9D4", v: "12", sm: "dias", l: "Sequência de estudo", t: "seu recorde: 18 dias" },
    { ico: Target, c: "var(--slate)", bg: "#E3EAEE", v: fmtDur(avg), l: "Foco médio por sessão", t: null },
    { ico: BookOpen, c: "var(--clay)", bg: "#F4E2DA", v: sessions.length, l: "Sessões registradas", t: null },
  ];

  return (
    <div className="em-pad">
      <div className="em-top">
        <div>
          <div className="eyebrow">Sexta-feira, 29 de maio</div>
          <div className="em-h">Bom dia, Carlos.</div>
        </div>
        <button className="em-btn em-btn-a" onClick={() => go("timer")}>
          <Play size={17} fill="#21160a" /> Iniciar sessão
        </button>
      </div>

      {/* stats */}
      <div className="em-grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 18 }}>
        {stats.map((s, i) => (
          <div className="em-card em-stat" key={i}>
            <div className="ico" style={{ background: s.bg, color: s.c }}><s.ico size={19} /></div>
            <div className="v">{s.v}{s.sm && <small>{s.sm}</small>}</div>
            <div className="l">{s.l}</div>
            {s.t && <div className="trend"><TrendingUp size={13} /> {s.t}</div>}
          </div>
        ))}
      </div>

      <div className="em-grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}>
        {/* chart */}
        <div className="em-card" style={{ padding: "22px 24px" }}>
          <div className="em-sec-h">
            <h4>Horas por dia</h4>
            <span className="em-link">Esta semana <ChevronRight size={14} /></span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={week} barCategoryGap="32%">
              <XAxis dataKey="d" axisLine={false} tickLine={false}
                tick={{ fontSize: 12.5, fill: "#6A746C", fontFamily: "Hanken Grotesk" }} />
              <Tooltip cursor={{ fill: "rgba(31,66,52,.05)" }} wrapperClassName="rc-tip"
                formatter={(v) => [`${v} h`, "Estudo"]} labelStyle={{ color: "#1B241E", fontWeight: 600 }} />
              <Bar dataKey="h" radius={[7, 7, 7, 7]} maxBarSize={34}>
                {week.map((e, i) => <Cell key={i} fill={e.today ? "#D98A3D" : "#1F4234"} fillOpacity={e.today ? 1 : 0.88} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* weekly goal ring */}
        <div className="em-card" style={{ padding: "22px 24px", textAlign: "center" }}>
          <div className="em-sec-h"><h4>Meta semanal</h4></div>
          <div style={{ position: "relative", width: 156, height: 156, margin: "10px auto 6px" }}>
            <svg width="156" height="156" viewBox="0 0 156 156">
              <circle cx="78" cy="78" r="66" fill="none" stroke="#EFEADD" strokeWidth="14" />
              <circle cx="78" cy="78" r="66" fill="none" stroke="#1F4234" strokeWidth="14" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 66}
                strokeDashoffset={2 * Math.PI * 66 * (1 - pct / 100)}
                transform="rotate(-90 78 78)" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <div>
                <div className="mono-num" style={{ fontSize: 32, fontWeight: 600, color: "var(--pine)" }}>{pct}%</div>
                <div style={{ fontSize: 12, color: "var(--soft)" }}>de 12h</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13.5, color: "var(--soft)", lineHeight: 1.5 }}>
            Faltam <b style={{ color: "var(--ink)" }}>{fmtDur(Math.max(0, goal - totalSec))}</b> para bater a meta.
          </div>
        </div>
      </div>

      {/* subjects */}
      <div className="em-card" style={{ padding: "22px 24px", marginTop: 18 }}>
        <div className="em-sec-h">
          <h4>Tempo por matéria</h4>
          <span className="em-link" onClick={() => go("hist")}>Ver histórico <ChevronRight size={14} /></span>
        </div>
        {bySubj.map((s) => (
          <div className="em-subj" key={s.id}>
            <div className="em-dot" style={{ background: s.color }} />
            <div style={{ flex: 1 }}>
              <div className="nm">{s.name}</div>
              <div className="em-track"><i style={{ width: (s.sec / maxSubj) * 100 + "%", background: s.color }} /></div>
            </div>
            <div className="tm">{fmtDur(s.sec)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}