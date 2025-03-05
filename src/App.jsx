import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CreateTrip from './components/Trip/CreateTrip.jsx';
import ViewTrip from './components/view-trip/ViewTrip.jsx';
import MyTrips from './components/Trip-detail/MyTrips.jsx';
import Home from './components/Home.jsx';

const App = () => {
  console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/view-trip/:tripId" element={<ViewTrip />} />
          <Route path="/my-trips" element={<MyTrips />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
