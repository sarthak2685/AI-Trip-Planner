import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'

function Home() {
  return (
    <div>
        <Navbar />
        <Hero />
        <About />
        <Contact />
        <Footer />
    </div>
  )
}

export default Home