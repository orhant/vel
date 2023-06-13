import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import {changeSidebarVisibility} from 'redux/actions';

import LightDark from './AppHeaderComponents/LightDark';
import FullScreenDropdown from './AppHeaderComponents/FullScreenDropdown';
import ProfileDropdown from './AppHeaderComponents/ProfileDropdown';

const AppHeader = ({onChangeLayoutMode, layoutModeType, headerClass}) => {
  const dispatch = useDispatch();
  const {sidebarVisibilitytype} = useSelector((state) => ({
    sidebarVisibilitytype: state.layout.sidebarVisibilitytype,
  }));
  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;
    dispatch(changeSidebarVisibility('show'));

    if (windowSize > 767)
      document.querySelector('.hamburger-icon').classList.toggle('open');

    //For collapse horizontal menu
    if (document.documentElement.getAttribute('data-layout') === 'horizontal') {
      document.body.classList.contains('menu')
        ? document.body.classList.remove('menu')
        : document.body.classList.add('menu');
    }

    //For collapse vertical and semibox menu
    if (
      sidebarVisibilitytype === 'show' &&
      (document.documentElement.getAttribute('data-layout') === 'vertical' ||
        document.documentElement.getAttribute('data-layout') === 'semibox')
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove('vertical-sidebar-enable');
        document.documentElement.getAttribute('data-sidebar-size') === 'sm'
          ? document.documentElement.setAttribute('data-sidebar-size', '')
          : document.documentElement.setAttribute('data-sidebar-size', 'sm');
      } else if (windowSize > 1025) {
        document.body.classList.remove('vertical-sidebar-enable');
        document.documentElement.getAttribute('data-sidebar-size') === 'lg'
          ? document.documentElement.setAttribute('data-sidebar-size', 'sm')
          : document.documentElement.setAttribute('data-sidebar-size', 'lg');
      } else if (windowSize <= 767) {
        document.body.classList.add('vertical-sidebar-enable');
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute('data-layout') === 'twocolumn') {
      document.body.classList.contains('twocolumn-panel')
        ? document.body.classList.remove('twocolumn-panel')
        : document.body.classList.add('twocolumn-panel');
    }
  };
  return (
    <header id='page-topbar' className={headerClass}>
      <div className='layout-width'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <div className='navbar-brand-box horizontal-logo'></div>
            <button
              onClick={toogleMenuBtn}
              type='button'
              className='btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger'
              id='topnav-hamburger-icon'
            >
              <span className='hamburger-icon'>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
          <div className='d-flex align-items-center'>
            <FullScreenDropdown />
            <LightDark
              layoutMode={layoutModeType}
              onChangeLayoutMode={onChangeLayoutMode}
            />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  onChangeLayoutMode: PropTypes.func,
  layoutModeType: PropTypes.string,
  headerClass: PropTypes.string,
};
