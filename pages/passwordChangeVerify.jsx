import React, { useEffect } from 'react'
import PassChangeVerify from '../components/Forms/PassChangeVerify'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';


export default function PasswordChangeVerify() {
  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);


  return (
    <div>
        {!user &&<PassChangeVerify/>}
    </div>
  )
}
