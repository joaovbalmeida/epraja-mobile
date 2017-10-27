const sessionReducer = (state = 0, action) => {
	switch (action.type){
		case 'UPDATE_TABLE_NUMBER':
			return action.number;
		default:
			return state;
	}
};

export default sessionReducer;
