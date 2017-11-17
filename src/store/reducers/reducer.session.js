const initialState = {
  tableNumber: 0,
  businessID: ''
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type){
    case 'UPDATE_TABLE_NUMBER':
      return {
        ...state,
        tableNumber: action.tableNumber
      }
    case 'UPDATE_MENU_CATEGORIES':
      return action.categories;
    case 'UPDATE_BUSINESS_ID':
      return {
        ...state,
        businessID: action.businessID
      }
    default:
      return state;
  }
};

export default sessionReducer;
