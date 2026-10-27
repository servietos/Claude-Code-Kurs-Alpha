# Modul 4: Parallel arbeiten (10 min)

## Lernziele

- Git Worktrees verstehen und mit Claude Code nutzen
- Sessions im Hintergrund starten und verwalten
- Parallele Ergebnisse sauber zusammenführen

## 1. Das Problem

Zwei Claude-Sessions im selben Ordner arbeiten an denselben Dateien, überschreiben sich gegenseitig und mischen ihre Änderungen in einem Branch.

## 2. Git Worktrees

Ein Worktree ist ein zusätzliches Arbeitsverzeichnis desselben Repos mit eigenem Branch. Alle teilen sich die Git-Historie, aber jede Session hat ihre eigenen Dateien.

```text
mini-shop-2/              Branch main         ← du
…/feature-student/        Branch feature-…    ← Session A
…/feature-format/         Branch feature-…    ← Session B
```

**Mit Claude Code:**

| Befehl | Wirkung |
|--------|---------|
| `claude -w feature-student` | Neue Session in einem neuen Worktree |
| `claude --worktree` | Name wird erzeugt |

**Von Hand:**

```bash
git worktree add ../mini-shop-student -b feature-student
git worktree list
git worktree remove ../mini-shop-student
```

Danach normal zusammenführen: `git merge feature-student` (oder Pull Request).

## 3. Sessions im Hintergrund

| Befehl | Wirkung |
|--------|---------|
| `claude --bg "Aufgabe"` | Startet die Session im Hintergrund, gibt eine ID aus |
| `claude agents` | Übersicht aller laufenden Sessions |
| `claude attach <id>` | In eine Session einsteigen |
| `claude logs <id>` | Verlauf ansehen |
| `claude stop <id>` | Beenden |

Kombinierbar: Hintergrund-Sessions für unabhängige Aufgaben, jede in ihrem eigenen Worktree.

## 4. Faustregeln

- Nur **unabhängige** Aufgaben parallelisieren. Zwei Features, die dieselbe Funktion ändern, erzeugen Merge-Konflikte.
- Jeder Auftrag muss für sich vollständig sein: Ziel, Dateien, Tests, "committe am Ende".
- Du bleibst der Engpass: Drei parallele Sessions heißen drei Reviews.
- Nach dem Merge Worktrees aufräumen.

## Sprechernotizen

- Demo: zwei Terminals nebeneinander, links `claude -w a`, rechts `claude -w b`, danach `git worktree list` zeigen.
- Frage an die Gruppe: Welche Aufgaben aus eurem Alltag sind wirklich unabhängig voneinander?
