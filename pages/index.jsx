import React, { useEffect } from 'react'
import Main from '@/components/Main/Main'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

export default function index() {
  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);


  return (
    <div>
      {!user &&<Main/>}
    </div>
  )
}
