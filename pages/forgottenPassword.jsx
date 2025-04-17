import React, { useEffect } from 'react'
import ForgetPass from '../components/Forms/ForgetPass'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';


export default function forgottenPassword() {
  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);

  return (
    <div>
        {!user &&<ForgetPass/>}
    </div>
  )
}
