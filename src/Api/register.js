const register = async (email, name, password) => { 
  const res = await fetch('http://192.168.0.157:8080/api/register.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({email, name, password})
    }
  );
  return res.text();
};

export default register;