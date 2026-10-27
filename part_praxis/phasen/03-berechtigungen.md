# Phase 3: Berechtigungen und Schutz (30 min)

**Ziel:** Routinebefehle laufen ohne Rückfrage, Secrets und kritische Dateien sind für Claude tabu, gefährliche Befehle werden blockiert.

**Ergebnis:** `.claude/settings.json` mit allow/deny-Regeln, `.claude/hooks/block-commands.mjs` und `.claude/hooks/protect-files.mjs`.

## Schritt 1: Vorlagen kopieren (3 min)

Aus `part_praxis/vorlagen/` ins eigene Repo:

```bash
mkdir -p .claude/hooks
cp <kursordner>/part_praxis/vorlagen/.claude/hooks/block-commands.mjs .claude/hooks/
cp <kursordner>/part_praxis/vorlagen/.claude/hooks/protect-files.mjs .claude/hooks/
```

```powershell
New-Item -ItemType Directory -Force .claude/hooks
Copy-Item <kursordner>/part_praxis/vorlagen/.claude/hooks/block-commands.mjs .claude/hooks/
Copy-Item <kursordner>/part_praxis/vorlagen/.claude/hooks/protect-files.mjs .claude/hooks/
```

Gibt es schon eine `.claude/settings.json`, **nicht überschreiben**, sondern in Schritt 2 ergänzen.

## Schritt 2: settings.json anpassen (12 min)

Ausgangspunkt: [`vorlagen/.claude/settings.json`](../vorlagen/.claude/settings.json). Für diese Phase nur die Blöcke `permissions` und `PreToolUse` übernehmen. `PostToolUse` kommt in Phase 4.

**allow:** Befehle, die Claude ohne Rückfrage ausführen darf. Nur lesende oder lokal harmlose Befehle. Beispiele je Ökosystem:

| Ökosystem | Typische allow-Regeln |
|-----------|----------------------|
| Node.js | `Bash(npm test)`, `Bash(npm run lint)`, `Bash(npx tsc --noEmit)` |
| Python | `Bash(pytest:*)`, `Bash(ruff check:*)`, `Bash(mypy:*)` |
| .NET | `Bash(dotnet test:*)`, `Bash(dotnet build)` |
| Java | `Bash(./gradlew test)`, `Bash(mvn -q test)` |
| Go | `Bash(go test:*)`, `Bash(go vet:*)` |
| Alle | `Bash(git status)`, `Bash(git diff:*)`, `Bash(git log:*)` |

Unter Windows zusätzlich die PowerShell-Varianten, z. B. `PowerShell(npm test)`, falls Claude dort häufig PowerShell nutzt.

**deny:** Was Claude nie lesen soll. Mindestens:

```json
"deny": [
  "Read(./.env)",
  "Read(./.env.*)",
  "Read(./secrets/**)"
]
```

Ergänzt eure Pfade aus Phase 1 (Zertifikate, Kundendaten, lokale Konfiguration mit Passwörtern).

## Schritt 3: Hooks anpassen (8 min)

**`block-commands.mjs`:** Liste `RULES` oben im Skript. Vorbelegt: Force-Push, Push nach main/master, rekursives Löschen mit Force, Lesen von `.env` per Shell. Prüft im Team: Was fehlt bei euch? (z. B. `terraform apply`, `kubectl delete`, `DROP TABLE`, Deployment-Skripte)

**`protect-files.mjs`:** Liste `PROTECTED`. Vorbelegt: `.env*` (außer `.env.example`), `package-lock.json`, `.github/workflows/`, `migrations/`. Ersetzt durch eure Kandidaten aus Phase 1. Pfade relativ zur Projektwurzel mit `/`.

Jeden Hook mit einem Beispiel testen, **bevor** ihr Claude startet:

```bash
echo '{"tool_input":{"command":"git push --force"}}' | node .claude/hooks/block-commands.mjs; echo $?
echo '{"tool_input":{"file_path":".env"}}' | node .claude/hooks/protect-files.mjs; echo $?
```

```powershell
'{"tool_input":{"command":"git push --force"}}' | node .claude/hooks/block-commands.mjs; $LASTEXITCODE
'{"tool_input":{"file_path":".env"}}' | node .claude/hooks/protect-files.mjs; $LASTEXITCODE
```

**Erwartung:** Meldung und `2`. Mit einem harmlosen Befehl bzw. Pfad: keine Meldung und `0`.

## Schritt 4: In Claude prüfen (7 min)

Session neu starten, dann:

```text
/permissions
```

```text
/hooks
```

Und provozieren (jeweils mit einer Regel, die ihr eingetragen habt):

```text
Zeig mir den Inhalt der .env.
```

```text
Pushe den aktuellen Branch mit --force.
```

```text
Ändere [eine geschützte Datei] und füge eine Leerzeile ein.
```

**Erwartung:** alles abgelehnt bzw. blockiert, mit verständlicher Meldung. Ein allow-Befehl (z. B. der Testbefehl) läuft ohne Rückfrage.

## Fertig, wenn

- [ ] Testbefehl läuft ohne Rückfrage
- [ ] Secrets sind per deny-Regel **und** per Hook geschützt
- [ ] Mindestens eine team-spezifische Regel in `block-commands.mjs` ergänzt
- [ ] `PROTECTED` enthält eure kritischen Pfade
- [ ] Alle Provokationen wurden blockiert
- [ ] Committet
- [ ] Steckbrief: Abschnitt Schutz ergänzt

## Stolperfallen

- **Hook greift nicht:** `/hooks` prüfen. Session nach Änderungen an `settings.json` neu starten.
- **Windows:** Matcher muss `Bash|PowerShell` sein, sonst weicht Claude auf PowerShell aus (im Kurstest beobachtet).
- **Zu viel allow:** Kein `Bash(*)` und keine schreibenden Befehle wie `git push` oder Deployments in allow.
- **Persönliches gehört in `.claude/settings.local.json`** (nicht committen).
