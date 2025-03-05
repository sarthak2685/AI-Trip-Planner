import { GetPlaceDetails, GetPlacePhoto } from '../service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');
    
    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            fetchPlacePhoto(trip.userSelection.location.label);
        }
    }, [trip]);

    const fetchPlacePhoto = async (locationLabel) => {
        try {
            const photo = await GetPlacePhoto(locationLabel);
            setPhotoUrl(photo);
        } catch (error) {
            console.error("Error fetching trip photo:", error);
        }
    };

    return (
        <Link to={`/view-trip/${trip?.id}`} className="block">
            <div className="hover:scale-105 transition-all">
                <img src={photoUrl} alt="Trip Location" className="object-cover rounded-xl h-[220px] w-full" />
                <div>
                    <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label || "Unknown Destination"}</h2>
                    <h2 className="text-sm text-gray-500">
                        {trip?.userSelection?.noOfDays || "N/A"} Days trip with {trip?.userSelection?.budget || "N/A"} budget.
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCardItem;
