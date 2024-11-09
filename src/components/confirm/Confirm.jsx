import orderConfirmed from "./../../assets/images/icon-order-confirmed.svg";
import ConfirmationList from "../confirmationList/ConfirmationList";
import { UseSoppingCartContext } from "../../context/UseShoppingCartContext";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/Api";

function Confirm({ onStartNew }) {
  const [product, setProduct] = useState([]);
  const { cartItems } = UseSoppingCartContext();
  useEffect(() => {
    async function loadProducts() {
      const productsData = await fetchProducts();
      setProduct(productsData);
    }
    loadProducts();
  }, []);
  const orderTotal = cartItems.reduce((total, cartItem) => {
    const productItem = product.find((p) => p.id === cartItem.id);
    return total + (productItem ? productItem.price * cartItem.qty : 0);
  }, 0);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[var(--Rose-50)] p-6 rounded-lg shadow-lg max-w-md w-full text-[var(--Rose-900)]">
        <img src={orderConfirmed} alt="" className="w-8 h-8" />
        <p className="text-3xl font-bold mt-4">Order Confirmed</p>
        <p className="text-xs font-medium text-[var(--Rose-500)] mt-2">
          We hope you enjoy your food!
        </p>
        <div className="bg-[var(--Rose-100)] mt-7 p-4 rounded-md">
          {cartItems.map((item) => (
            <ConfirmationList key={item.id} resProduct={item} />
          ))}

          <div className="flex justify-between items-center mt-5">
            <p className="font-medium text-xs text-[var(--Rose-500)]">
              Order Total
            </p>
            <p className="font-bold ">${orderTotal}</p>
          </div>
        </div>

        <button
          type="button"
          className="bg-[var(--Red)] w-full mt-5 rounded-full py-3 text-sm text-[var(--Rose-100)] hover:bg-[var(--Red-dark)] transition-all duration-200"
          onClick={onStartNew}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default Confirm;
