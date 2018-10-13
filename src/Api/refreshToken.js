import saveToken from './saveToken';

const refeshToken = async (token) => {
  const res = await fetch('http://192.168.0.157:8080/api/refresh_token.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ token })
    }
  );
  saveToken(token);
  return res.text();
};

export default refeshToken;