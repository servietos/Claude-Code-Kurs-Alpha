# mini-shop

Kleiner Warenkorb in Node.js ohne Abhängigkeiten. Übungsprojekt für den Claude Code Basiskurs.

## Befehle

- Tests: `npm test`

## Architektur

- `src/cart.js` – Warenkorb, Rabatte, Versand, Gesamtpreis
- `src/format.js` – Preisformatierung
- `data/products.json` – Produktkatalog
- `test/` – Tests mit `node:test`

## Regeln

- **WICHTIG:** Geldbeträge immer als Integer in Cent, nie als Float.
- Keine externen npm-Abhängigkeiten.
- Jede neue Funktion bekommt einen Test in `test/`.
- Bestehende Tests bleiben unverändert, außer die Anforderung ändert sich.
- Code-Kommentare und Commit-Messages auf Deutsch.
- Nach jeder Änderung `npm test` ausführen.
