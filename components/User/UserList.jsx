import React, { useContext, useEffect, useState, useMemo } from "react";
import { fetchUsers } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import { FaAngleLeft, FaAngleRight, FaEye, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "@heroui/react";


export default function AddUser() {
    const { locale } = useContext(LanguageContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clientLocale, setClientLocale] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 15;

    useEffect(() => {
        setClientLocale(locale.toUpperCase());
    }, [locale]);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const response = await fetchUsers();
            if (response?.data) {
                const sortedUsers = [...response.data].sort((a, b) => a.id - b.id);
                setUsers(sortedUsers);
            }
            setLoading(false);
        };

        getUsers();
    }, []);

    // Pagination logic
    const totalPages = useMemo(() => {
        return Math.ceil(users.length / usersPerPage);
    }, [users]);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full bg-gray-100 md:p-6 p-0">
            <div className="w-full space-y-5 bg-white shadow-lg rounded-lg p-4">
                <div className="md:p-4">
                    <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 text-center">
                        User List
                    </h2>

                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white  -gray-300 text-sm text-left">
                                    <thead className="bg-gray-200 text-gray-700">
                                        <tr>
                                            <th className=" px-4 py-2">S.No.</th>
                                            <th className=" px-4 py-2">Name</th>
                                            <th className=" px-4 py-2">Mobile</th>
                                            <th className=" px-4 py-2">Email</th>
                                            <th className=" px-4 py-2">Gender</th>
                                            <th className=" px-4 py-2">Address</th>
                                            <th className=" px-4 py-2">Status</th>
                                            <th className=" px-4 py-2">User Type</th>
                                            <th className=" px-4 py-2">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentUsers.map((user, index) => (
                                            <tr key={user.id} className="hover:bg-gray-100">
                                                <td className=" px-4 py-2">{startIndex + index + 1}</td>
                                                <td className=" px-4 py-2">{user.name}</td>
                                                <td className=" px-4 py-2">
                                                    {user.country_code} {user.mobile}
                                                </td>
                                                <td className=" px-4 py-2">{user.email}</td>
                                                <td className=" px-4 py-2">{user.gender}</td>
                                                <td className=" px-4 py-2">{user.address}</td>
                                                <td className=" px-4 py-2">
                                                    <span className={`text-white px-2 py-1 rounded-3xl ${user.status === 1 ? "bg-green-500" : "bg-red-500"}`}>
                                                        {user.status === 1 ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className=" px-4 py-2">{user.user_type_value}</td>
                                                <td className=" px-4 py-4 text-blue-500  flex justify-center items-center gap-2">
                                                    <Link href={`/user/userDetail/${user.id}`}><FaEye className="text-xl" /></Link>
                                                    <Link href={`/user/userUpdate/${user.id}`}><FaPen className="text-lg" /></Link>
                                                    <Link href="#" ><MdDelete className="text-xl" /></Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {/* Prev Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-2 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
                                >
                                    <FaAngleLeft />
                                </button>

                                {/* Page Numbers */}
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-3 py-1  rounded-full ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-2 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
                                >
                                    <FaAngleRight />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
