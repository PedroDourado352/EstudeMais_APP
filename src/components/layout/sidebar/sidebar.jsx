import { useState } from "react";
import {
  Timer,
  LayoutDashboard,
  History as HistoryIcon,
  BookOpen,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  ClipboardList,
} from "lucide-react";

export default function Sidebar({ screen, go, onLogout }) {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebarCollapsed") === "1"
  );

  const toggle = () =>
    setCollapsed((c) => {
      localStorage.setItem("sidebarCollapsed", c ? "0" : "1");
      return !c;
    });

  const items = [
    { id: "dash", label: "Visão geral", icon: LayoutDashboard },
    { id: "timer", label: "Cronômetro", icon: Timer },
    { id: "hist", label: "Histórico", icon: HistoryIcon },
    { id: "subj", label: "Matérias", icon: BookOpen },
    { id: "kanban", label: "Tarefas", icon: ClipboardList },
  ];

  return (
    <aside className={"em-side" + (collapsed ? " mini" : "")}>
      <div className="em-brand">
        <div className="em-logo"><Timer size={20} /></div>
        {!collapsed && (
          <div><h1>Estude Mais</h1><span>foco · ritmo · progresso</span></div>
        )}
        <button
          className="em-collapse"
          onClick={toggle}
          title={collapsed ? "Expandir menu" : "Recolher menu"}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {!collapsed && <div className="em-navlabel">Menu</div>}
      {items.map((it) => (
        <div
          key={it.id}
          className={"em-nav" + (screen === it.id ? " on" : "")}
          onClick={() => go(it.id)}
          title={collapsed ? it.label : undefined}
        >
          <it.icon size={18} /> {!collapsed && it.label}
        </div>
      ))}

      {!collapsed && <div className="em-navlabel">Conta</div>}
      <div
        className={"em-nav" + (screen === "settings" ? " on" : "")}
        onClick={() => go("settings")}
        title={collapsed ? "Configurações" : undefined}
      >
        <Settings size={18} /> {!collapsed && "Configurações"}
      </div>
      <div
        className="em-nav"
        onClick={onLogout}
        title={collapsed ? "Sair" : undefined}
      >
        <LogOut size={18} /> {!collapsed && "Sair"}
      </div>

      <div className="em-side-foot">
        <div className="em-user">
          <div className="em-ava">C</div>
          {!collapsed && (
            <div><div className="nm">Carlos Eduardo</div><div className="em-em">Plano Pro</div></div>
          )}
        </div>
      </div>
    </aside>
  );
}
