import saveCart from '../../Api/saveCart';

const defaultCart = [];

const cartReducer = ( state = defaultCart, action ) => { 
   
  switch (action.type) {    
    case 'SET_PRODUCT_TO_CART':    
      var newCart = [];      
      if (state.length>0) {     
        var isExistProductInCart = false;   
        newCart = state.map(item => {
          if (item.id === action.currentProduct.id) {
            isExistProductInCart = true;
            let totalPrice = (item.quantity + 1) * item.price;
            return {...item, totalPrice, quantity: item.quantity + 1 };
          } 
          return item;      
        });
        if (isExistProductInCart) {  
          saveCart(newCart);
          return newCart;       
        }
      } 
      action.currentProduct.quantity = 1;
      action.currentProduct.totalPrice = action.currentProduct.price;
      newCart = state.concat(action.currentProduct);  
      saveCart(newCart);         
      return newCart;

    case 'INCREASE_ITEM_QUANTITY_IN_CART':
      
      newCart = state.map(item => {
        if (item.id !== action.currentProduct.id) {return item;}    
        let currentQuantity = action.currentProduct.quantity;  
        let totalPrice = (currentQuantity+1) * item.price;  
        return {...item, totalPrice, quantity: currentQuantity+1};
      });
      saveCart(newCart);
      return newCart;

    case 'DECREASE_ITEM_QUANTITY_IN_CART':      
      newCart = state.map(item => {
        if (item.id !== action.currentProduct.id) {return item;}
        let currentQuantity = action.currentProduct.quantity;        
        if (currentQuantity > 1) {
          let totalPrice = (currentQuantity-1) * item.price;  
          return {...item, totalPrice, quantity: currentQuantity-1};
        }
        
        return {...item, totalPrice: item.price, quantity: 1};
      });
      saveCart(newCart);
      return newCart;
    case 'REMOVE_ITEM_IN_CART':
      newCart = state.filter(item => item.id !== action.currentProduct.id);
      saveCart(newCart);
      return newCart;
    default:
      return state;
  }  
};


export default cartReducer;