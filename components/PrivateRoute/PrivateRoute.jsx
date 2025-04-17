// components/PrivateRoute.js
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // redirect to login if user not found
    }
  }, [user]);

  if (!user) {
    return null; // or a loading spinner while redirecting
  }

  return children;
};

export default PrivateRoute;
