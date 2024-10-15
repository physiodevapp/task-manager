import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BoardLayout } from './components/BoardLayout/BoardLayout';
import { ThemeContextProvider } from './context/theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <ThemeContextProvider>
        <BoardLayout/>
      </ThemeContextProvider>
    </>
  </StrictMode>,
)
