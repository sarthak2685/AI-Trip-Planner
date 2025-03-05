import { db } from '../service/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'sonner';
import InfoSection from './InfoSection';
import Hotels from './Hotels';
import PlacesToVisit from './PlaceToVisit';
import Footer from '../Footer';
import Navbar from '../Navbar';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null); // Set as null initially

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    // Fetch trip info from Firestore
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document: ", docSnap.data());
            const tripData = docSnap.data();

            setTrip(tripData); // Set tripData directly
        } else {
            console.log("No such document");
            toast("No trip found");
        }
    };

    if (!trip) {
        return <h2 className="text-center text-gray-500">Loading trip details...</h2>;
    }

    return (
    <>
    <Navbar />
        <div className='p-10 md:px-20 lg:px-44 xl:px-56 mt-40'>
            {/* Information Section */}
            <InfoSection trip={trip} />

            {/* Recommended Hotels */}
            <Hotels trip={trip} />

            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />

            {/* Footer */}
        </div>
        <Footer />
        </>
    );
}


export default ViewTrip;
