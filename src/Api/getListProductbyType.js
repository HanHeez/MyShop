const getListProductByType =  (idType, page) => {
  const url = `http://192.168.0.157:8080/api/product_by_type.php?id_type=${idType}&page=${page}`;
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export default getListProductByType;