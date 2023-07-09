import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_TEMPLATE_SUMMARY,
} from 'shared/constants/ActionTypes';

import jwtAxios from '@hap/services/auth/jwt-auth';
import {appIntl} from '@hap/utility/helper/Utils';

// export const getStockList = () => {
//   const {messages} = appIntl();
//   return (dispatch) => {
//     dispatch({type: FETCH_START});
//     jwtAxios
//       .get('/financials/get-stock-list')
//       .then((data) => {
//         if (data.status === 200) {
//           dispatch({type: FETCH_SUCCESS});
//           dispatch({type: GET_STOCK_LIST, payload: data.data.items});
//         } else {
//           dispatch({
//             type: FETCH_ERROR,
//             payload: messages['message.somethingWentWrong'],
//           });
//         }
//       })
//       .catch((error) => {
//         dispatch({type: FETCH_ERROR, payload: error.message});
//       });
//   };
// };
// export const setCurrentStock = (stock) => {
//   return (dispatch) => {
//     dispatch({type: SET_CURRENT_STOCK, payload: stock});
//   };
// };

export const getTemplateSummary = (stock_code) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('/financials/get-template-summary', {
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
