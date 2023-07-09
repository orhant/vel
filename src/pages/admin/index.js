import React from 'react';

const TemplateEdit = React.lazy(() => import('./TemplateEdit'));
import {RoutePermittedRole} from 'shared/constants/AppConst';
// const Signup = React.lazy(() => import('./Signup'));
// const ForgotPassword = React.lazy(() => import('./ForgetPassword'));
// const ConfirmSignupAwsCognito = React.lazy(() =>
//   import('./ConfirmSignupAwsCognito'),
// );
// const ResetPasswordAwsCognito = React.lazy(() =>
//   import('./ResetPasswordAwsCognito'),
// );
export const adminRouteConfig = [
  {
    permittedRole: RoutePermittedRole.Admin,
    path: '/admin/templateedit',
    element: <TemplateEdit />,
  },
  // {
  //   path: '/signup',
  //   element: <Signup />,
  // },
  // {
  //   path: '/forget-password',
  //   element: <ForgotPassword />,
  // },
  // {
  //   path: '/confirm-signup',
  //   element: <ConfirmSignupAwsCognito />,
  // },
  // {
  //   path: '/reset-password',
  //   element: <ResetPasswordAwsCognito />,
  // },
];
