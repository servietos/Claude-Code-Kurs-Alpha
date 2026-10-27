# Vorbereitung für Teilnehmende

Bitte **mindestens zwei Tage vorher** erledigen. Ohne Punkt 1 und 2 ist der Workshop nur mit dem Übungsprojekt möglich.

## 1. Freigabe klären

Claude Code sendet Code und Dateiinhalte zur Verarbeitung an Anthropic bzw. an den Anbieter, über den euer Unternehmen Claude nutzt (z. B. Amazon Bedrock, Google Vertex AI). Bitte vorab klären:

- [ ] Darf dieses Repo mit Claude Code bearbeitet werden? (Richtlinie, Vorgesetzte, Security)
- [ ] Welches Konto wird genutzt? (Team/Enterprise-Konto des Unternehmens, nicht privat)
- [ ] Enthält das Repo Secrets, Kundendaten oder personenbezogene Daten? Wenn ja: Wo liegen sie, und können sie für den Workshop ausgeschlossen werden?

## 2. Repo vorbereiten

- [ ] Repo lokal geklont und aktuell
- [ ] Projekt lässt sich bauen, Tests laufen lokal (Befehl notieren: `__________`)
- [ ] Ein frischer Branch für den Workshop:

```bash
git switch -c claude-setup
```

- [ ] `git status` ist sauber
- [ ] Prüfen, ob es schon eine `CLAUDE.md` oder einen `.claude/`-Ordner gibt. Falls ja: im Workshop darauf aufbauen.

## 3. Eine echte Aufgabe aussuchen

Für Phase 6 eine kleine, echte Aufgabe aus dem Backlog mitbringen:

- in **20 Minuten** machbar (ein kleiner Bug, ein kleines Feature, ein fehlender Test, ein Refactoring einer Funktion)
- mit klarem Prüfkriterium (Test, erwartetes Verhalten)
- ohne Abhängigkeit von Systemen, die lokal nicht laufen

Aufgabe in einem Satz: `______________________________________________`

## 4. Eine wiederkehrende Aufgabe überlegen

Für Phase 5: Was macht ihr im Team immer wieder nach dem gleichen Muster? Beispiele:

- neuen Endpunkt / neue Komponente / neue Migration anlegen
- Changelog oder Release Notes schreiben
- Testdaten erzeugen
- einen Bug nach Ticket-Vorlage analysieren
- Abhängigkeits-Update mit Prüfung

Kandidat: `______________________________________________`

## 5. Technik

- [ ] Claude Code ≥ 2.1 (`claude --version`), angemeldet
- [ ] Node.js ≥ 20 (`node --version`) für die Hook-Vorlagen
- [ ] Im Repo einmal `claude` gestartet und dem Ordner vertraut

---

## Vorlage: Einladungs-Mail

**Betreff:** Claude Code Praxis-Workshop am [Datum] – bitte euer Repo vorbereiten

Hallo zusammen,

im Praxis-Workshop am [Datum] richten wir Claude Code für **eure eigenen Projekte** ein. Damit wir die vier Stunden voll nutzen können, bitte ich euch, vorab die Checkliste unter [Link zu vorbereitung.md] durchzugehen. Besonders wichtig:

1. **Freigabe:** Klärt bitte, ob euer Repo mit Claude Code bearbeitet werden darf.
2. **Lauffähig:** Das Projekt muss lokal bauen und die Tests müssen laufen.
3. **Eine kleine echte Aufgabe** (ca. 20 Minuten) und **eine wiederkehrende Aufgabe** aus eurem Alltag mitbringen.

Ideal sind Teams von 2–3 Personen pro Repo. Bitte meldet mir bis [Datum], mit welchem Repo ihr kommt und mit wem ihr zusammenarbeitet.

Wer kein eigenes Repo nutzen darf, arbeitet mit einem Übungsprojekt, das ich mitbringe.

Viele Grüße
[Name]
