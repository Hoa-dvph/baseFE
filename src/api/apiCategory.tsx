import instance from ".";

export const getAllCategories = async () => {
    try {
      const { data } = await instance.get(`/categories`);
      return data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw new Error('Failed to fetch categories');
    }
  };