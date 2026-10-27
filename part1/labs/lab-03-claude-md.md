# Lab 3: CLAUDE.md erstellen und testen (20 min)

**Ziel:** Du erzeugst eine `CLAUDE.md`, schärfst sie und weist nach, dass Claude die Regeln befolgt.

## Schritt 1: Entwurf erzeugen (5 min)

In der Session im `~/mini-shop`:

```text
/init
```

Öffne die erzeugte `CLAUDE.md` im Editor und lies sie.

## Schritt 2: Schärfen (7 min)

```text
Überarbeite CLAUDE.md. Halte sie unter 30 Zeilen. Sie soll enthalten:
- Befehle: npm test
- Architektur in 3-4 Zeilen
- Harte Regeln:
  1. Geldbeträge immer als Integer in Cent, nie als Float.
  2. Keine externen npm-Abhängigkeiten.
  3. Jede neue Funktion bekommt einen Test in test/.
  4. Code-Kommentare und Commit-Messages auf Deutsch.
```

Prüfe das Ergebnis selbst und kürze, was überflüssig ist.

## Schritt 3: Regeln wirksam machen (2 min)

Die `CLAUDE.md` wird beim Session-Start geladen. Damit die neue Fassung gilt:

```text
/clear
```

Mit `/memory` prüfen, welche Memory-Dateien geladen sind.

## Schritt 4: Regeln testen (6 min)

```text
Füge in src/cart.js zwei Funktionen hinzu: shippingCents(cart) liefert die Versandkosten (4,95 €, ab 50 € Nettobetrag nach Rabatt kostenlos), orderTotalCents(cart) liefert totalCents plus Versand. totalCents selbst und die bestehenden Tests bleiben unverändert.
```

Prüfe:

- Werden Beträge in Cent (`495`, `5000`) verwendet?
- Wurde ohne Aufforderung ein Test angelegt?
- Sind alle alten Tests weiterhin grün?
- Ist die Commit-Message auf Deutsch, wenn du committen lässt?

> Warum nicht einfach in `totalCents` einbauen? Dann würden die bestehenden Tests brechen, und Claude müsste entweder die Tests „anpassen“ oder dir widersprechen. Beides ist ein guter Gesprächsanlass, kostet im Lab aber Zeit.

Provoziere eine Regel:

```text
Installiere lodash und nutze es für die Summenbildung.
```

**Erwartung:** Claude weist auf die Regel "keine externen Abhängigkeiten" hin.

## Erfolgskriterien

- [ ] Eine kompakte `CLAUDE.md` liegt im Projekt und ist committet
- [ ] Claude hat beim neuen Feature selbstständig einen Test geschrieben
- [ ] Claude hat die Abhängigkeitsregel erkannt

## Bonus

Lege eine persönliche `~/.claude/CLAUDE.md` an, z. B. mit "Antworte mir immer auf Deutsch und fasse am Ende in einem Satz zusammen, was du geändert hast." Starte eine neue Session und prüfe die Wirkung.
