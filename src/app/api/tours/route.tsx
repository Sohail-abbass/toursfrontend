// src/api/toursApi.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000";

// 🔹 Get all tours
export const getTours = async () => {
  const res = await axios.get(`${BASE_URL}/tours`);
  return res.data;
};

// 🔹 Get tour by ID
export const getTourById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/tours/${id}`);
  return res.data;
};

// 🔹 Optional: Add new tour
export const addTour = async (tour: {
  title: string;
  location: string;
  days: number;
  price: number;
  image?: string;
}) => {
  const res = await axios.post(`${BASE_URL}/tours`, tour);
  return res.data;
};

// 🔹 Optional: Update tour
export const updateTour = async (id: number, tour: Partial<{
  title: string;
  location: string;
  days: number;
  price: number;
  image?: string;
}>) => {
  const res = await axios.put(`${BASE_URL}/tours/${id}`, tour);
  return res.data;
};

// 🔹 Optional: Delete tour
export const deleteTour = async (id: number) => {
  const res = await axios.delete(`${BASE_URL}/tours/${id}`);
  return res.data;
};
