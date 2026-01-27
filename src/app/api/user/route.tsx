// src/api/userApi.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getUserById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/customers/${id}`);
  return res.data;
};
