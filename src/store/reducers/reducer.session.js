const initialState = {
  tableNumber: 0,
  bill: '',
  menuCategories: [],
  itemStatuses: [],
  billStatuses: [],
  businessID: '',
  menuItems: [],
  cart: [],
  modalVisible: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TABLE_NUMBER':
      return {
        ...state,
        tableNumber: action.tableNumber,
        modalVisible: false,
      };
    case 'UPDATE_BILL':
      return {
        ...state,
        bill: action.bill,
      };
    case 'UPDATE_MENU_CATEGORIES':
      return {
        ...state,
        menuCategories: action.menuCategories,
      };
    case 'UPDATE_ITEM_STATUSES':
      return {
        ...state,
        itemStatuses: action.itemStatuses,
      };
    case 'UPDATE_BILL_STATUSES':
      return {
        ...state,
        billStatuses: action.billStatuses,
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
    case 'UPDATE_MODAL':
      return {
        ...state,
        modalVisible: action.modalVisible,
      };
    case 'REMOVE_FROM_CART':
      const cartWithoutItem = state.cart.filter(item => item.id !== action.id);
      return {
        ...state,
        cart: cartWithoutItem,
      };
    case 'RESET_CART':
      return {
        ...state,
        cart: [],
      };
    case 'UPDATE_CART':
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.id) {
          return {
            id: item.id,
            qty: action.qty,
            name: item.name,
            price: item.price,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart,
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
        newCart.push({
          id: action.id,
          qty: action.qty,
          name: action.name,
          price: action.price,
        });
        return {
          ...state,
          cart: newCart,
        };
      }
      return {
        ...state,
        cart: [{
          id: action.id,
          qty: action.qty,
          name: action.name,
          price: action.price,
        }],
      };
    default:
      return state;
  }
};

export default sessionReducer;
