import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./api/apiProduct";
import { Product } from "./interface/Product";
import AddProduct from "./admin/component/AddProduct";
import EditProduct from "./admin/component/EditProduct";
import ListProduct from "./admin/component/ListProduct";
import Login from "./admin/component/Login";
import Register from "./admin/component/Register";
import LayOut from "./admin/layout";
import Page from "./page";
import HomePage from "./page/HomePage";
import ProductsList from "./page/ProductsList";
import ProductDetail from "./page/ProductDetail.tsx";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  // const navigate = useNavigate();
  const { reset } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, []);

  const handleOpen = (product: Product | null = null) => {
    setIsEditing(!!product);
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
    reset();
  };

  const handleAdd = async (data: any) => {
    try {
      await addProduct(data);
      setProducts([...products, data]);
      alert("Thêm thành công");
      handleClose();
    } catch (error) {
      console.log("🚀 ~ handleAdd ~ error:", error);
    }
  };

  const handleEdit = async (data: Product) => {
    try {
      await updateProduct(data);
      setProducts(products.map((item) => (item.id === data.id ? data : item)));
      alert("Sửa thành công");
      handleClose();
    } catch (error) {
      console.log("🚀 ~ handleEdit ~ error:", error);
    }
  };

  const handleRemove = async (id: number | string) => {
    try {
      const confirm = window.confirm("Bạn có muốn xóa không?");
      if (confirm) {
        await deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
        alert("Xóa thành công");
      }
    } catch (error) {
      console.log("🚀 ~ handleRemove ~ error:", error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<HomePage />} />
          <Route path="/products-list" element={<ProductsList />} />
          <Route path="/products-detail" element={<ProductDetail />} />
        </Route>
        <Route path="/admin" element={<LayOut />}>
          <Route
            index
            element={
              <ListProduct
                products={products}
                handleRemove={handleRemove}
                onAdd={() => handleOpen(null)}
                onEdit={handleOpen}
              />
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          {isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </DialogTitle>
        <DialogContent>
          {isEditing ? (
            <EditProduct onEdit={handleEdit} product={currentProduct} />
          ) : (
            <AddProduct onAdd={handleAdd} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
