import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ProductMenu from "./ProductMenu";
import { BiSync } from "react-icons/bi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FaRegHeart } from "react-icons/fa";
import { getAllProducts } from "../../../api/apiProduct";
const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const Menu = [
    { label: "option1" },
    { label: "option2" },
    { label: "option3" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full py-28">
      <div className="w-[80%] mx-auto gap-10 flex flex-col">
        <div className="flex gap-10">
          <div className="flex items-center gap-4">
            <p>Sort By :</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Menu}
              size="small"
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Newest" />}
            />
          </div>
          <div className="flex items-center gap-4">
            <p>Show :</p>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={Menu}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Default" />}
            />
          </div>
        </div>
        <div className="w-full flex gap-12">
          <div className="grid grid-cols-3 gap-20 w-3/4">
            {products.map((item: any, index: number) => (
              <div key={index} className="relative flex flex-col gap-2 group">
                <div className="w-full">
                  <img src={item.image} alt={item.name} className="w-full h-[250px]" />
                </div>
                <p className="text-zinc-800 text-[16.92px] font-bold leading-normal">
                  {item.name}
                </p>
                <div className="flex gap-4 text-[#505F4E]">
                  $ {item.price}
                  <p className="line-through">$ {item.oldPrice}</p>
                </div>
                <div className="absolute inset-0 flex justify-center items-center gap-4 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-2 rounded-lg text-green-700 hover:bg-green-700 hover:text-white">
                    <BiSync className="text-xl" />
                  </div>
                  <div className="bg-white p-2 rounded-lg text-green-700 hover:bg-green-700 hover:text-white">
                    <LiaShoppingBagSolid className="text-xl" />
                  </div>
                  <div className="bg-white p-2 rounded-lg text-green-700 hover:bg-green-700 hover:text-white">
                    <FaRegHeart className="text-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/4">
            <ProductMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
