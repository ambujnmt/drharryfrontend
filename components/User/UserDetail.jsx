import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUsers } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import { FaEye } from "react-icons/fa";
import { Link } from '@heroui/react';


export default function UserDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { locale, translateText } = useContext(LanguageContext);
    const [clientLocale, setClientLocale] = useState("");

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    useEffect(() => {
        const getUserDetail = async () => {
            if (!id) return; // Wait until `id` is available
            setLoading(true);
            const response = await fetchUsers();
            if (response?.data) {
                const foundUser = response.data.find(u => u.id.toString() === id);
                if (foundUser) {
                    const { id, ...userWithoutId } = foundUser;
                    setUser(userWithoutId);
                }
            }
            setLoading(false);
        };

        getUserDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <div className="p-4">User not found.</div>;
    }

    return (
        <div className="w-full bg-gray-100 md:p-6 p-0">
            <div className="w-full space-y-5 bg-white shadow-lg rounded-lg p-4">
                <div className="md:p-4">
                    <h2 className="text-2xl md:text-xl lg:text-2xl xl:text-2xl font-semibold mb-4 text-center">
                        {translateText("User Detail")}
                    </h2>
                    <ul className="space-y-2 text-gray-700">
                        {Object.entries(user).map(([key, value]) => {
                            if (key === 'status' || key === "user_type") return null;
                            if (key === 'profile_img') {
                                return (
                                    <li key={key} className='items-center flex gap-2'
                                    >
                                        <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong>{' '}
                                        {value ? (
                                            <Link
                                                href={value}
                                                target="_blank"
                                            >
                                                <FaEye />
                                            </Link>
                                        ) : (
                                            "No profile picture uploaded"
                                        )}
                                    </li>
                                );
                            }

                            return (
                                <li key={key}>
                                    <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {value}
                                </li>
                            );
                        })}


                    </ul>
                </div>
            </div>
        </div>
    );
}
