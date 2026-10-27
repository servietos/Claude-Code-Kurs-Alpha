# Claude Code Praxis-Workshop: Das eigene Repo einrichten (4 Stunden)

Im Workshop bringen die Teilnehmenden **ihr eigenes Projekt** mit. Am Ende hat jedes Team ein eingecheckt-fähiges Claude-Code-Setup: `CLAUDE.md`, Berechtigungen, Hooks, ein Skill für eine wiederkehrende Aufgabe und ein Reviewer-Agent. Das Setup wird an einer echten Aufgabe aus dem Backlog erprobt.

Theorie gibt es kaum, die steht im [Basiskurs](../part1/README.md) und im [Aufbaukurs](../part2/README.md). Hier wird angewendet.

## Zielgruppe und Voraussetzungen

- Teilnahme an [part1](../part1/README.md), idealerweise auch an [part2](../part2/README.md)
- Ein **eigenes Repo**, an dem die Person regelmäßig arbeitet, lokal geklont und lauffähig (Tests laufen)
- **Freigabe**, dieses Repo mit Claude Code zu bearbeiten (Firmenrichtlinie, siehe [Vorbereitung](vorbereitung.md#1-freigabe-klären))
- Node.js ≥ 20 für die Hook-Vorlagen, unabhängig von der Sprache des Projekts
- Am besten in **Teams von 2–3 Personen pro Repo**: Eine Person tippt, die anderen prüfen und bringen Wissen über das Projekt ein

## Ergebnis

| Artefakt | Datei im eigenen Repo |
|----------|----------------------|
| Projektgedächtnis | `CLAUDE.md` |
| Berechtigungen und Hooks | `.claude/settings.json`, `.claude/hooks/*.mjs` |
| Skill für eine wiederkehrende Aufgabe | `.claude/skills/<name>/SKILL.md` |
| Reviewer-Agent | `.claude/agents/reviewer.md` |
| Erprobt an einer echten Aufgabe | Branch mit Commit bzw. Pull Request |
| Steckbrief für das Team | [ergebnis-steckbrief.md](ergebnis-steckbrief.md), ausgefüllt |

## Agenda

| Zeit | Dauer | Phase | Material |
|------|-------|-------|----------|
| 0:00 | 15 min | Kickoff: Ziele, Teams, Repos prüfen | [phasen/00-kickoff.md](phasen/00-kickoff.md) |
| 0:15 | 30 min | **Phase 1:** Bestandsaufnahme mit Claude | [phasen/01-bestandsaufnahme.md](phasen/01-bestandsaufnahme.md) |
| 0:45 | 35 min | **Phase 2:** `CLAUDE.md` schreiben und testen | [phasen/02-claude-md.md](phasen/02-claude-md.md) |
| 1:20 | 10 min | ☕ Pause | |
| 1:30 | 30 min | **Phase 3:** Berechtigungen und Schutz | [phasen/03-berechtigungen.md](phasen/03-berechtigungen.md) |
| 2:00 | 30 min | **Phase 4:** Hooks für Qualität | [phasen/04-hooks.md](phasen/04-hooks.md) |
| 2:30 | 10 min | ☕ Pause | |
| 2:40 | 35 min | **Phase 5:** Skill und Reviewer | [phasen/05-skill-reviewer.md](phasen/05-skill-reviewer.md) |
| 3:15 | 25 min | **Phase 6:** Echte Aufgabe mit dem Setup | [phasen/06-echte-aufgabe.md](phasen/06-echte-aufgabe.md) |
| 3:40 | 20 min | **Phase 7:** Teilen und Vorstellen | [phasen/07-teilen.md](phasen/07-teilen.md) |

**Verhältnis:** ca. 15 min Input · 205 min eigene Arbeit · 20 min Pausen. Zu Beginn jeder Phase gibt es 2–3 Minuten Einführung.

## Ordnerstruktur

```text
part_praxis/
├── README.md                Diese Übersicht
├── vorbereitung.md          Was Teilnehmende vorher klären und mitbringen
├── moderation.md            Leitfaden für Trainer:innen
├── ergebnis-steckbrief.md   Vorlage: Zusammenfassung des Setups für das Team
├── phasen/                  Anleitung je Phase
└── vorlagen/                Kopiervorlagen für das eigene Repo
    ├── CLAUDE.md
    └── .claude/
        ├── settings.json
        ├── hooks/           block-commands.mjs, protect-files.mjs, run-check.mjs
        ├── skills/team-aufgabe/SKILL.md
        └── agents/reviewer.md
```

## Kein eigenes Repo möglich?

Dann arbeitet die Person mit dem Übungsprojekt [`../part1/starter/mini-shop`](../part1/starter/mini-shop/README.md) oder einem öffentlichen Open-Source-Projekt in einer vertrauten Sprache. Details in der [Moderation](moderation.md#fallback-ohne-eigenes-repo).
