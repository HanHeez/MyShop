const signIn = async (email, password) => { 
  var res = await fetch('http://192.168.0.157:8080/api/login.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({email, password})
    }
  );
  return res.text();
};
  
export default signIn;