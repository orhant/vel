import {
  GET_TEMPLATE_SUMMARY,
  GET_TEMPLATE_DATA,
  SET_SELECTED_TEMPLATE,
  UPDATE_TEMPLATE_DATA,
  SORT_TEMPLATE_DATA,
  UPDATE_TEMPLATE_INDENT,
  SORT_FINANCE_DATA,
  HIDE_FINANCE_DATA,
} from 'shared/constants/ActionTypes';

const initialState = {
  templateSummary: {
    templates: [],
    lastTenFinancials: [],
    financialsInfo: {},
    memberDisclosure: [],
  },
  templateData: [],
  selectedTemplate: {},
  cols: [],
  isDirty: false,
};

const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEMPLATE_SUMMARY:
      return {
        ...state,
        templateSummary: action.payload,
      };
    case GET_TEMPLATE_DATA:
      return {
        ...state,
        templateData: action.payload.items,
        cols: action.payload.cols,
        isDirty: false,
      };
    case SORT_TEMPLATE_DATA:
      return {
        ...state,
        templateData: action.payload,
      };

    case SET_SELECTED_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.payload,
        isDirty: false,
      };
    case UPDATE_TEMPLATE_DATA: {
      let {id, rowData} = action.payload;

      return {
        ...state,
        templateData: state.templateData.map((item) =>
          item.id === id ? rowData : item,
        ),
        isDirty: true,
      };
    }
    case UPDATE_TEMPLATE_INDENT: {
      let {id, rowData, type} = action.payload;

      if (type == 'increase') {
        return {
          ...state,
          templateData: state.templateData.map((item) =>
            item.id === id ? rowData : item,
          ),
          isDirty: true,
        };
      } else if (type == 'decrease') {
        return {
          ...state,
          templateData: state.templateData.map((item) =>
            item.id === id ? rowData : item,
          ),
          isDirty: true,
        };
      }
      return state;
    }
    case SORT_FINANCE_DATA: {
      let {sourceId, targetId} = action.payload;
      const nextData = state.templateData.filter(
        (item) => item.id !== sourceId,
      );
      const dragItem = state.templateData.find((item) => item.id === sourceId);
      const index = nextData.findIndex((item) => item.id === targetId);

      nextData.splice(index, 0, dragItem);

      return {
        ...state,
        templateData: nextData,
      };
    }
    case HIDE_FINANCE_DATA:
      return {
        ...state,
        isDirty: true,
        templateData: state.templateData.map((item) => ({
          ...item,
          isHidden: !item.visibility,
          isDirty: true,
        })),
      };
    default:
      return state;
  }
};
export default templateReducer;

// const newData = data.map(item => ({
//   ...item,
//   ishidden: item.price === null ? true : item.ishidden
// }));
