import { access, readFile, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const archive = 'dist/site/downloads/remote-web-task-recipes.zip';

await access('dist/site/index.html');
const archiveStats = await stat(archive);
if (archiveStats.size < 10_000) throw new Error(`Extension archive is unexpectedly small (${archiveStats.size} bytes).`);
const { stdout } = await execFileAsync('unzip', ['-t', archive]);
if (!stdout.includes('No errors detected')) throw new Error('Extension archive failed unzip validation.');
const entries = (await execFileAsync('unzip', ['-Z1', archive])).stdout;
if (!entries.includes('manifest.json')) throw new Error('Extension archive has no manifest.json.');
const config = JSON.parse(await readFile('dist/site/staticwebapp.config.json', 'utf8'));
if (!config.navigationFallback?.exclude?.includes('/downloads/*')) throw new Error('Static host fallback must exclude downloadable extension archives.');
console.log(`Verified consumer package: ${archive} (${archiveStats.size} bytes), manifest present, fallback excludes downloads.`);
