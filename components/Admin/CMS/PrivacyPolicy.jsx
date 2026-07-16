import React, { useEffect, useState } from "react";
import {
    Input,
    Button,
    Switch,
} from "@heroui/react";

import { Spinner } from "@heroui/react";

import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

import { FaPlus } from "react-icons/fa";

import PageTitle from "../../Breadcrumb/PageTitle";

import Tmodal from "../../Tmodal/Tmodal";


import {
    fetchPrivacyPolicy,
    updatePrivacyPolicy
} from "../../../utils/fetchApi";



const ReactQuill = dynamic(
    () => import("react-quill"),
    {
        ssr:false
    }
);



export default function PrivacyPolicy() {



    const [policy,setPolicy] = useState(null);


    const [loading,setLoading] = useState(true);


    const [isModalOpen,setIsModalOpen] = useState(false);



    const [formLoading,setFormLoading] = useState(false);


    const [message,setMessage] = useState("");



    const [formData,setFormData] = useState({

        title:"",
        content:"",
        status:1

    });



    // ======================
    // Fetch Policy
    // ======================

    const getPolicy = async()=>{


        try{


            setLoading(true);


            const response = await fetchPrivacyPolicy();


            if(response.success && response.data.length > 0){


                setPolicy(response.data[0]);


            }



        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }


    };





    useEffect(()=>{

        getPolicy();

    },[]);





    // ======================
    // Open Modal
    // ======================

    const openModal = ()=>{


        setFormData({

            title:"",
            content:"",
            status:1

        });


        setMessage("");

        setIsModalOpen(true);


    };







    // ======================
    // Update
    // ======================

    const handleSubmit = async()=>{


        try{


            if(!policy){

                return;

            }



            setFormLoading(true);

            setMessage("");



            const response = await updatePrivacyPolicy(
                policy.id,
                formData
            );



            if(response.success){


                setMessage(
                    response.message
                );



                setTimeout(()=>{


                    setIsModalOpen(false);


                    setMessage("");


                    getPolicy();


                },3000);


            }



        }
        catch(error){


            setMessage(
                error.message
            );


        }
        finally{


            setFormLoading(false);


        }


    };






    return (

        <div className="min-h-screen bg-[#F5F2EC] p-6">


            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">


                <div>


                    <h1

                    className="text-[25px] md:text-[35px] lg:text-[42px]text-[var(--secondary-color)]"

                    style={{
                        fontFamily:"Cormorant Garamond"
                    }}

                    >

                        Privacy Policy

                    </h1>



                    <p className="text-[#2B2B2B] text-[14px] md:text-[14px] lg:text-[16px] mt-2">

                        Create and manage Privacy Policy.

                    </p>


                </div>





                <Button

                onPress={openModal}
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

                startContent={<FaPlus/>}

                >

                    Create Privacy Policy

                </Button>



            </div>







            <PageTitle

                breadCrumbItems={[
                    {
                        label:"Dashboard",
                        path:"/dashboard"
                    },
                    {
                        label:"Privacy Policy",
                        active:true
                    }
                ]}

                title="Privacy Policy"

            />


            {/* Preview */}

            <div className="bg-white rounded-xl p-3 lg:p-4 shadow-md  lg:mt-6">


                {
                    loading

                    ?

                    <div className="flex justify-center py-10">

                        <Spinner color="warning"/>

                    </div>


                    :


                    policy &&

                    <>


                    <h3 className="text-xl font-semibold mb-4">

                        {policy.title}

                    </h3>



                    <div

                    className="
                    prose
                    max-w-none
                    text-[#333]
                    "

                    dangerouslySetInnerHTML={{
                        __html:policy.content
                    }}

                    />



                    <div className="mt-6">


                        <span

                        className={`px-4 py-2 rounded-full text-sm font-medium

                        ${
                            policy.status == 1

                            ?

                            "bg-green-100 text-green-700"

                            :

                            "bg-red-100 text-red-700"

                        }

                        `}

                        >

                            {
                                policy.status == 1
                                ?
                                "Active"
                                :
                                "Inactive"
                            }


                        </span>


                    </div>


                    </>


                }




            </div>



            {/* Modal */}


            <Tmodal

            isOpen={isModalOpen}

            onClose={()=>setIsModalOpen(false)}

            title="Create Privacy Policy"



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

                    "Save Privacy Policy"

                }


                </Button>


            }

            >



            <div className="space-y-6">





            {/* Title */}


            <Input


            placeholder="Privacy Policy"


            value={formData.title}


            onValueChange={(value)=>

                setFormData({

                    ...formData,

                    title:value

                })

            }



            variant="underlined"



            label={

                <span className="text-[#000]">

                    Title

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








            {/* Content */}

<div>


<label className="text-[#000] block mb-3">

    Content

    <span className="text-red-500 ml-1">
        *
    </span>

</label>



<div
className="
border
rounded-lg
overflow-hidden
"
>


<ReactQuill

theme="snow"


value={formData.content}


onChange={(value)=>

    setFormData({

        ...formData,

        content:value

    })

}


className="privacy-editor"

/>


</div>



</div>
            {/* Status */}



            <div className="flex justify-between items-center">


                <span className="text-[#000]">

                    Status

                </span>



                <Switch


                isSelected={
                    formData.status == 1
                }


                onValueChange={(value)=>

                    setFormData({

                        ...formData,

                        status:value ? 1 : 0

                    })

                }


                />


            </div>





            {
                message &&


                <div className="text-center text-green-600">

                    {message}

                </div>


            }
            </div>



            </Tmodal>

        </div>

    );

}