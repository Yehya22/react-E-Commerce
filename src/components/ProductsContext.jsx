import {
  child,
  equalTo,
  get,
  getDatabase,
  onValue,
  orderByChild,
  ref,
  update,
} from "firebase/database";
import { createContext, useEffect, useState } from "react";
import removeFromCart from "../utils/removeProducts";
import { useAuthState } from "../utils/useAuthState";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useAuthState();

  useEffect(() => {
    if (currentUser) {
      const database = getDatabase();
      const cartRef = ref(database, `carts/${currentUser.uid}`);
      onValue(cartRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const items = Object.values(data);
          setCartItems(items);
          setCartCount(items.length);
        }
      });
    }
  }, [currentUser]);

  const handleQuantity = (item, value) => {
    if (currentUser) {
      const updatedQuantity = item.quantity + value;
      if (updatedQuantity <= 0) {
        removeFromCart(
          item,
          cartItems,
          setCartItems,
          currentUser,
          setSuccessMessage,
          setErrorMessage
        )
          .then(() => {
            const updatedItems = cartItems.filter(
              (cartItem) => cartItem.id !== item.id
            );
            setCartItems(updatedItems);
            setCartCount(cartCount - item.quantity);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        const database = getDatabase();
        get(
          child(
            ref(database),
            `carts/${currentUser.uid}`,
            orderByChild("id"),
            equalTo(item.id)
          )
        ).then((snapshot) => {
          if (snapshot.exists()) {
            let index = 0;
            Object.entries(snapshot.val()).forEach(([key, value]) => {
              if (value.id === item.id) {
                update(ref(getDatabase(), `carts/${currentUser.uid}/${key}`), {
                  ...item,
                  quantity: updatedQuantity,
                });
                const updatedItems = cartItems.map((cartItem) =>
                  cartItem.id === item.id
                    ? { ...cartItem, quantity: updatedQuantity }
                    : cartItem
                );
                setCartItems(updatedItems);
                setCartCount(cartCount + value);
                return;
              }
              index++;
            });
          }
        });
      }
    }
  };

  const increaseQuantity = (item) => handleQuantity(item, 1);

  const decreaseQuantity = (item) => handleQuantity(item, -1);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        increaseQuantity,
        decreaseQuantity,
        currentUser,
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
