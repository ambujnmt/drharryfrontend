import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProfile } from '../../utils/fetchApi';
import { Link } from "@heroui/react"
import { FaPen } from "react-icons/fa";


export default function Profile() {
    const router = useRouter();
    const { id } = router.query;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  if (id) {
    fetchProfile(id)
      .then((res) => {
        if (res.status) {
          setUserData(res.data);
        }
      })
      .catch((error) => {
      })
      .finally(() => setLoading(false));
  }
}, [id]);




    if (loading) return <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
    if (!userData) return <div className="p-6 text-center">User not found</div>;

    return (
        <div className=" bg-gray-100  ">
            <div className=" mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">My Profile</h1>

                <div className="">
                    <div className='flex border-1 p-5 rounded-xl gap-5 items-center'>

                        <img
                            src={userData.profile_img}
                            alt={`${userData.name}'s profile`}
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                        />

                        <div>

                            <div>
                                <p className="text-lg text-gray-800 font-semibold">{userData.name}</p>
                            </div>

                            <div>
                                <p className="text-lg text-blue-600 font-bold">{userData.user_type_value}</p>
                            </div>
                            <Link href={`/user/updateProfile/${id}`}><FaPen />
                            </Link>
                        </div>
                    </div>

                    <div className='flex flex-col border-1 p-5 rounded-xl gap-5  mt-6'>
                        <h1 className="text-2xl font-bold text-gray-800 ">Personal information</h1>

                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <span className="block text-sm text-gray-500 font-medium">Email</span>
                                <p className="text-lg text-gray-800">{userData.email}</p>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500 font-medium">Phone</span>
                                <p className="text-lg text-gray-800">
                                    {userData.country_code && ` ${userData.country_code}`}
                                    {userData.mobile ? userData.mobile : 'Not Available'}
                                </p>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500 font-medium">Gender</span>
                                <p className="text-lg text-gray-800">{userData.gender}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-6">
                            <div>
                                <span className="block text-sm text-gray-500 font-medium">Birthday</span>
                                <p className="text-lg text-gray-800">{userData.birthday}</p>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500 font-medium">Address</span>
                                <p className="text-lg text-gray-800">{userData.address}</p>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500 font-medium">User Type</span>
                                <p className="text-lg text-gray-800">{userData.user_type_value}</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
