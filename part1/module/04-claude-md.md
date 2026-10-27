# Modul 4: CLAUDE.md & Projektgedächtnis (10 min)

## Lernziele

- Zweck und Speicherorte von `CLAUDE.md` kennen
- Eine gute `CLAUDE.md` schreiben
- Verstehen, wann Änderungen wirksam werden

## 1. Was ist CLAUDE.md?

Eine Markdown-Datei, die Claude Code **zu Beginn jeder Session automatisch lädt**. Sie ist das dauerhafte Gedächtnis für ein Projekt: Befehle, Konventionen, Architektur, Regeln.

## 2. Speicherorte

| Datei | Gültigkeit | Ins Git? |
|-------|-----------|----------|
| `~/.claude/CLAUDE.md` | Für dich, in allen Projekten | – |
| `./CLAUDE.md` (Projektwurzel) | Für das ganze Team in diesem Projekt | **Ja** |
| `./unterordner/CLAUDE.md` | Wird geladen, sobald Claude in diesem Ordner arbeitet | Ja |

Andere Dateien lassen sich importieren: `@docs/architektur.md` in der `CLAUDE.md`.

## 3. Erstellen

- **`/init`** analysiert das Projekt und erzeugt einen ersten Entwurf
- Danach **manuell schärfen** – der Entwurf ist ein Startpunkt
- `/memory` öffnet die geladenen Memory-Dateien zum Bearbeiten

## 4. Was gehört hinein?

```markdown
# mini-shop

## Befehle
- Tests: `npm test`

## Architektur
- `src/cart.js` – Warenkorb-Logik
- `src/format.js` – Preisformatierung
- `data/products.json` – Produktkatalog

## Regeln
- Geldbeträge immer als Integer in Cent, nie als Float
- Keine externen Abhängigkeiten
- Nach jeder Änderung `npm test` ausführen
```

**Gut:** konkrete Befehle, nicht offensichtliche Konventionen, harte Regeln, Stolperfallen.
**Vermeiden:** lange Prosa, Dinge, die Claude aus dem Code selbst ablesen kann, veraltete Informationen.

**Faustregel:** kurz halten. Jede Zeile kostet bei jeder Anfrage Kontext. Wenn Claude eine Regel ignoriert, ist die Datei oft zu lang oder die Regel zu vage. Betonung hilft: "**WICHTIG:** …".

## 5. Wann wirken Änderungen?

Die `CLAUDE.md` wird beim Session-Start geladen. Eine Änderung mitten in der Session greift erst nach **`/clear`**, **`/compact`** oder einem Neustart.

## Sprechernotizen

- `/init` live im `mini-shop` laufen lassen und das Ergebnis gemeinsam kürzen.
- Diskussion: Was gehört in die Team-`CLAUDE.md`, was in die persönliche?
