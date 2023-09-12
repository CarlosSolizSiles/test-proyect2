import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NewsCard from "./NewsCard";

type ListBook = {
    image: string;
    title: string;
    description: string;
};

const Carrusel = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
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
        <div className="bg-blue-300 w-full mb-10 h-72 shadow-md">
            <h1 className="text-white bg-amber-500 font-semibold text-center text-xl font-serif w-full">
                Noticias Destacadas
            </h1>
            <div className="w-full px-8 mt-6">
                <Slider {...settings} className="">
                    <div className="h-48 w-full relative">
                        <NewsCard
                            title="Revive Julio Verne"
                            content="Se vio a Julio Verne cerca del cementerio caminado"
                            date="32882923"
                            imageUrl="https://files.mormonsud.org/wp-content/uploads/2018/10/julio-verne.jpg"
                        ></NewsCard>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default Carrusel;
