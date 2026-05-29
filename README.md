# EstudeMais

Aplicativo de cronômetro de estudos — **foco · ritmo · progresso**. Cronometre
qualquer matéria, acompanhe sua evolução semanal e mantenha um histórico
completo do seu progresso.

Feito com **React 18** + **Vite**, usando `lucide-react` para os ícones e
`recharts` para os gráficos.

## Telas

- **Login** — tela de entrada (qualquer botão "Entrar" leva ao app).
- **Visão geral** — estatísticas da semana, gráfico de horas por dia, meta
  semanal e tempo por matéria.
- **Cronômetro** — escolha a matéria e entre no modo foco (conta para cima,
  pausa/retoma, salva a sessão).
- **Histórico** — todas as sessões agrupadas por período, com filtro por matéria.
- **Matérias** — visão por disciplina com tempo total e nº de sessões.

## Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior (inclui o `npm`).

> Se ao rodar `node --version` o terminal não reconhecer o comando, instale o
> Node.js pelo site oficial e reabra o terminal.

## Como rodar

```bash
# 1. Instalar as dependências (só na primeira vez)
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

O Vite abre o app automaticamente no navegador (normalmente em
`http://localhost:5173`).

## Outros comandos

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve localmente o build de produção
```

## Estrutura

```
EstudeMais/
├── index.html          # HTML base
├── package.json        # dependências e scripts
├── vite.config.js      # configuração do Vite
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx        # ponto de entrada (monta o React)
    ├── index.css       # reset mínimo
    └── App.jsx         # todo o app (estilos, telas e lógica)
```
