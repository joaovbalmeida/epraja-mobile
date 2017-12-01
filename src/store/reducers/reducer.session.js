const initialState = {
  tableNumber: 0,
  menuCategories: [],
  businessID: '',
  menuItems: [],
  cart: [],
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TABLE_NUMBER':
      return {
        ...state,
        tableNumber: action.tableNumber,
      };
    case 'UPDATE_MENU_CATEGORIES':
      return {
        ...state,
        menuCategories: action.menuCategories,
      };
    case 'UPDATE_BUSINESS_ID':
      return {
        ...state,
        businessID: action.businessID,
      };
    case 'UPDATE_MENU_ITEMS':
      return {
        ...state,
        menuItems: action.menuItems,
      };
    case 'ADD_TO_CART':
      if (state.cart.length > 0) {
        let index = 0;
        const newCart = state.cart;
        const itemRepeated = newCart.some((item, i) => {
          if (item.id === action.id) {
            index = i;
            return true;
          }
          return false;
        });
        if (itemRepeated) {
          newCart[index].qty += action.qty;
          return {
            ...state,
            cart: newCart,
          };
        }
        newCart.push({ id: action.id, qty: action.qty });
        return {
          ...state,
          cart: newCart,
        };
      }
      return {
        ...state,
        cart: [{ id: action.id, qty: action.qty }],
      };
    default:
      return state;
  }
};

export default sessionReducer;
