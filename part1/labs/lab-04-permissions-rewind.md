# Lab 4: Sicher konfigurieren & zurückspulen (25 min)

**Ziel:** Du schützt Secrets per Berechtigungsregel, gibst Routinebefehle frei, machst eine Änderung per Rewind rückgängig und beobachtest Modell und Kontext.

## Teil A: Secrets schützen (8 min)

Im `mini-shop` liegt eine `.env` mit einem (unechten) Schlüssel.

### 1. Ohne Regel

```text
Was steht in der .env?
```

**Beobachtung:** Claude kann die Datei lesen. In echten Projekten ist das ein Risiko.

### 2. Deny-Regel anlegen

Lege `.claude/settings.json` an (oder lass Claude sie anlegen):

```json
{
  "permissions": {
    "allow": [
      "Bash(npm test)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  }
}
```

Session mit `/exit` beenden und mit `claude` neu starten, dann:

```text
/permissions
```

**Erwartung:** Die Regeln werden angezeigt.

### 3. Testen

```text
Was steht in der .env?
```

```text
!npm test
```

```text
Führe npm test aus.
```

**Erwartung:** Lesen der `.env` wird verweigert. `npm test` läuft ohne Rückfrage.

> Diskussion: Eine `Read`-Regel blockiert das Read-Tool. Könnte Claude die Datei über `Bash(cat .env)` trotzdem lesen? Wie würdest du das zusätzlich absichern?

## Teil B: Checkpoints und Rewind (8 min)

### 1. Absichtlich etwas kaputt machen

```text
Benenne in src/cart.js alle Funktionen auf Englisch mit Präfix "do" um (z. B. doAddItem) und passe die Tests an.
```

Lass die Änderung zu.

### 2. Zurückspulen

Drücke `Esc` `Esc` (oder `/rewind`), wähle den Punkt **vor** dem Umbenennungs-Prompt und dann **Code und Konversation wiederherstellen**.

```text
!git status
```

**Erwartung:** Keine Änderungen gegenüber dem letzten Commit.

> Merke: Rewind erfasst nur Änderungen über Claudes Datei-Tools. Was per Shell passiert (z. B. `rm`, `npm install`), macht nur Git rückgängig.

## Teil C: Modell und Kontext (9 min)

```text
/context
```

Notiere, wie viel Kontext belegt ist und wofür.

```text
/model
```

Wechsle auf **Haiku** und stelle eine einfache Aufgabe:

```text
Füge in data/products.json ein Produkt "Mauspad" (SKU MP-020, 9,99 €) hinzu.
```

Wechsle auf **Opus** und stelle eine anspruchsvollere Frage:

```text
Bewerte die Architektur von src/cart.js. Welche drei Änderungen würden das Modul am besten auf Mehrwährungsfähigkeit vorbereiten? Nur analysieren, nichts ändern.
```

Danach:

```text
/compact Behalte nur die Architektur-Empfehlungen
/context
/usage
```

## Erfolgskriterien

- [ ] `.claude/settings.json` existiert, `.env` ist für Claude gesperrt
- [ ] `npm test` läuft ohne Rückfrage
- [ ] Du hast eine Änderung per Rewind vollständig rückgängig gemacht
- [ ] Du hast zwei Modelle ausprobiert und den Kontextverbrauch vor und nach `/compact` verglichen

## Bonus

Probiere den Modus **acceptEdits** (`Shift+Tab`) für eine kleine Änderung aus. Wann würdest du ihn im Alltag einsetzen, wann nicht?
