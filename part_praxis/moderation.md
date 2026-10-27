# Moderation: Leitfaden für Trainer:innen

## Vorbereitung

| Wann | Was |
|------|-----|
| 2 Wochen vorher | Einladung mit [Mail-Vorlage](vorbereitung.md#vorlage-einladungs-mail) verschicken, Teams und Repos einsammeln |
| 1 Woche vorher | Bei Security/Datenschutz klären, ob die gemeldeten Repos freigegeben sind. Unklare Fälle: Fallback einplanen |
| 2 Tage vorher | Jedes Team kurz anschreiben: Läuft der Testbefehl? |
| Am Tag | Fallback-Projekte bereithalten, Vorlagen als ZIP auf einem Stick oder Share |

## Rolle im Workshop

Im Praxis-Workshop ist die Trainerin bzw. der Trainer vor allem **Coach**:

- Zu Beginn jeder Phase 2–3 Minuten: Ziel, Ergebnis, Hinweis auf die Phasen-Datei
- Danach von Team zu Team gehen, Fragen stellen statt Lösungen vorgeben
- Nach jeder Phase 1 Minute: "Welches Team ist fertig? Wo hängt es?"

**Gute Coaching-Fragen:**

- "Woran merkt ihr, dass Claude die Regel befolgt?"
- "Was passiert, wenn eine neue Kollegin das morgen benutzt?"
- "Würde diese Zeile in der CLAUDE.md fehlen, würde Claude es dann falsch machen?"
- "Habt ihr den Hook von Hand getestet, bevor ihr Claude gestartet habt?"

## Getestete Vorlagen

Die Hook-Vorlagen wurden vorab mit Beispiel-Eingaben getestet (Windows 11, Node 24):

| Vorlage | Getestet |
|---------|----------|
| `block-commands.mjs` | Blockiert: `git push --force`, `git push origin main`, `rm -rf`, `rm -fr`, `Remove-Item -Recurse -Force`, `cat .env`, `Get-Content .env.local`, `cat config/.env`. Erlaubt: Push auf Feature-Branch, `rm` einzelner Dateien, `cat .env.example`, `npm test` |
| `protect-files.mjs` | Blockiert: `.env`, `.env.production`, `package-lock.json` (auch mit Windows-Backslash-Pfad), `.github/workflows/`, `migrations/`. Erlaubt: `.env.example`, `src/…`, relative Pfade |
| `run-check.mjs` | Exit 0 bei grünem Projekt, Exit 2 mit Testausgabe bei rotem Projekt, Exit 0 bei nicht passenden Dateitypen |

Die Hooks wurden in diesem Workshop-Setup **nicht** in einer echten Claude-Session ausgeführt. Im Aufbaukurs (part2) wurde ein gleich aufgebauter Hook über `--plugin-dir` erfolgreich in Claude getestet.

## Fallback ohne eigenes Repo

| Situation | Lösung |
|-----------|--------|
| Keine Freigabe für Firmencode | [`part1/starter/mini-shop`](../part1/starter/mini-shop/README.md) (Node, klein) oder ein öffentliches Open-Source-Projekt in der Sprache der Person |
| Repo lässt sich lokal nicht bauen | Zu einem anderen Team dazusetzen, gemeinsam an dessen Repo arbeiten |
| Riesiges Monorepo | Ein Paket/Service auswählen, `CLAUDE.md` in dessen Ordner |
| Keine Tests im Repo | Phase 4 mit Linter oder Typecheck, in Phase 6 als Aufgabe "ersten Test schreiben" |

Gute öffentliche Repos für den Fallback: klein bis mittelgroß, mit laufender Testsuite, aktive Pflege. Vorab selbst einmal klonen und Tests ausführen.

## Typische Probleme

| Problem | Lösung |
|---------|--------|
| Team verliert sich in Phase 1 in Architektur-Diskussionen | Timebox ansagen, Tabelle ausfüllen lassen |
| `CLAUDE.md` wird sehr lang | "Was davon würde Claude ohne diese Zeile falsch machen?" |
| Hook greift nicht | `/hooks` prüfen, Session neu starten, Pfad mit `$CLAUDE_PROJECT_DIR`, Hook von Hand testen |
| Hook greift unter Windows nur halb | Matcher `Bash\|PowerShell` |
| Check-Hook zu langsam | Auf Typecheck/Lint oder Teilmenge der Tests umstellen |
| Bestehende `.claude/settings.json` überschrieben | Mit `git diff` / `git checkout -- .claude/settings.json` zurückholen und mergen |
| Skill wird nicht gefunden | Pfad `.claude/skills/<name>/SKILL.md`, Frontmatter mit `---`, Session neu starten |
| Phase 6: Aufgabe zu groß | Nach 10 Minuten auf Teilschritt reduzieren |
| Rate-Limit erreicht | Auf Sonnet wechseln, Reviewer-Agent auf Haiku stellen |

## Zeitpuffer

| Kürzen | Gewinn |
|--------|--------|
| Phase 4 Schritt 5 (Formatter) weglassen | ~2 min |
| Phase 5 Teil B: Vorlage unverändert übernehmen, nur testen | ~5 min |
| Phase 7: Vorstellung auf 1 min pro Team | ~5 min |

Läuft es gut, ist Phase 6 der Ort für Zusatzzeit: eine zweite Aufgabe nehmen.

## Nachbereitung

- Steckbriefe einsammeln (mit Einverständnis der Teams). Sie zeigen, wo die Kurse part1 und part2 nachgeschärft werden sollten.
- Nach 2–4 Wochen ein kurzes Follow-up (30 min): Was wird genutzt, was wurde wieder entfernt, welche Hooks haben sich bewährt?
