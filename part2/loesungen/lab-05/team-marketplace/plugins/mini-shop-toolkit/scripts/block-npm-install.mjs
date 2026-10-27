import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';

if (/\b(npm|pnpm|yarn)\s+(install|i|add)\b/.test(command)) {
  console.error(
    'Blockiert: Der mini-shop erlaubt keine externen Abhängigkeiten (siehe CLAUDE.md). Löse die Aufgabe mit Bordmitteln von Node.js.'
  );
  process.exit(2);
}
