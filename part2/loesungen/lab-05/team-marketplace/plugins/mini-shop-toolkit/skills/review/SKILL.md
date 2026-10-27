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
