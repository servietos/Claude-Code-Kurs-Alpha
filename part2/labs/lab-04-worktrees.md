# Lab 4: Zwei Features gleichzeitig (20 min)

**Ziel:** Zwei Claude-Sessions bauen parallel zwei unabhängige Features in eigenen Worktrees. Danach führst du beide zusammen.

Arbeitsverzeichnis: `~/mini-shop-2`, Branch `main`, `git status` sauber. Du brauchst zwei Terminals nebeneinander.

## Schritt 1: Zwei Sessions starten (2 min)

```bash
# Terminal 1
claude -w feature-student
```

```bash
# Terminal 2
claude -w feature-format
```

Beide Sessions starten in einem eigenen Worktree mit eigenem Branch.

## Schritt 2: Aufträge vergeben (8 min)

**Terminal 1:**

```text
Füge in src/cart.js den Rabattcode STUDENT15 hinzu: 15 % auf den Nettobetrag, wie WELCOME10. Schreibe einen Test in test/cart.test.js. Ändere keine anderen Dateien. Führe npm test aus und committe am Ende.
```

**Terminal 2:**

```text
Ändere formatPrice in src/format.js so, dass Beträge ab 1000 € einen Tausenderpunkt haben: 100000 Cent ergibt "1.000,00 €". Passe den bestehenden Test in test/format.test.js an und ergänze 123456789 Cent -> "1.234.567,89 €". Ändere keine anderen Dateien. Führe npm test aus und committe am Ende.
```

Während beide arbeiten: Beobachte, ob die Hooks aus Lab 2 in beiden Worktrees greifen. Sie sind committet, also in beiden vorhanden.

## Schritt 3: Überblick (2 min)

In einem dritten Terminal im Hauptordner `~/mini-shop-2`:

```bash
git worktree list
git log --oneline --all -5
```

Notiere Pfad und Branch beider Worktrees (der Branch steht in eckigen Klammern).

## Schritt 4: Zusammenführen (5 min)

Beide Sessions beenden (`/exit`). Claude fragt ggf., ob der Worktree bleiben soll: behalten, bis gemergt ist.

Im Hauptordner (Branchnamen aus Schritt 3 einsetzen):

```bash
git merge <branch-student>
git merge <branch-format>
npm test
```

**Erwartung:** keine Konflikte, weil die Features unterschiedliche Dateien geändert haben. Alle Tests grün.

## Schritt 5: Aufräumen (3 min)

```bash
git worktree list
git worktree remove <pfad-1>
git worktree remove <pfad-2>
git branch -d <branch-student> <branch-format>
```

## Erfolgskriterien

- [ ] Zwei Features parallel in zwei Worktrees umgesetzt
- [ ] Beide Branches ohne Konflikt in `main` gemergt, alle Tests grün
- [ ] Worktrees und Branches aufgeräumt

## Bonus: Hintergrund-Session

```bash
git worktree add ../mini-shop-docs -b docs-readme
cd ../mini-shop-docs
claude --bg "Ergänze README.md um einen Abschnitt Rabattcodes mit allen Codes aus src/cart.js und ihrer Wirkung. Ändere nur README.md und committe am Ende."
claude agents
```

Die Session läuft weiter, während du anderes tust. Mit `claude attach <id>` einsteigen, mit `claude logs <id>` den Verlauf ansehen. Danach mergen und aufräumen wie oben.

> **Frage:** Hätten Terminal 1 und Terminal 2 auch beide `test/cart.test.js` ändern dürfen? Was wäre beim Merge passiert?
