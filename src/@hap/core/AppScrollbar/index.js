import React from 'react';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
// import 'simplebar/src/simplebar.css';
import styles from './index.module.scss';
import clsx from 'clsx';

const AppScrollbar = ({children, className, ...others}) => {
  return (
    <SimpleBarReact
      {...others}
      className={clsx(styles.dataSimplebar, className)}
    >
      {children}
    </SimpleBarReact>
  );
};

export default AppScrollbar;

AppScrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  scrollToTop: PropTypes.bool,
};
