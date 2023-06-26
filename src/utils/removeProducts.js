import { getDatabase, ref, remove, get, query, orderByChild, equalTo } from "firebase/database";

const removeFromCart = (
  item,
  cartItems,
  setCartItems,
  currentUser,
  setSuccessMessage,
  setErrorMessage
) => {
  const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
  setCartItems(newCartItems);

  const database = getDatabase();
  const cartQuery = query(ref(database, `carts/${currentUser.uid}`), orderByChild("id"), equalTo(item.id));
  
  get(cartQuery).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const itemRef = ref(database, `carts/${currentUser.uid}/${childSnapshot.key}`);
        remove(itemRef)
          .then(() => {
            setSuccessMessage("Product removed successfully");
          })
          .catch((error) => {
            setErrorMessage(`Unable to remove product: ${error.message}`);
          });
      });
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
};

export default removeFromCart;