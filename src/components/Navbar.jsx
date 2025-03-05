import React, { useState } from 'react';
import { Button } from './ui/button';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import logo from "../assets/logo.png";

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => console.error("Error fetching user profile: ", error));
  };

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <a href="/" className="p-2 bg-white/20 backdrop-blur-sm rounded-md">
      <img src={logo} alt="Logo" className="h-10" />
    </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <a href="/create-trip">
                <Button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-80 transition-all text-white rounded-full shadow-md">
                  + Create Trip
                </Button>
              </a>
              <a href="/my-trips">
                <Button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 transition-all text-white rounded-full shadow-md">
                  My Trips
                </Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <img src={user?.picture} alt="" className="h-[40px] w-[40px] rounded-full border-2 border-cyan-400 shadow-md cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="p-4 bg-gray-900 text-white shadow-lg rounded-lg">
                  <h2
                    className="cursor-pointer text-red-400 hover:text-red-500 transition"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button
              onClick={() => setOpenDialog(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 transition-all text-white rounded-full shadow-md"
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-white">
            {menuOpen ? <IoClose /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-16 left-0 w-full bg-black/80 backdrop-blur-lg transition-all ${menuOpen ? 'h-auto py-4' : 'h-0 overflow-hidden'}`}>
        <div className="flex flex-col gap-4 px-6">
          {user ? (
            <>
              <a href="/create-trip" className="text-white text-lg hover:text-cyan-400 transition">+ Create Trip</a>
              <a href="/my-trips" className="text-white text-lg hover:text-cyan-400 transition">My Trips</a>
              <div className="flex items-center gap-3">
                <img src={user?.picture} alt="" className="h-[35px] w-[35px] rounded-full border-2 border-cyan-400" />
                <button
                  className="text-red-400 hover:text-red-500 transition"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Button onClick={() => setOpenDialog(true)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 transition-all text-white rounded-full shadow-md">
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700 shadow-lg">
          <DialogHeader>
            <DialogDescription className="text-center">
              <img src="/logo.svg" alt="logo" width="100px" className="mx-auto" />
              <h2 className="font-bold text-lg mt-2 text-cyan-400">Sign In to Check Out Your Travel Plan</h2>
              <p className="text-sm text-gray-400">Sign in to the app with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center justify-center bg-gray-800 hover:bg-gray-700 transition-all text-white rounded-lg shadow-md"
              >
                <FcGoogle className="h-7 w-7" />Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </nav>
  );
}

export default Navbar;
