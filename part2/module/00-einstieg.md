# Einstieg: Wiederholung und Projekt vorbereiten (15 min)

## 1. Kurze Wiederholung (5 min)

Fragen in die Runde, jeweils eine Antwort einsammeln:

| Frage | Antwort |
|-------|---------|
| Wann wird eine geänderte `CLAUDE.md` wirksam? | Nach `/clear`, `/compact` oder Neustart |
| Was hat Vorrang: allow oder deny? | deny |
| Was erfasst `/rewind` nicht? | Änderungen per Shell (`rm`, `mv`, `npm install`) und außerhalb von Claude |
| Wo liegt ein Projekt-Skill? | `.claude/skills/<name>/SKILL.md` |

**Überleitung:** Heute geht es um alles, was über die einzelne Session hinausgeht. Wie bringt man Claude dazu, Regeln zuverlässig einzuhalten, ohne sie jedes Mal zu wiederholen? Wie läuft Claude ohne Menschen davor? Wie teilt man das alles im Team?

## 2. Die Bausteine im Überblick (3 min)

| Baustein | Was es ist | Wer entscheidet, wann es läuft |
|----------|-----------|-------------------------------|
| `CLAUDE.md` | Anweisungen im Kontext | Claude liest sie und befolgt sie meistens |
| Skill | Wiederverwendbare Anleitung | Du (`/name`) oder Claude (passende `description`) |
| Subagent | Eigener Helfer mit eigenem Kontext | Claude oder du delegierst |
| Hook | Skript bei einem Ereignis | Claude Code, **immer** |
| MCP-Server | Externe Tools und Daten | Claude, wenn es die Tools braucht |
| Plugin | Paket aus allem oben | Installation im Team |

**Merksatz:** `CLAUDE.md` ist eine Bitte, ein Hook ist eine Regel.

## 3. Projekt vorbereiten (7 min)

Den Endstand des Basiskurses als neues Arbeitsprojekt kopieren. Die Befehle im Kursordner ausführen, in dem `part1` und `part2` liegen:

```bash
cp -r part1/starter/mini-shop-solution ~/mini-shop-2
cd ~/mini-shop-2
git init && git add . && git commit -m "Startstand Aufbaukurs"
git branch -M main
npm test
```

```powershell
Copy-Item -Recurse part1/starter/mini-shop-solution $HOME/mini-shop-2
cd $HOME/mini-shop-2
git init; git add .; git commit -m "Startstand Aufbaukurs"
git branch -M main
npm test
```

**Erwartung:** 11 Tests grün.

Dann einmal interaktiv starten und dem Ordner vertrauen:

```bash
claude
```

> **Wichtig:** Diesen Schritt nicht überspringen. Ohne bestätigten Vertrauensdialog ignoriert Claude Code im Headless-Modus (Lab 3) die allow-Regeln aus `.claude/settings.json`.

## Sprechernotizen

- Wer den Basiskurs nicht besucht hat, bekommt die Tabelle aus Punkt 2 als Orientierung und das [Cheatsheet des Basiskurses](../../part1/cheatsheet.md).
- Die `.env` aus dem Basiskurs ist per `.gitignore` ausgeschlossen und wird nicht mitcommittet, liegt aber im Ordner.
