import React, { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { MdOutlineShoppingCart } from "react-icons/md";
const ProductDetailSlide: React.FC = () => {
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);
  const [count, setCount] = useState(0);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);
  const ListData = [
    {
      name: "Square cultivation pots 0.27 to 2 litres",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      image: [
        "/public/images/product/ff1.png",
        "/public/images/product/ff2.png",
        "/public/images/product/ff3.png",
      ],
    },
  ];

  useEffect(() => {
    setNav1(sliderRef1.current ?? undefined);
    setNav2(sliderRef2.current ?? undefined);
  }, []);

  const settings1: Settings = {
    asNavFor: nav2,
    arrows: false,
    fade: true,
    swipeToSlide: true,
  };

  const settings2: Settings = {
    asNavFor: nav1,
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
  };
  const handleClick = () => {
    setCount(count + 1);
  };

  const handlePrev = () => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex  justify-between">
        <div className="flex flex-col w-[30%]">
          <div className="">
            <Slider {...settings1} ref={sliderRef1}>
              {ListData[0].image.map((imgSrc, index) => (
                <div key={index}>
                  <img
                    src={imgSrc}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </Slider>
            <div className="mt-2 px-8">
              <Slider {...settings2} ref={sliderRef2}>
                {ListData[0].image.map((imgSrc, index) => (
                  <div key={index} className="px-2">
                    <img
                      src={imgSrc}
                      alt={`Product thumbnail ${index + 1}`}
                      className="w-full h-auto cursor-pointer"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="w-[60%] flex flex-col gap-4">
          <p className="text-lime-700 text-sm font-bold font-['Kumbh Sans'] uppercase tracking-wide">
            Plant
          </p>
          <p className="text-neutral-800 text-[44px] font-bold font-['Kumbh Sans'] leading-[48px]">
            Square cultivation pots <br />
            0.27 to 2 litres
          </p>
          <p className="text-gray-500 text-base font-medium font-['Kumbh Sans'] leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
            <br />
            industry. Lorem Ipsum has been the industry's standard dummy <br />
            text ever since the
          </p>
          <div className="flex gap-2">
            <p className="text-neutral-800 text-3xl font-bold font-['Kumbh Sans'] ">
              $125.00
            </p>
            <div className="rounded-lg px-4 bg-[#FFEDE0] flex items-center justify-center">
              50%
            </div>
          </div>
          <p className="line-through">$250.00</p>
          <div className="flex gap-4">
            <div className="flex px-4 w-[20%] justify-center rounded-xl  bg-[#F7F8FD]">
              <button onClick={handlePrev} className="text-[#505F4E] ">
                <FaMinus />
              </button>
              <input
                type="text"
                value={count}
                className="bg-[#F7F8FD] w-[60%] focus:outline-none focus:border-transparent text-center"
                name=""
                id=""
              />
              <button onClick={handleClick}>
                <FaPlus />
              </button>
            </div>
            <button className="py-[10px] gap-2 flex items-center text-white rounded-xl px-[77px] bg-[#4E7C32]">
              <MdOutlineShoppingCart />
              <p className=" text-base font-bold font-['Kumbh Sans']">
                Add to cart
              </p>
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lime-700 text-3xl font-normal font-['Inter']">
          Discription
        </p>
        <p className="text-stone-600 text-xl font-light font-['Inter']">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the
          <br />
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of
          <br />
          type and scrambled i
        </p>
      </div>
    </div>
  );
};

export default ProductDetailSlide;
