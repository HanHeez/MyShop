const arrSearchProductDefault = [];

const searchReducer = ( state = arrSearchProductDefault, action ) => {
  switch (action.type) {
    case 'SEARCH_PRODUCT': 
      return action.arrSearchProduct;    
    default:
      return state;
  }
};

export default searchReducer;