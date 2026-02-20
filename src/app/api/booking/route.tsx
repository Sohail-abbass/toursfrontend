import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

  export interface BookingPayload {
    bookingType: "tour" | "package";
    itemId: string;
  
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  
    travelers: number;
  
    packageType?: "solo" | "couple" | "deluxe"; // only for tour
  
    message?: string;
    travelDate?: Date;
  }

  export const submitBooking = async (data: BookingPayload) => {
    const res = await axios.post(`${BASE_URL}/bookings`, {
      bookingType: data.bookingType,
      itemId: data.itemId,
  
      customerName: data.customerName.trim(),
      customerEmail: data.customerEmail.trim().toLowerCase(),
      customerPhone: data.customerPhone.trim(),
  
      travelers: data.travelers,
      packageType: data.packageType,
      message: data.message?.trim(),
      travelDate: data.travelDate,
    });
  
    return res.data;
  };
  