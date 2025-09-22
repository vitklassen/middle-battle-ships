import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Store'
import App from './App'
import './index.module.css'
import './nullify.css'
import { ErrorBoundary } from './Common/Layouts/ErrorBoundary'
import { Error } from './Pages'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <ErrorBoundary
      errorComponent={
        <Error
          title="Произошла ошибка"
          description="Попробуйте перезагрузить страницу"
        />
      }>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>
)
