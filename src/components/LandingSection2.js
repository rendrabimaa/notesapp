import React from "react";

function LandingPageSection2({ image, title, subtitle, subtitle2}) {
    return (
            <section className="landing__section_2" id="about">
                <div className="row"> 
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
                    <div className="img-container">
                        <img src={image} alt="section-image2"></img>
                    </div>
                </div>
            </section>   
    )
}

export default LandingPageSection2;