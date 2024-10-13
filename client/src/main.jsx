import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store.js';
import { jwtDecode } from 'jwt-decode';
import { setUser } from './features/userSlice.js';
import { fetchCurUserProfile } from './features/profileSlice.js';

const token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode(token);
  store.dispatch(setUser(decoded));
  store.dispatch(fetchCurUserProfile());
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
