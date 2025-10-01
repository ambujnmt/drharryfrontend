// hooks/useRoleRedirect.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import { useAdmin } from "../context/AdminContext";

/**
 * role = 1 => admin
 * role = 2 => doctor
 * role = 3 => socialWorker
 * role = 4 => patient
 * role = 5 => uPerson
 */
export default function useRoleRedirect(role) {
  const { user } = useUser();
  const { admin } = useAdmin();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (role === 1) {
      // Only admin allowed
      if (!admin) {
        router.replace("/"); // redirect non-admins to home
      } else {
        setChecking(false);
      }
    } else {
      // Users based on user_type
      if (!user) {
        router.replace("/"); // redirect if not logged in
      } else if (user.user_type !== role) {
        // redirect to correct dashboard
        if (user.user_type === 1) router.replace("/doctor/dashboard");
        else if (user.user_type === 2) router.replace("/socialWorker/dashboard");
        else if (user.user_type === 3) router.replace("/patient/dashboard");
        else if (user.user_type === 4) router.replace("/uPerson/dashboard");
      } else {
        setChecking(false); // correct role, render page
      }
    }
  }, [user, admin]);

  return checking; // true = still checking, false = safe to render
}
