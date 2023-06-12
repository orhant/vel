import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';

const Analytics = React.lazy(() => import('./Analytics'));

export const dashBoardConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/dashboards/analytics',
    element: <Analytics />,
  },
];
