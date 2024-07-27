import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { Product } from "../../interface/Product";

type Props = {
  onAdd: (product: Product) => void;
};

const AddProduct = ({ onAdd }: Props) => {
  const { register, handleSubmit, reset } = useForm<Product>();

  const onSubmit = (data: Product) => {
    onAdd(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto flex gap-5 flex-col"
    >
      <h2>Thêm sản phẩm</h2>
      <input
        type="text"
        {...register("name", { required: true })}
        placeholder="Product name"
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <input
        type="text"
        {...register("image", { required: true })}
        placeholder="Product image"
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <input
        type="text"
        {...register("desc", { required: true })}
        placeholder="Product description"
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <input
        type="number"
        {...register("price", { required: true })}
        placeholder="Product price"
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <Button variant="contained" type="submit">
        Thêm sản phẩm
      </Button>
    </form>
  );
};

export default AddProduct;
