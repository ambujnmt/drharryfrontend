import { useUser } from "../../context/UserContext";
import { useAdmin } from "../../context/AdminContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  const { admin } = useAdmin();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      const path = router.pathname;

      // Not logged in at all
      if (!user && !admin) {
        router.push("/login");
        return;
      }

      // Function to check if path matches pattern
      const matchesPattern = (path, pattern) => {
        if (pattern.includes("*")) {
          const regex = new RegExp("^" + pattern.replace("*", ".*") + "$");
          return regex.test(path);
        }
        return path === pattern || path.startsWith(pattern + "/");
      };

      // Define shared routes accessible to all authenticated users
      const sharedRoutes = [
        "/profile",
        "/profile/*",
        "/settings",
        "/settings/*",
        "/user/*"
      ];


      // Check if current path is a shared route
      const isSharedRoute = sharedRoutes.some(pattern => matchesPattern(path, pattern));

      // Define role-based path patterns
      const rolePatterns = {
        admin: [
          "/dashboard",
          "/addUser",
          "/user/*",
          "/clinic/*",
          "/patient/*",
          "/patientEntry",
          "/doctorManagement/*"
        ],
        1: ["/doctor/*"], // Doctor
        2: ["/socialWorker/*"], // Social Worker
        3: ["/patient/dashboard"], // Patient (specific page only, not admin patient routes)
        4: ["/uPerson/*"] // U Person
      };

      // Determine current user's role
      let currentRole = null;
      if (admin) {
        currentRole = "admin";
      } else if (user) {
        currentRole = user.user_type;
      }

      // Check if user has access to current path
      let hasAccess = false;

      // First check if it's a shared route (accessible to all)
      if (isSharedRoute) {
        hasAccess = true;
      } else if (currentRole === "admin") {
        // Admin can access admin patterns
        hasAccess = rolePatterns.admin.some(pattern => matchesPattern(path, pattern));
      } else if (user) {
        // User can access their role-specific patterns
        const allowedPatterns = rolePatterns[currentRole] || [];
        hasAccess = allowedPatterns.some(pattern => matchesPattern(path, pattern));
      }

      // If no access, redirect to appropriate dashboard
      if (!hasAccess) {
        if (admin) {
          router.push("/dashboard");
        } else if (user) {
          switch (user.user_type) {
            case 1:
              router.push("/doctor/dashboard");
              break;
            case 2:
              router.push("/socialWorker/dashboard");
              break;
            case 3:
              router.push("/patient/dashboard");
              break;
            case 4:
              router.push("/uPerson/dashboard");
              break;
            default:
              router.push("/login");
          }
        }
        return;
      }

      setLoading(false);
    };

    checkAccess();
  }, [user, admin, router, router.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;