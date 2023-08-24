import React from 'react'
import hero from '../assets/hero.png'


const Hero = () => {
  return (
    <div className="hero-container">
        <img src={hero} alt="Hero" className="hero-image" />
        <div className="hero-text">
            <h1>BLOG NAME HERE</h1>
            
        </div>
    </div>
  )
}

export default Hero
