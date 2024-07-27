
import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { Product } from '../../../interface/Product';
import { getBestSellers } from '../../../api/apiBestSellers';
import ProductItem from '../../../component/ProductItem';

const BestSellers: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBestSellers();
        setBestSellers(data);
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-3">
      <h3 className="w-[80%] mx-auto text-neutral-600 text-3xl font-normal font-['Baloo'] capitalize tracking-wide">
        Best Sellers
      </h3>
      <Divider />
      <div className="bg-white">
        <div className="w-[80%] mx-auto grid grid-cols-4 gap-9">
          {bestSellers.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
