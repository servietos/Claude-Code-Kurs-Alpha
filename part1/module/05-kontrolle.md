# Modul 5: Kontrolle – Permissions, Checkpoints, Modelle, Kontext (15 min)

## Lernziele

- Berechtigungsmodi und -regeln einsetzen
- Mit Checkpoints Änderungen rückgängig machen
- Das passende Modell wählen und den Kontext im Blick behalten

## 1. Berechtigungsmodi

Wechsel mit **`Shift+Tab`**:

| Modus | Verhalten |
|-------|-----------|
| **default** | Fragt vor Datei-Änderungen und Shell-Befehlen |
| **acceptEdits** | Datei-Änderungen ohne Rückfrage, Shell-Befehle weiterhin mit Rückfrage |
| **plan** | Nur lesen und planen |
| **auto** | Ein Klassifikator gibt sichere Aktionen frei und stoppt riskante (ab Version 2.1) |
| `bypassPermissions` | Keine Rückfragen – **nur in isolierten Umgebungen** (Container/VM) |

Beim Start per Flag heißt der Standardmodus `manual`: `claude --permission-mode plan|acceptEdits|auto|manual`.

## 2. Berechtigungsregeln

Regeln in `settings.json` oder interaktiv über `/permissions`:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm test)",
      "Bash(git status)",
      "Bash(git diff:*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Bash(curl:*)"
    ]
  }
}
```

- **deny** schlägt **ask** schlägt **allow**
- `:*` am Ende = beliebige weitere Argumente (Präfix-Match)

**Speicherorte (Gültigkeit):**

| Datei | Für wen | Ins Git? |
|-------|---------|----------|
| `~/.claude/settings.json` | Dich, alle Projekte | – |
| `.claude/settings.json` | Team, dieses Projekt | **Ja** |
| `.claude/settings.local.json` | Dich, dieses Projekt | Nein |
| Managed Settings | Unternehmensweit (IT) | – |

## 3. Checkpoints und Rewind

- Claude Code legt bei jedem Prompt automatisch einen **Checkpoint** an
- **`Esc` `Esc`** oder **`/rewind`**: Zurückspringen und wählen, ob **Code**, **Konversation** oder **beides** zurückgesetzt wird
- **Grenze:** Checkpoints erfassen nur Datei-Änderungen durch Claudes Edit-Tools. Änderungen per Shell (`rm`, `mv`, Skripte) oder außerhalb von Claude werden **nicht** erfasst → **Git bleibt das Sicherheitsnetz**. Vor größeren Aufgaben committen.

## 4. Modellwahl

| Modell | Stärke | Typische Aufgaben |
|--------|--------|-------------------|
| **Opus** | Tiefes Denken, höchste Qualität, teurer | Architektur, knifflige Bugs, Planung |
| **Sonnet** | Gutes Verhältnis aus Qualität und Kosten | Alltag: Features, Tests, Refactoring |
| **Haiku** | Sehr schnell, günstig | Einfache, mechanische Aufgaben, Subagents |

Wechsel mit `/model` oder `claude --model sonnet`. Der Modellwechsel mitten in einer Session verwirft den Prompt-Cache – idealerweise zu Beginn wählen.

## 5. Kontextfenster managen

- Alles in der Session (Dateien, Ausgaben, Nachrichten) belegt das **Kontextfenster**
- `/context` zeigt die Belegung
- `/compact [Fokus]` fasst die bisherige Unterhaltung zusammen ("/compact behalte die Entscheidungen zum Rabatt")
- `/clear` bei **Themenwechsel** – frischer Kontext liefert bessere Ergebnisse
- `/usage` zeigt Verbrauch bzw. Abo-Limits

**Faustregel:** Eine Aufgabe pro Session. Neue Aufgabe → `/clear`.

## Sprechernotizen

- Demo: `.env` lesen lassen, bevor und nachdem die deny-Regel gesetzt ist.
- Rewind-Demo: Claude eine Datei "kaputt-refaktorieren" lassen und mit `Esc Esc` zurückholen.
