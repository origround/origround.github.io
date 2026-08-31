import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const clientDir = join(projectRoot, 'dist', 'client');
const outputDir = join(projectRoot, 'pages-dist');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function isInside(parent, candidate) {
  const pathFromParent = relative(parent, candidate);
  return pathFromParent !== '..' && !pathFromParent.startsWith(`..${sep}`) && !resolve(pathFromParent).startsWith(sep);
}

async function localAssetResponse(input) {
  const requestUrl = new URL(typeof input === 'string' ? input : input.url);
  const pathname = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '');
  const assetPath = resolve(clientDir, pathname);

  if (!pathname || !isInside(clientDir, assetPath)) {
    return new Response('Not found', { status: 404 });
  }

  try {
    if (!(await stat(assetPath)).isFile()) {
      return new Response('Not found', { status: 404 });
    }
    const body = await readFile(assetPath);
    return new Response(body, {
      headers: { 'content-type': contentTypes[extname(assetPath)] ?? 'application/octet-stream' },
    });
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return new Response('Not found', { status: 404 });
    }
    throw error;
  }
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const serverEntry = pathToFileURL(join(projectRoot, 'dist', 'server', 'index.js')).href;
const { default: app } = await import(serverEntry);
const response = await app.fetch(
  new Request('https://origround.github.io/', { headers: { accept: 'text/html' } }),
  { ASSETS: { fetch: localAssetResponse } },
  { waitUntil: () => {}, passThroughOnException: () => {} },
);

if (!response.ok) {
  throw new Error(`Static export failed with HTTP ${response.status}`);
}

await writeFile(join(outputDir, 'index.html'), await response.text());
await writeFile(join(outputDir, '.nojekyll'), '');

console.log(`GitHub Pages export written to ${outputDir}`);
