import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ShoppingCartContext = createContext({});
export const UseSoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const handleIncreaseQty = (id) => {
    setCartItems((currentItems) => {
      const selectedItem = currentItems.find((item) => item.id === id);
      if (selectedItem == null) {
        return [...currentItems, { id: id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const handleDecreaseQty = (id) => {
    setCartItems((currentItems) => {
      const selectedItem = currentItems.find((item) => item.id === id);
      if (selectedItem?.qty === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const getProductQty = (id) => {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  };
  const handleRemoveProductQty = (id) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  };
  const handleRemoveAllproducts = () => {
    setCartItems([]);
  };
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  return (
    <ShoppingCartContext.Provider
      value={{
        handleIncreaseQty,
        cartItems,
        handleRemoveAllproducts,
        getProductQty,
        handleDecreaseQty,
        totalQty,
        handleRemoveProductQty,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
