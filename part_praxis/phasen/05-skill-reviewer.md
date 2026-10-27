# Phase 5: Skill und Reviewer (35 min)

**Ziel:** Eine wiederkehrende Aufgabe eures Teams wird zum Skill, und ein Reviewer-Agent prüft Änderungen gegen eure Regeln.

**Ergebnis:** `.claude/skills/<name>/SKILL.md` und `.claude/agents/reviewer.md`.

## Teil A: Skill für eine wiederkehrende Aufgabe (20 min)

### 1. Aufgabe festlegen (3 min)

Den Kandidaten aus der [Vorbereitung](../vorbereitung.md#4-eine-wiederkehrende-aufgabe-überlegen) nehmen. Gut geeignet ist eine Aufgabe, die:

- mindestens einmal pro Woche vorkommt
- einem festen Muster folgt (immer dieselben Dateien, dieselben Schritte)
- ein prüfbares Ergebnis hat

### 2. Skill entwerfen lassen (7 min)

Claude kennt das Projekt jetzt gut genug, um den Skill selbst zu entwerfen:

```text
Wir legen in diesem Projekt regelmäßig [Aufgabe] an. Schau dir zwei bestehende Beispiele an: [Pfad 1], [Pfad 2]. Erstelle daraus einen Projekt-Skill unter .claude/skills/[name]/SKILL.md nach dem Aufbau dieser Vorlage: [Pfad zu part_praxis/vorlagen/.claude/skills/team-aufgabe/SKILL.md]. Der Skill bekommt den Namen der neuen [Sache] als $ARGUMENTS. Die description soll klar sagen, wann der Skill genutzt wird.
```

### 3. Skill prüfen (4 min)

Erst technisch:

```bash
claude plugin validate .claude
```

Dann inhaltlich:

- Ist die `description` konkret genug, dass Claude den Skill im richtigen Moment wählt?
- Stimmen die Schritte mit eurer echten Arbeitsweise überein?
- Steht drin, wie das Ergebnis geprüft wird?
- Gibt es klare Grenzen (was der Skill nicht tut)?

### 4. Skill ausprobieren (6 min)

Session neu starten:

```text
/[name] [Beispiel-Argument]
```

Ergebnis reviewen. Passt es? Wenn nicht: `SKILL.md` anpassen, Änderungen mit Rewind (`Esc Esc`) verwerfen, erneut ausführen. Wenn das Ergebnis brauchbar ist, entweder behalten (falls ihr es ohnehin braucht) oder verwerfen. Nur den Skill committen.

## Teil B: Reviewer-Agent (15 min)

### 1. Vorlage übernehmen (3 min)

```bash
mkdir -p .claude/agents
cp <kursordner>/part_praxis/vorlagen/.claude/agents/reviewer.md .claude/agents/
```

```powershell
New-Item -ItemType Directory -Force .claude/agents
Copy-Item <kursordner>/part_praxis/vorlagen/.claude/agents/reviewer.md .claude/agents/
```

### 2. Auf euer Team zuschneiden (5 min)

In Schritt 3 der Vorlage die Platzhalter durch eure typischen Review-Befunde ersetzen. Fragt euch: **Was merkt ihr in Pull Requests immer wieder an?** Beispiele:

- fehlende Berechtigungsprüfung in Controllern
- SQL ohne Parameter
- fehlende Übersetzungen
- Logging von personenbezogenen Daten
- neue öffentliche API ohne Dokumentation

### 3. Ausprobieren (7 min)

Das Ergebnis aus Teil A (oder eine kleine Änderung) als Prüfobjekt nehmen. Session neu starten:

```text
Lass den Subagent reviewer die aktuellen Änderungen prüfen.
```

Bewertet die Befunde im Team: Welche sind berechtigt? Welche sind Rauschen? Rauschen per Anpassung im Agent-Prompt reduzieren ("Melde keine Stilfragen, die der Linter abdeckt").

## Fertig, wenn

- [ ] Skill existiert, wird mit `/[name]` aufgerufen und liefert ein brauchbares Ergebnis
- [ ] Reviewer enthält mindestens zwei team-spezifische Prüfpunkte
- [ ] Reviewer hat einmal echte Änderungen geprüft
- [ ] Beides committet
- [ ] Steckbrief: Abschnitt Skill und Reviewer ergänzt

## Stolperfallen

- **Skill zu allgemein** ("Hilft bei der Entwicklung"): Claude wählt ihn nie automatisch. Eine Aufgabe pro Skill.
- **Skill erscheint nicht:** Ordnerstruktur `.claude/skills/<name>/SKILL.md` prüfen, Session neu starten.
- **`description` beginnt mit `[`:** YAML liest das als Liste, Claude Code verwirft die Beschreibung stillschweigend. Text ohne eckige Klammer am Anfang schreiben oder in Anführungszeichen setzen. Prüfen mit `claude plugin validate .claude`.
- **Reviewer zu streng oder zu laut:** Schweregrade definieren und "nur hoch und mittel melden" ergänzen.
