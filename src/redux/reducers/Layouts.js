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

import {
  layoutTypes,
  leftSidebarTypes,
  layoutModeTypes,
  layoutWidthTypes,
  layoutPositionTypes,
  topbarThemeTypes,
  leftsidbarSizeTypes,
  leftSidebarViewTypes,
  leftSidebarImageTypes,
  preloaderTypes,
  sidebarVisibilitytypes,
} from 'shared/constants/AppConst';

export const initialState = {
  layoutType: layoutTypes.VERTICAL,
  leftSidebarType: leftSidebarTypes.DARK,
  layoutModeType: layoutModeTypes.LIGHTMODE,
  layoutWidthType: layoutWidthTypes.FLUID,
  layoutPositionType: layoutPositionTypes.FIXED,
  topbarThemeType: topbarThemeTypes.LIGHT,
  leftsidbarSizeType: leftsidbarSizeTypes.DEFAULT,
  leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
  leftSidebarImageType: leftSidebarImageTypes.NONE,
  preloader: preloaderTypes.DISABLE,
  sidebarVisibilitytype: sidebarVisibilitytypes.SHOW,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LAYOUT_ACTION: //changeLayoutAction
      return {
        ...state,
        layoutType: action.payload,
      };

    case CHANGE_LAYOUT_MODE_ACTION: //changeLayoutModeAction
      return {
        ...state,
        layoutModeType: action.payload,
      };

    case CHANGE_SIDEBAR_THEME_ACTION: //changeSidebarThemeAction
      return {
        ...state,
        leftSidebarType: !state.contactDrawer,
      };

    case CHANGE_LAYOUT_WIDTH_ACTION: //changeLayoutWidthAction
      return {
        ...state,
        layoutWidthType: action.payload,
      };
    case CHANGE_LAYOUT_POSITION_ACTION: //changeLayoutPositionAction
      return {
        ...state,
        topbarThemeType: action.payload,
      };
    case CHANGE_TOPBAR_THEME_ACTION: //changeTopbarThemeAction
      return {
        ...state,
        topbarThemeType: action.payload,
      };

    case CHANGE_LEFTSIDEBAR_SIZE_TYPE_ACTION: //changeLeftsidebarSizeTypeAction
      return {
        ...state,
        leftsidbarSizeType: action.payload,
      };

    case CHANGE_LEFTSIDEBAR_VIEW_TYPE_ACTION: //changeLeftsidebarViewTypeAction
      return {
        ...state,
        leftSidebarViewType: action.payload,
      };

    case CHANGE_SIDEBAR_IMAGE_TYPE_ACTION: //changeSidebarImageTypeAction
      return {
        ...state,
        leftSidebarImageType: action.payload,
      };

    case CHANGE_PRE_LOADER_ACTION: //changePreLoaderAction
      return {
        ...state,
        leftSidebarViewType: action.payload,
      };

    case CHANGE_SIDEBAR_VISIBILITY_ACTION: //changeSidebarVisibilityAction
      return {
        ...state,
        sidebarVisibilitytype: action.payload,
      };

    default:
      return state;
  }
};
export default layoutReducer;
