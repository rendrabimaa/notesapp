import React from "react";

function LandingPageSection2({ image, title, subtitle, subtitle2, buttonText }) {
    return (
            <section className="landing__section_2" id="about">
                <div className="row">
                    
                    <div className="content">
                        <h3> {title} </h3>
                        <p>
                            {subtitle}
                        </p>
                        <p>
                           {subtitle2}
                        </p>
                    
                    </div>
                    <div className="img-container">
                        <img src="Gambar 1.jpg" alt="hh"></img>
                    </div>
                </div>
            </section>   
    )
}

export default LandingPageSection2;