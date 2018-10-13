const searchProduct =  (key) => {
  const url = `http://192.168.0.157:8080/api/search.php?key=${key}`;
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};
  
export default searchProduct;