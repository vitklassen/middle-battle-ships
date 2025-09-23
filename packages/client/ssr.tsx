import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from './src/App';
import { store } from './src/Store';
import './src/index.module.css';
import './src/nullify.css';

export async function render(url: string) {
  try {
    const appHtml = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
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
