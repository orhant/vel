import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import logo from './logo.svg';
import './assets/scss/themes.scss';
import './App.css';
import AppContextProvider from '@hap/utility/AppContextProvider';
import AppLocaleProvider from '@hap/utility/AppLocaleProvider';

import configureStore, {history} from 'redux/store';
import JWTAuthAuthProvider from 'services/auth/jwt-auth/JWTAuthProvider';

const store = configureStore();

function App() {
  return (
    <AppContextProvider>
      <AppLocaleProvider>
        <Provider store={store}>
          <BrowserRouter history={history}>
            <JWTAuthAuthProvider>
              <div className='App'>
                <header className='App-header'>
                  <div className='row'>
                    <div className='col'>ddd</div>
                  </div>
                  <img src={logo} className='App-logo' alt='logo' />
                  <p>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Learn React
                  </a>
                </header>
              </div>
            </JWTAuthAuthProvider>
          </BrowserRouter>
        </Provider>
      </AppLocaleProvider>
    </AppContextProvider>
  );
}

export default App;
