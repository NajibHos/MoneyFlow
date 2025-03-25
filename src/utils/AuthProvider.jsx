import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../appwrite/appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true); // Loading state
  const [user, setUser] = useState(null); // Store user details
  const [userID, setUserID] = useState(null); // Store user ID
  const [userName, setUserName] = useState(null); // Store user Name

  useEffect(() => {

    checkUserStatus();

  }, [])

  // Check user session
  const checkUserStatus = async () => {

    setLoading(true);

    try {

      const currentUser = await account.get();
      setUser(currentUser);
      setUserID(currentUser.$id);
      setUserName(currentUser.name);

    } catch (error) {
      console.error('User Error: ' + error.message);
    } finally {
      setLoading(false);
    }

  };

  // Login function
  const login = async (userInfo) => {

    setLoading(true);

    try {
      // login session
      await account.createEmailPasswordSession(
        userInfo.email, userInfo.password
      );

      // get user
      const currentUser = await account.get();
      setUser(currentUser);
      setUserID(currentUser.$id);
      setUserName(currentUser.name);

    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }

  }

  // Logout function
  const logout = async () => {

    try {
      await account.deleteSession("current"); // Delete current session
      setUser(null); // Reset user state
    } catch (error) {
      console.error("Logout error:", error.message);
    }

  }

  // logout()

  const contextData =  {

    user,
    userID,
    userName,
    login,
    logout,
    loading,

  }

  return (

    <AuthContext.Provider value={contextData}>
      { children }
    </AuthContext.Provider>

  )
};

// Custom Hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);
export default AuthContext;