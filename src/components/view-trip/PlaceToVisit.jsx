import React from 'react';
import PlaceCardItem from './PlacecardItem';

function PlacesToVisit({ trip }) {
    console.log("Full Trip Data:", trip); // Debugging Log

    const itineraryObj = trip?.tripData?.[0]?.travelPlan?.itinerary || {};

    console.log("Raw Itinerary Object:", itineraryObj); // Debugging Log

    // Convert object `{ day1: {...}, day2: {...} }` to array `[{ day: "Day 1", ...}, { day: "Day 2", ...}]`
    const itinerary = Object.entries(itineraryObj).map(([key, value], index) => ({
        day: `Day ${index + 1}`,
        ...value
    }));

    console.log("Formatted Itinerary:", itinerary); // Debugging Log

    if (itinerary.length === 0) {
        return <h2 className="font-bold text-xl text-gray-500">No places to visit available.</h2>;
    }

    return (
        <div>
            <h2 className="font-bold text-xl">Places to Visit</h2>
            <div>
                {itinerary.map((item, index) => (
                    <div key={index} className="mt-5">
                        <h2 className="font-bold text-lg">{item.day}</h2>
                        <p className="text-sm text-gray-600">Best Time to Visit: {item.bestTimeToVisit}</p>
                        <div className="grid md:grid-cols-2 gap-5">
                            {Array.isArray(item?.plan) && item.plan.length > 0 ? (
                                item.plan.map((place, idx) => (
                                    <div key={idx} className="my-2">
                                        <PlaceCardItem place={place} />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No planned places for this day.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;
