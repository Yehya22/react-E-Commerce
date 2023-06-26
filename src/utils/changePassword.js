import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

export const changePassword = async (
  setCurrentPassword,
  setErrorMessage,
  setNewPassword,
  newPassword,
  setSuccessMessage,
  currentPassword
) => {
  try {
    const auth = getAuth();
    const authUser = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(authUser, newPassword);

    setSuccessMessage("Password updated successfully!");
    setErrorMessage("");
    setCurrentPassword("");
    setNewPassword("");

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 2000);
  } catch (error) {
    setErrorMessage("Error updating password: " + error);
    setSuccessMessage("");
    setCurrentPassword("");
    setNewPassword("");
  }
};