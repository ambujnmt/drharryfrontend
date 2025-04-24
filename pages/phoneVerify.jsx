import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import PhoneVerify from '../components/Forms/PhoneVerify';

export default function otpVerification() {

  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);


  return (
    <div>
         {!user &&<PhoneVerify/>}
    </div>
  )
}
