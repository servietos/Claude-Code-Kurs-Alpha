# Modul 3: Headless und CI (15 min)

## Lernziele

- Claude Code ohne Dialog aus Skripten aufrufen
- Ausgaben als JSON und nach einem festen Schema erhalten
- Berechtigungen und Kosten im unbeaufsichtigten Betrieb begrenzen
- Claude in GitHub einbinden

## 1. Der Print-Modus

```bash
claude -p "Fasse die letzten 5 Commits zusammen"
```

- Führt die Aufgabe aus, schreibt das Ergebnis auf STDOUT, beendet sich
- Keine Rückfragen möglich: Was nicht erlaubt ist, wird abgelehnt
- Eingabe per Pipe:

```bash
git diff | claude -p "Reviewe diesen Diff"
cat error.log | claude -p "Was ist die Ursache?"
```

## 2. Ausgabeformate

| Flag | Ausgabe |
|------|---------|
| `--output-format text` | Nur der Antworttext (Standard) |
| `--output-format json` | Ein JSON-Objekt mit Ergebnis und Metadaten |
| `--output-format stream-json` | Ereignisse fortlaufend, für Live-Anzeigen |

**Wichtige Felder bei `json`:**

| Feld | Inhalt |
|------|--------|
| `result` | Antworttext |
| `structured_output` | Ergebnis nach `--json-schema` (siehe unten) |
| `is_error` | `true` bei Fehler |
| `total_cost_usd` | Kosten des Aufrufs |
| `num_turns` | Anzahl der Runden |
| `session_id` | Zum Fortsetzen mit `--resume` |

**Strukturierte Ausgabe mit Schema:**

```bash
claude -p "Prüfe data/products.json …" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"ok":{"type":"boolean"}},"required":["ok"]}'
```

Ergebnis: `"structured_output": {"ok": true}`

Damit wird Claude zu einer Funktion, deren Ergebnis ein Skript sicher weiterverarbeiten kann.

## 3. Unbeaufsichtigt, aber begrenzt

| Flag | Wirkung |
|------|---------|
| `--allowedTools "Read,Grep,Glob"` | Nur diese Tools ohne Rückfrage |
| `--disallowedTools "Bash"` | Diese Tools verbieten |
| `--permission-mode plan` | Nur lesen und planen |
| `--max-budget-usd 0.50` | Kostenobergrenze (bei API-Abrechnung) |
| `--model haiku` | Günstiges Modell für einfache Prüfungen |
| `--no-session-persistence` | Session nicht speichern |

**Grundregel für CI:** so wenig Tools wie möglich. Ein Review braucht kein Edit und kein Bash.

> **Achtung:** In einem Ordner, dem noch nie per Vertrauensdialog vertraut wurde, ignoriert `claude -p` die allow-Regeln aus `.claude/settings.json` und meldet das auf STDERR. Flags wie `--allowedTools` gelten trotzdem.

## 4. Aus eigenen Programmen aufrufen

Ausschnitt aus [`loesungen/lab-03/scripts/katalog-check.mjs`](../loesungen/lab-03/scripts/katalog-check.mjs):

```javascript
const raw = execFileSync(
  'claude',
  ['-p', prompt, '--output-format', 'json',
   '--json-schema', JSON.stringify(schema), '--allowedTools', 'Read'],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }
);
const report = JSON.parse(raw).structured_output;
```

- `execFileSync` **ohne** `shell: true`. Mit Shell zerlegt Windows die Anführungszeichen im JSON-Schema, und Claude meldet `--json-schema is not valid JSON`.
- STDERR getrennt halten, sonst landen Warnungen im JSON.
- Für komplexere Fälle gibt es das **Claude Agent SDK** (TypeScript, Python) mit derselben Agent-Schleife als Bibliothek.

## 5. GitHub

- In einer Session: `/install-github-app` richtet die GitHub-App und die Secrets ein.
- Danach reagiert Claude auf `@claude` in Issues und Pull Requests, z. B. "@claude behebe den Fehler aus diesem Issue" oder automatische Reviews.
- Technisch eine GitHub Action (`anthropics/claude-code-action`). Beispiel: [`loesungen/lab-03/claude-review.yml`](../loesungen/lab-03/claude-review.yml)
- Dieselben Regeln wie lokal: `CLAUDE.md` im Repo steuert das Verhalten, Rechte der Action so knapp wie möglich.

## Sprechernotizen

- Demo: `git log --oneline -5 | claude -p "Schreibe daraus Release Notes"`
- Kosten zeigen: `--output-format json`, Feld `total_cost_usd`. Im Test kostete der erste Aufruf in einem neuen Ordner ca. 0,20 USD (Cache wird aufgebaut), die folgenden nur noch Bruchteile davon.
- GitHub Actions nur zeigen, nicht im Lab einrichten: braucht Admin-Rechte am Repo und ein Secret.
