import axios from "axios";

axios.defaults.baseURL = "https://snake-game-07l8.onrender.com/";

export const fetchUsers = async () => {
  const response = await axios.get("api/users");
  return response.data;
};

export const createUser = async (newUser) => {
  const response = await axios.post("api/users", newUser);
  return response.data;
};
