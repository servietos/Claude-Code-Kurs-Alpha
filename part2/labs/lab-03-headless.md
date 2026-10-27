# Lab 3: Claude in Skripten (25 min)

**Ziel:** Du rufst Claude Code ohne Dialog auf, verarbeitest JSON-Ausgaben und baust einen Katalog-Check, der wie ein Linter mit Exit-Code antwortet.

Arbeitsverzeichnis: `~/mini-shop-2`, im normalen Terminal (keine Session).

> **Voraussetzung:** Du hast in diesem Ordner einmal interaktiv `claude` gestartet und dem Ordner vertraut ([Einstieg](../module/00-einstieg.md#3-projekt-vorbereiten-7-min)).

## Teil A: Pipes (5 min)

```bash
git log --oneline -10 | claude -p "Schreibe daraus kurze Release Notes auf Deutsch, gruppiert nach Neu, Behoben, Sonstiges."
```

```bash
claude -p "Welche Funktionen exportiert src/cart.js? Nur eine Liste der Namen." --allowedTools "Read"
```

**Frage:** Was passiert, wenn du im zweiten Aufruf `--allowedTools` weglässt und Claude eine Datei lesen will?

## Teil B: JSON und Kosten (5 min)

```bash
claude -p "Wie viele Produkte enthält data/products.json? Nur die Zahl." --allowedTools "Read" --output-format json
```

Suche in der Ausgabe: `result`, `total_cost_usd`, `num_turns`, `session_id`.

Führe denselben Aufruf ein zweites Mal aus. Vergleiche `total_cost_usd`.

## Teil C: Katalog-Check mit Schema (12 min)

### 1. Skript anlegen

Lege `scripts/katalog-check.mjs` an. Vorlage: [`loesungen/lab-03/scripts/katalog-check.mjs`](../loesungen/lab-03/scripts/katalog-check.mjs)

Lies das Skript, bevor du es ausführst: Welche Tools darf Claude nutzen? Was macht das Schema?

### 2. Ausführen

```bash
node scripts/katalog-check.mjs
echo $?
```

```powershell
node scripts/katalog-check.mjs
$LASTEXITCODE
```

**Erwartung:** "Katalog in Ordnung", Exit-Code `0`.

### 3. Fehler einbauen

Füge in `data/products.json` absichtlich ein fehlerhaftes Produkt ein:

```json
{ "sku": "bad", "name": "", "priceCents": 9.99 }
```

Erneut ausführen. **Erwartung:** drei Befunde, Exit-Code `1`.

### 4. Aufräumen

Fehlerhaftes Produkt wieder entfernen.

> **Diskussion:** Wo würdet ihr so einen Check einsetzen: Pre-Commit, CI, nächtlicher Job? Was spricht dagegen, ihn bei jedem Commit laufen zu lassen?

## Teil D (optional): Diff-Review für CI (3 min)

```bash
git switch -c test-review
# eine kleine Änderung in src/format.js machen und committen
bash loesungen/lab-03/scripts/review-diff.sh
git switch main
```

```powershell
git switch -c test-review
# eine kleine Änderung in src/format.js machen und committen
./loesungen/lab-03/scripts/review-diff.ps1
git switch main
```

Pfad entsprechend anpassen oder das Skript ins Projekt kopieren.

## Zum Ansehen: GitHub Action

[`loesungen/lab-03/claude-review.yml`](../loesungen/lab-03/claude-review.yml) zeigt, wie derselbe Ansatz als GitHub Action läuft. Einrichten in einer Session mit `/install-github-app`.

## Erfolgskriterien

- [ ] Release Notes per Pipe erzeugt
- [ ] Kosten eines Aufrufs aus dem JSON abgelesen
- [ ] Katalog-Check liefert `0` bei sauberem und `1` bei fehlerhaftem Katalog
- [ ] `scripts/katalog-check.mjs` ist committet

## Lösung

[`loesungen/lab-03/`](../loesungen/lab-03/scripts/katalog-check.mjs)
