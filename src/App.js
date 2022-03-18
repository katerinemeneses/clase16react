import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ProductsForm from "./components/ProductsForm";
import ProductsList from "./components/ProductsList";
import "./App.css";

function App() {
  // ESTADO PRINCIPAL
  const [products, setProducts] = useState([]);
  const [productEdit, setProductEdit] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("https://products-app-academlo.herokuapp.com/products/")
      .then((res) => setProducts(res.data));
  };

  const addProduct = (product) => {
    axios
      .post("https://products-app-academlo.herokuapp.com/products/", product)
      .then(() => getProducts());
  };

  const removeProduct = (id) => {
    axios
      .delete(`https://products-app-academlo.herokuapp.com/products/${id}/`)
      .then(() => getProducts());
  };

  const selectProduct = (product) => setProductEdit(product);

  const updateProduct = (productInfo) => {
    axios
      .put(
        `https://products-app-academlo.herokuapp.com/products/${productInfo.id}/`,
        productInfo
      )
      .then(() => getProducts());
  };

  return (
    <div className="App">
      <ProductsForm
        addProduct={addProduct}
        productEdit={productEdit}
        selectProduct={selectProduct}
        updateProduct={updateProduct}
      />
      <ProductsList
        products={products}
        removeProduct={removeProduct}
        selectProduct={selectProduct}
      />
    </div>
  );
}

export default App;
