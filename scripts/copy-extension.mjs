import { cp, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const output = '.output';
const files = await readdir(output);
const archive = files.find((file) => file.endsWith('.zip'));
if (!archive) throw new Error('WXT did not produce an extension zip.');
await mkdir('dist/site/downloads', { recursive: true });
await cp(join(output, archive), 'dist/site/downloads/remote-web-task-recipes.zip');
console.log('Copied extension package to dist/site/downloads/remote-web-task-recipes.zip');
