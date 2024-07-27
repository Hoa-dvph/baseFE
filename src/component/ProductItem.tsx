import React from 'react';
import { Product } from '../interface/Product';

interface ProductItemProps {
  product: Product; 
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  if (!product || !product.image || !product.name || !product.category || !product.price) {
    return <div className="text-red-500">Product data is missing.</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="w-full h-auto p-9">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[280px] object-cover" 
        />
      </div>
      <h1 className="text-black font-semibold">{product.name}</h1>
      <div className="flex justify-between">
        <span className="text-[#777777]">{product.category}</span>
        <span>${product.price.toFixed(2)}</span> 
      </div>
    </div>
  );
};

export default ProductItem;
