import { Input } from '../ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '../details/TravelDetail';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { chatSession } from '../service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog"
import { FcGoogle } from "react-icons/fc";;
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { app, db } from '../service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const fetchLocations = async (query) => {
    if (!query) return;
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: query,
          format: "json",
          limit: 5
        }
      });
      setLocationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };


  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true)
      return;
    }

    if (formData?.noOfDAys > 5 && !formData?.location || !formData?.budget || !formData.traveler) {
      toast('Please fill all the details')
      return;
    }

    setLoading(true)

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    // console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false)
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString();
    // Add a new document in collection "AITrips"
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false)
    navigate('/view-trip/' + docId)
  }

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }


  return (
    <>
    <Navbar />
    <div className="relative  bg-gradient-to-br from-gray-900 to-gray-800 text-white px-5 sm:px-10 md:px-32 lg:px-56 pt-40">
    <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
      <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <Input
  placeholder="Enter destination"
  value={place}
  onChange={(e) => {
    setPlace(e.target.value);
    fetchLocations(e.target.value);
  }}
  className="bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"

/>

{locationSuggestions.length > 0 && (
              <ul className="border mt-2 rounded-lg shadow-md bg-gray-700">
    {locationSuggestions.map((loc) => (
      <li
        key={loc.place_id}
        onClick={() => {
          handleInputChange('location', {
            label: loc.display_name,
            lat: loc.lat,
            lon: loc.lon,
          });
          setPlace(loc.display_name);
          setLocationSuggestions([]);
        }}
        className="p-2 hover:bg-gray-600 cursor-pointer text-white"
        >
        {loc.display_name}
      </li>
    ))}
  </ul>
)}

        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.4'} type='number' onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>


        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg transition-all duration-300 ${
                    formData?.budget === item.title
                      ? "border-blue-500 shadow-lg bg-gray-800 animate-glow"
                      : "border-gray-600 hover:border-blue-400 hover:shadow-md"
                  }`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg transition-all duration-300 ${
                    formData?.traveler === item.people
                      ? "border-blue-500 shadow-lg bg-gray-800 animate-glow"
                      : "border-gray-600 hover:border-blue-400 hover:shadow-md"
                  }`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 flex justify-end">
  <Button
    disabled={loading}
    onClick={onGenerateTrip}
    className={`relative px-6 py-6  mt-4 text-lg font-semibold tracking-wide cursor-pointer transition-all duration-300
        ${
          loading ? "bg-gray-800 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-800"
        } text-white border border-gray-700 rounded-lg shadow-lg
        hover:shadow-indigo-500/30 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${
          !loading &&
          "before:absolute before:-inset-1 before:bg-gradient-to-r before:from-gray-800 before:via-gray-700 before:to-gray-800 before:blur-md before:opacity-40"
        }`}
  >
    {loading ? (
      <div className="flex items-center gap-2">
        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin text-blue-300" />
        <span className="animate-pulse">Generating...</span>
      </div>
    ) : (
      <span>🚀 Generate Trip</span>
    )}
  </Button>
</div>
      </div>



      <style>
        {`
          @keyframes glow {
            0% { box-shadow: 0 0 5px blue; }
            50% { box-shadow: 0 0 20px blue; }
            100% { box-shadow: 0 0 5px blue; }
          }
          .animate-glow { animation: glow 1.5s infinite alternate; }
        `}
      </style>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" width="100px" className='items-center' />
              <h2 className='font-bold text-lg'>Sign In to check out your travel plan</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
    <div className=''>
    <Footer />
    </div>
    
    </>
  )
}

export default CreateTrip