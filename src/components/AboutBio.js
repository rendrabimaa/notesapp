import React from "react";
import AboutCard from "./AboutCard";

function AboutBio() {
  return (
    <div className="about-bio">
      <AboutCard name="Agi Sahriza" img="man.jpg" instagram="https://instagram.com/agisahriza" linkedin="https://linkedin.com/in/agisahriza"/>
      <AboutCard name="Noviana" img="novi.jpeg" instagram="https://instagram.com/noviana.ng" linkedin="https://linkedin.com/in/noviana-ng"/>
      <AboutCard name="Arin Novia" img="arin.jpeg" />
      <AboutCard name="Alfin Wahyu" img="woman.png" />
    </div>  
  )
}

export default AboutBio;