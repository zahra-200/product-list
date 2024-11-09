import ProductItems from "../productItems/ProductItems";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/Api";
import cartIcon from "./../../assets/images/illustration-empty-cart.svg";
import { UseSoppingCartContext } from "../../context/UseShoppingCartContext";
import CartItem from "../cartItem/CartItem";
import carbonImg from "./../../assets/images/icon-carbon-neutral.svg";
import Confirm from "../confirm/Confirm";
function ProductList() {
  const [product, setProduct] = useState([]);
  const { totalQty, cartItems, handleRemoveAllproducts } =
    UseSoppingCartContext();

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
  const [showConfirm, setShowConfirm] = useState(false);
  const handleStartNewOrder = () => {
    setShowConfirm(false);
    handleRemoveAllproducts();
  };
  const handleConfirm = () => {
    setShowConfirm(true);
  };
  return (
    <div className="flex flex-col justify-center items-center min-[1440px]:flex-row min-[1440px]:items-start min-[1440px]:justify-between ">
      {showConfirm ? <Confirm onStartNew={handleStartNewOrder} /> : ""}

      <div className="flex flex-col gap-4 min-[1440px]:w-[67%]">
        <h1 className="font-bold text-3xl tracking-wide">Desserts</h1>
        <div className="grid gap-8  min-[425px]:gap-14 min-[426px]:gap-8 min-[768px]:gap-14 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1440px]:grid-cols-3 min-[1440px]:gap-9  min-[2560px]:grid-cols-5">
          {product.map((result) => (
            <ProductItems key={result.id} product={result} />
          ))}
        </div>
      </div>
      <div className="w-full min-[490px]:w-[90%] min-[570px]:w-[80%] min-[620px]:w-[70%] min-[700px]:w-[60%] min-[768px]:w-full min-[799px]:w-[75%] min-[900px]:w-[65%] min-[1440px]:w-[30%] flex flex-col text-[var(--Rose-900)] gap-2 bg-[var(--Rose-50)] p-5 rounded-lg mt-9 min-[425px]:mt-14 min-[1024px]:mt-20  min-[1440px]:mt-0">
        <div className="text-[var(--Red)] font-bold text-2xl">
          <p>
            Your Cart <span>({totalQty})</span>
          </p>
        </div>

        {totalQty === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <img src={cartIcon} alt="cart is empty" />
            <p className="text-xs font-medium">
              Your added items will appear here
            </p>
          </div>
        ) : (
          <div>
            {cartItems.map((result) => (
              <CartItem key={result.id} resCartItem={result} />
            ))}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm font-medium text-[var(--Rose-500)]">
                Order Total
              </p>
              <p className="text-2xl font-bold">${orderTotal}</p>
            </div>
            <div className="flex justify-center gap-1 items-center bg-[var(--Rose-100)] py-4 rounded-lg mt-5">
              <img src={carbonImg} alt="" />
              <p className="text-sm font-medium text-[var(--Rose-500)] max-[330px]:text-xs">
                This is a{" "}
                <span className="font-semibold text-[var(--Rose-900)]">
                  carbon-neutral
                </span>{" "}
                delivery
              </p>
            </div>
            <button
              onClick={handleConfirm}
              className="bg-[var(--Red)] w-full mt-5 rounded-full py-3 text-sm text-[var(--Rose-100)] hover:bg-[var(--Red-dark)] transition-all duration-200"
              type="button"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
