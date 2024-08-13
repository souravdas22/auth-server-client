import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

    <ToastContainer autoClose={1500} />
  </>
);


