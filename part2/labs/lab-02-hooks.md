# Lab 2: Regeln erzwingen, Tests automatisch (30 min)

**Ziel:** Du baust zwei Hooks: Einer blockiert jede Paketinstallation, der andere führt nach jeder Code-Änderung die Tests aus und meldet Fehler an Claude.

Arbeitsverzeichnis: `~/mini-shop-2`

## Teil A: Installationen blockieren (12 min)

### 1. Hook-Skript anlegen

`.claude/hooks/block-npm-install.mjs`:

```javascript
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';

if (/\b(npm|pnpm|yarn)\s+(install|i|add)\b/.test(command)) {
  console.error(
    'Blockiert: Der mini-shop erlaubt keine externen Abhängigkeiten (siehe CLAUDE.md). Löse die Aufgabe mit Bordmitteln von Node.js.'
  );
  process.exit(2);
}
```

### 2. Vor dem Einbinden von Hand testen

```bash
echo '{"tool_input":{"command":"npm install lodash"}}' | node .claude/hooks/block-npm-install.mjs; echo $?
echo '{"tool_input":{"command":"npm test"}}' | node .claude/hooks/block-npm-install.mjs; echo $?
```

```powershell
'{"tool_input":{"command":"npm install lodash"}}' | node .claude/hooks/block-npm-install.mjs; $LASTEXITCODE
'{"tool_input":{"command":"npm test"}}' | node .claude/hooks/block-npm-install.mjs; $LASTEXITCODE
```

**Erwartung:** erst Meldung und `2`, dann keine Meldung und `0`.

### 3. In settings.json eintragen

In `.claude/settings.json` einen Block `"hooks"` ergänzen. Die bestehenden `"permissions"` bleiben:

```json
"hooks": {
  "PreToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/block-npm-install.mjs\""
        }
      ]
    }
  ]
}
```

### 4. Prüfen

Session neu starten, `/hooks` aufrufen und den Hook finden.

### 5. Provozieren

```text
Installiere lodash und nutze es in subtotalCents.
```

Beobachte genau, welches Tool Claude nutzt und wie es auf die Blockade reagiert.

### 6. Nur Windows: Umgehung schließen

Hat Claude es über das **PowerShell-Tool** erneut versucht? Ändere den Matcher auf `"Bash|PowerShell"`, starte neu und wiederhole Schritt 5.

## Teil B: Tests nach jeder Änderung (13 min)

### 1. Hook-Skript anlegen

`.claude/hooks/run-tests.mjs`:

```javascript
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const input = JSON.parse(readFileSync(0, 'utf8'));
const filePath = input.tool_input?.file_path ?? '';

if (!/\.(m?js)$/.test(filePath)) process.exit(0);

const result = spawnSync('npm test', {
  cwd: process.env.CLAUDE_PROJECT_DIR ?? process.cwd(),
  encoding: 'utf8',
  shell: true
});

if (result.status !== 0) {
  const output = `${result.stdout}\n${result.stderr}`.split('\n').slice(-40).join('\n');
  console.error(`npm test ist nach der Änderung an ${filePath} fehlgeschlagen:\n${output}`);
  process.exit(2);
}
```

### 2. In settings.json unter "hooks" ergänzen

```json
"PostToolUse": [
  {
    "matcher": "Edit|Write",
    "hooks": [
      {
        "type": "command",
        "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/run-tests.mjs\"",
        "timeout": 60
      }
    ]
  }
]
```

### 3. Fehler absichtlich einbauen lassen

Session neu starten:

```text
Ändere in src/cart.js die Konstante VAT_RATE auf 0.2. Nur diese eine Änderung, sonst nichts.
```

Beobachte: Der Hook meldet die roten Tests an Claude. Was schlägt Claude vor?

### 4. Zurücknehmen

Lass Claude die Änderung zurücknehmen und prüfe mit `!npm test`.

## Teil C (optional): Session-Protokoll (5 min)

Ein `Stop`-Hook, der bei jedem Ende einer Antwort eine Zeile protokolliert: [`loesungen/lab-02/.claude/hooks/log-session.mjs`](../loesungen/lab-02/.claude/hooks/log-session.mjs) übernehmen und in `settings.json` unter `"Stop"` eintragen (ohne `matcher`). Danach `.claude/session-log.txt` ansehen. Die Datei gehört in `.gitignore`.

## Erfolgskriterien

- [ ] Beide Hooks von Hand mit Beispiel-JSON getestet
- [ ] `/hooks` zeigt beide Hooks
- [ ] `npm install lodash` wird blockiert, über Bash **und** PowerShell
- [ ] Ein absichtlicher Fehler wird sofort per Hook an Claude gemeldet
- [ ] `settings.json` und `hooks/` sind committet

## Lösung

[`loesungen/lab-02/.claude/settings.json`](../loesungen/lab-02/.claude/settings.json) und [`loesungen/lab-02/.claude/hooks/`](../loesungen/lab-02/.claude/hooks/block-npm-install.mjs)
