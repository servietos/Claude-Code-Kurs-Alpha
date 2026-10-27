# Modul 2: Installation & erste Schritte (10 min)

## Lernziele

- Claude Code installieren und anmelden
- Eine Session starten, bedienen und beenden
- Die wichtigsten Slash-Commands und Shortcuts kennen

## 1. Installation

**Native Installer (empfohlen):**

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash
```

```powershell
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

**Alternative über npm** (Node.js ≥ 18):

```bash
npm install -g @anthropic-ai/claude-code
```

Prüfen:

```bash
claude --version
claude doctor
```

> Windows: Claude Code benötigt **Git for Windows** (Git Bash). Alternativ läuft es in WSL.

## 2. Anmelden

Beim ersten Start von `claude` öffnet sich der Login im Browser. Optionen:

- **Claude-Abo** (Pro, Max, Team, Enterprise) – Nutzung über das Abo-Kontingent
- **Anthropic Console** (API-Key) – Abrechnung nach Token-Verbrauch
- Unternehmensanbindung über Amazon Bedrock, Google Vertex AI oder Microsoft Foundry

Wechsel jederzeit mit `/login` bzw. `/logout`; Status mit `/status`.

## 3. Wo läuft Claude Code?

| Oberfläche | Start |
|------------|-------|
| Terminal (CLI) | `claude` im Projektordner |
| VS Code / Cursor | Extension "Claude Code" → Claude-Symbol in der Seitenleiste |
| JetBrains | Plugin "Claude Code" |
| Desktop-App / Web | claude.ai/code |

**Wichtig:** Claude Code arbeitet im Verzeichnis, in dem es gestartet wurde. Immer **im Projektordner** starten.

## 4. Bedienung

| Aktion | Eingabe |
|--------|---------|
| Session starten | `claude` |
| Mit einer Aufgabe starten | `claude "erkläre mir dieses Projekt"` |
| Letzte Session fortsetzen | `claude -c` |
| Ältere Session wählen | `claude -r` oder `/resume` |
| Einmalig, ohne Dialog (Headless) | `claude -p "fasse README.md zusammen"` |
| Datei referenzieren | `@src/cart.js` |
| Shell-Befehl direkt ausführen | `!npm test` |
| Claude unterbrechen | `Esc` |
| Zeilenumbruch im Prompt | `Shift+Enter` (bzw. `\` + `Enter`) |
| Berechtigungsmodus wechseln | `Shift+Tab` |
| Beenden | `/exit` oder 2× `Ctrl+C` |

## 5. Slash-Commands für den Anfang

| Befehl | Zweck |
|--------|-------|
| `/help` | Alle Befehle |
| `/init` | `CLAUDE.md` für das Projekt erzeugen |
| `/clear` | Konversation leeren (neuer Kontext) |
| `/compact` | Konversation zusammenfassen, um Kontext zu sparen |
| `/model` | Modell wechseln |
| `/permissions` | Berechtigungsregeln ansehen/ändern |
| `/rewind` | Zu einem Checkpoint zurückspringen |
| `/context` | Kontextverbrauch anzeigen |
| `/usage` | Verbrauch und Limits anzeigen |
| `/doctor` | Installation prüfen |

## Sprechernotizen

- Installation idealerweise vorab per Mail anfordern; im Lab nur verifizieren.
- Fallback für Teilnehmende ohne Abo: API-Key aus der Console mit kleinem Budget, oder Pair-Programming.
