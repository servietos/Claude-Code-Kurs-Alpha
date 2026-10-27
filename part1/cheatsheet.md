# Claude Code Cheatsheet

## Starten

| Befehl | Wirkung |
|--------|---------|
| `claude` | Interaktive Session im aktuellen Ordner |
| `claude "Aufgabe"` | Session mit erstem Prompt |
| `claude -c` | Letzte Session fortsetzen |
| `claude -r` | Session auswählen und fortsetzen |
| `claude -p "Aufgabe"` | Headless, Ergebnis auf stdout |
| `claude --model opus` | Mit bestimmtem Modell starten |
| `claude --permission-mode plan` | Im Plan Mode starten |
| `claude mcp add …` / `claude mcp list` | MCP-Server verwalten |
| `claude doctor` / `claude update` | Diagnose / Update |

## In der Session

| Eingabe | Wirkung |
|---------|---------|
| `@pfad` | Datei/Ordner in den Kontext holen |
| `!befehl` | Shell-Befehl direkt ausführen |
| `/befehl` | Slash-Command oder Skill |
| `Esc` | Unterbrechen |
| `Esc` `Esc` | Rewind (Checkpoint wählen) |
| `Shift+Tab` | Modus wechseln: default → acceptEdits → plan |
| `Shift+Enter` | Zeilenumbruch |
| `Ctrl+C` (2×) | Beenden |

## Wichtige Slash-Commands

| Befehl | Wirkung |
|--------|---------|
| `/init` | `CLAUDE.md` erzeugen |
| `/memory` | Memory-Dateien bearbeiten |
| `/clear` | Kontext leeren |
| `/compact [Fokus]` | Kontext zusammenfassen |
| `/context` | Kontextbelegung anzeigen |
| `/model` | Modell wechseln |
| `/permissions` | Berechtigungsregeln |
| `/rewind` | Checkpoint wiederherstellen |
| `/resume` | Frühere Session laden |
| `/usage` | Verbrauch / Limits |
| `/mcp` | MCP-Status |
| `/agents` · `/hooks` · `/plugin` | Erweiterungen verwalten |
| `/status` · `/config` · `/help` | Status, Einstellungen, Hilfe |

## Dateien

| Pfad | Inhalt |
|------|--------|
| `CLAUDE.md` | Projektgedächtnis (Team) |
| `~/.claude/CLAUDE.md` | Persönliches Gedächtnis |
| `.claude/settings.json` | Team-Einstellungen, Berechtigungen |
| `.claude/settings.local.json` | Persönliche Projekteinstellungen (nicht ins Git) |
| `.claude/skills/<name>/SKILL.md` | Projekt-Skills |
| `.mcp.json` | Projekt-MCP-Server |

## Goldene Regeln

1. Im Projektordner starten, vorher committen
2. Erkunden → Planen → Umsetzen → Prüfen
3. Konkret prompten: Ziel, Dateien, Prüfkriterium, Grenzen
4. Eine Aufgabe pro Session, bei Themenwechsel `/clear`
5. Diffs lesen, bevor du zustimmst – du bist verantwortlich für den Code
