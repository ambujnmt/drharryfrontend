import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useAdmin } from "../../context/AdminContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const router = useRouter();

  const { user, loading } = useUser();
  const { admin } = useAdmin();

  useEffect(() => {
    if (loading) return;

    if (adminOnly) {
      if (!admin) {
        router.replace("/admin/login");
      }
    } else {
      if (!user) {
        router.replace("/login");
      }
    }
  }, [loading, user, admin, adminOnly, router]);

  if (
    loading ||
    (adminOnly && !admin) ||
    (!adminOnly && !user)
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;