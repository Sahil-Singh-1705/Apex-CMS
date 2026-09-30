import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Award_Slider() {
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
  <div className="container " style={{paddingTop: '80px'}}>
      <Slider {...settings}>
      
  <div className="awradslider">
     <div
      className="card border-0"
      style={{
        minHeight: '350px',
        padding: '15px 10px',
        width: '20rem'
      }}
     >
      <a
        className="nextjs-link"
        href="best-crm-software-provider-asiapacific-2023-ufawards"
      >
        <img
          alt="Best crm software provider asiapacific 2023 ufawards"
          className="card-img-top"
          // src="https://techysquad.com/wp-content/uploads/2024/01/best-crm-software-provider-asiapacific-2023-ufawards.png"
          style={{
            height: '255px'
          }}
        />
      </a>
      <div className="card-body w-100">
        <h5 className="card-title text-black fw-bolder text-center">
          The Ultimate Fintech Awards 2023: Best CRM Software Provider in                APAC
        </h5>
      </div>
    </div>
  </div>
  <div className="awradslider">
    <div
      className="card border-0"
      style={{
        minHeight: '350px',
        padding: '15px 10px',
        width: '20rem'
      }}
    >
      <a
        className="nextjs-link"
        href="times-power-women-2023"
      >
        <img
          alt="Times Power Women Of The Year"
          className="card-img-top"
          // src="https://techysquad.com/wp-content/uploads/2024/01/times-power-women-2023.png"
          style={{
            height: '255px'
          }}
        />
      </a>
      <div className="card-body w-100">
        <h5 className="card-title text-black fw-bolder text-center">
          Times Power Women Of The Year - 2023
        </h5>
      </div>
    </div>
  </div>
  <div className="awradslider">
    <div
      className="card border-0"
      style={{
        minHeight: '350px',
        padding: '15px 10px',
        width: '20rem'
      }}
    >
      <a
        className="nextjs-link"
        href="times-men-of-the-year-2023"
      >
        <img
          alt="Times Men Of The Year 2023"
          className="card-img-top"
          // src="https://techysquad.com/wp-content/uploads/2024/01/times-men-of-the-year-2023.png"
          style={{
            height: '255px'
          }}
        />
      </a>
      <div className="card-body w-100">
        <h5 className="card-title text-black fw-bolder text-center">
          Times Men Of The Year - 2023
        </h5>
      </div>
    </div>
  </div>
  <div className="awradslider">
    <div
      className="card border-0"
      style={{
        minHeight: '350px',
        padding: '15px 10px',
        width: '20rem'
      }}
    >
      <a
        className="nextjs-link"
        href="excellence-award"
      >
        <img
          alt="Excellence Award"
          className="card-img-top"
          // src="https://techysquad.com/wp-content/uploads/2024/01/excellence-award.png"
          style={{
            height: '255px'
          }}
        />
      </a>
      <div className="card-body w-100">
        <h5 className="card-title text-black fw-bolder text-center">
          Excellence Award - 2023
        </h5>
      </div>
    </div>
  </div>
     
      </Slider>
    </div>
  );
}

export default Award_Slider;
