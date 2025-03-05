import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, GetPlacePhoto } from '../service/GlobalApi';

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg");

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            fetchPlaceData(trip.userSelection.location.label);
        }
    }, [trip]);

    const fetchPlaceData = async (location) => {
        try {
            const placeData = await GetPlaceDetails(location);
            if (placeData) {
                console.log("Location Data:", placeData);
                const photo = await GetPlacePhoto(location);
                setPhotoUrl(photo);
            } else {
                console.log("No place found!");
            }
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    };

    return (
        <div>
            <img src={photoUrl} alt="Location" className='h-[340px] w-full object-cover rounded-xl' />
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>👥 Travelers: {trip?.userSelection?.traveler}</h2>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
