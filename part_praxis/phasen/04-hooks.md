# Phase 4: Hooks für Qualität (30 min)

**Ziel:** Nach jeder Änderung durch Claude läuft automatisch ein schneller Check. Schlägt er fehl, erfährt Claude es sofort und korrigiert.

**Ergebnis:** `.claude/hooks/run-check.mjs` und ein `PostToolUse`-Eintrag in `.claude/settings.json`.

## Schritt 1: Den richtigen Check wählen (8 min)

Der Check läuft nach **jeder** Datei-Änderung. Er muss deshalb schnell sein: **Ziel unter 10 Sekunden.**

| Option | Gut, wenn | Beispiel |
|--------|-----------|----------|
| Typecheck | Typisierte Sprache, schnell | `npx tsc --noEmit`, `mypy src` |
| Linter | Linter ist konfiguriert und schnell | `npm run lint`, `ruff check .` |
| Schnelle Unit-Tests | Suite läuft in Sekunden | `npm test`, `pytest -q -x tests/unit` |
| Formatter | Team nutzt einen Formatter | `npx prettier --write`, `ruff format` |

Messt die Laufzeit:

```bash
time npm test
```

```powershell
Measure-Command { npm test }
```

Zu langsam? Auf einen Teil der Tests oder auf Typecheck/Lint ausweichen. Die volle Suite läuft weiterhin in CI.

## Schritt 2: Hook anpassen (7 min)

```bash
cp <kursordner>/part_praxis/vorlagen/.claude/hooks/run-check.mjs .claude/hooks/
```

```powershell
Copy-Item <kursordner>/part_praxis/vorlagen/.claude/hooks/run-check.mjs .claude/hooks/
```

Oben im Skript anpassen:

```javascript
const CHECK_COMMAND = 'npm test';             // euer Befehl aus Schritt 1
const EXTENSIONS = /\.(m?js|ts|tsx|jsx)$/;    // Dateitypen, nach denen geprüft wird
```

Beispiele für `EXTENSIONS`: Python `/\.py$/`, .NET `/\.cs$/`, Java `/\.(java|kt)$/`, Go `/\.go$/`.

Von Hand testen (Pfad einer echten Datei einsetzen):

```bash
echo '{"tool_input":{"file_path":"src/index.ts"}}' | node .claude/hooks/run-check.mjs; echo $?
```

```powershell
'{"tool_input":{"file_path":"src/index.ts"}}' | node .claude/hooks/run-check.mjs; $LASTEXITCODE
```

**Erwartung:** bei grünem Projekt `0`.

## Schritt 3: Eintragen (3 min)

In `.claude/settings.json` unter `"hooks"` ergänzen:

```json
"PostToolUse": [
  {
    "matcher": "Edit|Write",
    "hooks": [
      {
        "type": "command",
        "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/run-check.mjs\"",
        "timeout": 90
      }
    ]
  }
]
```

## Schritt 4: Wirkung prüfen (10 min)

Session neu starten. Einen kleinen Fehler absichtlich einbauen lassen, der euren Check auslöst:

```text
Ändere in [Datei] [eine Zeile so, dass ein Test/Typecheck/Lint fehlschlägt]. Nur diese eine Änderung.
```

**Beobachten:**

- Meldet der Hook den Fehler an Claude?
- Wie reagiert Claude? Schlägt es vor, die Änderung zurückzunehmen?
- Wie lange dauert der Check? Ist das im Alltag erträglich?

Danach zurücknehmen lassen und mit dem Testbefehl prüfen.

## Schritt 5 (optional): Formatter (2 min)

Nutzt euer Team einen Formatter, könnt ihr einen zweiten `PostToolUse`-Hook anlegen, der nur die geänderte Datei formatiert. Das spart Review-Diskussionen über Formatierung.

## Fertig, wenn

- [ ] Check läuft in unter ~10 Sekunden
- [ ] Ein absichtlicher Fehler wird automatisch an Claude gemeldet
- [ ] Committet
- [ ] Steckbrief: Abschnitt Qualität ergänzt

## Stolperfallen

- **Check zu langsam:** Claude wartet nach jeder Änderung. Lieber Typecheck als volle Suite.
- **Check braucht Dienste** (Datenbank, Docker): Für den Hook ungeeignet. Unit-Tests ohne Dienste wählen.
- **Rote Tests schon vorher:** Dann meldet der Hook bei jeder Änderung Fehler. Erst grün machen oder den Check auf grüne Teile begrenzen.
