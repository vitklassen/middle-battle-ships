import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';

import { createClientAndConnect } from './db';
import reactionsController from './controllers/reactions';

dotenv.config();

async function startServer() {
  const app = express();

  app.use(cors({
    origin: process.env.NODE_ENV === 'production'
      ? ['http://localhost:8080', 'http://client:80']
      : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  }));

  app.use(cookieParser());

  app.use('/api/v2', createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': '',
    },
    target: 'https://ya-praktikum.tech/api/v2',
    logger: console,
  }));

  app.use(express.json());

  app.use('/reactions', reactionsController);

  const port = Number(process.env.SERVER_PORT) || 3001;

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  // 🔧 ПРОСТОЙ РЕДИРЕКТ НА КЛИЕНТ
  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    if (url.startsWith('/api') || url.includes('.') || url.startsWith('/assets')) {
      return next();
    }

    if (process.env.NODE_ENV === 'production') {
      console.log(`[SERVER] Serving API only, HTML should be served by nginx: ${req.method} ${url}`);
      return res.status(404).json({
        error: 'Not found - please use client app',
        message: 'This is API server. Use the client application for UI.',
      });
    }

    const clientUrl = `http://127.0.0.1:3000${url}`;
    console.log(`[REDIRECT] ${req.method} ${url} -> ${clientUrl}`);
    res.redirect(302, clientUrl);
    return undefined;
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    if (process.env.NODE_ENV === 'production') {
      console.log('  ➜ 🔗 Production: API server ready');
    } else {
      console.log('  ➜ 🔗 Client: http://127.0.0.1:3000');
    }
  });
}

createClientAndConnect();
startServer();
