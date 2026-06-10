import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import { useAdmin } from "../context/AdminContext";
import Main from "../components/Main/Main";

export default function Home() {
  const { loading } = useUser();
  const { admin } = useAdmin();
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (admin) {
      router.replace("/dashboard");
      return;
    }

    setChecking(false);
  }, [loading, admin]);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <Main />;
}