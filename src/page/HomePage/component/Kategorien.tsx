import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { Category } from "../../../interface/Category";
import { getAllCategories } from "../../../api/apiCategory";

const Kategorien = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-12">
      <h3 className="w-[80%] mx-auto text-neutral-600 text-3xl font-normal font-['Baloo'] leading-10">
        Kategorien
      </h3>
      <Divider />
      <div className="grid grid-cols-4 mx-auto gap-6 w-[80%]">
        {categories.map((item, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute w-[50%] top-3 right-0 text-white flex flex-col z-10">
              <p className="font-semibold text-[18px]">{item.name}</p>
              <p className="text-[16px]">{item.quantity} items</p>
            </div>
            <div className="opacity-30 bg-neutral-900 shadow absolute top-0 right-0 w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kategorien;