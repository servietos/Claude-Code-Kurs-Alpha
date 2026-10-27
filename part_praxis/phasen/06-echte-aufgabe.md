# Phase 6: Echte Aufgabe mit dem Setup (25 min)

**Ziel:** Das komplette Setup an einer echten Aufgabe aus dem Backlog erproben. Wirkt alles zusammen?

**Ergebnis:** die Aufgabe erledigt (oder klar dokumentiert, woran es hing) und eine Liste mit Nachbesserungen am Setup.

## Ablauf

| Minute | Schritt |
|--------|---------|
| 0–2 | Neue Session, `/clear`, Aufgabe aus der [Vorbereitung](../vorbereitung.md#3-eine-echte-aufgabe-aussuchen) bereitlegen |
| 2–7 | **Erkunden und planen** im Plan Mode |
| 7–17 | **Umsetzen**, Hooks beobachten |
| 17–21 | **Review** mit dem Reviewer-Agent |
| 21–25 | **Commit** und Beobachtungen festhalten |

## 1. Erkunden und planen (5 min)

Plan Mode aktivieren (`Shift+Tab`):

```text
Aufgabe: [Aufgabe in einem Satz, ggf. Ticket-Text einfügen]
Erfolgskriterium: [Test / erwartetes Verhalten]
Erstelle einen Plan. Nenne die Dateien, die du ändern willst, und die Tests, die du schreiben oder anpassen willst.
```

Plan im Team prüfen, ggf. Feedback geben, dann freigeben.

## 2. Umsetzen (10 min)

Claude arbeitet. Das Team beobachtet und notiert:

- Greift der Check-Hook nach Änderungen? Wie oft?
- Wurde ein Schutz-Hook ausgelöst? War das richtig?
- Kam eine Rückfrage, die per allow-Regel hätte vermieden werden können?
- Hat Claude eine Regel aus der `CLAUDE.md` befolgt oder ignoriert?

## 3. Review (4 min)

```text
Lass den Subagent reviewer die Änderungen prüfen.
```

Berechtigte Befunde beheben lassen.

## 4. Commit und Beobachtungen (4 min)

```text
Erstelle einen Commit nach unseren Konventionen.
```

Dann die Beobachtungen in den Steckbrief übertragen:

| Beobachtung | Nachbesserung am Setup |
|-------------|----------------------|
| z. B. "Claude fragte dreimal nach `npm run build`" | `Bash(npm run build)` in allow |
| z. B. "Claude legte Datei im falschen Ordner an" | Architektur-Abschnitt in `CLAUDE.md` präzisieren |
| z. B. "Check-Hook dauerte 40 s" | Auf Typecheck umstellen |

Kleine Nachbesserungen sofort umsetzen und committen, größere als TODO festhalten.

## Fertig, wenn

- [ ] Aufgabe erledigt und committet, oder Blocker dokumentiert
- [ ] Mindestens zwei Beobachtungen mit Nachbesserung festgehalten
- [ ] Steckbrief: Abschnitt Praxistest ergänzt

## Wenn die Aufgabe zu groß ist

Nach 10 Minuten ohne absehbares Ende: abbrechen, einen Teilschritt herausgreifen ("nur den Test schreiben", "nur die Ursache finden") und den fertigstellen. Das Ziel dieser Phase ist der Test des Setups, die Aufgabe selbst ist zweitrangig.
