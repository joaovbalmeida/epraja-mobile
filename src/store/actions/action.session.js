import api from './../../api'

export const updateTableNumber = tableNumber => {
  return {
    type: 'UPDATE_TABLE_NUMBER',
    tableNumber
  };
};

export const updateMenuCategories = menuCategories => {
  return {
    type: 'UPDATE_MENU_CATEGORIES',
    menuCategories
  };
};

export const updateBusinessID = businessID => {
  return {
    type: 'UPDATE_BUSINESS_ID',
    businessID
  };
};

export const updateMenuItems = menuItems => {
  return {
    type: 'UPDATE_MENU_ITEMS',
    menuItems
  };
};

export const fetchMenuCategories = businessID => (
  (dispatch) => {
    const categories = [];

    return api.menuCategories.find({ query: { business: businessID } })
      .then( response => {
        response.data.forEach( function (item){
          let newCategory = {};
          newCategory['id'] = item._id;
          newCategory['name'] = item.name;
          categories.push(newCategory);
        });
        dispatch(updateMenuCategories(categories));
        return response;
      }, (error) => {
        return error;
      }).catch( (error) => {
        return error;
      });
  }
);

export const fetchMenuItems = businessID => (
  (dispatch) => {

    return api.menuItems.find({ query: { business: businessID }})
      .then( json => {
        console.log(json.data);
        dispatch(updateMenuItems(json.data));
        return json.data;
      }, error => {
        return error;
      })
  }
)
