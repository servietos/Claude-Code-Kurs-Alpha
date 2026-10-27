# Lab 2: Bug fixen & Feature bauen (30 min)

**Ziel:** Du wendest den Workflow **Erkunden → Planen → Umsetzen → Prüfen → Committen** an.

Arbeitsverzeichnis: `~/mini-shop`, Session mit `claude` starten.

## Teil A: Bug fixen (10 min)

### 1. Erkunden

```text
Lies @src/cart.js und @test/cart.test.js. Der Test "WELCOME10 gibt 10 % Rabatt auf den Nettobetrag" schlägt fehl. Finde die Ursache. Ändere noch nichts.
```

### 2. Umsetzen und prüfen

```text
Behebe die Ursache in src/cart.js. Die Tests nicht ändern. Führe danach npm test aus und iteriere, bis alle Tests grün sind.
```

> „Die Tests nicht ändern“ ist wichtig: Ohne diese Grenze passt Claude manchmal den Test an die falsche Implementierung an, und alles ist „grün“.

Bestätige die Datei-Änderung, wenn Claude fragt. Schau dir den Diff an, bevor du zustimmst.

### 3. Committen

```text
Erstelle einen Git-Commit mit einer aussagekräftigen Commit-Message.
```

**Erwartung:** Alle 4 Tests grün, ein neuer Commit in `git log`.

## Teil B: Feature mit Plan Mode (20 min)

**Anforderung:** Der Shop soll einen neuen Gutscheincode **`FIXED5`** unterstützen, der **5,00 € (500 Cent) fest** vom Nettobetrag abzieht. Der Rabatt darf den Nettobetrag nie unter 0 drücken.

### 1. Plan Mode aktivieren

Drücke `Shift+Tab`, bis unten **plan mode** angezeigt wird.

```text
Plane die Umsetzung des Gutscheincodes FIXED5 (500 Cent Festbetrag vom Nettobetrag, nie unter 0). Die bestehenden Prozent-Codes müssen weiter funktionieren. Berücksichtige auch neue Tests.
```

### 2. Plan prüfen

Lies den Plan kritisch:

- Ändert er die Datenstruktur von `DISCOUNT_CODES` sinnvoll?
- Sind Tests für Randfälle vorgesehen (z. B. Warenkorb unter 5 €)?

Fehlt etwas, gib Feedback, z. B.:

```text
Ergänze einen Test für einen Warenkorb, der nur das Sticker-Set enthält (3,99 €). Der Gesamtpreis muss dann 0 sein.
```

### 3. Umsetzen

Plan freigeben (Claude verlässt den Plan Mode) und umsetzen lassen. Claude soll am Ende `npm test` ausführen.

### 4. Review und Commit

```text
Zeig mir den vollständigen Diff und fasse die Änderungen in 3 Stichpunkten zusammen.
```

Danach committen lassen.

## Erfolgskriterien

- [ ] Der Rabatt-Bug ist behoben, alle ursprünglichen Tests sind grün
- [ ] `FIXED5` funktioniert, inklusive Test für den Fall "nie unter 0"
- [ ] Du hast den Plan vor der Umsetzung geprüft und mindestens einmal Feedback gegeben
- [ ] Zwei saubere Commits

## Bonus

```text
Schreibe Tests für formatPrice in src/format.js (0 Cent, 5 Cent, 1234 Cent, 100000 Cent). Refaktoriere danach die Funktion auf modernes JavaScript, ohne das Verhalten zu ändern.
```

Hinweis: Erwartest du bei 100000 Cent "1000,00 €" oder "1.000,00 €"? Kläre das mit Claude und lege es in einem Test fest.
