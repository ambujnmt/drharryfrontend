import React, { useEffect } from 'react'
import ResendOtp from "../components/Forms/ResendOtp"
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

export default function resendOtp() {

  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);

  return (
    <div>
        {!user &&<ResendOtp/>}
    </div>
  )
}
