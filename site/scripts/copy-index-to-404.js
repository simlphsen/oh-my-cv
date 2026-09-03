const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

try {
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log(`Copied ${indexPath} → ${notFoundPath}`);
  } else {
    console.warn(`No index.html found at ${indexPath}. Did nuxt generate output to ${distDir}?`);
  }
} catch (err) {
  console.error('Failed to copy index.html to 404.html:', err);
  process.exit(1);
}
