import React, { useState, useEffect } from 'react';
import { getAllCategories, updateCategory } from '../../../api/apiCategory';
import { Category } from '../../../interface/Category';
import { Link } from 'react-router-dom';
import EditCategoryModal from './EditCategory';

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Category List</h2>
      <Link
        to="/admin/categories/add"
        className="inline-block mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Add New Category
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onUpdate={handleUpdateCategory}
        />
      )}
    </div>
  );
};

export default CategoryList;
