export const updateTableNumber = tableNumber => {
  return {
    type: 'UPDATE_TABLE_NUMBER',
    tableNumber
  };
};

export const updateMenuCategories = ([{id, name}]) => {
  return {
    type: 'UPDATE_MENU_CATEGORIES',
    categories: [{id: name}]
  };
};

export const updateBusinessID = businessID => {
  return {
    type: 'UPDATE_BUSINESS_ID',
    businessID
  };
};
