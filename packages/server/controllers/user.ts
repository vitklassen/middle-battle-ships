import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { IncomingMessage, ServerResponse } from 'http';
import { isUser, User } from '../models';

type ProxyResHander = (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void;

export function proxy(target: string, onProxyRes?: ProxyResHander) {
  return createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': '',
    },
    target,
    logger: console,
    on: {
      proxyRes: onProxyRes,
    },
  });
}

export const user = async (req: Request, res: Response) => {
  res.send(req.user);
};

export const uploadAvatar = proxy('https://ya-praktikum.tech/api/v2/user/profile/avatar', (res) => {
  let body = '';

  res.on('data', (chunk) => {
    body += chunk.toString();
  });

  res.on('end', async () => {
    const response = JSON.parse(body);

    if (!isUser(response)) {
      return;
    }

    const user = await User.findOne({ where: { yandex_id: response.id } });

    if (!user) {
      return;
    }

    user.avatar = response.avatar;

    await user.save();
  });
});
