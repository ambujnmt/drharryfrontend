import { useUser } from "../../context/UserContext";
import { useAdmin } from "../../context/AdminContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  const { admin } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if neither user nor admin is present
    if (!user && !admin) {
      router.push("/login");
    }
  }, [user, admin]);

  if (!user && !admin) {
    return null; // Show loading spinner or nothing while redirecting
  }

  return children;
};

export default PrivateRoute;
