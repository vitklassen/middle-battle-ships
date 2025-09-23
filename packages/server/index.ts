import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import fs from 'fs';

dotenv.config();
const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;
  let vite: ViteDevServer | undefined;
  const serverDir = __dirname;
  const clientRootPath = path.resolve(serverDir, '../../client');
  const clientDistPath = path.resolve(clientRootPath, 'dist');
  const ssrClientPath = path.resolve(clientRootPath, 'ssr-dist/ssr.cjs');

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      root: clientRootPath,
    });

    app.use(vite.middlewares);
  }

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
