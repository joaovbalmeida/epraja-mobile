import api from './../../api';

export const updateTableNumber = tableNumber => (
  {
    type: 'UPDATE_TABLE_NUMBER',
    tableNumber,
  }
);

export const updateMenuCategories = menuCategories => (
  {
    type: 'UPDATE_MENU_CATEGORIES',
    menuCategories,
  }
);

export const updateBusinessID = businessID => (
  {
    type: 'UPDATE_BUSINESS_ID',
    businessID,
  }
);

export const updateMenuItems = menuItems => (
  {
    type: 'UPDATE_MENU_ITEMS',
    menuItems,
  }
);

export const addToCart = (id, qty, name, price) => (
  {
    type: 'ADD_TO_CART',
    id,
    qty,
    name,
    price,
  }
);

export const updateCart = (id, qty) => (
  {
    type: 'UPDATE_CART',
    id,
    qty,
  }
);

export const removeFromCart = id => (
  {
    type: 'REMOVE_FROM_CART',
    id,
  }
);

export const updateModal = modalVisible => (
  {
    type: 'UPDATE_MODAL',
    modalVisible,
  }
)

export const fetchMenuCategories = businessID => (
  (dispatch) => {
    const categories = [];

    return api.menuCategories.find({ query: { business: businessID } })
      .then((response) => {
        response.data.forEach((item) => {
          const newCategory = {};
          newCategory.id = item._id;
          newCategory.name = item.name;
          categories.push(newCategory);
        });
        dispatch(updateMenuCategories(categories));
        return response;
      }, error => error)
      .catch(error => error);
  }
);

export const fetchMenuItems = businessID => (
  (dispatch) => {
    api.menuItems.find({ query: { business: businessID } })
      .then((json) => {
        dispatch(updateMenuItems(json.data));
        return json.data;
      }, error => error);
  }
);
