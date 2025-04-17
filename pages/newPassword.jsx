import React from 'react'
import NewPass from '../components/Forms/NewPass'
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

export default function newPass() {
  const { user } = useUser(); 
  const router = useRouter();

   useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user]);


  return (
    <div>
        {!user &&<NewPass/>}
    </div>
  )
}
