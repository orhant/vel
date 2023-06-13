import React, {useEffect, useState} from 'react';
import styles from './layout.module.scss';
import AppContentView from '../AppContentView';
import {useAuthUser} from '../../utility/AuthHooks';
import AppScrollbar from '../AppScrollbar';
import clsx from 'clsx';

import {useSelector, useDispatch} from 'react-redux';

import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

import {
  changeLayout,
  changeSidebarTheme,
  changeLayoutMode,
  changeLayoutWidth,
  changeLayoutPosition,
  changeTopbarTheme,
  changeLeftsidebarSizeType,
  changeLeftsidebarViewType,
  changeSidebarImageType,
  changeSidebarVisibility,
} from 'redux/actions';

const AppLayout = () => {
  const [headerClass, setHeaderClass] = useState('');
  const dispatch = useDispatch();
  const {isAuthenticated} = useAuthUser();
  const {
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    sidebarVisibilitytype,
  } = useSelector((state) => ({
    layoutType: state.layout.layoutType,
    leftSidebarType: state.layout.leftSidebarType,
    layoutModeType: state.layout.layoutModeType,
    layoutWidthType: state.layout.layoutWidthType,
    layoutPositionType: state.layout.layoutPositionType,
    topbarThemeType: state.layout.topbarThemeType,
    leftsidbarSizeType: state.layout.leftsidbarSizeType,
    leftSidebarViewType: state.layout.leftSidebarViewType,
    leftSidebarImageType: state.layout.leftSidebarImageType,
    sidebarVisibilitytype: state.layout.sidebarVisibilitytype,
  }));
  useEffect(() => {
    if (
      layoutType ||
      leftSidebarType ||
      layoutModeType ||
      layoutWidthType ||
      layoutPositionType ||
      topbarThemeType ||
      leftsidbarSizeType ||
      leftSidebarViewType ||
      leftSidebarImageType ||
      sidebarVisibilitytype
    ) {
      window.dispatchEvent(new Event('resize'));
      dispatch(changeLeftsidebarViewType(leftSidebarViewType));
      dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
      dispatch(changeSidebarTheme(leftSidebarType));
      dispatch(changeLayoutMode(layoutModeType));
      dispatch(changeLayoutWidth(layoutWidthType));
      dispatch(changeLayoutPosition(layoutPositionType));
      dispatch(changeTopbarTheme(topbarThemeType));
      dispatch(changeLayout(layoutType));
      dispatch(changeSidebarImageType(leftSidebarImageType));
      dispatch(changeSidebarVisibility(sidebarVisibilitytype));
    }
  }, [
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    sidebarVisibilitytype,
    dispatch,
  ]);
  /*
    call dark/light mode
    */
  const onChangeLayoutMode = (value) => {
    console.log(value);
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };
  // class add remove in header
  useEffect(() => {
    window.addEventListener('scroll', scrollNavigation, true);
  });

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass('topbar-shadow');
    } else {
      setHeaderClass('');
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (
        sidebarVisibilitytype === 'show' ||
        layoutType === 'vertical' ||
        layoutType === 'twocolumn'
      ) {
        document.querySelector('.hamburger-icon').classList.remove('open');
      } else {
        document.querySelector('.hamburger-icon') &&
          document.querySelector('.hamburger-icon').classList.add('open');
      }
    }
  }, [sidebarVisibilitytype, layoutType]);
  return (
    <>
      {isAuthenticated ? (
        <div id='layout-wrapper'>
          <AppHeader
            headerClass={headerClass}
            layoutModeType={layoutModeType}
            onChangeLayoutMode={onChangeLayoutMode}
          />
          <AppSidebar layoutType={layoutType} />
          <AppScrollbar
            className={clsx(styles.authScroll, 'd-flex flex-column min-vh-100')}
          >
            <div className='main-content'>
              <div className='page-content'>
                <AppContentView />
              </div>
            </div>
          </AppScrollbar>
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
