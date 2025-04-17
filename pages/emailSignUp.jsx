import React, { useEffect } from 'react';
import SignUp from "../components/Forms/SignUp"
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

export default function EmailSignUp() {
  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);

  return (
    <div>
        {!user &&<SignUp/>}
    </div>
  )
}
