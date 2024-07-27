import instance from "."; // Import instance của Axios

// Định nghĩa kiểu dữ liệu cho hình ảnh
export interface Image {
  src: string;
  alt: string;
  label: string;
}

// Hàm lấy dữ liệu từ API
export const getAboutData = async () => {
  try {
    const { data } = await instance.get("/about"); // Địa chỉ API để lấy dữ liệu
    if (Array.isArray(data)) {
      return { images: data }; // Trả về dữ liệu nếu đúng định dạng
    } else {
      throw new Error('Invalid data format received.'); // Ném lỗi nếu dữ liệu không đúng định dạng
    }
  } catch (error) {
    console.error('Failed to fetch about data:', error);
    throw new Error('Failed to fetch about data');
  }
};
