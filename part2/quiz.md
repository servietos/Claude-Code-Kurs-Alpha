# Wissenscheck Aufbaukurs

Zehn Fragen für den Abschluss. Lösungen am Ende.

**1. Was ist der wichtigste Vorteil eines Subagents bei einer großen Recherche?**

- A) Er ist immer schneller als die Haupt-Session
- B) Er liest in seinem eigenen Kontext; zurück kommt nur das Ergebnis
- C) Er braucht keine Berechtigungen
- D) Er kennt den kompletten Chatverlauf

**2. Ein Reviewer-Agent soll garantiert keine Dateien ändern. Was ist am wirksamsten?**

- A) "Ändere niemals Dateien" in den Systemprompt schreiben
- B) `model: haiku` setzen
- C) In `tools` nur lesende Tools eintragen (z. B. Read, Grep, Glob)
- D) Die `description` verlängern

**3. Ein PreToolUse-Hook beendet sich mit Exit-Code 2 und schreibt eine Meldung auf STDERR. Was passiert?**

- A) Claude Code stürzt ab
- B) Das Tool wird blockiert, Claude erhält die Meldung und reagiert darauf
- C) Die Meldung wird ignoriert
- D) Das Tool läuft, die Meldung wird protokolliert

**4. Unter Windows soll ein Hook jede Paketinstallation verhindern. Welcher Matcher ist richtig?**

- A) `"Bash"`
- B) `"Edit|Write"`
- C) `"Bash|PowerShell"`
- D) Kein Matcher nötig

**5. Warum eignet sich ein Hook besser als eine Zeile in `CLAUDE.md`, um "keine npm-Pakete" durchzusetzen?**

- A) Hooks sind kürzer
- B) Claude Code führt Hooks immer aus; `CLAUDE.md` wird meistens befolgt
- C) `CLAUDE.md` wird im Headless-Modus nicht geladen
- D) Hooks kosten keine Tokens und sind deshalb genauer

**6. Ein Skript braucht von Claude ein verlässlich verarbeitbares Ergebnis `{ok, findings}`. Welche Kombination?**

- A) `claude -p "…" --output-format text`
- B) `claude -p "…" --output-format json --json-schema '<schema>'`
- C) `claude "…" --model opus`
- D) `claude -c --output-format stream-json`

**7. `claude -p` ignoriert in einem neuen Ordner die allow-Regeln aus `.claude/settings.json`. Warum?**

- A) allow-Regeln gelten nie im Headless-Modus
- B) Dem Ordner wurde noch nicht per Vertrauensdialog vertraut
- C) Die Datei muss `settings.headless.json` heißen
- D) `--output-format json` schaltet Regeln ab

**8. Zwei Claude-Sessions sollen gleichzeitig zwei Features bauen. Was verhindert, dass sie sich gegenseitig Dateien überschreiben?**

- A) Zwei Terminals im selben Ordner
- B) `/compact` in beiden Sessions
- C) Je ein Git Worktree, z. B. mit `claude -w <name>`
- D) Unterschiedliche Modelle

**9. In einem Plugin soll ein Hook ein mitgeliefertes Skript aufrufen. Wie lautet der Pfad?**

- A) `$CLAUDE_PROJECT_DIR/scripts/x.mjs`
- B) `${CLAUDE_PLUGIN_ROOT}/scripts/x.mjs`
- C) `~/.claude/plugins/x.mjs`
- D) `./scripts/x.mjs` relativ zum Projekt

**10. Wie verteilt man ein Plugin an das Team?**

- A) Per Mail als ZIP, jede Person kopiert es nach `.claude/`
- B) Über einen Marketplace: `claude plugin marketplace add …`, dann `claude plugin install <plugin>@<marketplace>`
- C) Über `/init`
- D) Das geht nur über Managed Settings

---

## Lösungen

| Frage | Antwort | Kurzbegründung |
|-------|---------|----------------|
| 1 | B | Eigener Kontext, nur das Ergebnis kommt zurück |
| 2 | C | Fehlende Tools sind eine Garantie, ein Prompt ist eine Bitte |
| 3 | B | Exit 2 blockiert, STDERR geht an Claude |
| 4 | C | Unter Windows gibt es ein eigenes PowerShell-Tool |
| 5 | B | Hooks laufen deterministisch |
| 6 | B | Ergebnis im Feld `structured_output` |
| 7 | B | Vertrauensdialog einmal interaktiv bestätigen |
| 8 | C | Worktrees trennen die Arbeitsverzeichnisse |
| 9 | B | `${CLAUDE_PLUGIN_ROOT}` zeigt auf den Plugin-Ordner |
| 10 | B | Marketplaces sind der vorgesehene Weg (Pfad, Git-Repo oder URL) |
