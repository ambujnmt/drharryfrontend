import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';
import NewPass from '../components/Forms/NewPass';

export default function NewPasswordPage() {
  const { user } = useUser();
  const { admin } = useAdmin();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user) {
      // Redirect based on user_type
      switch (user.user_type) {
        case 1:
          router.replace("/doctor/dashboard");
          break;
        case 2:
          router.replace("/socialWorker/dashboard");
          break;
        case 3:
          router.replace("/patient/dashboard");
          break;
        case 4:
          router.replace("/uPerson/dashboard");
          break;
        default:
          setChecking(false); // unknown user_type, show login
      }
    } else if (admin) {
      // Only admin goes to /dashboard
      router.replace("/dashboard");
    } else {
      setChecking(false); // not logged in, show login
    }
  }, [user, admin]);

  if (checking) return null; // prevents flicker

  return <NewPass />;
}
