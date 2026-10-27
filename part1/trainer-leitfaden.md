# Trainer-Leitfaden

## Vorbereitung (1–2 Tage vorher)

- Teilnehmende per Mail bitten, vorab zu installieren und anzumelden – Vorlage in [vorab-mail.md](vorab-mail.md)
- Klären, wie die Teilnehmenden lizenziert sind (Team/Enterprise-Plan, API-Keys, Bedrock/Vertex)
- `starter/mini-shop` als ZIP oder Repo bereitstellen
- Eigene Demo-Kopie des `mini-shop` vorbereiten und alle Labs einmal durchspielen

## Zeitpuffer

Die Agenda hat wenig Puffer. Wenn es eng wird:

| Kürzen | Gewinn |
|--------|--------|
| Lab 2 Bonus und Lab 3 Bonus weglassen | ~5 min |
| Lab 4 Teil C (Modelle) als Trainer-Demo | ~5 min |
| Lab 5 Teil C (MCP) als Trainer-Demo | ~5 min |
| Quiz auf 5 Fragen reduzieren | ~5 min |

Schnelle Teilnehmende bekommen die Bonus-Aufgaben.

## Lösungen und erwartete Ergebnisse

### Lab 1

Ursache des roten Tests: `discountCents` liefert `percent * 100` (also 1000 Cent fest bei WELCOME10) statt eines prozentualen Anteils am Nettobetrag.

### Lab 2 – Teil A

```javascript
export function discountCents(cart) {
  if (!cart.discountCode) return 0;
  const percent = DISCOUNT_CODES[cart.discountCode];
  return Math.round(subtotalCents(cart) * percent / 100);
}
```

Testergebnis: 4/4 grün.

### Lab 2 – Teil B (eine mögliche Lösung)

```javascript
const DISCOUNT_CODES = {
  WELCOME10: { type: 'percent', value: 10 },
  SUMMER25: { type: 'percent', value: 25 },
  FIXED5: { type: 'fixed', value: 500 }
};

export function discountCents(cart) {
  if (!cart.discountCode) return 0;
  const { type, value } = DISCOUNT_CODES[cart.discountCode];
  const subtotal = subtotalCents(cart);
  const discount = type === 'percent' ? Math.round(subtotal * value / 100) : value;
  return Math.min(discount, subtotal);
}
```

Randfall: Sticker-Set (399 Cent) + FIXED5 → Gesamt 0.

### Lab 2 – Bonus

`formatPrice(100000)` liefert im Original `"1000,00 €"` (keine Tausenderpunkte). Beide Erwartungen sind vertretbar; wichtig ist, dass die Entscheidung bewusst getroffen und im Test festgehalten wird. Eine moderne Variante: `Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })` – Achtung, diese nutzt ein geschütztes Leerzeichen vor dem €-Zeichen.

### Lab 3

Typische Schwächen des `/init`-Entwurfs: zu lang, beschreibt Offensichtliches. Gute Diskussion: Was fehlt im Entwurf, was Claude aus dem Code nicht ableiten kann (Geschäftsregeln, Konventionen)?

Versandregel: 495 Cent, kostenlos ab Nettobetrag nach Rabatt ≥ 5000 Cent, als eigene Funktionen `shippingCents` und `orderTotalCents`. `totalCents` bleibt unverändert, sonst brechen die Tests aus Lab 2. Offene Frage für die Gruppe: Versand mit oder ohne MwSt.? Gutes Beispiel dafür, dass Claude bei unklaren Anforderungen nachfragen sollte – oder man es im Prompt festlegt.

Eine vollständige Referenzlösung aller Labs liegt in `starter/mini-shop-solution/` (`npm test` dort: alle Tests grün).

### Lab 4

- Diskussionsfrage zu `Bash(cat .env)`: Read-Regeln greifen für das Read-Tool und werden von Claude Code für gängige Lesebefehle in Bash weitestgehend berücksichtigt, sind aber keine vollständige Sandbox. Zusätzliche Absicherung: deny-Regeln für Bash-Muster, die Sandbox-Funktion (`/sandbox`), Secrets gar nicht erst im Arbeitsverzeichnis halten.
- Modus „auto“: In Claude Code 2.1.x vorhanden (`--permission-mode auto`). Ob er per `Shift+Tab` erreichbar ist, hängt von den Einstellungen ab; vor dem Kurs in der eigenen Installation prüfen.
- Rewind: Funktioniert nur, wenn die Umbenennung über Edit-Tools lief. Hat Claude per `sed` umbenannt, bleibt die Änderung – perfekter Lernmoment, dann mit `git checkout .` zurücksetzen.

### Lab 5

- Häufiger Fehler: `description` zu vage → Claude lädt den Skill nicht automatisch. Mit `/review` explizit aufgerufen funktioniert er trotzdem.
- Skill erscheint nicht: Ordnerstruktur prüfen (`.claude/skills/review/SKILL.md`), Frontmatter mit `---` korrekt, ggf. Session neu starten.
- MCP: `npx` braucht beim ersten Start Internetzugang; Firmen-Proxys können blockieren → als Trainer-Demo zeigen.

## Typische Probleme

| Problem | Lösung |
|---------|--------|
| `claude` nicht gefunden | Terminal neu öffnen, PATH prüfen, `claude doctor` |
| Windows: Git Bash fehlt | Git for Windows installieren oder `CLAUDE_CODE_GIT_BASH_PATH` setzen |
| Login hängt im Browser | Code manuell aus dem Browser in das Terminal kopieren |
| Firmen-Proxy | `HTTPS_PROXY` setzen; ggf. IT kontaktieren |
| Rate-Limit erreicht | Auf Sonnet/Haiku wechseln, Pair-Programming |
| Claude startet im falschen Ordner | `/status` prüfen, Session im Projektordner neu starten |

## Abschlussrunde (Moderationsvorschlag)

1. Quiz gemeinsam auflösen (10 min)
2. Jede:r nennt einen konkreten Anwendungsfall für die nächste Woche (5 min)
3. Ausblick auf einen Aufbaukurs: Subagents, Hooks, Plugins, Headless/CI, Worktrees (5 min)
