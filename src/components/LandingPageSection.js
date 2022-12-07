import React from "react";

function LandingPageSection({ image, title, subtitle, subtitle2}) {
    return (
            <section className="landing__section" id="about">
                <div className="row">
                    <div className="img-container">
                        <img src={image} alt="section-img"></img>
                    </div>
                    <div className="content">
                        <h3> {title} </h3>
                        <br></br>
                        <p>
                            {subtitle}
                        </p>
                       
                        <p>
                           {subtitle2}
                        </p>
                    </div>
                </div>
            </section>
        
    )
}

export default LandingPageSection;