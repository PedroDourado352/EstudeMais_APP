import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Timer, Play, Pause, Square, BookOpen, LayoutDashboard, History as HistoryIcon,
  Settings, LogOut, Flame, Clock, Target, Plus, Search, ArrowLeft, ArrowRight,
  TrendingUp, Check, MoreHorizontal, ChevronRight,
} from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

/* ------------------------------------------------------------------ */
/*  Estilos (CSS próprio — controle total de fontes, cores, texturas) */
/* ------------------------------------------------------------------ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');

.em * { box-sizing: border-box; margin: 0; padding: 0; }
.em {
  --bg:#F6F2E9; --bg2:#EFEADD; --surface:#FFFFFF;
  --ink:#1B241E; --soft:#6A746C; --line:#E6E0D2;
  --pine:#1F4234; --pine2:#2C5C47; --pine-dark:#15271E;
  --amber:#D98A3D; --amber-soft:#F3E2CB;
  --sage:#5E8C6A; --slate:#5B7A8C; --clay:#C4623D; --plum:#7E6AA6;
  --r:18px;
  font-family:'Hanken Grotesk',sans-serif;
  color:var(--ink); background:var(--bg);
  -webkit-font-smoothing:antialiased;
  height:100%; width:100%;
}
.em .display { font-family:'Fraunces',serif; font-optical-sizing:auto; letter-spacing:-0.01em; }
.em .mono-num { font-family:'Fraunces',serif; font-variant-numeric:tabular-nums; letter-spacing:-0.02em; }

/* ---------- App shell ---------- */
.em-shell { display:flex; height:100vh; overflow:hidden; position:relative; }
.em-bgtex { position:absolute; inset:0; pointer-events:none; z-index:0;
  background:
    radial-gradient(900px 500px at 88% -8%, rgba(217,138,61,.10), transparent 60%),
    radial-gradient(700px 500px at -5% 110%, rgba(31,66,52,.10), transparent 60%);
}

/* ---------- Sidebar ---------- */
.em-side { width:250px; flex:none; background:var(--bg2); border-right:1px solid var(--line);
  display:flex; flex-direction:column; padding:24px 16px; z-index:2; position:relative; }
.em-brand { display:flex; align-items:center; gap:11px; padding:6px 10px 22px; }
.em-logo { width:38px; height:38px; border-radius:11px; background:var(--pine); color:#F6F2E9;
  display:grid; place-items:center; box-shadow:0 6px 16px rgba(31,66,52,.28); }
.em-brand h1 { font-size:20px; font-weight:600; line-height:1; }
.em-brand h1 b { color:var(--pine); font-weight:700; }
.em-brand span { display:block; font-size:11px; color:var(--soft); margin-top:3px; letter-spacing:.04em; }
.em-navlabel { font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--soft);
  padding:14px 12px 8px; }
.em-nav { display:flex; align-items:center; gap:12px; padding:11px 12px; border-radius:12px;
  color:var(--soft); font-size:14.5px; font-weight:500; cursor:pointer; transition:.16s;
  border:1px solid transparent; }
