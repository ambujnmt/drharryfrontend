import React, { useEffect, useState } from 'react'
import "react-quill/dist/quill.snow.css";
import { Spinner } from "@heroui/react";
import {
    fetchTerms,
} from "../../../utils/fetchApi";
import dynamic from "next/dynamic";
import BreadCrumb from '../../Breadcrumb/BreadCrumb';


const ReactQuill = dynamic(
    () => import("react-quill"),
    {
        ssr: false
    }
);

export default function Terms() {

    const [terms, setTerms] = useState(null);
    const [loading, setLoading] = useState(true);

    // ======================
    // Fetch Terms
    // ======================

    const getTerms = async () => {


        try {


            setLoading(true);


            const response = await fetchTerms();


            if (response.success && response.data.length > 0) {


                setTerms(response.data[0]);


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

        getTerms();

    }, []);
    return (
        <div>
 <BreadCrumb
        title="Terms and Condition"
        breadcrumb={[
          "Home",
          "Terms and Condition",
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


                        terms &&

                        <>


                            <h3 className="text-xl font-semibold mb-4">

                                {terms.title}

                            </h3>



                            <div

                                className="
                        prose
                        max-w-none
                        text-[#333]
                        "

                                dangerouslySetInnerHTML={{
                                    __html: terms.content
                                }}

                            />



                            <div className="mt-6">


                                <span

                                    className={`px-4 py-2 rounded-full text-sm font-medium
    
                            ${terms.status == 1

                                            ?

                                            "bg-green-100 text-green-700"

                                            :

                                            "bg-red-100 text-red-700"

                                        }
    
                            `}

                                >

                                    {
                                        terms.status == 1
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
