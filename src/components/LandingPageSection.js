import React from "react";

function LandingPageSection({ image, title, subtitle, subtitle2, buttonText }) {
    return (
            <section className="landing__section" id="about">
                <div className="row">
                    <div className="img-container">
                        <img src="Gambar 1.jpg" alt="hh"></img>
                    </div>
                    <div className="content">
                        <h3> {title} </h3>
                        <br></br>
                        <p>
                            {subtitle}
                        </p>
                        <br></br>
                        <p>
                           {subtitle2}
                        </p>
                    
                    </div>
                </div>
            </section>
        
    )
}

export default LandingPageSection;