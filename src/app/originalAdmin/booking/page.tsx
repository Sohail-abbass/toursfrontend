"use client";

import React, { useEffect, useState } from "react";
import { getBookings } from "@/app/api/booking/route";
import BookingTable from "./BookingTable";
const BookingPage = () => {

  const [bookings, setBookings] = useState<any[]>([]);

  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data); // or res.data.data depending on API response
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingTable
      bookings={bookings}
      onEdit={(booking) => console.log("Edit", booking)}
      onDelete={(id) => console.log("Delete", id)}
    />
  );
};

export default BookingPage;