import React, { useEffect } from 'react';
import Login from '../components/Forms/Login';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

export default function LoginPage() {
  const { user } = useUser(); 
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  return (
    <div>
      {!user && <Login />}
    </div>
  );
}
