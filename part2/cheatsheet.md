# Cheatsheet Aufbaukurs

## Subagents

| | |
|---|---|
| Datei | `.claude/agents/<name>.md` (Team) · `~/.claude/agents/` (persönlich) |
| Befehl | `/agents` |
| Felder | `name`, `description`, `tools` (kommagetrennt), `model` (`sonnet` · `opus` · `haiku` · `inherit`) |
| Aufruf | "Lass den Subagent `<name>` …" oder automatisch per `description` |

```markdown
---
name: code-reviewer
description: … Proaktiv nach jeder Code-Änderung einsetzen.
tools: Read, Grep, Glob
model: sonnet
---
Systemprompt …
```

## Hooks

| | |
|---|---|
| Datei | `.claude/settings.json` → `"hooks": { "<Ereignis>": [ … ] }` |
| Befehl | `/hooks` |
| Ereignisse | `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `Notification`, `Stop`, `SubagentStop`, `SessionStart`, `SessionEnd`, `PreCompact` |
| Eingabe | JSON auf STDIN (`tool_name`, `tool_input.command`, `tool_input.file_path`) |
| Exit 0 | Weiter |
| Exit 2 | Blockieren bzw. STDERR an Claude zurückmelden |
| Windows | Matcher `"Bash\|PowerShell"` |
| Pfade | `$CLAUDE_PROJECT_DIR` (Projekt), `${CLAUDE_PLUGIN_ROOT}` (Plugin) |

```json
"PreToolUse": [{
  "matcher": "Bash|PowerShell",
  "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/x.mjs\"" }]
}]
```

```bash
echo '{"tool_input":{"command":"npm i x"}}' | node x.mjs; echo $?
```

## Headless

| Befehl / Flag | Wirkung |
|---------------|---------|
| `claude -p "…"` | Einmalig, ohne Dialog |
| `cmd \| claude -p "…"` | Eingabe per Pipe |
| `--output-format text\|json\|stream-json` | Ausgabeformat |
| `--json-schema '<schema>'` | Ergebnis in `structured_output` |
| `--allowedTools "Read,Grep"` | Erlaubte Tools |
| `--disallowedTools "Bash"` | Verbotene Tools |
| `--permission-mode plan` | Nur lesen |
| `--model haiku` | Günstiges Modell |
| `--max-budget-usd 0.50` | Kostenobergrenze |
| `--no-session-persistence` | Nichts speichern |
| `/install-github-app` | GitHub einrichten, dann `@claude` in Issues und PRs |

JSON-Felder: `result`, `structured_output`, `is_error`, `total_cost_usd`, `num_turns`, `session_id`

## Parallel

| Befehl | Wirkung |
|--------|---------|
| `claude -w <name>` | Session in neuem Worktree |
| `git worktree list \| add \| remove` | Worktrees verwalten |
| `claude --bg "…"` | Session im Hintergrund |
| `claude agents` | Laufende Sessions |
| `claude attach <id>` · `logs <id>` · `stop <id>` | Einsteigen, ansehen, beenden |

## Plugins

| Pfad / Befehl | Inhalt |
|---------------|--------|
| `<plugin>/.claude-plugin/plugin.json` | Manifest |
| `<plugin>/skills/<name>/SKILL.md` | Skills |
| `<plugin>/agents/<name>.md` | Subagents |
| `<plugin>/hooks/hooks.json` | Hooks |
| `<plugin>/.mcp.json` | MCP-Server |
| `claude plugin validate <pfad>` | Prüfen |
| `claude --plugin-dir <pfad>` | Für eine Session laden |
| `claude plugin init <name>` | Neues Plugin |
| `<marketplace>/.claude-plugin/marketplace.json` | Katalog |
| `claude plugin marketplace add <pfad\|org/repo\|url>` | Marketplace einbinden |
| `claude plugin install <plugin>@<marketplace>` | Installieren |
| `claude plugin list \| update \| disable \| enable \| uninstall` | Verwalten |
| `/plugin` | Verwaltung in der Session |
| `/<plugin>:<skill>`, Agent `<plugin>:<agent>` | Namen |

## Faustregeln

1. `CLAUDE.md` ist eine Bitte, ein Hook ist eine Regel
2. Subagents bekommen vollständige Aufträge und nur die nötigen Tools
3. Headless: so wenig Tools wie möglich, Kosten im JSON prüfen
4. Nur unabhängige Aufgaben parallelisieren
5. Fremde Plugins und Hooks vor der Installation lesen
