import React, { useEffect, useState } from "react";
import ddd from "./../../assets/images/image-baklava-thumbnail.jpg";
import { UseSoppingCartContext } from "../../context/UseShoppingCartContext";
import { fetchProductById } from "../../api/Api";
function ConfirmationList({ resProduct }) {
  const [product, setProduct] = useState([]);
  const { handleRemoveProductQty, getProductQty } = UseSoppingCartContext();

  useEffect(() => {
    async function loadProducts() {
      const productsData = await fetchProductById(resProduct.id);
      setProduct(productsData);
    }
    loadProducts();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2">
          <img src={product.thumbnail_url} alt="" className="w-10 h-10" />
          <div>
            <p className="text-xs font-medium">{product.name}</p>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-xs font-bold text-[var(--Red)]">
                {resProduct.qty}x
              </p>
              <p className="text-[var(--Rose-400)] text-xs">
                @ ${product.price}
              </p>
            </div>
          </div>
        </div>
        <p className="font-medium text-sm">${product.price * resProduct.qty}</p>
      </div>
      <hr className="border-gray-200  my-4 w-full " />
    </>
  );
}

export default ConfirmationList;
