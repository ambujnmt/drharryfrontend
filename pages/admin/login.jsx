import React, { useEffect, useState } from "react";
import Login from "../../components/Admin/Login";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";
import { useAdmin } from "../../context/AdminContext";

export default function AdminLogin() {
  const router = useRouter();

  const { user, loading: userLoading } = useUser();
  const { admin } = useAdmin();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (userLoading) return;

    // Website user already logged in
    if (user) {
      router.replace("/");
      return;
    }

    // Admin already logged in
    if (admin) {
      router.replace("/dashboard");
      return;
    }

    setChecking(false);
  }, [user, admin, userLoading]);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <Login />;
}