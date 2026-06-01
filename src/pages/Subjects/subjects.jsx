import { Plus, BookOpen } from "lucide-react";

import { SUBJECTS } from "../../data/subjects";
import { fmtDur } from "../../utils/time";

export default function SubjectsScreen({ sessions }) {
  const agg = SUBJECTS.map((s) => ({
    ...s,
    sec: sessions.filter((x) => x.subj === s.id).reduce((a, x) => a + x.sec, 0),
    count: sessions.filter((x) => x.subj === s.id).length,
  }));
  return (
    <div className="em-pad">
      <div className="em-top">
        <div><div className="eyebrow">Matérias</div><div className="em-h">Suas disciplinas</div></div>
        <button className="em-btn em-btn-g"><Plus size={17} /> Nova matéria</button>
      </div>
      <div className="em-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        {agg.map((s) => (
          <div className="em-card" key={s.id} style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="tag" style={{ width: 44, height: 44, borderRadius: 12, background: s.color + "1F", color: s.color, display: "grid", placeItems: "center" }}>
                <BookOpen size={20} />
              </div>
              <span className="em-dot" style={{ background: s.color, width: 14, height: 14 }} />
            </div>
            <div style={{ fontFamily: "Fraunces,serif", fontSize: 19, fontWeight: 600, marginTop: 16 }}>{s.name}</div>
            <div style={{ fontSize: 13, color: "var(--soft)", marginTop: 4 }}>{s.count} sessões registradas</div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 12.5, color: "var(--soft)" }}>Tempo total</span>
              <span className="mono-num" style={{ fontSize: 20, fontWeight: 600, color: s.color }}>{fmtDur(s.sec)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}