.em-nav:hover { background:#fff; color:var(--ink); }
.em-nav.on { background:var(--pine); color:#F6F2E9; box-shadow:0 8px 18px rgba(31,66,52,.22); }
.em-side-foot { margin-top:auto; }
.em-user { display:flex; align-items:center; gap:11px; padding:10px; border-radius:12px;
  background:#fff; border:1px solid var(--line); }
.em-ava { width:36px;height:36px;border-radius:10px; background:var(--amber); color:#fff;
  display:grid;place-items:center;font-weight:700;font-size:14px; flex:none; }
.em-user .nm { font-size:13.5px; font-weight:600; line-height:1.2; }
.em-user .em-em { font-size:11.5px; color:var(--soft); }

/* ---------- Main ---------- */
.em-main { flex:1; overflow-y:auto; z-index:1; position:relative; }
.em-pad { padding:34px 44px 60px; max-width:1080px; }
.em-top { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:30px; gap:16px; }
.em-top .eyebrow { font-size:12.5px; color:var(--soft); letter-spacing:.06em; margin-bottom:6px; }
.em-h { font-family:'Fraunces',serif; font-size:34px; font-weight:600; line-height:1.05; }

/* ---------- Buttons ---------- */
.em-btn { border:none; cursor:pointer; font-family:inherit; font-weight:600; font-size:14.5px;
  display:inline-flex; align-items:center; gap:9px; padding:12px 20px; border-radius:13px; transition:.16s; }
.em-btn-p { background:var(--pine); color:#F6F2E9; box-shadow:0 10px 22px rgba(31,66,52,.26); }
.em-btn-p:hover { background:var(--pine2); transform:translateY(-1px); }
.em-btn-a { background:var(--amber); color:#21160a; box-shadow:0 10px 22px rgba(217,138,61,.3); }
.em-btn-a:hover { filter:brightness(1.04); transform:translateY(-1px); }
.em-btn-g { background:#fff; color:var(--ink); border:1px solid var(--line); }
.em-btn-g:hover { border-color:#cfc8b6; }

/* ---------- Cards ---------- */
.em-card { background:var(--surface); border:1px solid var(--line); border-radius:var(--r);
  box-shadow:0 1px 2px rgba(27,36,30,.03); }
.em-grid { display:grid; gap:18px; }

/* hero */
.em-hero { grid-column:1/-1; background:linear-gradient(135deg,var(--pine) 0%,var(--pine-dark) 100%);
  color:#F3EEE2; border-radius:22px; padding:30px 32px; position:relative; overflow:hidden;
  display:flex; justify-content:space-between; align-items:center; gap:24px; }
.em-hero .ring { position:absolute; right:-60px; top:-70px; width:280px; height:280px; border-radius:50%;
  border:30px solid rgba(217,138,61,.16); }
.em-hero .ring2 { position:absolute; right:30px; bottom:-110px; width:200px; height:200px; border-radius:50%;
  border:18px solid rgba(255,255,255,.06); }
.em-hero h3 { font-family:'Fraunces',serif; font-size:25px; font-weight:600; margin-bottom:6px; }
.em-hero p { color:#C6D3C9; font-size:14.5px; max-width:330px; line-height:1.5; }

/* stat */
.em-stat { padding:20px 22px; }
.em-stat .ico { width:38px;height:38px;border-radius:11px; display:grid;place-items:center; margin-bottom:14px; }
.em-stat .v { font-family:'Fraunces',serif; font-size:30px; font-weight:600; line-height:1; }
.em-stat .v small { font-size:16px; color:var(--soft); font-weight:500; margin-left:3px; }
.em-stat .l { font-size:13px; color:var(--soft); margin-top:7px; }
.em-stat .trend { font-size:12px; font-weight:600; color:var(--sage); display:inline-flex; gap:4px;
  align-items:center; margin-top:9px; }

.em-sec-h { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
.em-sec-h h4 { font-family:'Fraunces',serif; font-size:18px; font-weight:600; }
.em-link { font-size:13px; color:var(--pine); font-weight:600; cursor:pointer; display:inline-flex;
  gap:4px; align-items:center; }

/* subject rows */
.em-subj { display:flex; align-items:center; gap:14px; padding:14px 0; border-top:1px solid var(--line); }
.em-subj:first-child { border-top:none; }
.em-dot { width:11px;height:11px;border-radius:50%; flex:none; }
.em-subj .nm { font-weight:600; font-size:14.5px; }
.em-track { height:7px; border-radius:5px; background:var(--bg2); overflow:hidden; margin-top:7px; }
.em-track > i { display:block; height:100%; border-radius:5px; }
.em-subj .tm { font-family:'Fraunces',serif; font-weight:600; font-size:15px; flex:none; }

/* chips */
.em-chip { padding:8px 15px; border-radius:11px; border:1px solid var(--line); background:#fff;
  font-size:13.5px; font-weight:600; cursor:pointer; transition:.15s; display:inline-flex;
  align-items:center; gap:8px; color:var(--soft); }
.em-chip:hover { border-color:#cfc8b6; }
.em-chip.on { background:var(--ink); color:#F6F2E9; border-color:var(--ink); }

/* history */
.em-group-l { font-size:12.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--soft);
  margin:26px 0 10px; font-weight:600; }
.em-row { display:flex; align-items:center; gap:16px; padding:16px 20px; }
.em-row + .em-row { border-top:1px solid var(--line); }
.em-row .tag { width:42px;height:42px;border-radius:12px; display:grid;place-items:center; flex:none; }
.em-row .nm { font-weight:600; font-size:14.5px; }
.em-row .meta { font-size:12.5px; color:var(--soft); margin-top:2px; }
.em-row .dur { font-family:'Fraunces',serif; font-weight:600; font-size:17px; }

/* ---------- Login ---------- */
.em-login { display:flex; height:100vh; }
.em-art { flex:1.05; background:linear-gradient(150deg,var(--pine) 0%,var(--pine-dark) 100%);
  color:#F3EEE2; padding:54px; display:flex; flex-direction:column; position:relative; overflow:hidden; }
.em-art .glow { position:absolute; width:420px;height:420px;border-radius:50%;
  background:radial-gradient(circle, rgba(217,138,61,.34), transparent 65%); right:-120px; top:-80px; }
.em-art .rings { position:absolute; left:-90px; bottom:-120px; width:360px; height:360px; }
.em-art .rings i { position:absolute; border-radius:50%; border:1.5px solid rgba(255,255,255,.12); inset:0; }
.em-art .rings i:nth-child(2){ inset:42px; } .em-art .rings i:nth-child(3){ inset:84px; }
.em-art .rings i:nth-child(4){ inset:126px; border-color:rgba(217,138,61,.4); }
.em-art-brand { display:flex; align-items:center; gap:13px; position:relative; z-index:2; }
.em-art-brand .lg { width:44px;height:44px;border-radius:12px; background:rgba(255,255,255,.12);
  display:grid;place-items:center; backdrop-filter:blur(4px); }
.em-art-brand h1 { font-family:'Fraunces',serif; font-size:23px; font-weight:600; }
.em-art-mid { margin-top:auto; position:relative; z-index:2; }
.em-art-mid h2 { font-family:'Fraunces',serif; font-size:42px; font-weight:600; line-height:1.08;
  letter-spacing:-0.015em; max-width:440px; }
.em-art-mid p { color:#BFD0C4; font-size:16px; line-height:1.6; max-width:400px; margin-top:18px; }
.em-art-stats { display:flex; gap:36px; margin-top:40px; position:relative; z-index:2; }
.em-art-stats .v { font-family:'Fraunces',serif; font-size:28px; font-weight:600; }
.em-art-stats .l { font-size:12.5px; color:#A9BDB0; margin-top:2px; }

.em-form-wrap { flex:1; display:flex; align-items:center; justify-content:center; padding:40px; background:var(--bg); }
.em-form { width:100%; max-width:380px; }
.em-form .welcome { font-family:'Fraunces',serif; font-size:30px; font-weight:600; }
.em-form .sub { color:var(--soft); font-size:14.5px; margin-top:8px; margin-bottom:30px; }
.em-field { margin-bottom:16px; }
.em-field label { display:block; font-size:13px; font-weight:600; margin-bottom:7px; color:var(--ink); }
.em-input { width:100%; padding:13px 15px; border-radius:12px; border:1px solid var(--line);
  background:#fff; font-family:inherit; font-size:14.5px; color:var(--ink); transition:.15s; }
.em-input:focus { outline:none; border-color:var(--pine); box-shadow:0 0 0 3px rgba(31,66,52,.1); }
.em-input::placeholder { color:#b3aD9c; }
.em-forgot { text-align:right; font-size:13px; color:var(--pine); font-weight:600; cursor:pointer;
  margin:-4px 0 22px; }
.em-divider { display:flex; align-items:center; gap:14px; margin:22px 0; color:var(--soft); font-size:12.5px; }
.em-divider:before, .em-divider:after { content:''; flex:1; height:1px; background:var(--line); }
.em-social { width:100%; justify-content:center; }
.em-foot-t { text-align:center; font-size:13.5px; color:var(--soft); margin-top:26px; }
.em-foot-t b { color:var(--pine); cursor:pointer; }

/* ---------- Focus mode ---------- */
.em-focus { position:fixed; inset:0; z-index:50; background:linear-gradient(160deg,#15271E,#0E1B14);
  color:#EFEAD9; display:flex; flex-direction:column; align-items:center; justify-content:center;
  padding:40px; }
.em-focus .fx-top { position:absolute; top:26px; left:30px; right:30px; display:flex; justify-content:space-between; align-items:center; }
.em-focus .fx-back { display:inline-flex; align-items:center; gap:8px; color:#9FB3A6; font-size:14px;
  background:none; border:none; cursor:pointer; font-family:inherit; }
.em-focus .fx-subj { display:inline-flex; align-items:center; gap:9px; background:rgba(255,255,255,.07);
  padding:8px 16px; border-radius:30px; font-size:14px; font-weight:600; }
.em-ringwrap { position:relative; width:330px; height:330px; display:grid; place-items:center; }
.em-ringwrap .lbl { position:absolute; top:64px; font-size:13px; letter-spacing:.16em; text-transform:uppercase; color:#88A091; }
.em-ringwrap .big { font-family:'Fraunces',serif; font-size:62px; font-weight:600; font-variant-numeric:tabular-nums; letter-spacing:-0.02em; }
.em-ringwrap .state { position:absolute; bottom:70px; font-size:13px; color:#88A091; }
.em-fx-ctrl { display:flex; gap:16px; margin-top:46px; }
.em-fx-btn { width:62px;height:62px;border-radius:50%; border:none; cursor:pointer; display:grid;
  place-items:center; transition:.15s; }
.em-fx-btn.main { width:78px;height:78px; background:var(--amber); color:#21160a; box-shadow:0 12px 30px rgba(217,138,61,.4); }
.em-fx-btn.main:hover { transform:scale(1.05); }
.em-fx-btn.ghost { background:rgba(255,255,255,.08); color:#EFEAD9; }
.em-fx-btn.ghost:hover { background:rgba(255,255,255,.16); }

.rc-tip { background:#fff!important; border:1px solid var(--line)!important; border-radius:10px!important;
  font-family:'Hanken Grotesk'!important; font-size:12.5px!important; box-shadow:0 8px 24px rgba(0,0,0,.08)!important; }

@media (max-width: 900px){
  .em-art { display:none; }
  .em-side { display:none; }
  .em-pad { padding:24px 18px 50px; }
  .em-top { flex-direction:column; align-items:flex-start; }
}
`;

/* ------------------------------------------------------------------ */
/*  Dados                                                             */
/* ------------------------------------------------------------------ */
const SUBJECTS = [
  { id: "mat", name: "Matemática", color: "#1F4234" },
  { id: "red", name: "Redação",   color: "#D98A3D" },
  { id: "fis", name: "Física",    color: "#C4623D" },
  { id: "his", name: "História",  color: "#5B7A8C" },
  { id: "bio", name: "Biologia",  color: "#5E8C6A" },
  { id: "ing", name: "Inglês",    color: "#7E6AA6" },
];
const SMAP = Object.fromEntries(SUBJECTS.map((s) => [s.id, s]));
const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const TODAY = 4; // Sexta

const SEED = [
  { id: 1, subj: "mat", sec: 95 * 60, dayIdx: 4, when: "Hoje · 08:10", group: "Hoje", note: "Trigonometria — listas 3 e 4" },
  { id: 2, subj: "red", sec: 50 * 60, dayIdx: 4, when: "Hoje · 06:40", group: "Hoje", note: "Dissertação — tese e repertório" },
  { id: 3, subj: "fis", sec: 70 * 60, dayIdx: 3, when: "Ontem · 19:20", group: "Ontem", note: "Cinemática" },
  { id: 4, subj: "his", sec: 40 * 60, dayIdx: 3, when: "Ontem · 15:05", group: "Ontem", note: "Era Vargas" },
  { id: 5, subj: "bio", sec: 60 * 60, dayIdx: 2, when: "Qua · 20:00", group: "Esta semana", note: "Genética — leis de Mendel" },
  { id: 6, subj: "mat", sec: 110 * 60, dayIdx: 1, when: "Ter · 09:30", group: "Esta semana", note: "Geometria espacial" },
  { id: 7, subj: "ing", sec: 45 * 60, dayIdx: 0, when: "Seg · 18:00", group: "Esta semana", note: "Reading — past perfect" },
  { id: 8, subj: "red", sec: 55 * 60, dayIdx: 0, when: "Seg · 07:15", group: "Esta semana", note: "Correção de redação" },
];

/* helpers */
const fmtDur = (s) => {
  const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
  return h ? `${h}h${m ? " " + m + "min" : ""}` : `${m}min`;
};
const fmtClock = (s) => {
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
};

/* ------------------------------------------------------------------ */
/*  Login                                                            */
/* ------------------------------------------------------------------ */
function Login({ onEnter }) {
  const [email, setEmail] = useState("carlos@estudemais.app");
  const [pass, setPass] = useState("••••••••");
  return (
    <div className="em-login">
      <div className="em-art">
        <div className="glow" /><div className="rings"><i /><i /><i /><i /></div>
        <div className="em-art-brand">
          <div className="lg"><Timer size={24} /></div>
          <h1>EstudeMais</h1>
        </div>
        <div className="em-art-mid">
          <h2>Cada minuto de estudo, no lugar certo.</h2>
          <p>Cronometre qualquer matéria, acompanhe sua evolução e mantenha o ritmo
             com um histórico completo do seu progresso.</p>
          <div className="em-art-stats">
            <div><div className="v">8h 45</div><div className="l">esta semana</div></div>
            <div><div className="v">12</div><div className="l">dias seguidos</div></div>
            <div><div className="v">+24%</div><div className="l">vs. semana passada</div></div>
          </div>
        </div>
      </div>

      <div className="em-form-wrap">
        <div className="em-form">
          <div className="welcome">Bem-vindo de volta 👋</div>
          <div className="sub">Entre para continuar de onde parou.</div>

          <div className="em-field">
            <label>E-mail</label>
            <input className="em-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
          </div>
          <div className="em-field">
            <label>Senha</label>
            <input className="em-input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="sua senha" />
          </div>
          <div className="em-forgot">Esqueci minha senha</div>

          <button className="em-btn em-btn-p" style={{ width: "100%", justifyContent: "center" }} onClick={onEnter}>
            Entrar <ArrowRight size={17} />
          </button>

          <div className="em-divider">ou continue com</div>
          <button className="em-btn em-btn-g em-social" onClick={onEnter}>
            <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-7.8Z"/><path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M6 14.4a6.6 6.6 0 0 1 0-4.2V7.4H2.3a11 11 0 0 0 0 9.8L6 14.4Z"/><path fill="#EA4335" d="M12 5.5c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.4L6 10.2c.9-2.6 3.2-4.7 6-4.7Z"/></svg>
            Entrar com Google
          </button>

          <div className="em-foot-t">Ainda não tem conta? <b>Criar conta grátis</b></div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                          */
/* ------------------------------------------------------------------ */
function Sidebar({ screen, go, onLogout }) {
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

/* ------------------------------------------------------------------ */
/*  Dashboard                                                        */
/* ------------------------------------------------------------------ */
function Dashboard({ sessions, go }) {
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

/* ------------------------------------------------------------------ */
/*  Tela do cronômetro (seleção + modo foco)                         */
/* ------------------------------------------------------------------ */
function TimerScreen({ onSave }) {
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

/* ------------------------------------------------------------------ */
/*  Histórico                                                        */
/* ------------------------------------------------------------------ */
function HistoryScreen({ sessions }) {
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

/* ------------------------------------------------------------------ */
/*  Matérias (tela simples de apoio)                                 */
/* ------------------------------------------------------------------ */
function SubjectsScreen({ sessions }) {
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

/* ------------------------------------------------------------------ */
/*  App                                                              */
/* ------------------------------------------------------------------ */
export default function App() {
  const [logged, setLogged] = useState(false);
  const [screen, setScreen] = useState("dash");
  const [sessions, setSessions] = useState(SEED);

  const saveSession = (subj, sec) => {
    setSessions((prev) => [
      { id: Date.now(), subj, sec, dayIdx: TODAY, when: "Agora mesmo", group: "Hoje", note: "Sessão cronometrada" },
      ...prev,
    ]);
    setScreen("hist");
  };

  return (
    <div className="em">
      <style>{STYLES}</style>
      {!logged ? (
        <Login onEnter={() => setLogged(true)} />
      ) : (
        <div className="em-shell">
          <div className="em-bgtex" />
          <Sidebar screen={screen} go={setScreen} onLogout={() => setLogged(false)} />
          <main className="em-main">
            {screen === "dash" && <Dashboard sessions={sessions} go={setScreen} />}
            {screen === "timer" && <TimerScreen onSave={saveSession} />}
            {screen === "hist" && <HistoryScreen sessions={sessions} />}
            {screen === "subj" && <SubjectsScreen sessions={sessions} />}
          </main>
        </div>
      )}
    </div>
  );
}
