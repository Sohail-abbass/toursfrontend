// src/app/api/package/route.tsx
// Frontend helper functions for talking to the Express packages backend

import axios from "axios";

// Point this to your Express backend (Mongo-connected)
// You can override via NEXT_PUBLIC_BACKEND_URL in .env.local
const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

// 🔹 Get all packages (uses GET /api/packages)
// Backend returns { success, count, total, page, pages, data } – we return the array
export const getPackages = async () => {
  const res = await axios.get(`${BASE_URL}/api/packages`);
  const data = res.data?.data ?? res.data;
  return Array.isArray(data) ? data : [];
};

// 🔹 Fetch package by slug directly from backend (GET /api/packages/:slug)
export const getPackageBySlug = async (slug: string) => {
  const res = await axios.get(`${BASE_URL}/api/packages/${slug}`);
  return res.data;
};
export const addPackage = async (pkg: any) => {
  const res = await axios.post(`${BASE_URL}/api/packages`, pkg);
  return res.data;
};

export const updatePackage = async (id: number, pkg: any) => {
  const res = await axios.put(`${BASE_URL}/api/packages/${id}`, pkg);
  return res.data;
};

export const deletePackage = async (id: number) => {
  await axios.delete(`${BASE_URL}/api/packages/${id}`);
};
