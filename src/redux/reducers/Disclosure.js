import {GET_LAST_TEN_DISCLOSURE_LIST} from 'shared/constants/ActionTypes';

const initialState = {
  lastTenDisclosureList: [],
  lastTenDisclosureListTodayCount: 0,
};

const disclosureReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_TEN_DISCLOSURE_LIST:
      return {
        ...state,
        lastTenDisclosureList: action.payload.lastTenDisclosureList
          ? action.payload.lastTenDisclosureList
          : [],
        lastTenDisclosureListTodayCount: action.payload
          .lastTenDisclosureListTodayCount
          ? action.payload.lastTenDisclosureListTodayCount
          : 0,
      };
    default:
      return state;
  }
};

export default disclosureReducer;
