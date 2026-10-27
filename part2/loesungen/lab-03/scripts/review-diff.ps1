# Diff gegen main an Claude übergeben, nur lesende Tools erlauben
git diff main...HEAD | claude -p "Reviewe diesen Diff für den mini-shop. Gib nur eine Tabelle aus: Datei | Schweregrad | Befund." --allowedTools "Read,Grep,Glob" --output-format text
