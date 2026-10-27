# Lab 5: Eigenen Skill bauen (+ optional MCP) (25 min)

**Ziel:** Du baust einen wiederverwendbaren Skill und rufst ihn als Slash-Command auf. Optional bindest du einen MCP-Server ein.

## Vorbereitung (1 min)

Aus Lab 4 ist noch die Änderung an `data/products.json` offen. Damit `/review` gleich nur den Fehler aus diesem Lab sieht, erst aufräumen:

```text
Committe die offene Änderung an data/products.json.
```

`!git status` muss danach sauber sein.

## Teil A: Skill `/review` (12 min)

### 1. Skill anlegen

Lege die Datei `.claude/skills/review/SKILL.md` an:

```markdown
---
name: review
description: Reviewt die aktuellen Git-Änderungen im mini-shop auf Bugs, Randfälle, Einhaltung der CLAUDE.md-Regeln und fehlende Tests. Verwenden, wenn ein Code-Review gewünscht ist.
---

# Code Review

1. Führe `git diff` aus. Ist der Diff leer, nutze `git diff HEAD~1`.
2. Lies die geänderten Dateien vollständig.
3. Prüfe auf:
   - Logikfehler und Randfälle (leerer Warenkorb, negative Beträge)
   - Verstöße gegen die Regeln in CLAUDE.md (Cent statt Float, keine Abhängigkeiten)
   - Fehlende Tests
4. Gib das Ergebnis als Tabelle aus: Datei | Zeile | Schweregrad (hoch/mittel/niedrig) | Befund | Vorschlag
5. Ändere keinen Code.

Fokus (falls angegeben): $ARGUMENTS
```

### 2. Skill nutzen

Nimm eine kleine, bewusst fehlerhafte Änderung vor (nicht committen), z. B. in `src/cart.js`:

```javascript
const VAT_RATE = 0.2;
```

Dann:

```text
/review
```

```text
/review Fokus auf Steuerberechnung
```

**Erwartung:** Eine Tabelle mit dem Befund zur Mehrwertsteuer. Danach die Änderung mit `git checkout -- src/cart.js` verwerfen.

## Teil B: Claude baut einen Skill (8 min)

```text
Erstelle einen Projekt-Skill "release-notes" unter .claude/skills/. Er soll aus den Git-Commits seit dem ersten Commit Release Notes auf Deutsch erzeugen, gruppiert nach "Neu", "Behoben" und "Sonstiges", und sie in CHANGELOG.md schreiben.
```

Prüfe die erzeugte `SKILL.md`: Ist die `description` präzise? Dann:

```text
/release-notes
```

## Teil C (optional): MCP-Server einbinden (5 min)

Voraussetzung: Chrome ist installiert.

Session beenden, dann im Terminal:

```bash
claude mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
claude mcp list
```

Neue Session starten:

```text
/mcp
```

```text
Öffne https://example.com im Browser und sag mir, welche Überschrift die Seite hat.
```

**Erwartung:** Claude nutzt die Tools des MCP-Servers, öffnet Chrome und liest die Seite aus.

Entfernen mit `claude mcp remove chrome-devtools`.

## Erfolgskriterien

- [ ] `/review` funktioniert und liefert eine Befund-Tabelle
- [ ] Ein von Claude generierter Skill `release-notes` erzeugt eine `CHANGELOG.md`
- [ ] (optional) Ein MCP-Server ist verbunden und wurde genutzt

## Bonus

Committe `.claude/skills/` und `.claude/settings.json`. Damit stehen Skills und Berechtigungen allen im Team zur Verfügung, die das Repo klonen.
