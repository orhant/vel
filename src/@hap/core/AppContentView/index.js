import React from 'react';
import clsx from 'clsx';

import {useAuthUser} from '../../utility/AuthHooks';

import PropTypes from 'prop-types';

import generateRoutes from '../../utility/RouteGenerator';
import styles from './index.module.scss';
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from '../../../pages';

const AppContentView = ({className}) => {
  const {user, isAuthenticated} = useAuthUser();
  return (
    <div
      className={clsx(
        styles.mainContentView,
        'flex-grow-1 d-flex flex-column main-content-view',
        className,
      )}
    >
      {/* <AppSuspense> */}
      {/* <AppErrorBoundary> */}
      {generateRoutes({
        isAuthenticated: isAuthenticated,
        userRole: user?.role,
        unAuthorizedStructure,
        authorizedStructure,
        anonymousStructure,
      })}
      {/* </AppErrorBoundary> */}
      {/* </AppSuspense> */}
    </div>
  );
};

export default AppContentView;
AppContentView.propTypes = {
  className: PropTypes.string,
};
