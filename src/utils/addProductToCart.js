import { useContext, useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { ProductsContext } from "../components/ProductsContext";

export const addProductToCart = () => {
  const { cartItems, setCartItems, setCartCount, currentUser } =
    useContext(ProductsContext);

  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsFetchingData(true);
      const database = getDatabase();
      const cartRef = ref(database, `carts/${currentUser.uid}`);
      onValue(cartRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          let items = [];
          Object.keys(data).forEach((key) => {
            items.push({
              id: data[key].id,
              name: data[key].name,
              price: data[key].price,
              image: data[key].image,
              quantity: data[key].quantity,
            });
          });
          setCartItems(items);
          setCartCount(items.length);
        } else {
          setCartItems([]);
          setCartCount(0);
        }
        setIsFetchingData(false);
      });
    }
  }, [currentUser, setCartItems, setCartCount]);

  const addProducts = (product) => {
    if (!currentUser) {
      return {
        successMessage: "",
        errorMessage:
          "You are not logged in. Please log in to add items to cart.",
      };
    }

    if (isFetchingData) {
      return {
        successMessage: "",
        errorMessage: "Please wait, loading cart data...",
      };
    }

    const cartRef = ref(getDatabase(), `carts/${currentUser.uid}`);
    const newItem = {
      index: cartItems.length > 0 ? cartItems.length - 1 : 0,
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    const itemExists = cartItems.find((item) => item.id === newItem.id);
    if (itemExists) {
      return {
        successMessage: "",
        errorMessage: "Item already exists in cart",
      };
    }
    push(cartRef, newItem);

    setCartItems([...cartItems, newItem]);
    setCartCount(cartItems.length + 1);

    return {
      successMessage: "Product added Successfully!",
      errorMessage: "",
    };
  };

  return addProducts;
};
