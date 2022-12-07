import React from "react";
import { Link } from "react-router-dom";

function AboutCard({name, img, instagram, linkedin}) {
  return (
    <div className="about-card">
      <img src={img} alt={name}/>
      <h3>{name}</h3>
      <div>
        <Link to={linkedin}><i class="fa-brands fa-linkedin"></i></Link>
        <Link to={instagram}><i class="fa-brands fa-square-instagram"></i></Link>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
    </div>
  )
}

export default AboutCard;