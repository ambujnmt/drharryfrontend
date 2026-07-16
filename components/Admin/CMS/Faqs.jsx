import React, { useEffect, useMemo, useState } from "react";
import {
    Button,
    Input,
    Switch,
    Textarea,
} from "@heroui/react";

import { FaPlus, FaPen } from "react-icons/fa";
import { Spinner } from "@heroui/react";

import PageTitle from "../../Breadcrumb/PageTitle";
import Table from "../../Table/Table";
import Tmodal from "../../Tmodal/Tmodal";

import {
    fetchFaqs,
    addFaq,
    updateFaq
} from "../../../utils/fetchApi";


export default function Faqs() {


    // ============================
    // States
    // ============================

    const [faqData, setFaqData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);


    const [isEdit, setIsEdit] = useState(false);

    const [selectedId, setSelectedId] = useState(null);


    const [formLoading, setFormLoading] = useState(false);


    const [formData, setFormData] = useState({

        question: "",
        answer: "",
        sort_order: 0,
        status: 1

    });



    // ============================
    // Get All FAQs
    // ============================

    const getFaqs = async () => {

        try {

            setLoading(true);

            const response = await fetchFaqs();


            if (response.success) {

                setFaqData(response.data);

            }


        } catch (error) {

            setMessage(
                error.message || "Something went wrong"
            );

        }
        finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        getFaqs();

    }, []);





    // ============================
    // Open Add Modal
    // ============================

    const openAddModal = () => {


        setIsEdit(false);

        setSelectedId(null);


        setFormData({

            question: "",
            answer: "",
            sort_order: 0,
            status: 1

        });


        setIsModalOpen(true);

    };





    // ============================
    // Open Edit Modal
    // ============================

    const openEditModal = (faq) => {


        setIsEdit(true);

        setSelectedId(faq.id);


        setFormData({

            question: faq.question,
            answer: faq.answer,
            sort_order: faq.sort_order,
            status: faq.status

        });


        setIsModalOpen(true);


    };





    // ============================
    // Table Columns
    // ============================


    const columns = useMemo(() => [


        {

            Header: "Question",

            accessor: "question",

            Cell: ({ row }) => (

                <div>

                    <h6 className="text-[15px] font-semibold text-[#0a2342]">

                        {row.original.question}

                    </h6>

                </div>

            )

        },


        {

            Header: "Answer",

            accessor: "answer",

            Cell: ({ row }) => (

                <p className="max-w-[350px] flex-wrap-reverse">

                    {row.original.answer}

                </p>

            )

        },



        {

            Header: "Sort Order",

            accessor: "sort_order"

        },



        {

            Header: "Status",

            accessor: "status",

            Cell: ({ value }) => (

                <span

                    className={`px-3 py-2 rounded-full text-xs font-medium

                ${value == 1

                            ?

                            "bg-green-100 text-green-700"

                            :

                            "bg-red-100 text-red-700"

                        }

                `}

                >

                    {
                        value == 1
                            ?
                            "Active"
                            :
                            "Inactive"
                    }


                </span>

            )

        },

        {

            Header: "Action",

            accessor: "action",

            Cell: ({ row }) => (


                <Button

                    onPress={() => openEditModal(row.original)}

                    className="
         
                rounded-lg
                bg-[#c8a96a]
                
                "

                >

                    <FaPen className="text-white" />

                </Button>


            )

        }



    ], []);



    // ============================
    // Submit FAQ
    // ============================

    const handleSubmit = async () => {

        try {

            setFormLoading(true);

            setMessage("");


            let response;


            if (isEdit) {

                response = await updateFaq(
                    selectedId,
                    formData
                );


            } else {


                response = await addFaq(
                    formData
                );


            }



            if (response.success) {


                setMessage(
                    response.message
                );


                setTimeout(() => {


                    setIsModalOpen(false);


                    setFormData({

                        question: "",
                        answer: "",
                        sort_order: 0,
                        status: 1

                    });


                    getFaqs();


                    setMessage("");


                }, 3000);


            }



        } catch (error) {


            setMessage(
                error.message
            );


        }
        finally {


            setFormLoading(false);


        }


    };

    return (

        <div className="min-h-screen bg-[#F5F2EC] p-6">


            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">


                <div>


                    <h1

                        className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)]"

                        style={{
                            fontFamily: "Cormorant Garamond"
                        }}

                    >

                        FAQ'S

                    </h1>



                    <p className="text-[#505050] text-[14px] md:text-[14px] lg:text-[16px] mt-2">

                        Create and manage FAQ's.

                    </p>


                </div>


                <Button
                    onPress={openAddModal}
                    startContent={<FaPlus />}
                    className="
    bg-[var(--secondary-color)]
    text-white
    lg:w-auto
    w-fit
    px-4
    py-2.5
    text-sm
    sm:text-base
  "
                >
                    Add FAQ
                </Button>

            </div>

            <PageTitle

                breadCrumbItems={[
                    {
                        label: "Dashboard",
                        path: "/dashboard"
                    },
                    {
                        label: "FAQs",
                        active: true
                    }
                ]}

                title="FAQs"

            />

            {
                message &&

                <div className="text-center text-red-600 mb-4">

                    {message}

                </div>
            }





            {/* Table */}


            <div className="bg-white rounded-xl p-3 lg:p-4 shadow-md  lg:mt-6">


                {
                    loading

                        ?

                        <div className="flex justify-center py-20">

                            <Spinner size="lg" color="warning" />

                        </div>


                        :


                        <Table

                            columns={columns}

                            data={faqData}

                            pageSize={10}

                            pagination

                            isSearchable

                            isSortable

                            tableClass="mb-0"

                        />


                }


            </div>


            <Tmodal

                isOpen={isModalOpen}

                onClose={() => setIsModalOpen(false)}

                title={
                    isEdit
                        ?
                        "Update FAQ"
                        :
                        "Add FAQ"
                }


                footer={

                    <Button

                        onPress={handleSubmit}

                        disabled={formLoading}

                        className="
        bg-[var(--secondary-color)]
        text-white
        "

                    >

                        {
                            formLoading

                                ?

                                <Spinner
                                    size="sm"
                                    color="white"
                                />

                                :

                                isEdit
                                    ?
                                    "Update FAQ"
                                    :
                                    "Save FAQ"

                        }


                    </Button>


                }


            >
                <div className="space-y-5">

                    <div className="grid grid-cols-2 gap-3">

                        {/* Question */}

                        <Input

                            placeholder="Enter question"

                            value={formData.question}


                            onValueChange={(value) =>

                                setFormData({

                                    ...formData,

                                    question: value

                                })

                            }


                            variant="underlined"


                            label={

                                <span className="text-[#000]">

                                    Question

                                    <span className="text-red-500 ml-1">
                                        *
                                    </span>


                                </span>

                            }


                            classNames={{

                                label:
                                    "text-[var(--text-color2)] h-[50px]",


                                input:
                                    "text-[var(--secondary-color)] font-medium"


                            }}


                        />

                        {/* Answer */}


                        <Input

                            placeholder="Enter answer"


                            value={formData.answer}


                            onValueChange={(value) =>

                                setFormData({

                                    ...formData,

                                    answer: value

                                })

                            }


                            variant="underlined"


                            label={

                                <span className="text-[#000]">

                                    Answer

                                    <span className="text-red-500 ml-1">
                                        *
                                    </span>

                                </span>

                            }



                            classNames={{

                                label:
                                    "text-[var(--text-color2)] h-[50px]",


                                input:
                                    "text-[var(--secondary-color)] font-medium"


                            }}


                        />
                    </div>

                    {/* Sort Order */}


                    <Input

                        placeholder="0"


                        type="number"


                        value={String(formData.sort_order)}


                        onValueChange={(value) =>

                            setFormData({

                                ...formData,

                                sort_order: Number(value)

                            })

                        }
                        variant="underlined"
                        label={

                            <span className="text-[#000]">

                                Sort Order

                            </span>

                        }

                        classNames={{

                            label:
                                "text-[var(--text-color2)] h-[50px]",
                            input:
                                "text-[var(--secondary-color)] font-medium"

                        }}

                    />

                    {/* Status */}

                    <div className="flex items-center justify-between mt-5">
                        <span className="text-[#000]">
                            Status
                        </span>

                        <Switch
                            isSelected={formData.status == 1}
                            onValueChange={(value) =>
                                setFormData({

                                    ...formData,

                                    status: value ? 1 : 0

                                })
                            }
                        />


                    </div>

                    {
                        message &&
                        <div className="text-center text-green-600 mt-4">

                            {message}

                        </div>
                    }
                </div>
            </Tmodal>


        </div>


    );

}