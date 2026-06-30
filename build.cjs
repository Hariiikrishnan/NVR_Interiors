const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

// Create dist directory
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Copy all HTML files
const files = fs.readdirSync(rootDir);
for (const file of files) {
    if (file.endsWith('.html')) {
        fs.copyFileSync(path.join(rootDir, file), path.join(distDir, file));
        console.log(`Copied ${file} to dist/`);
    }
}

// Copy assets folder
const assetsDir = path.join(rootDir, 'assets');
const distAssetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(distAssetsDir)) {
    fs.mkdirSync(distAssetsDir);
}

if (fs.existsSync(assetsDir)) {
    const assets = fs.readdirSync(assetsDir);
    for (const asset of assets) {
        fs.copyFileSync(path.join(assetsDir, asset), path.join(distAssetsDir, asset));
    }
    console.log(`Copied ${assets.length} assets to dist/assets/`);
}

console.log("Build complete! All static files are in dist/");
