# Claude Code Aufbaukurs (4 Stunden, mit Labs)

Fortsetzung des [Basiskurses](../part1/README.md). Der Basiskurs zeigt, wie man mit Claude Code arbeitet. Der Aufbaukurs zeigt, wie man Claude Code für ein Team einrichtet, automatisiert und erweitert: Subagents, Hooks, Headless-Betrieb und CI, paralleles Arbeiten mit Worktrees und Hintergrund-Sessions, Plugins.

## Zielgruppe und Voraussetzungen

- Teilnahme am Basiskurs oder gleichwertige Praxis: `CLAUDE.md`, Plan Mode, Berechtigungen, Rewind und Skills sind bekannt
- Laptop mit **Node.js ≥ 20**, **Git**, **Claude Code ≥ 2.1** (`claude --version`)
- Claude-Konto (Pro, Max, Team, Enterprise) oder API-Key
- Für Lab 3 (Headless): Die Aufrufe verbrauchen Kontingent bzw. Guthaben. Im Test kostete der erste Aufruf in einem neuen Ordner ca. 0,20 USD, weitere Aufrufe wenige Cent.

## Lernziele

1. Eigene Subagents mit eingeschränkten Tools und passendem Modell anlegen und gezielt einsetzen
2. Hooks schreiben, die Regeln erzwingen und Tests automatisch ausführen
3. Claude Code ohne Dialog in Skripten und CI einsetzen, mit strukturierter JSON-Ausgabe
4. Mehrere Sessions parallel in Git Worktrees und im Hintergrund laufen lassen
5. Skills, Agents und Hooks als Plugin bündeln und über einen eigenen Marketplace im Team verteilen

## Agenda

| Zeit | Dauer | Block | Material |
|------|-------|-------|----------|
| 0:00 | 15 min | Einstieg: Wiederholung, Projekt vorbereiten | [module/00-einstieg.md](module/00-einstieg.md) |
| 0:15 | 15 min | Modul 1: Subagents | [module/01-subagents.md](module/01-subagents.md) |
| 0:30 | 25 min | **Lab 1:** Reviewer und Testschreiber | [labs/lab-01-subagents.md](labs/lab-01-subagents.md) |
| 0:55 | 15 min | Modul 2: Hooks | [module/02-hooks.md](module/02-hooks.md) |
| 1:10 | 30 min | **Lab 2:** Regeln erzwingen, Tests automatisch | [labs/lab-02-hooks.md](labs/lab-02-hooks.md) |
| 1:40 | 10 min | ☕ Pause | |
| 1:50 | 15 min | Modul 3: Headless und CI | [module/03-headless-ci.md](module/03-headless-ci.md) |
| 2:05 | 25 min | **Lab 3:** Claude in Skripten | [labs/lab-03-headless.md](labs/lab-03-headless.md) |
| 2:30 | 10 min | Modul 4: Parallel arbeiten | [module/04-parallel.md](module/04-parallel.md) |
| 2:40 | 20 min | **Lab 4:** Zwei Features gleichzeitig | [labs/lab-04-worktrees.md](labs/lab-04-worktrees.md) |
| 3:00 | 10 min | ☕ Pause | |
| 3:10 | 10 min | Modul 5: Plugins und Marketplaces | [module/05-plugins.md](module/05-plugins.md) |
| 3:20 | 25 min | **Lab 5:** Ein Team-Plugin bauen | [labs/lab-05-plugin.md](labs/lab-05-plugin.md) |
| 3:45 | 15 min | Abschluss: Quiz, Q&A | [quiz.md](quiz.md), [cheatsheet.md](cheatsheet.md) |

**Verhältnis:** ca. 80 min Theorie/Demo inkl. Einstieg · 125 min Labs · 20 min Pausen · 15 min Abschluss.

## Ordnerstruktur

```text
part2/
├── README.md              Diese Übersicht und Agenda
├── trainer-leitfaden.md   Vorbereitung, Lösungen, Windows-Stolperfallen
├── cheatsheet.md          Befehle und Dateiformate auf einen Blick
├── quiz.md                Wissenscheck mit Lösungen
├── module/                Theorie je Modul (inkl. Sprechernotizen)
├── labs/                  Schritt-für-Schritt-Anleitungen
└── loesungen/             Fertige, getestete Dateien je Lab
    ├── lab-01/.claude/agents/     code-reviewer.md, test-writer.md
    ├── lab-02/.claude/            settings.json mit Hooks, hooks/*.mjs
    ├── lab-03/                    Skripte für Headless und CI
    └── lab-05/team-marketplace/   Marketplace mit Plugin mini-shop-toolkit
```

## Übungsprojekt

Grundlage ist der mini-shop im Endstand des Basiskurses: [`../part1/starter/mini-shop-solution`](../part1/starter/mini-shop-solution/README.md). `CLAUDE.md`, Berechtigungen und der `/review`-Skill sind dort schon enthalten, 11 Tests grün.

Vorbereitung siehe [module/00-einstieg.md](module/00-einstieg.md#3-projekt-vorbereiten-7-min).
