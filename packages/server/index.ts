import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import fs from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';

import { createClientAndConnect } from './db';
import { user } from './controllers/user';
import reactionsController from './controllers/reactions';
import themeController from './controllers/themes';
import forumController from './controllers/forum';
import { auth } from './middleware/auth';
import { logger } from './middleware/logger';

dotenv.config();
const isDev = () => process.env.NODE_ENV === 'development';

const proxy = (target: string) => createProxyMiddleware({
  changeOrigin: true,
  cookieDomainRewrite: {
    '*': '',
  },
  target,
  logger: console,
});

async function startServer() {
  const app = express();

  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }));

  app.use(cookieParser());

  app.use('/api/v2/auth/signin', proxy('https://ya-praktikum.tech/api/v2/auth/signin'));
  app.use('/api/v2/auth/signup', proxy('https://ya-praktikum.tech/api/v2/auth/signup'));
  app.use('/api/v2/auth/logout', proxy('https://ya-praktikum.tech/api/v2/auth/logout'));
  app.use('/api/v2/oauth/yandex', proxy('https://ya-praktikum.tech/api/v2/oauth/yandex'));

  app.use('/api', auth);
  app.use('/api/v2/auth/user', user);

  app.use('/api/v2', proxy('https://ya-praktikum.tech/api/v2'));

  app.use(express.json());

  app.use('/api', logger);

  app.use('/api/reactions', reactionsController);
  app.use('/api/theme', themeController);
  app.use('/api/topics', forumController);

  const port = Number(process.env.SERVER_PORT) || 3001;
  let vite: ViteDevServer | undefined;
  const serverDir = __dirname;
  const clientRootPath = path.resolve(serverDir, isDev() ? '../client' : '../../client');
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

    app.use(express.static(clientDistPath, { index: false }));
  }

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    console.log(`[SSR] ${req.method} ${url}`);

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
      let render: (req: express.Request, res: express.Response) => Promise<{ html: string; state: any }>;

      if (!isDev()) {
        ({ render } = await import(ssrClientPath));
      } else {
        ({ render } = await vite!.ssrLoadModule(
          path.resolve(clientRootPath, 'ssr.tsx'),
        ));
      }

      const result = await render(req, res);

      if (!result) {
        return;
      }

      const html = template
        .replace('<!--ssr-outlet-->', result.html)
        .replace(
          '<!--state-outlet-->',
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
            result.state,
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

createClientAndConnect();
startServer();
