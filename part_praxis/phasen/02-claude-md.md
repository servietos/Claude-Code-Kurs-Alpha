# Phase 2: CLAUDE.md schreiben und testen (35 min)

**Ziel:** Eine kurze, verbindliche `CLAUDE.md`, die die Lücken aus Phase 1 schließt, und ein Nachweis, dass Claude sie befolgt.

**Ergebnis:** `CLAUDE.md` im Repo-Root, committet.

## Schritt 1: Entwurf (10 min)

**Gibt es noch keine `CLAUDE.md`:**

```text
/init
```

Danach mit der [Vorlage](../vorlagen/CLAUDE.md) abgleichen. Fehlen Abschnitte, ergänzen lassen:

```text
Überarbeite CLAUDE.md nach dieser Gliederung: Befehle, Architektur, Konventionen, Regeln, Stolperfallen. Übernimm diese Punkte aus unserer Bestandsaufnahme: [Liste aus Phase 1, rechte Spalte]. Halte die Datei unter 60 Zeilen. Lass alles weg, was man direkt aus dem Code ablesen kann.
```

**Gibt es schon eine:** mit der Tabelle aus Phase 1 vergleichen und nur die Lücken ergänzen. Bestehende Inhalte nicht ohne Rücksprache mit dem Team umschreiben.

## Schritt 2: Kürzen und schärfen (10 min)

Gemeinsam Zeile für Zeile durchgehen:

| Frage | Wenn ja |
|-------|---------|
| Würde Claude das auch ohne diese Zeile richtig machen? | Streichen |
| Ist die Regel vage ("sauberen Code schreiben")? | Konkret machen oder streichen |
| Ist es eine harte Regel, die nie gebrochen werden darf? | `**WICHTIG:**` voranstellen, in Phase 3/4 zusätzlich als Hook absichern |
| Ist es eine persönliche Vorliebe? | In `~/.claude/CLAUDE.md` verschieben |
| Gilt es nur für einen Unterordner? | Eigene `CLAUDE.md` in diesem Ordner |

## Schritt 3: Wirksam machen und testen (15 min)

```text
/clear
```

```text
/memory
```

Prüfen, dass die neue `CLAUDE.md` geladen ist. Dann **drei Testfragen**, deren Antworten nur mit der `CLAUDE.md` richtig sein können:

```text
Wie führe ich in diesem Projekt einen einzelnen Test aus?
```

```text
Ich möchte [etwas, das gegen eine eurer Regeln verstößt, z. B. "eine neue Bibliothek für Datumsberechnung hinzufügen"]. Wie gehe ich vor?
```

```text
Wo würdest du [eine typische neue Funktion] anlegen und warum?
```

**Erwartung:** Claude nennt die richtigen Befehle, weist auf die Regel hin und folgt den Konventionen. Wo nicht: `CLAUDE.md` präzisieren, `/clear`, erneut fragen.

Danach committen:

```text
Committe CLAUDE.md mit einer passenden Commit-Message nach unseren Konventionen.
```

## Fertig, wenn

- [ ] `CLAUDE.md` unter 60 Zeilen, ohne Platzhalter in eckigen Klammern
- [ ] Alle drei Testfragen korrekt beantwortet
- [ ] Committet auf `claude-setup`
- [ ] Steckbrief: Abschnitt CLAUDE.md ergänzt (wichtigste Regeln)

## Stolperfallen

- **Zu lang:** Der häufigste Fehler. Lieber 25 präzise Zeilen als 150 vage.
- **`/init` überschreibt nichts**, schlägt aber Änderungen vor. Diffs genau lesen.
- **Regeln, die Claude trotzdem bricht:** nicht noch fetter schreiben, sondern in Phase 4 als Hook erzwingen.
