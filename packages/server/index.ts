import dotenv from 'dotenv';
import cors from 'cors';
<<<<<<< HEAD

import express from 'express';
import { createClientAndConnect } from './db';
import reactionsController from './controllers/reactions';
=======
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import fs from 'fs';
>>>>>>> 961e47160172c6167823eb3ad8a05600bb3915aa

dotenv.config();
const isDev = () => process.env.NODE_ENV === 'development';

<<<<<<< HEAD
const port = Number(process.env.SERVER_PORT) || 3001;
=======
async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;
  let vite: ViteDevServer | undefined;
  const serverDir = __dirname;
  const clientRootPath = path.resolve(serverDir, '../../client');
  const clientDistPath = path.resolve(clientRootPath, 'dist');
  const ssrClientPath = path.resolve(clientRootPath, 'ssr-dist/ssr.cjs');
>>>>>>> 961e47160172c6167823eb3ad8a05600bb3915aa

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      root: clientRootPath,
    });

<<<<<<< HEAD
const app = express();

app.use(cors());
app.use(express.json());

app.use('/reactions', reactionsController);

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});
=======
    app.use(vite.middlewares);
  }
>>>>>>> 961e47160172c6167823eb3ad8a05600bb3915aa

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(clientDistPath, 'assets')));

    app.use(express.static(clientDistPath));
  }

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(clientDistPath, 'index.html'),
          'utf-8',
        );
      } else {
        template = fs.readFileSync(
          path.resolve(clientRootPath, 'index.html'),
          'utf-8',
        );
        template = await vite!.transformIndexHtml(url, template);
      }
      let render: (url: string) => Promise<{ html: string; state: any }>;

      if (!isDev()) {
        ({ render } = await import(ssrClientPath));
      } else {
        ({ render } = await vite!.ssrLoadModule(
          path.resolve(clientRootPath, 'ssr.tsx'),
        ));
      }

      const { html: appHtml, state } = await render(url);

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace(
          '<!--state-outlet-->',
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
            state,
          )}</script>`,
        );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      console.error('SSR error:', e);
      res.status(500).send('Server error');
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
