export const setCurrentProduct = (currentProduct) => {
  return { type: 'SET_CURRENT_PRODUCT', currentProduct};
};

export const addProductToCart = (currentProduct) => {
  return { type: 'SET_PRODUCT_TO_CART', currentProduct};
};

export const increaseItemQuantityInCart = (currentProduct) => {
  return { type: 'INCREASE_ITEM_QUANTITY_IN_CART', currentProduct};
};

export const decreaseItemQuantityInCart = (currentProduct) => {
  return { type: 'DECREASE_ITEM_QUANTITY_IN_CART', currentProduct};
};

export const removeItemInCart = (currentProduct) => {
  return { type: 'REMOVE_ITEM_IN_CART', currentProduct };
};
  
export const saveSignInUser = (user) => {
  return { type: 'SAVE_SIGN_IN_USER', user};
};

export const signOutUser = () => {
  return { type: 'SIGN_OUT_USER'};
};

export const searchNameProduct = (arrSearchProduct) => {  
  return { type: 'SEARCH_PRODUCT', arrSearchProduct};
};