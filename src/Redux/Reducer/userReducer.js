const defaultUser = {
  token: '',
  user: {
    email: '',
    name: '',
    address: null,
    phone: null
  },
  isSignin: false
};

const userReducer = ( state = defaultUser , action ) => {
  switch (action.type) {
    case 'SAVE_SIGN_IN_USER':
      var user = action.user;
      user.isSignin = true;      
      return user;  
    case 'SIGN_OUT_USER':
      return defaultUser;    
    default:
      return state;
  }
};

export default userReducer;