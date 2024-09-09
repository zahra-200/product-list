import axios from "axios";
import ProductItems from "../productItems/ProductItems";
import styled from "./productList.module.css";
import { useEffect, useState } from "react";

function ProductList() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/product")
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => error);
  }, [setProduct]);

  return (
    <>
      <h1 className={styled.title}>Desserts</h1>
      <div className={styled.listContainer}>
        {product.map((result) => (
          <ProductItems key={result.id} product={result} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
