"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTours } from "@/store/features/tourSlice";
import Tours from "./Tours";
import type { RootState, AppDispatch } from "@/store/store";

export default function TourList() {

  const dispatch = useDispatch<AppDispatch>();
  const tours = useSelector((state: RootState) => state.tours.tours);
  const loading = useSelector((state: RootState) => state.tours.loading);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {tours?.map((tour) => (
        <Tours key={tour.id} tour={tour} />
      ))}
    </div>
  );
}