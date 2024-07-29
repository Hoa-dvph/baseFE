import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Kategorien as KategorienType } from "../../../interface/Kategorien";

const kategorienData: KategorienType[] = [
  {
    id: 1,
    name: "Beleuchtung",
    image: "/images/c1.png",
    quantity: 30,
  },
  {
    id: 2,
    name: "Dünger",
    image: "/images/c2.png",
    quantity: 30,
  },
  {
    id: 3,
    name: "Erde & Substrate",
    image: "/images/c3.png",
    quantity: 30,
  },
  {
    id: 4,
    name: "Bewässerung",
    image: "/images/c4.png",
    quantity: 30,
  },
  {
    id: 5,
    name: "Töpfe & Behälter",
    image: "/images/c5.png",
    quantity: 30,
  },
  {
    id: 6,
    name: "Growbox",
    image: "/images/c6.png",
    quantity: 30,
  },
  {
    id: 7,
    name: "Pflanzen & Gärtnern",
    image: "/images/c7.png",
    quantity: 30,
  },
  {
    id: 8,
    name: "Lüftung & Klimaanlage",
    image: "/images/c8.png",
    quantity: 30,
  },
];

const Kategorien = () => {
  const [kategorien, setKategorien] = useState<KategorienType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setKategorien(kategorienData);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-12">
      <h3 className="w-[80%] mx-auto text-neutral-600 text-3xl font-normal font-['Baloo'] leading-10">
        Kategorien
      </h3>
      <Divider />
      <div className="grid grid-cols-4 mx-auto gap-6 w-[80%]">
        {kategorien.map((item, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden group">
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
        ))}
      </div>
    </div>
  );
};

export default Kategorien;
