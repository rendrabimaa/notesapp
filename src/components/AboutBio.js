import React from "react";
import AboutCard from "./AboutCard";

function AboutBio() {
  return (
    <div className="about-bio">
      <AboutCard name="Agi Sahriza" img="man.jpg" />
      <AboutCard name="Noviana" img="woman.png" />
      <AboutCard name="Arin Novia" img="man.jpg" />
      <AboutCard name="Alfin Wahyu" img="woman.png" />
    </div>  
  )
}

export default AboutBio;