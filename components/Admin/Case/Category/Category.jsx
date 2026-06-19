import React, { useEffect, useMemo, useState } from "react";

import {
    Button,
    Input,
    Switch,
    Spinner,
    Select,
    SelectItem,
} from "@heroui/react";

import Table from "../../../../components/Table/Table"
import PageTitle from "../../../../components/Breadcrumb/PageTitle"
import { FaEdit, FaPlus } from "react-icons/fa";

import {
    getCaseCategories,
    addCaseCategory,
    updateCaseCategory,
} from "../../../../utils/fetchApi";
import Tmodal from "../../../Tmodal/Tmodal";

export default function Category() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const [buttonLoading, setButtonLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [editData, setEditData] = useState(null);

    const [name, setName] = useState("");

    const [slug, setSlug] = useState("");

    const [status, setStatus] = useState(true);

    const fetchCategories = async () => {
        try {
            setLoading(true);

            const res = await getCaseCategories();

            if (res.status) {
                setCategories(res.data);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);


    const openAddModal = () => {
        setEditData(null);

        setName("");

        setSlug("");

        setStatus(true);

        setMessage("");

        setModalOpen(true);
    };


    const openEditModal = (row) => {
        setEditData(row);

        setName(row.name);

        setSlug(row.slug);

        setStatus(row.status == 1);

        setMessage("");

        setModalOpen(true);
    };


    const handleSubmit = async () => {
        setButtonLoading(true);

        const payload = {
            name,
            slug,
            status: status ? 1 : 0,
        };

        let res;

        if (editData) {
            res = await updateCaseCategory(editData.id, payload);
        } else {
            res = await addCaseCategory(payload);
        }

        if (res.status) {
            setMessage(res.message);

            fetchCategories();

            setTimeout(() => {
                setModalOpen(false);

                setMessage("");

                setEditData(null);
            }, 1500);
        }

        setButtonLoading(false);
    };

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },

     

            {
                Header: "Status",
                accessor: "status",

                Cell: ({ value }) => (
                    <span
                        className={`px-3 py-2 rounded-full text-xs ${value == 1
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {value == 1 ? "Active" : "Inactive"}
                    </span>
                ),
            },

            {
                Header: "Action",

                Cell: ({ row }) => (
                    <button
                        className="w-9 h-9 rounded bg-[#c8a96a] text-white flex items-center justify-center"
                        onClick={() => openEditModal(row.original)}
                    >
                        <FaEdit />
                    </button>
                ),
            },
        ],
        []
    );

    return (
        <div className="min-h-screen bg-[#F5F2EC] p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-4xl text-[var(--secondary-color)]">

                        Category Management

                    </h1>

                </div>

                <Button
                    className="bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white"
                    startContent={<FaPlus />}
                    onPress={openAddModal}
                >

                    Add Category

                </Button>

            </div>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Category', active: true },
                ]}
                title="Category"
            />
            <div className="bg-white rounded-xl p-4 shadow-md">

                {loading ? (

                    <div className="flex justify-center py-20">

                        <Spinner size="lg" color="warning" />

                    </div>

                ) : (

                    <Table

                        columns={columns}

                        data={categories}

                        pageSize={10}

                        pagination

                        isSearchable

                        isSortable

                    />

                )}

            </div>

            <Tmodal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setMessage("");
                }}
                title={editData ? "Update Category" : "Add Category"}
                footer={
                    <Button
                        color="warning"
                        isLoading={buttonLoading}
                        onPress={handleSubmit}
                    >
                        {editData ? "Update" : "Create"}
                    </Button>
                }
            >
                <Input
                    value={name}
                    onValueChange={setName}
                    variant="underlined"
                    label={
                        <span className="text-[#000] ">
                            Category Name
                            <span className="text-red-500 ml-1">*</span>
                        </span>
                    }
                    classNames={{
                        label: "text-[var(--text-color2)] h-[50px]",
                        input: "text-[var(--secondary-color)] font-medium",

                    }}
                />


                <div className="mt-3">
                    <Select
                        selectedKeys={[status ? "1" : "0"]}
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0];
                            setStatus(value === "1");
                        }}
                        variant="underlined"
                    label={
                        <span className="text-[#000] ">
                           Status
                            <span className="text-red-500 ml-1">*</span>
                        </span>
                    }
                    classNames={{
                        label: "text-[var(--text-color2)] h-[50px]",
                        input: "text-[var(--secondary-color)] font-medium",

                    }}
                    >
                        <SelectItem key="1">
                            Active
                        </SelectItem>

                        <SelectItem key="0">
                            Inactive
                        </SelectItem>
                    </Select>
                </div>

                {message && (
                    <div className="text-green-700 text-center mt-4">
                        {message}
                    </div>
                )}
            </Tmodal>
        </div>
    );
}