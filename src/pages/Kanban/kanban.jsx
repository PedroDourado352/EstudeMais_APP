import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

import { SUBJECTS, SMAP } from "../../data/subjects";

const COLS = [
  { id: "todo", label: "A fazer" },
  { id: "doing", label: "Fazendo" },
  { id: "paused", label: "Pausado" },
  { id: "done", label: "Concluído" },
];

const SEED_TASKS = [
  { id: 1, title: "Revisar trigonometria — listas 3 e 4", subj: "mat", col: "todo" },
  { id: 2, title: "Treino de redação dissertativa", subj: "red", col: "todo" },
  { id: 3, title: "Lista de cinemática", subj: "fis", col: "doing" },
  { id: 4, title: "Resumo: Era Vargas", subj: "his", col: "done" },
];

export default function KanbanScreen() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : SEED_TASKS;
  });
  const [drafts, setDrafts] = useState({});
  const [dragId, setDragId] = useState(null);
  const [overCol, setOverCol] = useState(null);

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (col) => {
    const title = (drafts[col] || "").trim();
    if (!title) return;
    setTasks((t) => [...t, { id: Date.now(), title, subj: SUBJECTS[0].id, col }]);
    setDrafts((d) => ({ ...d, [col]: "" }));
  };

  const removeTask = (id) => setTasks((t) => t.filter((x) => x.id !== id));

  const dropOn = (col) => {
    if (dragId != null) {
      setTasks((t) => t.map((x) => (x.id === dragId ? { ...x, col } : x)));
    }
    setDragId(null);
    setOverCol(null);
  };

  return (
    <div className="em-pad">
      <div className="em-top">
        <div>
          <div className="eyebrow">Tarefas</div>
          <div className="em-h">Quadro de estudos</div>
        </div>
      </div>

      <div className="em-kanban">
        {COLS.map((c) => {
          const here = tasks.filter((t) => t.col === c.id);
          return (
            <div
              key={c.id}
              className={"em-kb-col" + (overCol === c.id ? " over" : "")}
              onDragOver={(e) => {
                e.preventDefault();
                setOverCol(c.id);
              }}
              onDragLeave={() => setOverCol((o) => (o === c.id ? null : o))}
              onDrop={() => dropOn(c.id)}
            >
              <div className="em-kb-head">
                <h4>{c.label}</h4>
                <span className="em-kb-count">{here.length}</span>
              </div>

              {here.map((t) => {
                const subj = SMAP[t.subj];
                return (
                  <div
                    key={t.id}
                    className="em-kb-card"
                    draggable
                    onDragStart={() => setDragId(t.id)}
                    onDragEnd={() => {
                      setDragId(null);
                      setOverCol(null);
                    }}
                  >
                    <span className="em-dot" style={{ background: subj?.color, marginTop: 5 }} />
                    <span className="t">{t.title}</span>
                    <button className="em-kb-del" onClick={() => removeTask(t.id)} title="Remover">
                      <X size={15} />
                    </button>
                  </div>
                );
              })}

              <div className="em-kb-add">
                <input
                  placeholder="Nova tarefa…"
                  value={drafts[c.id] || ""}
                  onChange={(e) => setDrafts((d) => ({ ...d, [c.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addTask(c.id)}
                />
                <button onClick={() => addTask(c.id)} title="Adicionar">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
