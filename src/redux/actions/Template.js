import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_TEMPLATE_SUMMARY,
  SET_SELECTED_TEMPLATE,
  GET_TEMPLATE_DATA,
  UPDATE_TEMPLATE_DATA,
  SORT_TEMPLATE_DATA,
  UPDATE_TEMPLATE_INDENT,
  SORT_FINANCE_DATA,
  HIDE_FINANCE_DATA,
} from 'shared/constants/ActionTypes';

import jwtAxios from '@hap/services/auth/jwt-auth';
import {appIntl} from '@hap/utility/helper/Utils';

export const getTemplateSummary = (stock_code) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('/template/get-template-summary', {
        stock_code,
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_TEMPLATE_SUMMARY, payload: data.data.items});
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

export const setSelectedTemplate = (template) => {
  return (dispatch) =>
    dispatch({type: SET_SELECTED_TEMPLATE, payload: template});
};

export const getFinanceData = (data) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('/template/get-finance-data', {
        ...data,
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_TEMPLATE_DATA, payload: data.data.items});
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
export const sortFinanceData = (data) => {
  return (dispatch) => {
    dispatch({type: SORT_FINANCE_DATA, payload: data});
  };
};

export const updateTemplateData = (data) => {
  return (dispatch) => dispatch({type: UPDATE_TEMPLATE_DATA, payload: data});
};
export const sortTemplateData = (data) => {
  return (dispatch) => dispatch({type: SORT_TEMPLATE_DATA, payload: data});
};
export const updateTemplateIndent = (data) => {
  return (dispatch) => dispatch({type: UPDATE_TEMPLATE_INDENT, payload: data});
};

export const hideFinanceData = () => {
  return (dispatch) => dispatch({type: HIDE_FINANCE_DATA, payload: ''});
};
