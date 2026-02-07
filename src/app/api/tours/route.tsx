// src/app/api/tours/route.tsx
// Frontend helper functions for talking to the Express tours backend

import axios from "axios";

// Point this to your Express backend (Mongo-connected)
// You can override via NEXT_PUBLIC_BACKEND_URL in .env.local
const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

// 🔹 Get all tours (uses GET /api/tours)
export const getTours = async () => {
  const res = await axios.get(`${BASE_URL}/tours`);
  console.log("getTours response:", res.data);
  return res.data;
};

// 🔹 Get tour by Mongo ID (uses GET /api/tours/id/:id)
export const getTourById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/tours/id/${id}`);
  return res.data;
};

// 🔹 Get tour by slug (uses GET /api/tours/:slug)
export const getTourBySlug = async (slug: string) => {
  const res = await axios.get(`${BASE_URL}/tours/${slug}`);
  return res.data;
};

// 🔹 Optional: Add new tour (admin only – POST /api/tours)
export const addTour = async (tour: {
  title: string;
  location: string;
  days: number;
  nights: number;
  price: number;
  image: string;
}) => {
  const res = await axios.post(`${BASE_URL}/tours`, tour);
  return res.data;
};

// 🔹 Optional: Update tour (admin only – PUT /api/tours/:id)
export const updateTour = async (
  id: string,
  tour: Partial<{
    title: string;
    location: string;
    days: number;
    nights: number;
    price: number;
    image: string;
  }>
) => {
  const res = await axios.put(`${BASE_URL}/tours/${id}`, tour);
  return res.data;
};

// 🔹 Optional: Delete tour (admin only – DELETE /api/tours/:id)
export const deleteTour = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/tours/${id}`);
  return res.data;
};
