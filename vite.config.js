import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// A simple plugin to map /contact to /contact.html
const rewriteSlashPlugin = () => {
  return {
    name: 'rewrite-slash',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // If the request doesn't have an extension and isn't the root
        if (req.url && !req.url.includes('.') && req.url !== '/') {
          // Check if an HTML file exists for this route
          const possibleHtml = path.join(server.config.root, req.url + '.html');
          if (fs.existsSync(possibleHtml)) {
            req.url = req.url + '.html';
          }
        }
        next();
      });
    }
  };
};

export default defineConfig({
  plugins: [rewriteSlashPlugin()],
});
