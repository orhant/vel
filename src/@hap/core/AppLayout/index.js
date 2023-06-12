import React from 'react';
import styles from './layout.module.scss';
import AppContentView from '../AppContentView';
import {useAuthUser} from '../../utility/AuthHooks';
import AppScrollbar from '../AppScrollbar';
import clsx from 'clsx';

const AppLayout = () => {
  const {isAuthenticated} = useAuthUser();

  return (
    <>
      {isAuthenticated ? (
        <div>
          <AppContentView />
        </div>
      ) : (
        <div className={clsx(styles.auth, 'd-flex flex-column min-vh-100')}>
          <AppScrollbar
            className={clsx(styles.authScroll, 'd-flex flex-column min-vh-100')}
          >
            <AppContentView />
          </AppScrollbar>
        </div>
      )}
    </>
  );
};

export default React.memo(AppLayout);
