import {
  GET_LAST_TEN_DISCLOSURE_LIST,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from 'shared/constants/ActionTypes';

import jwtAxios from '@hap/services/auth/jwt-auth';
import {appIntl} from '@hap/utility/helper/Utils';

export const getLastTenDisclosureList = (stock_code) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('/disclosure/get-last-ten-disclosure-list', {
        stock_code,
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: GET_LAST_TEN_DISCLOSURE_LIST,
            payload: data.data.items,
          });
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
