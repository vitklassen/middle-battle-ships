import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.module.css';
import './nullify.css';
// @ts-expect-error: No types available for service worker
import { registerSW } from './registerServiceWorker';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
registerSW();
