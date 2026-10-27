# Modul 1: Subagents (15 min)

## Lernziele

- Verstehen, warum Subagents den Hauptkontext schonen
- Einen Subagent mit Tools, Modell und Systemprompt definieren
- Subagents gezielt und automatisch einsetzen

## 1. Was ist ein Subagent?

Ein Subagent ist eine eigene Claude-Instanz, an die die Haupt-Session eine Teilaufgabe delegiert. Er hat:

- einen **eigenen Kontext** (sieht deinen Chatverlauf nicht)
- einen eigenen Systemprompt (seine "Rolle")
- eine eigene Tool-Liste (z. B. nur lesen)
- optional ein eigenes Modell (z. B. Haiku für einfache Arbeit)

Zurück an die Haupt-Session kommt nur das Ergebnis, nicht jede gelesene Datei. Das hält den Hauptkontext klein.

```text
Haupt-Session  ── Auftrag ──►  Subagent "code-reviewer"
     ▲                         liest 12 Dateien, führt git diff aus
     │                         (landet nur in SEINEM Kontext)
     └──── Ergebnis-Tabelle ───┘
```

**Typische Einsätze:**

- Recherche in großer Codebasis ("finde alle Stellen, die …")
- Review mit frischem Blick (der Reviewer kennt deine Begründungen nicht)
- Mechanische Arbeit auf einem günstigen Modell
- Parallele Teilaufgaben

## 2. Definition

| Datei | Gültigkeit |
|-------|-----------|
| `.claude/agents/<name>.md` | Projekt, ins Git, für das Team |
| `~/.claude/agents/<name>.md` | Persönlich, alle Projekte |

Interaktiv anlegen und verwalten: `/agents`

```markdown
---
name: code-reviewer
description: Prüft Änderungen auf Bugs und Verstöße gegen CLAUDE.md. Proaktiv nach jeder Code-Änderung einsetzen. Ändert keinen Code.
tools: Read, Grep, Glob, Bash
model: sonnet
---

Du bist ein erfahrener Reviewer …
(Ab hier: Systemprompt des Subagents)
```

| Feld | Bedeutung |
|------|-----------|
| `name` | Bezeichner, Kleinbuchstaben und Bindestriche |
| `description` | Entscheidet, **wann** Claude den Agent von sich aus nutzt. Formulierungen wie "proaktiv einsetzen, wenn …" helfen. |
| `tools` | Kommagetrennt. Weglassen = alle Tools der Haupt-Session |
| `model` | `sonnet`, `opus`, `haiku` oder `inherit` (wie Haupt-Session) |

## 3. Einsetzen

- **Explizit:** "Lass den Subagent code-reviewer die Änderungen prüfen."
- **Automatisch:** Claude delegiert selbst, wenn die `description` passt.
- **Parallel:** "Starte test-writer und code-reviewer parallel."

Es gibt auch eingebaute Subagents, z. B. einen Explore-Agent für schnelle, nur lesende Suche. `/agents` zeigt alle verfügbaren.

## 4. Grenzen und Fallstricke

- Der Subagent kennt deinen Chat nicht: Der Auftrag muss alles enthalten, was er wissen muss (Dateien, Ziel, Grenzen).
- Nur lesende Tools machen einen Reviewer sicher. "Ändere keinen Code" im Prompt allein ist eine Bitte, keine Garantie. `Bash` erlaubt grundsätzlich auch schreibende Befehle.
- Jeder Subagent kostet eigene Tokens. Für eine Zwei-Zeilen-Frage lohnt er sich nicht.
- Ergebnisse von Subagents sind Zusammenfassungen. Bei wichtigen Befunden selbst nachprüfen.

## Sprechernotizen

- Demo: `/agents` öffnen, die eingebauten Agents zeigen, dann `code-reviewer` über den Dialog anlegen und die erzeugte Datei im Editor zeigen.
- Frage an die Gruppe: Warum ist ein Reviewer ohne Edit/Write-Tool besser als ein Reviewer mit der Anweisung "ändere nichts"?
