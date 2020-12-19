// BE api location https://water-my-plants-lambda.herokuapp.com

import axios from "axios";

const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");
  return axios.create({
    headers: { authorization: `Bearer ${token}` },
    baseURL: "https://water-my-plants-lambda.herokuapp.com",
  });
};

export default axiosWithAuth;
