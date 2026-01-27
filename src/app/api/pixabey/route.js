import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "mountains";

    const API_KEY = process.env.PEXEL_API_KEY; // your .env key
    const API_URL = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=10`;

    // ✅ axios request (no need for .ok — axios throws error automatically if not 2xx)
    const res = await axios.get(API_URL, {
      headers: {
        Authorization: API_KEY, // required by Pexels API
      },
    });

    // ✅ Extract and clean up the data
    const images = res.data.photos.map((photo) => ({
      id: photo.id,
      url: photo.src.medium,
      photographer: photo.photographer,
      alt: photo.alt,
    }));

    // ✅ Return JSON response
    return NextResponse.json(images);
  } catch (error) {
    console.error("Pexels API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
