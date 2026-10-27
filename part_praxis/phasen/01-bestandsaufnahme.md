# Phase 1: Bestandsaufnahme mit Claude (30 min)

**Ziel:** Ihr lasst Claude euer Projekt erkunden und vergleicht dessen Verständnis mit eurem eigenen. Die Lücken zeigen, was in die `CLAUDE.md` gehört.

**Ergebnis:** eine Liste mit Befehlen, Architektur, Konventionen und Stolperfallen (Rohmaterial für Phase 2).

> In dieser Phase ändert Claude nichts. Startet im **Plan Mode** (`Shift+Tab` bis "plan mode" erscheint) oder mit `claude --permission-mode plan`.

## Schritt 1: Claude erkunden lassen (10 min)

Nacheinander, jeweils Antwort lesen und Notizen machen:

```text
Gib mir einen Überblick über dieses Projekt: Zweck, Sprache und Frameworks, Ordnerstruktur, wie man es baut, testet und startet. Ändere nichts.
```

```text
Welche Konventionen erkennst du im Code (Benennung, Fehlerbehandlung, Teststil, Aufbau von Modulen)? Nenne zu jeder Konvention ein konkretes Beispiel mit Dateipfad.
```

```text
Wie fließt ein typischer [Request / Datensatz / Benutzer-Klick] durch das System? Nenne die beteiligten Dateien in Reihenfolge.
```

## Schritt 2: Abgleich im Team (10 min)

Diskutiert die Antworten und sortiert in eine Tabelle:

| Kategorie | Hat Claude richtig erkannt | Hat Claude falsch oder gar nicht erkannt |
|-----------|---------------------------|------------------------------------------|
| Befehle (bauen, testen, starten) | | |
| Architektur | | |
| Konventionen | | |
| Stolperfallen und "Das macht man hier nicht" | | |

**Die rechte Spalte ist das Wertvollste.** Genau das muss in die `CLAUDE.md`, weil Claude es nicht selbst aus dem Code ablesen kann.

## Schritt 3: Gezielt nachbohren (10 min)

Für jede Lücke aus der rechten Spalte:

```text
In diesem Projekt gilt: [Regel oder Tatsache]. Findest du Stellen im Code, die dagegen verstoßen oder die das belegen?
```

Und zur Absicherung:

```text
Welche Dateien oder Ordner sollte man in diesem Projekt besser nicht anfassen (generiert, Legacy, sicherheitsrelevant, Migrationen)? Begründe kurz.
```

Notiert die Antworten für Phase 3 (geschützte Dateien).

## Leitfragen

- Welche Befehle kennt nur, wer schon länger im Team ist?
- Gibt es Ordner, die anders funktionieren als der Rest?
- Was würdet ihr einer neuen Kollegin am ersten Tag als Erstes sagen?

## Fertig, wenn

- [ ] Tabelle aus Schritt 2 ist ausgefüllt, rechte Spalte hat mindestens 3 Einträge
- [ ] Testbefehl und ggf. Einzeltest-Befehl sind bekannt
- [ ] Liste mit Kandidaten für geschützte Dateien/Ordner liegt vor
- [ ] Steckbrief: Abschnitt Bestandsaufnahme ergänzt

## Stolperfallen

- **Großes Repo:** Claude liest nicht alles. Grenzt ein: "Konzentriere dich auf `services/billing/`."
- **Monorepo:** Pro Paket kann eine eigene `CLAUDE.md` sinnvoll sein. Für heute ein Paket auswählen.
- **Claude wirkt sehr sicher, liegt aber falsch:** genau das ist das Lernziel dieser Phase. Festhalten, nicht wegdiskutieren.
