import { configureStore } from '@reduxjs/toolkit';
import ReactDOMServer from 'react-dom/server';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Provider } from 'react-redux';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { matchRoutes } from 'react-router';
import { reducer } from './src/Store';
import { Path, routes } from './src/Router';
import './src/index.module.css';
import './src/nullify.css';
import App from './src/App';

const { query, dataRoutes } = createStaticHandler(routes);

function createUrl(req: ExpressRequest) {
  const origin = `${req.protocol}://${req.get('host')}`;

  return new URL(req.originalUrl || req.url, origin);
}

function createFetchRequest(req: ExpressRequest) {
  const url = createUrl(req);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

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

  const options: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.body) {
    options.body = req.body;
  }

  return new Request(url.href, options);
}

export async function render(req: ExpressRequest, res: ExpressResponse) {
  const store = configureStore({
    reducer,
  });

  try {
    const foundRoutes = matchRoutes(routes, createUrl(req));

    if (!foundRoutes) {
      throw new Error('Страница не найдена!');
    }

    const [{ route: { init } }] = foundRoutes;

    await init?.({
      state: store.getState(),
      dispatch: store.dispatch,
      context: { path: req.originalUrl, cookie: Object.entries(req.cookies).map(([key, value]) => `${key}=${value}`).join('; ') },
    });

    const state = store.getState();

    const [path] = req.originalUrl.split('?');

    if (path !== Path.SignIn && path !== Path.Main && state.error.value?.status === 401) {
      res.status(302);
      res.setHeader('Location', Path.SignIn);
      res.send();
      return;
    }

    const context = await query(createFetchRequest(req));

    if (context instanceof Response) {
      throw context;
    }

    const router = createStaticRouter(dataRoutes, context);

    const appHtml = ReactDOMServer.renderToString(
      <Provider store={store}>
        <App router={<StaticRouterProvider router={router} context={context} />} modalRoot={null} />
      </Provider>,
    );

    return {
      html: appHtml,
      state: store.getState(),
    };
  } catch (error) {
    console.error('SSR render error:', error);
    return {
      html: '<div>Error during SSR</div>',
      state: store.getState(),
    };
  }
}
