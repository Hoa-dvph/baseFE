import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Category } from "../../../interface/Category";
import { Link } from "react-router-dom";

const Kategorien = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-12">
      <h3 className="w-[80%] mx-auto text-neutral-600 text-3xl font-normal font-['Baloo'] leading-10">
        Kategorien
      </h3>
      <Divider />
      <div className="grid grid-cols-4 mx-auto gap-6 w-[80%]">
        {categories.map((item) => (
          <Link to={`/products-by-category/${item.id}`} key={item.id}>
            <div className="relative rounded-xl overflow-hidden group">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute w-[50%] top-3 right-0 text-white flex flex-col z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold text-[18px]">{item.name}</p>
                <p className="text-[16px]">{item.quantity} items</p>
              </div>
              <div className="opacity-30 group-hover:opacity-0 bg-neutral-900 shadow absolute top-0 right-0 w-full h-full transition-opacity duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Kategorien;
