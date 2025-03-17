"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PauseOnHover() {
  var settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          centerPadding: "0px",
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="w-full h-auto">
          <img src={"/images/glow.png"} />
        </div>
        <div className="w-full h-auto">
          <img src={"/images/peak.jpeg"} />
        </div>
        <div className="w-full h-auto">
          <img src={"/images/seoul.jpeg"} />
        </div>
        <div className="w-full h-auto">
          <img src={"/images/madison.jpeg"} />
        </div>
        <div className="w-full h-auto">
          <img src={"/images/peak.jpeg"} />
        </div>
        <div className="w-full h-auto">
          <img src={"/images/seoul.jpeg"} />
        </div>
      </Slider>
    </div>
  );
}

export default PauseOnHover;
