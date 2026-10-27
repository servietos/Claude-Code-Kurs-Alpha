# Lab 1: Reviewer und Testschreiber als Subagents (25 min)

**Ziel:** Du legst zwei Subagents an, einen nur lesenden Reviewer auf Sonnet und einen Testschreiber auf Haiku, und lässt sie an einem echten Feature zusammenarbeiten.

Arbeitsverzeichnis: `~/mini-shop-2` (siehe [Einstieg](../module/00-einstieg.md#3-projekt-vorbereiten-7-min))

## Schritt 1: Code-Reviewer anlegen (6 min)

**Variante A, interaktiv:** In der Session `/agents` aufrufen, "Create new agent", Projekt-Ebene wählen und den Assistenten nutzen.

**Variante B, als Datei:** Lege `.claude/agents/code-reviewer.md` an:

```markdown
---
name: code-reviewer
description: Prüft Änderungen im mini-shop auf Bugs, Randfälle und Verstöße gegen CLAUDE.md. Proaktiv nach jeder Code-Änderung einsetzen. Ändert keinen Code.
tools: Read, Grep, Glob, Bash
model: sonnet
---

Du bist ein erfahrener Reviewer für den mini-shop.

Vorgehen:
1. Führe `git diff` aus (leer: `git diff HEAD~1`) und lies die geänderten Dateien vollständig.
2. Prüfe auf Logikfehler, Randfälle (leerer Warenkorb, Menge 0 oder negativ, unbekannte SKU), Geldbeträge als Float statt Cent, neue Abhängigkeiten und fehlende Tests.
3. Antworte ausschließlich mit einer Tabelle: Datei | Zeile | Schweregrad (hoch/mittel/niedrig) | Befund | Vorschlag.
4. Gibt es keine Befunde, antworte mit „Keine Befunde“.

Ändere niemals Dateien. Führe nur lesende Befehle aus.
```

## Schritt 2: Test-Writer anlegen (4 min)

Lass diesmal Claude die Datei schreiben:

```text
Lege einen Projekt-Subagent .claude/agents/test-writer.md an. Er nutzt das Modell haiku und die Tools Read, Grep, Glob, Edit, Write, Bash. Er schreibt Tests mit node:test und node:assert/strict im Stil der Dateien unter test/, Testnamen auf Deutsch, deckt Randfälle ab, ändert nie Code unter src/ und meldet einen Bug, statt einen roten Test anzupassen. Am Ende führt er npm test aus und berichtet kurz.
```

Danach Session neu starten (`/exit`, `claude`) und mit `/agents` prüfen, ob beide Agents erscheinen.

## Schritt 3: Feature mit Delegation (12 min)

**Anforderung:** `removeItem(cart, sku, quantity)` soll eine Menge entfernen können. Ohne `quantity` wird die Position komplett entfernt (wie bisher). Erreicht die Menge 0 oder weniger, verschwindet die Position. Eine unbekannte SKU löst einen Fehler aus.

### 1. Selbst implementieren (Haupt-Session)

```text
Erweitere removeItem in src/cart.js um einen optionalen Parameter quantity. [Anforderung von oben einfügen] Schreibe noch keine Tests.
```

### 2. Tests delegieren

```text
Lass den Subagent test-writer Tests für das neue Verhalten von removeItem schreiben.
```

Beobachte: Claude zeigt an, dass ein Subagent arbeitet. Welches Modell läuft? Was kommt zurück?

### 3. Review delegieren

```text
Lass den Subagent code-reviewer die aktuellen Änderungen prüfen.
```

### 4. Befunde bewerten

Behebe nur, was du nach eigenem Lesen für berechtigt hältst. Dann committen.

## Schritt 4: Kontext vergleichen (3 min)

```text
/context
```

Vergleiche mit einer Kollegin oder einem Kollegen, die bzw. der das Review **ohne** Subagent in der Haupt-Session machen ließ. Wessen Kontext ist voller?

## Erfolgskriterien

- [ ] `/agents` zeigt `code-reviewer` und `test-writer`
- [ ] `removeItem` mit `quantity` funktioniert, neue Tests sind grün
- [ ] Der Reviewer hat eine Tabelle geliefert und nichts geändert
- [ ] Ein sauberer Commit

## Bonus

Teste die Grenze: Bitte den `code-reviewer` ausdrücklich, einen Befund "gleich selbst zu beheben". Was passiert, und warum? Was müsstest du an der `tools`-Zeile ändern, damit er auch über Bash nichts schreiben kann?

Tipp: `Bash` ganz weglassen und den `git diff` vorab in den Auftrag geben, oder eine deny-Regel für schreibende Befehle.

## Lösung

[`loesungen/lab-01/.claude/agents/`](../loesungen/lab-01/.claude/agents/code-reviewer.md)
