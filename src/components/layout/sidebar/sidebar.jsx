export default function Sidebar({ screen, go, onLogout }) {
  const items = [
    { id: "dash", label: "Visão geral", icon: LayoutDashboard },
    { id: "timer", label: "Cronômetro", icon: Timer },
    { id: "hist", label: "Histórico", icon: HistoryIcon },
    { id: "subj", label: "Matérias", icon: BookOpen },
  ];
  return (
    <aside className="em-side">
      <div className="em-brand">
        <div className="em-logo"><Timer size={20} /></div>
        <div><h1>Estude<b>Mais</b></h1><span>foco · ritmo · progresso</span></div>
      </div>
      <div className="em-navlabel">Menu</div>
      {items.map((it) => (
        <div key={it.id} className={"em-nav" + (screen === it.id ? " on" : "")} onClick={() => go(it.id)}>
          <it.icon size={18} /> {it.label}
        </div>
      ))}
      <div className="em-navlabel">Conta</div>
      <div className="em-nav"><Settings size={18} /> Configurações</div>
      <div className="em-nav" onClick={onLogout}><LogOut size={18} /> Sair</div>

      <div className="em-side-foot">
        <div className="em-user">
          <div className="em-ava">C</div>
          <div><div className="nm">Carlos Eduardo</div><div className="em-em">Plano Pro</div></div>
        </div>
      </div>
    </aside>
  );
}