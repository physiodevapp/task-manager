import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BoardLayout } from './components/BoardLayout/BoardLayout';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <BoardLayout/>
    </>
  </StrictMode>,
)
