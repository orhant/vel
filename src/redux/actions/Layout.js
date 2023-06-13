import {changeHTMLAttribute} from '@hap/utility/helper/Utils';

import {
  CHANGE_LAYOUT_ACTION,
  CHANGE_LAYOUT_MODE_ACTION,
  CHANGE_SIDEBAR_THEME_ACTION,
  CHANGE_LAYOUT_WIDTH_ACTION,
  CHANGE_LAYOUT_POSITION_ACTION,
  CHANGE_TOPBAR_THEME_ACTION,
  CHANGE_LEFTSIDEBAR_SIZE_TYPE_ACTION,
  CHANGE_LEFTSIDEBAR_VIEW_TYPE_ACTION,
  CHANGE_SIDEBAR_IMAGE_TYPE_ACTION,
  CHANGE_PRE_LOADER_ACTION,
  CHANGE_SIDEBAR_VISIBILITY_ACTION,
} from 'shared/constants/ActionTypes';

export const changeLayout = (layout) => {
  return (dispatch) => {
    try {
      if (layout === 'twocolumn') {
        document.documentElement.removeAttribute('data-layout-width');
      } else if (layout === 'horizontal') {
        document.documentElement.removeAttribute('data-sidebar-size');
      } else if (layout === 'semibox') {
        changeHTMLAttribute('data-layout-width', 'fluid');
        changeHTMLAttribute('data-layout-style', 'default');
      }
      changeHTMLAttribute('data-layout', layout);
      dispatch(CHANGE_LAYOUT_ACTION(layout));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const changeLayoutMode = (layoutMode) => {
  return (dispatch) => {
    try {
      changeHTMLAttribute('data-layout-mode', layoutMode);

      dispatch({type: CHANGE_LAYOUT_MODE_ACTION, payload: layoutMode});
    } catch (error) {
      console.log(error);
    }
  };
};
export const changeSidebarTheme = (theme) => {
  return (dispatch) => {
    try {
      changeHTMLAttribute('data-sidebar', theme);
      dispatch(CHANGE_SIDEBAR_THEME_ACTION(theme));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const changeLayoutWidth = (layoutWidth) => {
  return (dispatch) => {
    try {
      if (layoutWidth === 'lg') {
        changeHTMLAttribute('data-layout-width', 'fluid');
      } else {
        changeHTMLAttribute('data-layout-width', 'boxed');
      }
      dispatch({type: CHANGE_LAYOUT_WIDTH_ACTION, payload: layoutWidth});
    } catch (error) {
      // console.log(error);
    }
  };
};

export const changeLayoutPosition = (layoutposition) => {
  return (dispatch) => {
    try {
      changeHTMLAttribute('data-layout-position', layoutposition);
      dispatch(CHANGE_LAYOUT_POSITION_ACTION(layoutposition));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const changeTopbarTheme = (topbarTheme) => {
  return (dispatch) => {
    try {
      changeHTMLAttribute('data-topbar', topbarTheme);
      dispatch(CHANGE_TOPBAR_THEME_ACTION(topbarTheme));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const changeSidebarImageType = (leftsidebarImagetype) => {
  return (dispatch) => {
    try {
      changeHTMLAttribute('data-sidebar-image', leftsidebarImagetype);
      dispatch(CHANGE_SIDEBAR_IMAGE_TYPE_ACTION(leftsidebarImagetype));
    } catch (error) {
      // console.log(error);
    }
  };
};
export const changePreLoader = (preloaderTypes) => {
  return (dispatch) => {
    try {
      changeHTMLAttribute('data-sidebar-image', preloaderTypes);
      dispatch(CHANGE_PRE_LOADER_ACTION(preloaderTypes));
    } catch (error) {
      // console.log(error);
    }
  };
};
export const changeLeftsidebarSizeType = (leftsidebarSizetype) => {
  return (dispatch) => {
    try {
      switch (leftsidebarSizetype) {
        case 'lg':
          changeHTMLAttribute('data-sidebar-size', 'lg');
          break;
        case 'md':
          changeHTMLAttribute('data-sidebar-size', 'md');
          break;
        case 'sm':
          changeHTMLAttribute('data-sidebar-size', 'sm');
          break;
        case 'sm-hover':
          changeHTMLAttribute('data-sidebar-size', 'sm-hover');
          break;
        default:
          changeHTMLAttribute('data-sidebar-size', 'lg');
      }
      dispatch(CHANGE_LEFTSIDEBAR_SIZE_TYPE_ACTION(leftsidebarSizetype));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const changeLeftsidebarViewType = (leftsidebarViewtype) => {
  return (dispatch) => {
    try {
      changeHTMLAttribute('data-layout-style', leftsidebarViewtype);
      dispatch(CHANGE_LEFTSIDEBAR_VIEW_TYPE_ACTION(leftsidebarViewtype));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const changeSidebarVisibility = (sidebarVisibilitytype) => {
  return (dispatch) => {
    try {
      changeHTMLAttribute('data-layout-style', sidebarVisibilitytype);
      dispatch(CHANGE_SIDEBAR_VISIBILITY_ACTION(sidebarVisibilitytype));
    } catch (error) {
      // console.log(error);
    }
  };
};
