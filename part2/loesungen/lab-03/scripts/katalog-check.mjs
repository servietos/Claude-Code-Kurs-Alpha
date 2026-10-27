import { execFileSync } from 'node:child_process';

const schema = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          sku: { type: 'string' },
          problem: { type: 'string' }
        },
        required: ['sku', 'problem']
      }
    }
  },
  required: ['ok', 'findings']
};

const prompt =
  'Prüfe data/products.json: Jede SKU ist eindeutig und hat das Format XX-000, jeder Preis ist ein positiver Integer in Cent, jeder Name ist nicht leer. Melde jeden Verstoß.';

const raw = execFileSync(
  'claude',
  ['-p', prompt, '--output-format', 'json', '--json-schema', JSON.stringify(schema), '--allowedTools', 'Read'],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }
);

const response = JSON.parse(raw);
const report = response.structured_output ?? JSON.parse(response.result);

for (const f of report.findings) console.log(`✗ ${f.sku}: ${f.problem}`);
console.log(report.ok ? '✓ Katalog in Ordnung' : `${report.findings.length} Problem(e) gefunden`);
process.exit(report.ok ? 0 : 1);
