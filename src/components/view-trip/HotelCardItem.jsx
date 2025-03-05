import { GetPlaceDetails, GetHotelPhoto } from '../service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg");
    const [hotelDetails, setHotelDetails] = useState(null);

    useEffect(() => {
        if (hotel?.hotelName) {
            fetchHotelData(hotel.hotelName);
        }
    }, [hotel]);

    const fetchHotelData = async (hotelName) => {
        try {
            const details = await GetPlaceDetails(hotelName);
            setHotelDetails(details); 

            // Fetch hotel photo from Unsplash
            const photo = await GetHotelPhoto(hotelName);
            setPhotoUrl(photo);
        } catch (error) {
            console.error("Error fetching hotel details:", error);
        }
    };
    console.log("hotel",hotel)

    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName} hotel,${hotel?.hotelAddress}`} target='_blank'>
            <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8'>
                <img src={photoUrl} alt="Hotel" className='rounded-xl h-[180px] w-full object-cover' />
                <div className='my-2'>
                    <h2 className='font-medium'>{hotel?.hotelName || "Unknown Hotel"}</h2>
                    <h2 className='text-xs text-gray-500'>📍 { hotel?.hotelAddress || "Address not available"}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price ? `₹${hotel.price}` : "Price not available"}</h2>
                    <h2 className='text-sm'>⭐ {hotel?.rating || "No rating"}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
