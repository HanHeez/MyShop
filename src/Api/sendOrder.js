const sendOrder = (token, arrayDetail) => { 
  return fetch('http://192.168.0.157:8080/api/cart.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({token, arrayDetail})
    })
    .then(res => res.text());
};
  
export default sendOrder;