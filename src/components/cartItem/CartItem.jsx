import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseSoppingCartContext } from "../../context/UseShoppingCartContext";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../api/Api";

function CartItem({ resCartItem }) {
  const [product, setProduct] = useState([]);
  const { handleRemoveProductQty, getProductQty } = UseSoppingCartContext();

  useEffect(() => {
    async function loadProducts() {
      const productsData = await fetchProductById(resCartItem.id);
      setProduct(productsData);
    }
    loadProducts();
  }, []);
  return (
    <>
      <div className="grid grid-cols-12 items-center ">
        <div className="col-span-11 grid gap-2">
          <p className="font-medium ">{product.name}</p>
          <div className="flex items-center gap-2 ">
            <span className="text-[var(--Red)] text-sm font-bold mr-2 ">
              {getProductQty(product.id)}x
            </span>
            <span className="text-[var(--Rose-400)]">@ ${product.price}</span>
            <span className="text-[var(--Rose-500)] font-bold">
              ${product.price * getProductQty(product.id)}
            </span>
          </div>
        </div>
        <div className="col-span-1  text-right">
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => handleRemoveProductQty(resCartItem.id)}
            className="text-[var(--Rose-300)] hover:text-[var(--Rose-900)] cursor-pointer"
          />
        </div>
      </div>
      <hr className="border-[var(--Rose-100)] mt-3 w-full " />
    </>
  );
}

export default CartItem;
