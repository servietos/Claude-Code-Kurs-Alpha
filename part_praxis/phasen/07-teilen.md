# Phase 7: Teilen und Vorstellen (20 min)

**Ziel:** Das Setup ist bereit für das ganze Team, und alle Teams lernen voneinander.

**Ergebnis:** Pull Request (oder bereiter Branch) mit dem Setup, ausgefüllter Steckbrief, kurze Vorstellung.

## 1. Pull Request vorbereiten (8 min)

Prüfen, was eingecheckt wird:

```bash
git status
git log --oneline main..claude-setup
git diff main --stat
```

Checkliste vor dem Push:

- [ ] Keine Secrets, keine `.claude/settings.local.json`
- [ ] Keine Platzhalter in eckigen Klammern in `CLAUDE.md`, Skill oder Agent
- [ ] Hooks laufen auf allen Betriebssystemen im Team (Node-Skripte, Matcher `Bash|PowerShell`)
- [ ] `.gitignore` enthält `.claude/settings.local.json`

PR-Beschreibung von Claude entwerfen lassen:

```text
Schreibe eine PR-Beschreibung für den Branch claude-setup. Erkläre für Kolleginnen und Kollegen, die nicht im Workshop waren: was hinzugefügt wurde (CLAUDE.md, Berechtigungen, Hooks, Skill, Reviewer), was sich für sie ändert, wie sie es nutzen und welche Regeln die Hooks erzwingen. Kurz und konkret.
```

Ob ihr den PR heute öffnet oder erst nach Rücksprache mit dem Team, entscheidet ihr. Wichtig ist, dass er bereit ist.

## 2. Vorstellung (10 min, je Team ca. 2 min)

Jedes Team zeigt:

1. **Die wichtigste Regel** in der `CLAUDE.md`
2. **Den Hook**, auf den ihr am meisten stolz seid
3. **Den Skill**: was er tut, eine Zeile Ergebnis
4. **Eine Überraschung** aus dem Praxistest

## 3. Ausblick (2 min)

- Das Setup ist ein Anfang. Nach zwei Wochen Nutzung im Team die `CLAUDE.md` und die Hooks überprüfen.
- Bei mehreren Repos mit ähnlichem Setup: Skill, Agent und Hooks als **Plugin** bündeln ([Aufbaukurs, Modul 5](../../part2/module/05-plugins.md)).
- Wiederkehrende Prüfungen in CI verschieben ([Aufbaukurs, Modul 3](../../part2/module/03-headless-ci.md)).

## Fertig, wenn

- [ ] Branch `claude-setup` ist gepusht bzw. PR ist bereit
- [ ] Steckbrief ist vollständig
- [ ] Team hat vorgestellt
