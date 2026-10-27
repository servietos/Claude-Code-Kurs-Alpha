# Trainer-Leitfaden Aufbaukurs

## Vorbereitung

- Alle Labs einmal selbst durchspielen, auf dem Betriebssystem der Gruppe
- Claude Code auf 2.1 oder neuer bringen (`claude update`). Getestet wurde der Kurs mit **2.1.311 unter Windows 11**.
- Budget für Lab 3 klären: Bei API-Abrechnung pro Person ca. 1 USD einplanen. Mit Abo zählt es gegen das Kontingent.
- `loesungen/` **nicht** vorab verteilen, erst nach dem jeweiligen Lab

## Was vorab getestet wurde

| Teil | Ergebnis |
|------|----------|
| Hook-Skripte mit Beispiel-JSON | Blockade mit Exit 2, Durchlass mit 0, rote Tests werden mit Exit 2 und Ausgabe gemeldet |
| `katalog-check.mjs` echt gegen Claude | Sauberer Katalog: Exit 0. Defektes Produkt (`sku "bad"`, leerer Name, `9.99`): drei Befunde, Exit 1 |
| Plugin und Marketplace | `claude plugin validate` bestanden |
| Plugin per `--plugin-dir` | Skill und Agent erscheinen mit Präfix `mini-shop-toolkit:`. `npm install lodash` wurde über Bash **und** PowerShell blockiert, `node_modules` entstand nicht |

**Nicht getestet:** `claude -w`, `claude --bg` / `agents` / `attach`, die Installation über den Marketplace, die GitHub Action. Vor dem Kurs selbst prüfen.

## Windows-Stolperfallen (wichtig)

### 1. Hook-Matcher "Bash" reicht nicht

Claude Code hat unter Windows ein PowerShell-Tool. Im Test ist Claude nach der Bash-Blockade auf PowerShell ausgewichen. Matcher immer `"Bash|PowerShell"`. In Lab 2 ist das bewusst als Lernmoment eingebaut (Teil A, Schritt 5 und 6).

### 2. Headless ignoriert allow-Regeln in nicht vertrauten Ordnern

Meldung: `Ignoring N permissions.allow entries … workspace has not been trusted`. Abhilfe: einmal interaktiv `claude` starten und vertrauen. Deshalb steht der Schritt im [Einstieg](module/00-einstieg.md#3-projekt-vorbereiten-7-min).

### 3. JSON-Argumente und Shell

`execFileSync('claude', […], { shell: true })` zerstört unter Windows das JSON-Schema (`--json-schema is not valid JSON`). Ohne Shell funktioniert es mit dem nativen Installer (`claude.exe`). Wer Claude Code per npm installiert hat, hat ein `claude.cmd`; dann ggf. `claude.cmd` aufrufen oder das Schema anders übergeben.

### 4. STDERR getrennt halten

Warnungen von Claude Code gehen auf STDERR. Wer `2>&1` umleitet, bekommt kaputtes JSON.

### 5. $CLAUDE_PROJECT_DIR in Hooks

Funktioniert im Test unter Windows in der Form `node "$CLAUDE_PROJECT_DIR/.claude/hooks/x.mjs"`. Falls nicht: Pfad relativ angeben (`node .claude/hooks/x.mjs`), Claude Code startet Hooks im Projektordner.

## Lösungen und erwartete Ergebnisse

### Lab 1

Mögliche Implementierung:

```javascript
export function removeItem(cart, sku, quantity) {
  const item = cart.items.find((i) => i.sku === sku);
  if (!item) throw new Error(`Unbekannte SKU: ${sku}`);
  if (quantity === undefined || item.quantity - quantity <= 0) {
    cart.items = cart.items.filter((i) => i.sku !== sku);
  } else {
    item.quantity -= quantity;
  }
  return cart;
}
```

- **Achtung, Verhaltensänderung:** Bisher war `removeItem` mit unbekannter SKU still. Ein guter Reviewer merkt an, dass das ein Breaking Change ist. Diskussionsanlass.
- Typische Reviewer-Befunde: negative oder nicht ganzzahlige `quantity` wird nicht abgefangen.
- Bonus: Der Reviewer hat `Bash` und könnte theoretisch schreiben (z. B. per `sed`). Sicher wird er nur ohne Bash.

### Lab 2

- Lösung: [`loesungen/lab-02/.claude/`](loesungen/lab-02/.claude/settings.json)
- Bei `VAT_RATE = 0.2` schlagen im Startstand (`mini-shop-solution`) **4 von 11** Tests fehl. Der FIXED5-Test mit 0 € bleibt grün. Nach Lab 1 gibt es mehr Tests; die removeItem-Tests rechnen normalerweise keine MwSt. und bleiben grün.
- Claude erhält die Ausgabe und schlägt in der Regel selbst vor, die Änderung zurückzunehmen oder die Tests anzupassen. Guter Moment: Was wäre richtig, wenn die MwSt. sich wirklich ändert?
- Der Test-Hook läuft auch bei Änderungen durch Subagents.

### Lab 3

- Erster Aufruf im Test: ca. 0,21 USD (Cache-Aufbau), zweiter: ca. 0,01 USD
- Teil A, zweiter Aufruf ohne `--allowedTools`: Je nach Vertrauen und Regeln wird das Lesen abgelehnt oder ist durch allow erlaubt. Read ist in vielen Konfigurationen ohnehin erlaubt; mit Bash sieht man den Unterschied deutlicher.
- Der Katalog-Check ersetzt keinen deterministischen Linter. Diskussion: Was sollte ein Skript prüfen (Format, Typen) und wofür lohnt sich ein Modell (Plausibilität, Namen, Beschreibungen)?

### Lab 4

Format-Lösung z. B. mit:

```javascript
euros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
```

oder `Intl.NumberFormat('de-DE')` (Achtung: geschütztes Leerzeichen vor €, falls `style: 'currency'` genutzt wird).

Häufigster Fehler: Eine Session ändert doch eine Datei der anderen (z. B. README). Dann gibt es einen Merge-Konflikt. Gut zum Zeigen, aber Zeit einplanen.

### Lab 5

- Lösung: [`loesungen/lab-05/team-marketplace/`](loesungen/lab-05/team-marketplace/.claude-plugin/marketplace.json)
- Skill nicht sichtbar: Ordner muss `skills/<name>/SKILL.md` heißen.
- Hook greift nicht: `${CLAUDE_PLUGIN_ROOT}` mit geschweiften Klammern, `hooks.json` liegt in `hooks/`, nicht in `.claude-plugin/`.
- Doppelte Einträge in `~/mini-shop-2`: Projekt-Agent und Plugin-Agent existieren parallel. Deshalb wird im frischen Projekt getestet.

## Zeitpuffer

| Kürzen | Gewinn |
|--------|--------|
| Lab 2 Teil C weglassen | ~5 min |
| Lab 3 Teil D weglassen | ~3 min |
| Lab 4 Bonus weglassen | ~5 min |
| Lab 5 Schritt 4 als Trainer-Demo | ~5 min |

## Abschluss

1. Quiz ([quiz.md](quiz.md)) gemeinsam auflösen
2. Jede Person nennt **eine** Regel aus ihrem Team, die sie als Hook erzwingen würde, und **eine** wiederkehrende Aufgabe für `claude -p`
3. Hinweis auf vertiefende Themen: Claude Agent SDK, eigene MCP-Server, Managed Settings für Unternehmen, Sandbox
