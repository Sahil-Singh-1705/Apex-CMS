import Slider from "react-slick";

import React from 'react';
import parse from 'html-react-parser';
const Sliderimg = ({ slider }) => {

    const parseHTML = (html) => {
        const newSliderRegex = /<div\s+classname="newslider">(.*?)<\/div>/gs;
        const matches = [];
        let match;
        while ((match = newSliderRegex.exec(html)) !== null) {
            matches.push(match[1]);
        }
        return matches;
    };
      
    
    

    // Check if slider is an array and has elements
    const sliderContents = slider && Array.isArray(slider) ? slider.map(item => parseHTML(item.htmlCode)) : [];
 
    var settings = {
        fade: true,
        waitForAnimate: false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        slider ? (
            <div className="slider-container sliderimgofnew" style={{ paddingTop: "130px" }}>
                {sliderContents.map((sliderContent, index) => (
                    <Slider key={index} {...settings}>
                        {sliderContent.map((content, contentIndex) => (
                            <div key={contentIndex} className="newslider" dangerouslySetInnerHTML={{ __html: content }} />
                        ))}
                    </Slider>
                ))}
            </div>
        ) : null
    );
}
export default Sliderimg;
