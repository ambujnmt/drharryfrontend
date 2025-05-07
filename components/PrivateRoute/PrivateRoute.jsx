import { useUser } from "../../context/UserContext";
import { useAdmin } from "../../context/AdminContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  const { admin } = useAdmin();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Check if admin or user exists, otherwise redirect to login
    if (!user && !admin) {
      router.push("/login");
    } else {
      setLoading(false); // If either user or admin is present, stop loading
    }
  }, [user, admin, router]);

  if (loading) {
    return null; // Optionally, you can show a loading spinner here while the check happens
  }

  return children; // If logged in, render protected content
};

export default PrivateRoute;
