import React from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../../interface/Product";
import { Category } from "../../../interface/Category";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { getAllCategories } from "../../../api/apiCategory";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Props = {
  onAdd: (product: Product) => void;
  onCancel: () => void; // Add this prop for cancel action
};

const AddProduct = ({ onAdd, onCancel }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Có lỗi xảy ra khi lấy danh mục.");
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: Product) => {
    try {
      // Convert categoryId to a number if it exists
      const newProduct = {
        ...data,
        categoryId: Number(data.categoryId) // Ensure categoryId is a number
      };
      await onAdd(newProduct);
      reset();
      toast.success("Thêm sản phẩm thành công!");
      navigate("/admin");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto flex gap-5 flex-col">
      <h2>Thêm sản phẩm</h2>
      <input
        type="text"
        {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
        placeholder="Tên sản phẩm"
        className={`block w-full p-2 text-gray-900 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}

      <input
        type="text"
        {...register("image", { required: "Ảnh sản phẩm là bắt buộc" })}
        placeholder="URL ảnh sản phẩm"
        className={`block w-full p-2 text-gray-900 border ${errors.image ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}

      <input
        type="text"
        {...register("desc", { required: "Mô tả sản phẩm là bắt buộc" })}
        placeholder="Mô tả sản phẩm"
        className={`block w-full p-2 text-gray-900 border ${errors.desc ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.desc && <span className="text-red-500 text-xs">{errors.desc.message}</span>}

      <input
        type="number"
        {...register("price", { required: "Giá sản phẩm là bắt buộc", min: { value: 0, message: "Giá sản phẩm không thể âm" } })}
        placeholder="Giá sản phẩm"
        className={`block w-full p-2 text-gray-900 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}

      <select
        {...register("categoryId", { required: "Danh mục là bắt buộc" })}
        className={`block w-full p-2 text-gray-900 border ${errors.categoryId ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
      >
        <option value="">Chọn danh mục</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.categoryId && <span className="text-red-500 text-xs">{errors.categoryId.message}</span>}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("isBestSeller")}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-gray-900 dark:text-white">Best Seller</label>
      </div>

      <Button variant="contained" type="submit">
        Thêm sản phẩm
      </Button>
      <Button variant="outlined" onClick={onCancel}>
        Hủy
      </Button>
    </form>
  );
};

export default AddProduct;
