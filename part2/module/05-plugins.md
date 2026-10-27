# Modul 5: Plugins und Marketplaces (10 min)

## Lernziele

- Aufbau eines Plugins kennen
- Ein Plugin lokal testen und validieren
- Plugins über einen Marketplace im Team verteilen

## 1. Warum Plugins?

Skills, Agents und Hooks im `.claude`-Ordner gelten für **ein** Repo. Ein Plugin bündelt sie, damit mehrere Repos und Teams dieselben Werkzeuge nutzen und zentral aktualisieren können.

## 2. Aufbau

```text
mini-shop-toolkit/
├── .claude-plugin/
│   └── plugin.json            Pflicht: name, version, description …
├── skills/review/SKILL.md     Skills
├── agents/code-reviewer.md    Subagents
├── hooks/hooks.json           Hooks (gleiches Format wie in settings.json)
├── scripts/…                  Skripte, die Hooks aufrufen
├── .mcp.json                  optional: MCP-Server
└── README.md
```

`plugin.json`:

```json
{
  "name": "mini-shop-toolkit",
  "version": "1.0.0",
  "description": "Review-Skill, Reviewer-Agent und Abhängigkeits-Schutz",
  "author": { "name": "Kurs-Team" },
  "license": "MIT"
}
```

In `hooks.json` zeigt `${CLAUDE_PLUGIN_ROOT}` auf den Plugin-Ordner:

```json
"command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/block-npm-install.mjs\""
```

**Namensraum:** Inhalte eines Plugins tragen dessen Namen als Präfix, z. B. `/mini-shop-toolkit:review` oder der Agent `mini-shop-toolkit:code-reviewer`.

## 3. Testen und prüfen

| Befehl | Wirkung |
|--------|---------|
| `claude plugin validate ./mini-shop-toolkit` | Manifest und Inhalte prüfen |
| `claude --plugin-dir ./mini-shop-toolkit` | Nur für diese Session laden |
| `claude plugin init <name>` | Gerüst für ein neues Plugin |

## 4. Verteilen über einen Marketplace

Ein Marketplace ist ein Ordner oder Git-Repo mit einem Katalog:

```text
team-marketplace/
├── .claude-plugin/marketplace.json
└── plugins/mini-shop-toolkit/…
```

`marketplace.json`:

```json
{
  "name": "team-marketplace",
  "owner": { "name": "Kurs-Team" },
  "description": "Interner Plugin-Katalog",
  "plugins": [
    {
      "name": "mini-shop-toolkit",
      "source": "./plugins/mini-shop-toolkit",
      "description": "…"
    }
  ]
}
```

Einbinden und installieren:

```bash
claude plugin marketplace add ./team-marketplace
claude plugin install mini-shop-toolkit@team-marketplace
claude plugin list
claude plugin disable mini-shop-toolkit
claude plugin uninstall mini-shop-toolkit
```

Statt eines Pfads geht auch ein GitHub-Repo oder eine URL. In der Session öffnet `/plugin` die Verwaltung.

## 5. Sicherheit

Ein Plugin kann Hooks und MCP-Server mitbringen, die mit deinen Rechten laufen. Vor der Installation lesen, besonders `hooks/` und `scripts/`. Interne Marketplaces mit Review-Prozess (Pull Requests) betreiben.

## Sprechernotizen

- Der Bogen des Tages: Lab 1 (Agent), Lab 2 (Hook) und der Skill aus dem Basiskurs werden in Lab 5 zu einem Paket.
- `claude plugin validate` meldet auch fehlende README, Lizenz und Icon. Für interne Plugins sind README und Lizenz sinnvoll, das Icon ist nicht nötig.
