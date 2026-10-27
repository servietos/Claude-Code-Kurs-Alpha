# Kickoff: Ziele, Teams, Repos prüfen (15 min)

## Ablauf

| Minute | Was |
|--------|-----|
| 0–5 | Ziel des Tages und Ergebnis-Tabelle aus der [README](../README.md#ergebnis) zeigen |
| 5–10 | Teams bilden, jedes Team nennt Repo, Sprache, Testbefehl |
| 10–15 | Technik-Check in jedem Team (siehe unten) |

## Arbeitsweise im Team

- **Eine Person tippt**, die anderen lesen mit, prüfen Diffs und bringen Projektwissen ein
- Rollen nach jeder Phase wechseln
- Alles passiert auf dem Branch `claude-setup`, nichts wird ohne Review gepusht

## Technik-Check (je Team)

```bash
git status
git branch --show-current
claude --version
node --version
```

Dann den Testbefehl des Projekts einmal laufen lassen.

**Erwartung:** sauberer Branch `claude-setup`, Claude Code ≥ 2.1, Node ≥ 20, Tests laufen (auch rote Tests sind ok, solange sie laufen).

## Ausgangslage festhalten

Öffnet die [Vorlage für den Steckbrief](../ergebnis-steckbrief.md), kopiert sie ins eigene Repo (z. B. nach `docs/claude-setup.md` oder vorerst lokal) und füllt den Abschnitt **Ausgangslage** aus. Ihr ergänzt den Steckbrief in jeder Phase.

## Fertig, wenn

- [ ] Team und Repo stehen fest
- [ ] Branch `claude-setup` ist ausgecheckt, `git status` sauber
- [ ] Tests laufen lokal
- [ ] Steckbrief: Abschnitt Ausgangslage ausgefüllt
