import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BoardLayout } from './components/BoardLayout/BoardLayout';
import { ThemeContextProvider } from './context/theme';
import { Provider } from 'react-redux';
import { store } from './app/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <BoardLayout/>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>,
)
