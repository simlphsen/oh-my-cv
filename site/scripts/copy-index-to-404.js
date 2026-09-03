const fs = require('fs');
const path = require('path');

// Look for common Nuxt generate output directories in order of priority
const candidates = [
  path.resolve(__dirname, '..', '.output', 'public'),
  path.resolve(__dirname, '..', 'dist'),
  path.resolve(__dirname, '..', 'dist', 'public')
];

let copied = false;

for (const dir of candidates) {
  const indexPath = path.join(dir, 'index.html');
  const notFoundPath = path.join(dir, '404.html');
  try {
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
      console.log(`Copied: ${indexPath} -> ${notFoundPath}`);
      copied = true;
      break;
    }
  } catch (err) {
    console.warn(`Error while copying in ${dir}:`, err);
  }
}

if (!copied) {
  console.warn('No index.html found in known output directories (.output/public, dist, dist/public). Continuing without copying 404.html.');
}

// Exit 0 so postbuild won't fail CI when output directory differs
process.exit(0);
