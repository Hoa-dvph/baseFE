import React from 'react';
import { Product } from '../interface/Product';

interface ProductItemProps {
  product: Product;
  categoryName: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, categoryName }) => {
  if (!product || !product.image || !product.name || !product.price) {
    return <div className="text-red-500">Product data is missing.</div>;
  }

  const priceNumber = typeof product.price === 'number' ? product.price : parseFloat(product.price as any);

  if (isNaN(priceNumber)) {
    return <div className="text-red-500">Product price is invalid.</div>;
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceNumber);

  return (
    <div className="flex flex-col gap-2 p-3 border">
      <div className="w-full h-auto p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[280px] object-cover"
        />
      </div>
      <h1 className="text-black font-semibold">{product.name}</h1>
      <div className="text-[#777777]">{categoryName}</div>
      <div className="flex justify-between">
        <span className="text-red-500">{formattedPrice}</span>
      </div>
    </div>
  );
};

export default ProductItem;
