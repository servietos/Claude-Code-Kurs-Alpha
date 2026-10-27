# Modul 2: Hooks (15 min)

## Lernziele

- Hook-Ereignisse und Matcher kennen
- Verstehen, wie ein Hook mit Exit-Codes Claude blockiert oder Feedback gibt
- Hooks sicher und plattformübergreifend schreiben

## 1. Was ist ein Hook?

Ein Hook ist ein Befehl, den Claude Code bei einem bestimmten Ereignis **automatisch** ausführt. Nicht Claude entscheidet, ob er läuft, sondern das Programm. Deshalb eignen sich Hooks für Regeln, die nie gebrochen werden dürfen.

| Mechanismus | Beispiel | Wirkung |
|-------------|----------|---------|
| `CLAUDE.md` | "Bitte keine npm-Pakete installieren." | meistens befolgt |
| Hook | `npm install` wird blockiert | **immer** |

## 2. Wichtige Ereignisse

| Ereignis | Wann | Typischer Einsatz |
|----------|------|-------------------|
| `PreToolUse` | Bevor ein Tool läuft | Gefährliches blockieren |
| `PostToolUse` | Nachdem ein Tool lief | Formatieren, Tests, Lint |
| `UserPromptSubmit` | Wenn du einen Prompt abschickst | Kontext ergänzen, prüfen |
| `Notification` | Wenn Claude auf dich wartet | Desktop-Benachrichtigung |
| `Stop` | Wenn Claude fertig ist | Protokoll, Abschlusscheck |
| `SessionStart` | Beim Start einer Session | Umgebung vorbereiten |

Weitere (`SubagentStop`, `PreCompact`, `SessionEnd` …) zeigt `/hooks`.

## 3. Konfiguration

In `.claude/settings.json` (Team) oder `.claude/settings.local.json` (nur du):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash|PowerShell",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/block-npm-install.mjs\""
          }
        ]
      }
    ]
  }
}
```

- **`matcher`:** Tool-Name als Muster, z. B. `"Edit|Write"`, `"Bash"`. Bei Ereignissen ohne Tool (`Stop`, `UserPromptSubmit`) entfällt er.
- **`$CLAUDE_PROJECT_DIR`:** Projektwurzel, damit der Pfad immer stimmt
- **`timeout`:** optional, in Sekunden
- **`/hooks`** zeigt alle aktiven Hooks und ihre Herkunft

## 4. Wie ein Hook mit Claude spricht

**Eingabe:** Claude Code schickt ein JSON-Objekt auf STDIN, u. a.:

```json
{
  "session_id": "…",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": { "command": "npm install lodash" }
}
```

Bei Edit/Write steht in `tool_input` u. a. `file_path`.

**Ausgabe über den Exit-Code:**

| Exit-Code | Wirkung |
|-----------|---------|
| `0` | Alles gut, weiter |
| `2` | Blockieren (`PreToolUse`) bzw. Rückmeldung an Claude (`PostToolUse`). Der Text auf STDERR geht an Claude, Claude reagiert darauf. |
| anderer | Fehler im Hook, wird dir angezeigt, Claude macht weiter |

Beispiel in Node.js (läuft auf allen Plattformen):

```javascript
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';

if (/\bnpm\s+(install|i|add)\b/.test(command)) {
  console.error('Blockiert: keine externen Abhängigkeiten (CLAUDE.md).');
  process.exit(2);
}
```

## 5. Fallstricke

- **Windows:** Claude hat dort ein Bash- **und** ein PowerShell-Tool. Ein Matcher `"Bash"` allein lässt sich über PowerShell umgehen. Im Test für diesen Kurs ist Claude genau so ausgewichen. Deshalb: `"Bash|PowerShell"`.
- Hooks laufen mit **deinen** Rechten. Fremde Hooks (aus Repos, Plugins) vor dem Aktivieren lesen.
- Langsame Hooks bremsen jede Aktion. Tests nach jedem Edit lohnen sich nur, wenn die Suite in Sekunden läuft.
- Hooks in Node oder Python schreiben statt in Bash-Einzeilern: lesbarer, testbar, läuft auf allen Plattformen.
- Einen Hook vor dem Einsatz mit einem Beispiel-JSON testen:

```bash
echo '{"tool_input":{"command":"npm install x"}}' | node hook.mjs
echo $?
```

```powershell
'{"tool_input":{"command":"npm install x"}}' | node hook.mjs
$LASTEXITCODE
```

## Sprechernotizen

- Demo: Hook ohne PowerShell-Matcher einrichten, Claude bitten, ein Paket zu installieren, und beobachten, ob es ausweicht. Guter Moment, um über "Regeln erzwingen statt bitten" und über Umgehungswege zu sprechen.
- Hinweis: Hooks sind kein Ersatz für Sandbox und Berechtigungen. Sie ergänzen sie.
