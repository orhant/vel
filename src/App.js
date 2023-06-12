import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import './assets/scss/themes.scss';
import './App.css';
import AppContextProvider from '@hap/utility/AppContextProvider';
import AppLocaleProvider from '@hap/utility/AppLocaleProvider';

import configureStore, {history} from 'redux/store';
import JWTAuthAuthProvider from '@hap/services/auth/jwt-auth/JWTAuthProvider';
import AuthRoutes from '@hap/utility/AuthRoutes';
import AppLayout from '@hap/core/AppLayout';

const store = configureStore();

function App() {
  return (
    <AppContextProvider>
      <AppLocaleProvider>
        <Provider store={store}>
          <BrowserRouter history={history}>
            <JWTAuthAuthProvider>
              <AuthRoutes>
                <AppLayout />
              </AuthRoutes>
            </JWTAuthAuthProvider>
          </BrowserRouter>
        </Provider>
      </AppLocaleProvider>
    </AppContextProvider>
  );
}

export default App;
