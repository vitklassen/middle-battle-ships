import { NextFunction, Request, Response } from 'express';
import { User, isUser } from '../models';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
    headers,
    method: 'GET',
  });

  const json = await response.json();

  if (!response.ok) {
    console.log('[AUTH]', 'error', json);
    res.status(401).send({ reason: 'User is unauthorized' });
    return;
  }

  if (!isUser(json)) {
    throw Error('Invalid user value');
  }

  const user = json;

  let authUser = await User.findOne({
    where: { yandex_id: user.id },
  });

  if (!authUser) {
    authUser = await User.create({
      yandex_id: user.id,
      avatar: user.avatar,
      first_name: user.first_name,
      second_name: user.second_name,
      display_name: user.display_name,
      phone: user.phone,
      email: user.email,
      login: user.login,
      theme: false,
    });
  }

  req.user = authUser;

  next();
};
