const URL = 'http://192.168.0.157:8080/api/';

const initData = () => {
  return fetch(URL)
    .then(res => res.json())
    .then(resJSON => resJSON);
};

export default initData;