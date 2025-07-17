export const getUserFromStorage = () => {
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error("Error parsing stored user:", err);
    return null;
  }
};