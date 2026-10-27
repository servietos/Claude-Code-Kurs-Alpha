# Lab 1: Installieren, anmelden, Projekt erkunden (20 min)

**Ziel:** Claude Code läuft, du bist angemeldet und kannst ein unbekanntes Projekt mit Claude erkunden.

## Schritt 1: Installation prüfen (5 min)

Falls noch nicht installiert, siehe [Modul 2](../module/02-installation.md#1-installation).

```bash
claude --version
claude doctor
```

**Erwartung:** Eine Versionsnummer und ein Diagnosebericht ohne Fehler.

## Schritt 2: Übungsprojekt vorbereiten (3 min)

Wie in der [README](../README.md#vorbereitung-für-teilnehmende) beschrieben: `mini-shop` kopieren, `git init`, ersten Commit anlegen, `npm test` ausführen.

**Erwartung:** 3 Tests bestanden, 1 Test fehlgeschlagen.

## Schritt 3: Erste Session (5 min)

```bash
cd ~/mini-shop
claude
```

Beim ersten Start: Anmeldung im Browser durchführen und dem Ordner vertrauen.

Dann in der Session:

```text
/status
```

**Erwartung:** Konto, Modell und Arbeitsverzeichnis werden angezeigt.

## Schritt 4: Projekt erkunden (7 min)

Probiere nacheinander folgende Prompts und beobachte, welche Tools Claude nutzt:

```text
Was macht dieses Projekt? Gib mir einen Überblick über Struktur und Zweck.
```

```text
Erkläre mir @src/cart.js Funktion für Funktion.
```

```text
!npm test
```

```text
Warum schlägt der Test fehl? Erkläre nur die Ursache, ändere noch nichts.
```

Teste außerdem:

- Während Claude antwortet, `Esc` drücken → Antwort wird unterbrochen
- `/help` öffnen und drei Befehle notieren, die du noch nicht kennst
- Session mit `/exit` beenden und mit `claude -c` fortsetzen

## Erfolgskriterien

- [ ] `claude --version` funktioniert
- [ ] Du hast eine Session im `mini-shop` gestartet
- [ ] Claude hat die Ursache des fehlgeschlagenen Tests benannt, ohne Code zu ändern
- [ ] Du kannst eine Session beenden und fortsetzen

## Bonus

Nutze den Headless-Modus ohne interaktive Session:

```bash
claude -p "Liste alle Produkte aus data/products.json als Markdown-Tabelle"
```
