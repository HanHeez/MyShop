const defaultTypes = { 
  types: [{id: 'types', name: 2, image: 3}],
  product: [{id: 'oroduct'}],
  isLoading: false,
  error: false 
};

// Xu ly action tra ve
const typesReducer = ( state = defaultTypes, action ) => {
  switch (action.type) {
    case 'START_FETCH':
      return { types: [], product: [], isLoading: true, error: false};
    case 'FETCH_SUCCESS':
      return { types: action.types.slice(), product: action.product.slice(), isLoading: false, error: false};
    case 'FETCH_ERROR':
      return { types: [], product: [], isLoading: false, error: true};
    default:
      return state;
  }  
};

export default typesReducer;