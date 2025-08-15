import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Мокаем fetch перед тестами
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
})) as jest.Mock;

test('рендерит корректно', () => {
  render(
    <MemoryRouter initialEntries={['/main']}>
      <App />
    </MemoryRouter>,
  );

  screen.findByText('Main');
});
