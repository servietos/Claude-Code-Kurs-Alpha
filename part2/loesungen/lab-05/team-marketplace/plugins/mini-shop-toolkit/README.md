# mini-shop-toolkit

Plugin aus Lab 5 des Claude Code Aufbaukurses. Es bündelt drei Bausteine, die das Team im mini-shop nutzt:

- Skill `/mini-shop-toolkit:review` – Code-Review der aktuellen Git-Änderungen als Befund-Tabelle
- Subagent `code-reviewer` – liest und prüft Änderungen, ohne Code zu ändern
- Hook (PreToolUse auf Bash) – blockiert `npm install`, `npm add`, `yarn add` und `pnpm add`, weil das Projekt keine externen Abhängigkeiten erlaubt

Voraussetzung: Node.js 20 oder neuer, weil der Hook ein Node-Skript ist.
