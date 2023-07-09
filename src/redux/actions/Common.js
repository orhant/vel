import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
  UPDATING_CONTENT,
  SET_CURRENT_STOCK,
  GET_STOCK_LIST,
  GET_LAST_TEN_DISCLOSURE_LIST,
  SET_SELECTED_TEMPLATE,
  GET_TEMPLATE_SUMMARY,
  GET_TEMPLATE_DATA,
} from 'shared/constants/ActionTypes';

import jwtAxios from '@hap/services/auth/jwt-auth';
import {appIntl} from '@hap/utility/helper/Utils';

export const fetchStart = () => {
  return (dispatch) => dispatch({type: FETCH_START});
};

export const fetchSuccess = () => {
  return (dispatch) => dispatch({type: FETCH_SUCCESS});
};
export const updatingContent = () => {
  return (dispatch) => dispatch({type: UPDATING_CONTENT});
};

export const fetchError = (error) => {
  return (dispatch) => dispatch({type: FETCH_ERROR, payload: error});
};

export const showMessage = (message) => {
  return (dispatch) => dispatch({type: SHOW_MESSAGE, payload: message});
};
export const onToggleAppDrawer = () => {
  return (dispatch) => dispatch({type: TOGGLE_APP_DRAWER});
};

export const hideMessage = () => {
  return (dispatch) => dispatch({type: HIDE_MESSAGE});
};

export const getStockList = () => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/financials/get-stock-list')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_STOCK_LIST, payload: data.data.items});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const setCurrentStock = (stock) => {
  return (dispatch) => {
    dispatch({type: GET_LAST_TEN_DISCLOSURE_LIST, payload: []});
    dispatch({type: SET_CURRENT_STOCK, payload: stock});
    dispatch({type: SET_SELECTED_TEMPLATE, payload: {}});
    dispatch({type: GET_TEMPLATE_SUMMARY, payload: {}});
    dispatch({type: GET_TEMPLATE_DATA, payload: {item: [], cols: []}});
  };
};
