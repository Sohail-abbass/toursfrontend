import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const submitContact = async (data: ContactPayload) => {
  const res = await axios.post(`${BASE_URL}/contact`, {
    name: String(data.name).trim(),
    email: String(data.email).trim().toLowerCase(),
    phone: String(data.phone).trim(),
    subject: String(data.subject).trim(),
    message: String(data.message).trim(),
  });
  return res.data;
};