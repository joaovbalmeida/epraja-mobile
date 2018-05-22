const initialState = {
  sessionActive: false,
  tableNumber: 0,
  bill: '',
  billUsed: false,
  menuCategories: [],
  itemStatuses: [],
  rates: [],
  billStatuses: [],
  businessID: '',
  menuItems: [],
  cart: [],
  modalVisible: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SESSION':
      return {
        ...state,
        modalVisible: false,
        sessionActive: action.sessionActive,
      };
    case 'UPDATE_TABLE_NUMBER':
      return {
        ...state,
        tableNumber: action.tableNumber,
      };
    case 'UPDATE_BILL':
      return {
        ...state,
        bill: action.bill,
      };
    case 'UPDATE_BILL_USED':
      return {
        ...state,
        billUsed: action.used,
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
    case 'UPDATE_SURVEY_RATES':
      return {
        ...state,
        rates: action.rates,
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
      const cartWithoutItem = state.cart.filter((item) => {
        if (item.id === action.id && item.comment === action.comment) {
          return false;
        }
        return true;
      });
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
        if (item.id === action.id && item.comment === action.comment) {
          return {
            id: item.id,
            qty: action.qty,
            name: item.name,
            price: item.price,
            comment: item.comment,
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
          if (item.id === action.id && item.comment === action.comment) {
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
          comment: action.comment,
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
          comment: action.comment,
        }],
      };
    case 'RESET_STATE':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default sessionReducer;
