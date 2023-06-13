import React from 'react';
import {Link} from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import {Container} from 'reactstrap';
import PropTypes from 'prop-types';

import AppNavigation from './AppNavigation';

import logoSm from 'assets/images/logo-sm.png';
import logoDark from 'assets/images/logo-dark.png';
import logoLight from 'assets/images/logo-light.png';

const AppSidebar = ({layoutType}) => {
  const addEventListenerOnSmHoverMenu = () => {
    // add listener Sidebar Hover icon on change layout from setting
    if (
      document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover'
    ) {
      document.documentElement.setAttribute(
        'data-sidebar-size',
        'sm-hover-active',
      );
    } else if (
      document.documentElement.getAttribute('data-sidebar-size') ===
      'sm-hover-active'
    ) {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    } else {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    }
  };
  const t = (str) => str;
  return (
    <div className='app-menu navbar-menu'>
      <div className='navbar-brand-box'>
        <Link to='/' className='logo logo-dark'>
          <span className='logo-sm'>
            <img src={logoSm} alt='' height='22' />
          </span>
          <span className='logo-lg'>
            <img src={logoDark} alt='' height='17' />
          </span>
        </Link>

        <Link to='/' className='logo logo-light'>
          <span className='logo-sm'>
            <img src={logoSm} alt='' height='22' />
          </span>
          <span className='logo-lg'>
            <img src={logoLight} alt='' height='17' />
          </span>
        </Link>
        <button
          onClick={addEventListenerOnSmHoverMenu}
          type='button'
          className='btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover'
          id='vertical-hover'
        >
          <i className='ri-record-circle-line'></i>
        </button>
      </div>
      <React.Fragment>
        <SimpleBar id='scrollbar' className='h-100'>
          <Container fluid>
            <div id='two-column-menu'></div>
            <ul className='navbar-nav' id='navbar-nav'>
              <AppNavigation layoutType={layoutType} t={t} />
            </ul>
          </Container>
        </SimpleBar>
        <div className='sidebar-background'></div>
      </React.Fragment>
    </div>
  );
};

export default AppSidebar;
AppSidebar.propTypes = {
  layoutType: PropTypes.string,
};
