# Modul 3: Effektiv arbeiten – Workflow, Prompting, Plan Mode (15 min)

## Lernziele

- Den Workflow **Erkunden → Planen → Umsetzen → Prüfen** anwenden
- Gute von schwachen Prompts unterscheiden
- Plan Mode gezielt einsetzen

## 1. Der Kern-Workflow

| Phase | Was passiert | Beispiel-Prompt |
|-------|--------------|-----------------|
| **1. Erkunden** | Claude liest relevante Dateien, ohne zu ändern | "Lies `src/cart.js` und die Tests. Erkläre, wie der Gesamtpreis berechnet wird. Noch nichts ändern." |
| **2. Planen** | Claude schlägt einen Lösungsweg vor | "Erstelle einen Plan, wie wir den Rabatt-Bug beheben." |
| **3. Umsetzen** | Claude ändert Code | "Setze den Plan um." |
| **4. Prüfen** | Tests/Build laufen, Ergebnis wird verifiziert | "Führe `npm test` aus und behebe Fehler, bis alles grün ist." |
| **5. Abschließen** | Commit, ggf. PR | "Erstelle einen Commit mit aussagekräftiger Message." |

**Warum?** Ohne Erkunden und Planen springt Claude direkt in die Umsetzung – oft an der falschen Stelle. Fehler im Plan zu korrigieren ist billig, Fehler im Code teuer.

## 2. Plan Mode

- Aktivieren mit **`Shift+Tab`** (zweimal, bis "plan mode" angezeigt wird) oder `claude --permission-mode plan`
- Claude darf **nur lesen und planen**, keine Dateien ändern, keine verändernden Befehle ausführen
- Am Ende legt Claude den Plan vor; du kannst ihn freigeben, ändern oder verwerfen
- Ideal für: unbekannte Codebases, Änderungen über mehrere Dateien, Architekturentscheidungen

## 3. Gute Prompts

| Schwach | Stark |
|---------|-------|
| "Fix den Bug." | "Der Test *WELCOME10 gibt 10 % Rabatt* in `test/cart.test.js` schlägt fehl. Finde die Ursache in `src/cart.js`, behebe sie und lass `npm test` laufen." |
| "Schreib Tests." | "Schreibe Tests für `formatPrice` in `src/format.js`. Decke Randfälle ab: 0 Cent, einstellige Cent, große Beträge. Nutze `node:test` wie die vorhandenen Tests." |
| "Mach den Code besser." | "Refaktoriere `src/format.js` auf modernes JavaScript (`const`, Template-Strings, `padStart`). Verhalten darf sich nicht ändern; sichere das vorher mit Tests ab." |

**Checkliste für Prompts:**

1. **Was** ist das Ziel?
2. **Wo** (Dateien mit `@` referenzieren)?
3. **Wie** wird Erfolg geprüft (Test, Befehl, erwartete Ausgabe)?
4. **Grenzen** (was darf nicht geändert werden)?

## 4. Weitere Kontextquellen

- **Dateien und Ordner:** `@src/` oder `@README.md`
- **Bilder/Screenshots:** per Drag & Drop oder Einfügen (`Ctrl+V`, unter Windows ggf. `Alt+V`) – z. B. Fehlermeldungen, UI-Mockups
- **Shell-Ausgaben:** `!npm test` – das Ergebnis landet im Kontext
- **URLs:** "Lies https://… und …" (WebFetch)

## 5. Kurskorrektur

- `Esc` unterbricht sofort; danach Richtung korrigieren
- `Esc` `Esc` (doppelt) bzw. `/rewind` springt zu einem früheren Punkt zurück
- Nach zwei gescheiterten Korrekturen: `/clear` und mit besserem Prompt neu starten

## Sprechernotizen

- Live-Demo im `mini-shop`: denselben Bug einmal mit "Fix den Bug" und einmal mit dem starken Prompt lösen lassen. Unterschied in Weg und Ergebnis zeigen.
- Plan Mode vorführen, Plan bewusst ablehnen und um Alternative bitten.
