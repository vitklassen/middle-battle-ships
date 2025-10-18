import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import './index.module.css';
import './nullify.css';
// @ts-expect-error: No types available for service worker
import { registerSW, unregisterSW } from './registerServiceWorker';
import { routes } from './Router';
import App from './App';

const router = createBrowserRouter(routes);

const container = document.getElementById('root') as HTMLElement;
const modalRoot = document.getElementById('modal');

hydrateRoot(
  container,
  <Provider store={store}>
    <App router={<RouterProvider router={router} />} modalRoot={modalRoot} />
  </Provider>,
);

unregisterSW();
