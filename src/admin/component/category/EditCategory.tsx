import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Category } from '../../../interface/Category';
import { updateCategory } from '../../../api/apiCategory'; // Giả sử bạn có API này
import { toast } from 'react-toastify';

type Props = {
  category: Category | null;
  onClose: () => void;
  onUpdate: (category: Category) => void;
};

const EditCategoryModal = ({ category, onClose, onUpdate }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Category>();
  
  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  const onSubmit = async (data: Category) => {
    try {
      await updateCategory(data);
      onUpdate(data);
      toast.success('Cập nhật danh mục thành công!');
      onClose();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật danh mục.');
    }
  };

  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Tên danh mục là bắt buộc" })}
              placeholder="Tên danh mục"
              className={`block w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50`}
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
