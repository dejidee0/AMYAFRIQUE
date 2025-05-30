import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";

const App = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const listenToAuthChanges = useAuthStore(
    (state) => state.listenToAuthChanges
  );

  useEffect(() => {
    fetchUser(); // Get user if already login in
    const subscription = listenToAuthChanges(); // Listen to changes

    return () => subscription?.unsubscribe(); // Cleanup
  }, [fetchUser, listenToAuthChanges]);

  return <RouterProvider router={router} />;
};

export default App;
