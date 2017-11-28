const initialState = {
  tableNumber: 0,
  menuCategories: [],
  businessID: '',
  menuItems: [],
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type){
    case 'UPDATE_TABLE_NUMBER':
      return {
        ...state,
        tableNumber: action.tableNumber
      };
    case 'UPDATE_MENU_CATEGORIES':
      return {
        ...state,
        menuCategories: action.menuCategories
      };
    case 'UPDATE_BUSINESS_ID':
      return {
        ...state,
        businessID: action.businessID
      };
    case 'UPDATE_MENU_ITEMS':
      return {
        ...state,
        menuItems: action.menuItems
      };
    default:
      return state;
  }
};

export default sessionReducer;
