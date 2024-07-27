import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Review {
  name: string;
  rating: number;
  reviews: string;
}

interface Reviews {
  [key: number]: number;
}

const About: React.FC = () => {
  const reviews: Reviews = {
    1: 388,
    2: 50,
    3: 30,
    4: 20,
    5: 10,
  };

  const totalReviews = Object.values(reviews).reduce(
    (acc, value) => acc + value,
    0
  );

  const Reviews: Review[] = [
    { name: "", reviews: "", rating: 0 },
    {
      name: "Aman gupta",
      rating: 5,
      reviews:
        "I've been using this cleanser for about five or six months now and my acne is almost completely gone. I really struggled for years with my skin and tried everythi possible but this is the only thing that managed to clear up my skin. 100% recommend and will continue to use is for sure.",
    },
    {
      name: "Aman gupta",
      rating: 5,
      reviews:
        "I've been using this cleanser for about five or six months now and my acne is almost completely gone. I really struggled for years with my skin and tried everythi possible but this is the only thing that managed to clear up my skin. 100% recommend and will continue to use is for sure.",
    },
    {
      name: "Aman gupta",
      rating: 5,
      reviews:
        "I've been using this cleanser for about five or six months now and my acne is almost completely gone. I really struggled for years with my skin and tried everythi possible but this is the only thing that managed to clear up my skin. 100% recommend and will continue to use is for sure.",
    },
  ];

  return (
    <div className="flex gap-5 flex-col">
      <div>
        <p className="text-lime-700 text-3xl font-normal font-['Inter']">
          About
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
      <div className=" ">
        <div className="flex items-start justify-between w-2/3">
          <div className="flex gap-3 items-center">
            <img
              src="/public/images/product/ff2.png"
              className="w-[200px] object-fill"
              alt=""
            />
            <div>
              <div className="flex">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-lime-700 text-[32.75px] font-normal font-['Istok Web']">
                  5.0
                </p>
                <p>(388)</p>
              </div>
            </div>
          </div>
          <button className="bg-[#4E7C32] py-2 px-4 rounded-xl">
            <p className="text-white text-sm font-normal font-['Istok Web']">
              Write reviews
            </p>
          </button>
        </div>

        <div className="mt-4 w-2/4">
          {Object.keys(reviews).map((star) => (
            <div key={star} className="flex items-center my-1">
              <div className="flex gap-2">
                <span>{star}</span>
                <p>★</p>
              </div>
              <div className="w-full bg-gray-200 h-2 ml-2 mr-2 relative">
                <div
                  className="bg-lime-700 h-2 absolute top-0 left-0"
                  style={{
                    width: `${(reviews[parseInt(star)] / totalReviews) * 100}%`,
                  }}
                ></div>
              </div>
              <span>({reviews[parseInt(star)]})</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 w-2/3 ">
          {Reviews.map((review, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="text-lime-700 text-base font-normal text-[20px] font-['Istok Web']">
                  {review.name}
                </div>
                {review.rating > 0 && (
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < review.rating ? (
                        <AiFillStar key={i} className="text-lime-700" />
                      ) : (
                        <AiOutlineStar key={i} className="text-lime-700" />
                      )
                    )}
                  </div>
                )}
              </div>
              <p className="text-stone-600 text-[13.08px] font-normal font-['Istok Web']">
                {review.reviews}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
