import React, { useEffect, useState } from 'react'
import "react-quill/dist/quill.snow.css";
import { Spinner } from "@heroui/react";
import {
    fetchPrivacyPolicy,
} from "../../../utils/fetchApi";
import dynamic from "next/dynamic";
import BreadCrumb from '../../Breadcrumb/BreadCrumb';


const ReactQuill = dynamic(
    () => import("react-quill"),
    {
        ssr: false
    }
);

export default function PrivacyPolicy() {

    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);

    // ======================
    // Fetch Policy
    // ======================

    const getPolicy = async () => {


        try {


            setLoading(true);


            const response = await fetchPrivacyPolicy();


            if (response.success && response.data.length > 0) {


                setPolicy(response.data[0]);


            }



        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }


    };


    useEffect(() => {

        getPolicy();

    }, []);
    return (
        <div>
 <BreadCrumb
        title="Privacy Policy"
        breadcrumb={[
          "Home",
          "Privacy Policy",
        ]}
      />

            {/* Preview */}

            <div className="bg-white rounded-xl shadow-md p-6 mt-8">


                {
                    loading

                        ?

                        <div className="flex justify-center py-10">

                            <Spinner color="warning" />

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
                                    __html: policy.content
                                }}

                            />



                            <div className="mt-6">


                                <span

                                    className={`px-4 py-2 rounded-full text-sm font-medium
    
                            ${policy.status == 1

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
        </div>
    )
}
