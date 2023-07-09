import {
  GET_STOCK_LIST,
  SET_CURRENT_STOCK,
  GET_TEMPLATE_SUMMARY,
} from 'shared/constants/ActionTypes';

const initialState = {
  stockList: [],
  currentStock: {name: 'Lütfen hisse seçiniz', stock_code: null},
  templateSummary: {
    templates: [],
    lastTenFinancials: [],
    financialsInfo: {},
    memberDisclosure: [],
  },
  // totalContacts: null,
  // contactDrawer: false,
  // labelList: [],
  // folderList: [],
  // selectedContact: null,
};

const financialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCK_LIST:
      return {
        ...state,
        stockList: action.payload,
      };
    case SET_CURRENT_STOCK:
      return {
        ...state,
        currentStock: action.payload
          ? action.payload
          : initialState.currentStock,
      };
    case GET_TEMPLATE_SUMMARY:
      return {
        ...state,
        templateSummary: action.payload,
      };

    default:
      return state;
  }
};
export default financialsReducer;
