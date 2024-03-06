import { Suspense} from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import "./app.css"
import App from './app';
import { store } from "./Redux/store";


// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
      <Provider store={store}>
        <App />
        </Provider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
