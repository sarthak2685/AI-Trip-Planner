import axios from "axios";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

export const GetPlaceDetails = async (location) => {
    const response = await axios.get(NOMINATIM_BASE_URL, {
        params: {
            q: location,
            format: "json",
            limit: 1,
        },
    });

    return response.data.length > 0 ? response.data[0] : null;
};

// Unsplash API for fetching place photos (Optional)
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;  // Set in .env

export const GetPlacePhoto = async (query) => {
    try {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
                query,
                per_page: 1,
                orientation: "landscape",
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`  // ✅ Correct way to pass API key
            }
        });

        return response.data.results.length > 0 ? response.data.results[0].urls.regular : "/placeholder.jpg";
    } catch (error) {
        console.error("Error fetching place photo:", error);
        return "/placeholder.jpg";  // Fallback image
    }
};
export const GetHotelPhoto = async (hotelName) => {
    try {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
                query: `${hotelName} hotel`, // Ensure it fetches hotel-related images
                per_page: 1,
                orientation: "landscape",
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` // ✅ Correct way to pass API key
            }
        });

        return response.data.results.length > 0 ? response.data.results[0].urls.regular : "/placeholder.jpg";
    } catch (error) {
        console.error("Error fetching hotel photo:", error);
        return "/placeholder.jpg"; // Fallback image
    }
};
