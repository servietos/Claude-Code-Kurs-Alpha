# Lab 5: Ein Team-Plugin bauen (25 min)

**Ziel:** Du bündelst den Review-Skill aus dem Basiskurs, den `code-reviewer` aus Lab 1 und den Installations-Schutz aus Lab 2 zu einem Plugin, prüfst es, testest es in einem frischen Projekt und verteilst es über einen eigenen Marketplace.

## Schritt 1: Struktur anlegen (8 min)

Außerhalb des Projekts, z. B. im Home-Verzeichnis:

```text
team-marketplace/
├── .claude-plugin/
│   └── marketplace.json
└── plugins/
    └── mini-shop-toolkit/
        ├── .claude-plugin/plugin.json
        ├── skills/review/SKILL.md          ← aus ~/mini-shop-2/.claude/skills/review/
        ├── agents/code-reviewer.md         ← aus ~/mini-shop-2/.claude/agents/
        ├── scripts/block-npm-install.mjs   ← aus ~/mini-shop-2/.claude/hooks/
        ├── hooks/hooks.json
        └── README.md
```

> **Tipp:** Du kannst Claude in einer Session in `~/mini-shop-2` bitten, die Struktur anzulegen und die Dateien zu kopieren. Gib dabei den Zielpfad an.

`plugin.json`:

```json
{
  "name": "mini-shop-toolkit",
  "version": "1.0.0",
  "description": "Review-Skill, Reviewer-Agent und Abhängigkeits-Schutz für den mini-shop",
  "author": { "name": "<dein Name>" },
  "license": "MIT"
}
```

`hooks/hooks.json` (beachte `${CLAUDE_PLUGIN_ROOT}` statt `$CLAUDE_PROJECT_DIR`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash|PowerShell",
        "hooks": [
          {
            "type": "command",
            "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/block-npm-install.mjs\""
          }
        ]
      }
    ]
  }
}
```

`marketplace.json`:

```json
{
  "name": "team-marketplace",
  "owner": { "name": "<dein Name>" },
  "description": "Interner Plugin-Katalog",
  "plugins": [
    {
      "name": "mini-shop-toolkit",
      "source": "./plugins/mini-shop-toolkit",
      "description": "Review-Skill, Reviewer-Agent und Abhängigkeits-Schutz"
    }
  ]
}
```

`README.md`: drei bis fünf Sätze, was das Plugin enthält und was es braucht.

## Schritt 2: Validieren (3 min)

```bash
claude plugin validate team-marketplace/plugins/mini-shop-toolkit
claude plugin validate team-marketplace
```

**Erwartung:** "Validation passed". Hinweise auf ein fehlendes Icon kannst du für ein internes Plugin ignorieren. Fehler beheben und erneut validieren.

## Schritt 3: In einem frischen Projekt testen (7 min)

Damit nichts aus `~/mini-shop-2/.claude` mitspielt, ein frisches Projekt ohne eigene Skills, Agents und Hooks. Kopierbefehl im Kursordner ausführen:

```bash
cp -r part1/starter/mini-shop ~/plugin-test
cd ~/plugin-test
git init && git add . && git commit -m "Start"
claude --plugin-dir ~/team-marketplace/plugins/mini-shop-toolkit
```

```powershell
Copy-Item -Recurse part1/starter/mini-shop $HOME/plugin-test
cd $HOME/plugin-test
git init; git add .; git commit -m "Start"
claude --plugin-dir $HOME/team-marketplace/plugins/mini-shop-toolkit
```

In der Session prüfen:

| Eingabe | Erwartung |
|---------|-----------|
| `/agents` | `mini-shop-toolkit:code-reviewer` ist da |
| `/hooks` | PreToolUse-Hook aus dem Plugin ist da |
| `Installiere lodash.` | Wird blockiert |
| Kleine Änderung in `src/format.js`, dann `/mini-shop-toolkit:review` | Befund-Tabelle |

## Schritt 4: Über den Marketplace installieren (5 min)

Session beenden, dann im Terminal:

```bash
claude plugin marketplace add ~/team-marketplace
claude plugin install mini-shop-toolkit@team-marketplace
claude plugin list
```

Neue Session in `~/plugin-test` starten (diesmal **ohne** `--plugin-dir`) und mit `/agents` prüfen, ob der Agent da ist.

In echten Teams liegt der Marketplace in einem Git-Repo. Dann lautet der erste Befehl z. B. `claude plugin marketplace add <org>/<repo>`.

## Schritt 5: Aufräumen (2 min)

```bash
claude plugin uninstall mini-shop-toolkit
claude plugin marketplace remove team-marketplace
```

## Erfolgskriterien

- [ ] Plugin und Marketplace bestehen die Validierung
- [ ] Im frischen Projekt funktionieren Skill, Agent und Hook aus dem Plugin
- [ ] Installation über den Marketplace funktioniert

## Bonus

- Version in `plugin.json` auf `1.1.0` erhöhen, die `description` des Reviewers verbessern, dann `claude plugin update mini-shop-toolkit`
- Füge dem Plugin den `test-writer` aus Lab 1 hinzu

## Lösung

[`loesungen/lab-05/team-marketplace/`](../loesungen/lab-05/team-marketplace/.claude-plugin/marketplace.json), validiert mit `claude plugin validate`, Hook im Test über Bash und PowerShell blockierend.
