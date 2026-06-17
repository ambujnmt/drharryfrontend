import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import { useAdmin } from "../context/AdminContext";
import OtpVerify from "../components/Forms/OtpVerify";

export default function OtpVerification() {
  const { user, loading } = useUser();
  const { admin } = useAdmin();
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (admin) {
      router.replace("/dashboard");
      return;
    }

    if (user) {
      router.replace("/");
      return;
    }

    setChecking(false);
  }, [user, admin, loading]);

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <OtpVerify />;
}
