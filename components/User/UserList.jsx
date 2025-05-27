import React, { useContext, useEffect, useState, useMemo } from "react";
import { fetchUsers } from '../../utils/fetchApi';
import { LanguageContext } from "../../context/LanguageContext";
import { FaAngleLeft, FaAngleRight, FaEye, FaPen } from "react-icons/fa";
import { Link } from "@heroui/react";


export default function AddUser() {
    const { locale, translateText } = useContext(LanguageContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clientLocale, setClientLocale] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 15;
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });


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

    const filteredUsers = useMemo(() => {
        const search = searchTerm.toLowerCase();

        return users.filter((user) => {
            const name = user.name?.toLowerCase() || "";
            const mobile = user.mobile?.toLowerCase() || "";
            const email = user.email?.toLowerCase() || "";
            const gender = user.gender?.toLowerCase() || "";
            const userType = user.user_type_value?.toLowerCase() || "";
            const status = user.status === 1 ? "active" : "inactive";

            // Ensure gender matches exactly for "male" or "female"
            const genderMatch = search === "male" || search === "female"
                ? gender === search
                : gender.includes(search);

            return (
                name.includes(search) ||
                mobile.includes(search) ||
                email.includes(search) ||
                genderMatch ||
                userType.includes(search) ||
                status.includes(search)
            );
        });
    }, [searchTerm, users]);

    const sortedUsers = useMemo(() => {
        const sortableUsers = [...filteredUsers];

        if (sortConfig.key) {
            sortableUsers.sort((a, b) => {
                const aVal = a[sortConfig.key] ?? '';
                const bVal = b[sortConfig.key] ?? '';

                if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        return sortableUsers;
    }, [filteredUsers, sortConfig]);


    // Pagination logic
    const totalPages = useMemo(() => {
        return Math.ceil(filteredUsers.length / usersPerPage);
    }, [filteredUsers]);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);


    const handleSort = (key) => {
        setSortConfig((prevConfig) => {
            if (prevConfig.key === key) {
                return {
                    key,
                    direction: prevConfig.direction === "ascending" ? "descending" : "ascending",
                };
            }
            return { key, direction: "ascending" };
        });
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full bg-gray-100">
            <div className="w-full space-y-5 bg-gray-100 shadow-lg rounded-lg p-4">
                <div className="md:p-4 mt-5 bg-white  rounded-xl">
                    <div className="flex justify-between">

                        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 text-left">
                            {translateText("User List")}
                        </h2>
                        <div className="flex justify-end mb-4">
                            <input
                                type="text"
                                placeholder={translateText("Search by Name, Mobile, Email, Gender, Type, or Status")}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to page 1 on search
                                }}
                                className="px-4 py-1 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>

                            <div className="overflow-x-auto">
                                <table className="bg-white  -gray-300 text-sm text-left w-full">
                                    <thead className="bg-gray-200 text-gray-700">
                                        <tr>
                                            <th className=" px-4 py-2">{translateText("S.No.")}</th>
                                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("name")}>
                                                {translateText("Name")}
                                            </th>                                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("mobile")}>
                                                {translateText("Mobile")}
                                            </th>
                                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("email")}>
                                                {translateText("email")}
                                            </th>
                                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("gender")}>
                                                {translateText("gender")}
                                            </th>
                                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("address")}>
                                                {translateText("address")}
                                            </th>
                                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("status")}>
                                                {translateText("status")}
                                            </th>
                                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("user_type_value")}>
                                                {translateText("user_type")}
                                            </th>
                                            <th className=" px-4 py-2">{translateText("Action")}</th>

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
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex justify-end mt-6 space-x-2">
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
