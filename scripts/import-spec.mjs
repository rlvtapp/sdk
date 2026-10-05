import { readFileSync, writeFileSync } from 'node:fs';
const source = process.argv[2];
if (!source) throw new Error('Usage: npm run spec:import -- /path/to/openapi.json');
const document = JSON.parse(readFileSync(source, 'utf8'));
for (const product of ['crm', 'email']) {
  if (!Object.keys(document.paths ?? {}).some(path => path.startsWith(`/v1/${product}/`))) {
    throw new Error(`Contract has no ${product} paths`);
  }
}
if (!document.openapi?.startsWith('3.')) throw new Error('Expected an OpenAPI 3 document');
writeFileSync(new URL('../specs/openapi.json', import.meta.url), JSON.stringify(document, null, 2) + '\n');
console.log('Imported combined CRM and Email contract. Run npm run generate.');
