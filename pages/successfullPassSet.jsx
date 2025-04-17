import React, { useEffect } from 'react'
import Successpass from '../components/Forms/SuccessPass'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

export default function succesfullPassSet() {
const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);

  return (
    <div>
         {!user &&<Successpass/>}
    </div>
  )
}
