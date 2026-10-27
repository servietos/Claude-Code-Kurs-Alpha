# Wissenscheck

Zehn Fragen für den Abschluss. Lösungen am Ende.

**1. Wodurch unterscheidet sich Claude Code von Claude.ai im Browser?**

- A) Es nutzt ein anderes Sprachmodell
- B) Es arbeitet direkt im Repository, liest/ändert Dateien und führt Befehle aus
- C) Es funktioniert nur offline
- D) Es ist nur für Python geeignet

**2. Du möchtest eine Änderung über viele Dateien erst durchdenken lassen, ohne dass etwas verändert wird. Was nutzt du?**

- A) acceptEdits
- B) `/compact`
- C) Plan Mode
- D) `claude -p`

**3. Du änderst mitten in einer Session die `CLAUDE.md`. Claude ignoriert die neue Regel. Warum?**

- A) `CLAUDE.md` wird beim Session-Start geladen; die Änderung greift nach `/clear`, `/compact` oder Neustart
- B) Regeln müssen in Englisch formuliert sein
- C) `CLAUDE.md` wird nur in Unterordnern gelesen
- D) Man muss `/init` erneut ausführen

**4. Welche Datei eignet sich für Berechtigungsregeln, die das ganze Team teilen soll?**

- A) `~/.claude/settings.json`
- B) `.claude/settings.local.json`
- C) `.claude/settings.json`
- D) `CLAUDE.md`

**5. Eine Regel steht in `allow` und dieselbe in `deny`. Was gilt?**

- A) allow
- B) deny
- C) Die zuletzt geschriebene
- D) Claude fragt jedes Mal

**6. Claude hat per `rm` eine Datei gelöscht. Kann `/rewind` sie wiederherstellen?**

- A) Ja, Rewind erfasst alle Änderungen
- B) Nein, Rewind erfasst nur Änderungen über Claudes Datei-Tools – hier hilft Git
- C) Nur im Plan Mode
- D) Nur, wenn acceptEdits aktiv war

**7. Welches Modell wählst du für eine einfache, mechanische Massenänderung?**

- A) Opus
- B) Haiku
- C) Immer das teuerste
- D) Egal, Kosten und Tempo sind gleich

**8. Die Session ist lang geworden, du beginnst ein völlig neues Thema. Was ist sinnvoll?**

- A) Einfach weitermachen
- B) `/clear`
- C) `/model`
- D) `/init`

**9. Wo legst du einen Skill ab, damit er im Projekt für alle verfügbar ist?**

- A) `.claude/skills/<name>/SKILL.md`
- B) `skills.json` in der Projektwurzel
- C) `~/.claude/skills/`
- D) In der `README.md`

**10. Wofür dient MCP?**

- A) Zum Komprimieren des Kontexts
- B) Als offener Standard, um externe Tools und Datenquellen anzubinden
- C) Zur Abrechnung von Tokens
- D) Als Ersatz für Git

---

## Lösungen

| Frage | Antwort | Kurzbegründung |
|-------|---------|----------------|
| 1 | B | Claude Code ist der agentische Assistent im Repository |
| 2 | C | Plan Mode erlaubt nur Lesen und Planen |
| 3 | A | `CLAUDE.md` lädt beim Start der Session |
| 4 | C | Projekt-Settings werden committet |
| 5 | B | deny hat Vorrang |
| 6 | B | Shell-Änderungen erfasst Rewind nicht |
| 7 | B | Haiku ist schnell und günstig |
| 8 | B | Frischer Kontext für neue Aufgabe |
| 9 | A | Projekt-Skills liegen in `.claude/skills/` |
| 10 | B | Model Context Protocol |
