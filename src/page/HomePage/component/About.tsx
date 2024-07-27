import React, { useEffect, useState } from 'react';
import { getAboutData, Image } from '../../../api/apiAbout';

const About = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAboutData();
        setImages(data.images); // Cập nhật dữ liệu vào state
      } catch (err) {
        setError('Failed to fetch about data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container w-[70%] mx-auto p-4">
      <div className="grid grid-cols-5 gap-4">
        {images.length > 0 && (
          <>
            <div className="col-span-2 bg-red-500 relative">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-full object-fill"
              />
              <div className="absolute top-6 p-4 w-full left-0 bg-white bg-opacity-70 font-semibold text-[25px] text-black">
                {images[0].label}
              </div>
            </div>

            <div className="col-span-3 grid grid-cols-2 gap-4">
              {images.slice(1).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-3 p-4 w-full left-0 bg-white bg-opacity-70 font-semibold text-[25px] text-black">
                    {image.label}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default About;
