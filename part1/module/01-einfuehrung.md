# Modul 1: Einführung – Was ist Claude Code? (15 min)

## Lernziele

- Claude Code in der Claude-Produktfamilie einordnen
- Den agentischen Loop verstehen
- Typische Einsatzszenarien kennen

## 1. Die Claude-Produktfamilie

| Produkt | Wofür | Zugriff auf Code/Shell |
|---------|-------|------------------------|
| Claude.ai (Web/Mobile) | Chat, Recherche, Dokumente, Artifacts | Nein (nur hochgeladene Dateien) |
| Claude Desktop | Chat + lokale Integrationen via MCP | Eingeschränkt |
| **Claude Code** (CLI, VS Code, JetBrains, Desktop, Web) | Agentisches Arbeiten direkt im Repository | **Ja** – liest, schreibt, führt Befehle aus |
| Claude API / Agent SDK | Eigene Anwendungen und Agenten bauen | Selbst zu implementieren |

**Kernaussage:** Claude Code läuft dort, wo der Code liegt. Es sieht das Projekt, führt Tests aus, nutzt Git und iteriert selbstständig, bis ein Ziel erreicht ist.

## 2. Der agentische Loop

```text
   ┌──────────────┐
   │  Dein Prompt │
   └──────┬───────┘
          ▼
   ┌──────────────┐     Tools: Read, Grep, Glob, Edit,
   │   Denken /   │◄──  Write, Bash, WebFetch, MCP …
   │   Planen     │
   └──────┬───────┘
          ▼
   ┌──────────────┐
   │ Tool nutzen  │──► Ergebnis (Datei, Testausgabe, Fehler)
   └──────┬───────┘
          ▼
   Ziel erreicht? ── nein ──► zurück zu "Denken"
          │ ja
          ▼
     Antwort an dich
```

- Claude entscheidet selbst, welche Dateien es liest und welche Befehle es ausführt.
- **Du** behältst die Kontrolle über Berechtigungen (Modul 5): Jede Datei-Änderung oder Shell-Ausführung kann eine Freigabe erfordern.
- Der Loop endet, wenn Claude das Ziel für erreicht hält – oder du mit `Esc` unterbrichst.

## 3. Typische Einsatzszenarien

- **Codebase verstehen:** "Wie fließt ein Request durch dieses System?"
- **Bugs fixen:** Fehlermeldung oder roten Test einfügen, Claude findet die Ursache
- **Features bauen:** von der Planung bis zum Commit
- **Tests schreiben**, Refactorings, Migrationen
- **Git-Arbeit:** Commit-Messages, Konflikte lösen, PR-Beschreibungen
- **Automatisierung:** Headless-Modus `claude -p` in Skripten und CI

## 4. Mentales Modell: "Sehr fähige:r neue:r Kolleg:in"

Claude Code ist schnell und kompetent, kennt aber dein Projekt anfangs nicht. Gute Ergebnisse entstehen durch:

1. **Kontext** geben (welche Dateien, welches Ziel, welche Regeln)
2. **Prüfkriterien** nennen (Tests, erwartete Ausgabe)
3. **Ergebnisse reviewen** – du bleibst verantwortlich für den Code

## Sprechernotizen

- Kurze Live-Demo: im `mini-shop` `claude` starten und fragen *"Was macht dieses Projekt?"* – zeigt den Loop (Claude liest Dateien selbstständig).
- Erwartungsmanagement: Claude Code macht Fehler. Der Kurs zeigt, wie man sie früh erkennt und günstig korrigiert.
