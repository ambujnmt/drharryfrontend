import React, { useEffect } from 'react'
import Otp from '../components/Forms/Otp'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

export default function OtpPage() {
  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);


  return (
    <div>
        {!user &&<Otp/>}
    </div>
  )
}
