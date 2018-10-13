const checkLogIn = async (token) => { 
  const res = await fetch('http://192.168.0.157:8080/api/check_login.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ token })
    }
  );
  return res.text();
};
  
export default checkLogIn;