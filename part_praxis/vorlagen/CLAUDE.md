# [Projektname]

[Ein Satz: Was ist das, für wen?]

## Befehle

- Installieren: `[z. B. npm ci]`
- Starten: `[z. B. npm run dev]`
- Tests (alle): `[z. B. npm test]`
- Tests (einzeln): `[z. B. npm test -- path/to/file.test.ts]`
- Lint / Format: `[z. B. npm run lint]`
- Build: `[z. B. npm run build]`

## Architektur

- `[ordner/]` – [Zweck in wenigen Worten]
- `[ordner/]` – [Zweck]
- `[ordner/]` – [Zweck]

[Optional: Wie fließt ein typischer Request / Datensatz durch das System? 1–3 Zeilen.]

## Konventionen

- [Konvention, die man im Code nicht sofort sieht, z. B. "Fehler werden mit Result-Typ zurückgegeben, nie geworfen"]
- [z. B. "Neue Endpunkte immer mit OpenAPI-Eintrag in api/spec.yaml"]
- [z. B. "Commit-Messages nach Conventional Commits"]

## Regeln

- **WICHTIG:** [Die eine Regel, die nie gebrochen werden darf]
- [z. B. "Keine neuen Abhängigkeiten ohne Rückfrage"]
- [z. B. "Migrationen nie ändern, nur neue anlegen"]
- Nach jeder Änderung `[Testbefehl]` ausführen.

## Stolperfallen

- [z. B. "Tests brauchen eine laufende Datenbank: docker compose up -d db"]
- [z. B. "Ordner legacy/ wird nicht mehr gepflegt, dort nichts ändern"]

<!--
Hinweise zum Ausfüllen (diesen Block danach löschen):
- Ziel: unter 60 Zeilen. Jede Zeile kostet bei jeder Anfrage Kontext.
- Nur aufnehmen, was Claude nicht selbst aus dem Code ablesen kann.
- Eckige Klammern ersetzen oder Zeile löschen.
- Persönliche Vorlieben gehören in ~/.claude/CLAUDE.md, nicht hierher.
-->
