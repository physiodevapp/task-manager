import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeContextProvider } from './context/theme';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Board } from './pages/Board/Board';
import { TestComponent } from './components/TestComponent/TestComponent';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <Board/>
        {/* <TestComponent/> */}
      </ThemeContextProvider>
    </Provider>
  </StrictMode>,
)
