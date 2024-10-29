import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeContextProvider } from './context/theme';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Board } from './pages/Board/Board';
import { TaskForm } from './components/TaskForm/TaskForm';
import { FormProvider } from './context/form';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <FormProvider>
          <Board/>
          <TaskForm />
        </FormProvider>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>,
)
