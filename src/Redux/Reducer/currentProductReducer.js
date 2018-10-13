const defaultCurrentProduct = {

};

const currentProductReducer = ( state = defaultCurrentProduct, action ) => {
  switch (action.type) {
    case 'SET_CURRENT_PRODUCT':           
      return action.currentProduct;    
    default:
      return state;
  }
};

export default currentProductReducer;