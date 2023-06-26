import { updateProfile, getAuth } from "firebase/auth";

export const changeDisplayName = async (newDisplayName,setNewDisplayName, setSuccessMessage, setErrorMessage) => {
  try {
    const auth = getAuth();
    await updateProfile(auth.currentUser, { displayName: newDisplayName });

    if (!newDisplayName) {
      setErrorMessage("No displayname Entered!");
    } else {
      setSuccessMessage("Display name updated successfully!");
      setNewDisplayName("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }
  } catch (error) {
    setErrorMessage("Error updating display name: " + error);
  }
};