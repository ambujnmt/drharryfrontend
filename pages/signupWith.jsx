import React, { useEffect } from 'react'
import SignUpSelection from '@/components/Forms/SignUpSelection'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';


export default function signup() {
 const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);


  return (
    <div>
        {!user &&<SignUpSelection/>}
    </div>
  )
}
