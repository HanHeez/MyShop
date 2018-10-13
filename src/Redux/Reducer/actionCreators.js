import initData from '../../Api/initData';

// tao ra cac action tra ve type va du lieu
export const startFetchData = () => {
  return { type: 'START_FETCH'};
};

export const fetchSuccess = (types, product) => {
  return { type: 'FETCH_SUCCESS', types, product};
};

export const fetchError = () => {
  return { type: 'FETCH_ERROR'};
};

export const fetchDataThunk = () => {
  return dispatch => {
    dispatch(startFetchData());
    initData()   
      .then( res => dispatch(fetchSuccess(res.types, res.product)) )
      .catch(() => dispatch(fetchError()));        
  };
};