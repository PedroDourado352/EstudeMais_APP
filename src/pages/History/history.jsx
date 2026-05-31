export default function HistoryScreen({ sessions }) {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? sessions : sessions.filter((s) => s.subj === filter);
  const total = list.reduce((a, s) => a + s.sec, 0);

  const groups = useMemo(() => {
    const order = ["Hoje", "Ontem", "Esta semana"];
    const g = {};
    list.forEach((s) => (g[s.group] = g[s.group] || []).push(s));
    return order.filter((k) => g[k]).map((k) => [k, g[k]]);
  }, [list]);

  return (
    <div className="em-pad">
      <div className="em-top">
        <div>
          <div className="eyebrow">Histórico</div>
          <div className="em-h">Tudo que você estudou</div>
        </div>
        <div className="em-card" style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 12.5, color: "var(--soft)" }}>Total filtrado</div>
          <div className="mono-num" style={{ fontSize: 22, fontWeight: 600, color: "var(--pine)" }}>{fmtDur(total)}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 6 }}>
        <div className={"em-chip" + (filter === "all" ? " on" : "")} onClick={() => setFilter("all")}>Todas</div>
        {SUBJECTS.map((s) => (
          <div key={s.id} className={"em-chip" + (filter === s.id ? " on" : "")} onClick={() => setFilter(s.id)}>
            <span className="em-dot" style={{ background: filter === s.id ? "#F6F2E9" : s.color }} /> {s.name}
          </div>
        ))}
      </div>

      {groups.map(([label, rows]) => (
        <div key={label}>
          <div className="em-group-l">{label}</div>
          <div className="em-card">
            {rows.map((s) => {
              const sj = SMAP[s.subj];
              return (
                <div className="em-row" key={s.id}>
                  <div className="tag" style={{ background: sj.color + "1F", color: sj.color }}><BookOpen size={19} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="nm">{sj.name}</div>
                    <div className="meta">{s.note} · {s.when}</div>
                  </div>
                  <div className="dur">{fmtDur(s.sec)}</div>
                  <MoreHorizontal size={18} color="#B8B0A0" style={{ marginLeft: 8 }} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}