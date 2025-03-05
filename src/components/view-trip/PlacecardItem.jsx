import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

    useEffect(() => {
        if (place?.placeName) {
            fetchUnsplashImage(place.placeName);
        }
    }, [place?.placeName]);
    const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;


    const fetchUnsplashImage = async (query) => {
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
            );
            const data = await response.json();
            if (data.results.length > 0) {
                setPhotoUrl(data.results[0].urls.small);
            } else {
                setPhotoUrl('/placeholder.jpg'); // Fallback image
            }
        } catch (error) {
            console.error("Error fetching Unsplash image:", error);
        }
    };

    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName || '')}`} target='_blank'>
            <div className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
                <img 
                    src={photoUrl} 
                    alt={place?.placeName || "Place Image"} 
                    className='w-[130px] h-[130px] rounded-xl object-cover' 
                />
                <div>
                    <h2 className='font-bold text-lg'>{place?.placeName || "Unknown Place"}</h2>
                    <p className='text-sm text-gray-500'>{place?.placeDetails || "No details available"}</p>
                    <h2 className='text-xs font-medium mt-2 mb-2'>🏷️ Ticket: {place?.ticketPricing || "Not available"}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
