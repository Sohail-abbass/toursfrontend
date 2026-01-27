// src/api/packageApi.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getPackages = async () => {
  const res = await axios.get(`${BASE_URL}/packages`);
  return res.data;
};

// Fetch package by slug
export const getPackageBySlug = async (slug: string) => {
  // 1. Fetch all packages
  const res = await axios.get(`${BASE_URL}/packages`);
  const packages = res.data;

  // 2. Find the package matching the slug
  const pkg = packages.find((p: any) => p.slug === slug);

  if (!pkg) {
    throw new Error(`Package with slug "${slug}" not found`);
  }

  return pkg;
};
