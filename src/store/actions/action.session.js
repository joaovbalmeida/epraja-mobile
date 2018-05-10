import api from './../../api';

export const resetState = () => (
  {
    type: 'RESET_STATE',
  }
);

export const updateSession = sessionActive => (
  {
    type: 'UPDATE_SESSION',
    sessionActive,
  }
);

export const updateTableNumber = tableNumber => (
  {
    type: 'UPDATE_TABLE_NUMBER',
    tableNumber,
  }
);

export const updateBill = bill => (
  {
    type: 'UPDATE_BILL',
    bill,
  }
);

export const updateMenuCategories = menuCategories => (
  {
    type: 'UPDATE_MENU_CATEGORIES',
    menuCategories,
  }
);

export const updateItemStatuses = itemStatuses => (
  {
    type: 'UPDATE_ITEM_STATUSES',
    itemStatuses,
  }
);

export const updateSurveyRates = rates => (
  {
    type: 'UPDATE_SURVEY_RATES',
    rates,
  }
);

export const updateBillStatuses = billStatuses => (
  {
    type: 'UPDATE_BILL_STATUSES',
    billStatuses,
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

export const addToCart = (id, qty, name, price, comment) => (
  {
    type: 'ADD_TO_CART',
    id,
    qty,
    name,
    price,
    comment,
  }
);

export const updateCart = (id, qty, comment) => (
  {
    type: 'UPDATE_CART',
    id,
    qty,
    comment,
  }
);

export const removeFromCart = (id, comment) => (
  {
    type: 'REMOVE_FROM_CART',
    id,
    comment,
  }
);

export const resetCart = () => (
  {
    type: 'RESET_CART',
  }
);

export const updateModal = modalVisible => (
  {
    type: 'UPDATE_MODAL',
    modalVisible,
  }
);

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

export const fetchItemStatuses = () => (
  (dispatch) => {
    const statuses = [];

    return api.menuItemStatuses.find()
      .then((response) => {
        response.data.forEach((item) => {
          const newStatus = {};
          newStatus.id = item._id;
          newStatus.name = item.name;
          statuses.push(newStatus);
        });
        dispatch(updateItemStatuses(statuses));
        return response;
      }, error => error)
      .catch(error => error);
  }
);

export const fetchSurveyRates = () => (
  (dispatch) => {
    const rates = [];

    api.surveyRates.find()
      .then((response) => {
        response.data.forEach((item) => {
          const newRate = {};
          newRate.id = item._id;
          newRate.name = item.name;
          rates.push(newRate);
        });
        dispatch(updateSurveyRates(rates));
        return response;
      })
      .catch(error => error);
  }
);

export const fetchBillStatuses = () => (
  (dispatch) => {
    const statuses = [];

    return api.billStatuses.find()
      .then((response) => {
        response.data.forEach((item) => {
          const newStatus = {};
          newStatus.id = item._id;
          newStatus.name = item.name;
          statuses.push(newStatus);
        });
        dispatch(updateBillStatuses(statuses));
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
