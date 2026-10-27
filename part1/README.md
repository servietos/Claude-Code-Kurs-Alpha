# Claude Code Basiskurs (4 Stunden, mit Labs)

Ein praxisorientierter Einstieg in **Claude Code**, den agentischen Coding-Assistenten von Anthropic für Terminal und IDE. Nach dem Kurs können Teilnehmende Claude Code installieren, sicher konfigurieren und im Alltag für Code-Verständnis, Bugfixing, Features und kleine Automatisierungen einsetzen.

## Zielgruppe und Voraussetzungen

- Entwickler:innen, DevOps, technisch versierte Power-User
- Grundkenntnisse in Terminal, Git und einer Programmiersprache (die Labs verwenden JavaScript/Node.js; Vorkenntnisse in JS sind hilfreich, aber nicht nötig)
- Eigener Laptop mit:
  - **Node.js ≥ 20** (`node --version`)
  - **Git** (unter Windows: Git for Windows, wird von Claude Code benötigt)
  - **VS Code** (optional, für die IDE-Integration)
  - Ein **Claude-Konto** mit Pro/Max/Team/Enterprise-Plan oder ein Anthropic-API-Key (Console)

## Lernziele

1. Einordnen, was Claude Code ist und wie der agentische Loop funktioniert
2. Claude Code installieren, anmelden und die wichtigsten Befehle bedienen
3. Mit dem Workflow **Erkunden → Planen → Umsetzen → Prüfen** zuverlässige Ergebnisse erzielen
4. Projektwissen dauerhaft in `CLAUDE.md` hinterlegen
5. Berechtigungen, Checkpoints, Modellwahl und Kontext bewusst steuern
6. Claude Code mit eigenen Skills/Slash-Commands und MCP-Servern erweitern

## Agenda

| Zeit | Dauer | Block | Material |
|------|-------|-------|----------|
| 0:00 | 15 min | Modul 1: Einführung – Was ist Claude Code? | [module/01-einfuehrung.md](module/01-einfuehrung.md) |
| 0:15 | 10 min | Modul 2: Installation & erste Schritte | [module/02-installation.md](module/02-installation.md) |
| 0:25 | 20 min | **Lab 1:** Installieren, anmelden, Projekt erkunden | [labs/lab-01-erste-session.md](labs/lab-01-erste-session.md) |
| 0:45 | 15 min | Modul 3: Effektiv arbeiten – Workflow, Prompting, Plan Mode | [module/03-workflow.md](module/03-workflow.md) |
| 1:00 | 30 min | **Lab 2:** Bug fixen & Feature bauen | [labs/lab-02-bugfix-feature.md](labs/lab-02-bugfix-feature.md) |
| 1:30 | 10 min | ☕ Pause | |
| 1:40 | 10 min | Modul 4: CLAUDE.md & Projektgedächtnis | [module/04-claude-md.md](module/04-claude-md.md) |
| 1:50 | 20 min | **Lab 3:** CLAUDE.md erstellen und testen | [labs/lab-03-claude-md.md](labs/lab-03-claude-md.md) |
| 2:10 | 15 min | Modul 5: Kontrolle – Permissions, Checkpoints, Modelle, Kontext | [module/05-kontrolle.md](module/05-kontrolle.md) |
| 2:25 | 25 min | **Lab 4:** Sicher konfigurieren & zurückspulen | [labs/lab-04-permissions-rewind.md](labs/lab-04-permissions-rewind.md) |
| 2:50 | 10 min | ☕ Pause | |
| 3:00 | 15 min | Modul 6: Erweitern – Skills, Slash-Commands, MCP | [module/06-erweitern.md](module/06-erweitern.md) |
| 3:15 | 25 min | **Lab 5:** Eigenen Skill bauen (+ optional MCP) | [labs/lab-05-skill-mcp.md](labs/lab-05-skill-mcp.md) |
| 3:40 | 20 min | Abschluss: Quiz, Best Practices, Q&A | [quiz.md](quiz.md), [cheatsheet.md](cheatsheet.md) |

**Verhältnis:** ca. 75 min Theorie/Demo · 120 min Labs · 20 min Pausen · 20 min Abschluss + Puffer.

## Ordnerstruktur

```text
AI-Kurs-by-me/
├── README.md              Diese Übersicht und Agenda
├── trainer-leitfaden.md   Hinweise, Lösungen und Zeitpuffer für Trainer:innen
├── vorab-mail.md          Vorlage für die Vorbereitungs-Mail an Teilnehmende
├── cheatsheet.md          Befehle und Shortcuts auf einer Seite
├── quiz.md                Wissenscheck für den Abschluss
├── module/                Theorie je Modul (Folieninhalt + Sprechernotizen)
├── labs/                  Schritt-für-Schritt-Anleitungen der 5 Labs
└── starter/
    ├── mini-shop/           Übungsprojekt (Node.js, keine Abhängigkeiten)
    └── mini-shop-solution/  Referenzlösung nach allen Labs (für Trainer:innen)
```

## Vorbereitung für Teilnehmende

Den Ordner `starter/mini-shop` in ein eigenes Arbeitsverzeichnis kopieren und als Git-Repo initialisieren:

```bash
cp -r starter/mini-shop ~/mini-shop
cd ~/mini-shop
git init && git add . && git commit -m "Initialer Stand"
npm test
```

```powershell
Copy-Item -Recurse starter/mini-shop $HOME/mini-shop
cd $HOME/mini-shop
git init; git add .; git commit -m "Initialer Stand"
npm test
```

Erwartung: 3 Tests grün, **1 Test rot** (das ist Absicht und wird in Lab 2 behoben).
