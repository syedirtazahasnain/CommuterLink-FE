import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from "./redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="380385507444-lr0o69cgjb9l3jf35sm2h87ffuv650m6.apps.googleusercontent.com">
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
