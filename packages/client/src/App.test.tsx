import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import App from './App';

// Мокаем fetch перед тестами
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(''),
  headers: new Headers(),
  ok: true,
})) as jest.Mock;

test('рендерит корректно', () => {
  render(
    <MemoryRouter initialEntries={['/main']}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>,
  );

  screen.findByText('Main');
});
