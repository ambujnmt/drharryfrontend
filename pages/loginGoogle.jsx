import React, { useEffect } from 'react'
import Logingoogle from '../components/Forms/LoginGoogle'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

export default function loginGoogle() {
  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);

  return (
    <div>
        {!user &&<Logingoogle/>}
    </div>
  )
}
