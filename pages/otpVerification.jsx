import React, { useEffect } from 'react'
import OtpVerify from '../components/Forms/OtpVerify'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

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
         {!user &&<OtpVerify/>}
    </div>
  )
}
