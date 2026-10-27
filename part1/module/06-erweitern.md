# Modul 6: Erweitern – Skills, Slash-Commands, MCP (15 min)

## Lernziele

- Eigene Skills (Slash-Commands) anlegen
- Verstehen, was MCP-Server leisten, und einen einbinden
- Subagents und Hooks als nächste Schritte kennen

## 1. Skills und eigene Slash-Commands

Ein **Skill** ist ein Ordner mit einer `SKILL.md`: wiederverwendbare Anweisungen, die Claude bei passender Aufgabe automatisch lädt oder die du mit `/<name>` aufrufst.

```text
.claude/skills/            Projekt-Skills (ins Git, für das Team)
~/.claude/skills/          Persönliche Skills (alle Projekte)
```

Beispiel `.claude/skills/review/SKILL.md`:

```markdown
---
name: review
description: Reviewt die aktuellen Git-Änderungen auf Bugs, Lesbarkeit und fehlende Tests. Verwenden, wenn ein Code-Review gewünscht ist.
---

# Code Review

1. Führe `git diff` aus und lies die geänderten Dateien.
2. Prüfe auf: Logikfehler, Randfälle, Lesbarkeit, fehlende Tests.
3. Gib eine Tabelle aus: Datei | Zeile | Schweregrad | Befund | Vorschlag.
4. Ändere keinen Code.
```

Aufruf: `/review`. Argumente über `$ARGUMENTS`, z. B. `/review src/cart.js`.

- Die **`description`** entscheidet, wann Claude den Skill automatisch nutzt – konkret formulieren
- Skills können weitere Dateien (Vorlagen, Skripte) im Ordner enthalten
- Der ältere Weg `.claude/commands/<name>.md` funktioniert weiterhin

## 2. MCP – Model Context Protocol

MCP ist ein offener Standard, über den Claude Code **externe Tools und Datenquellen** nutzt: Browser, Datenbanken, Jira, GitHub, Figma, Doku-Server …

```bash
# Lokaler Server (stdio)
claude mcp add chrome-devtools -- npx chrome-devtools-mcp@latest

# Remote-Server (HTTP)
claude mcp add --transport http <name> <url>

# Verwalten
claude mcp list
/mcp            (in der Session: Status, Login)
```

- Gültigkeit: `--scope local` (Standard, nur du), `--scope project` (in `.mcp.json`, fürs Team), `--scope user` (alle deine Projekte)
- **Sicherheit:** Nur vertrauenswürdige Server installieren – ein MCP-Server erhält Zugriff auf Daten und kann Aktionen ausführen

## 3. Ausblick: Was gibt es noch?

| Feature | Kurz erklärt |
|---------|-------------|
| **Subagents** (`/agents`) | Spezialisierte Helfer mit eigenem Kontext, z. B. ein günstiger Haiku-Rechercheur |
| **Hooks** (`/hooks`) | Shell-Befehle, die automatisch bei Ereignissen laufen (z. B. Formatter nach jedem Edit) |
| **Plugins** (`/plugin`) | Pakete aus Skills, Agents, Hooks und MCP-Servern zum Teilen |
| **Headless / CI** | `claude -p "…" --output-format json` in Skripten und Pipelines |
| **Git Worktrees** | Mehrere Claude-Sessions parallel an getrennten Branches |
| **GitHub Actions** | `@claude` in Issues und PRs |

## Sprechernotizen

- Live einen Skill anlegen lassen: "Erstelle einen Skill `review` unter `.claude/skills/` …" – Claude kann seine eigenen Erweiterungen schreiben.
- Hinweis auf Skill-Kataloge (z. B. skills.sh) – fremde Skills vor Nutzung lesen.
