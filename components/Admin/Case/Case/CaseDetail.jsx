import React, { useMemo, useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Head } from "../../../../layouts/head";
import Table from "../../../Table/Table";
import { getSingleCase  } from "../../../../utils/fetchApi";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/router";
import PageTitle from "../../../Breadcrumb/PageTitle";


export default function CaseDetail() {
  const router = useRouter();
  const { id } = router.query;

const [clinicalCase, setClinicalCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");


const fetchCase = async () => {
  if (!id) return;

  try {
    setLoading(true);

    const res = await getSingleCase(id);

    if (res.status) {
      setClinicalCase(res.case);
    } else {
      setMessage(res.message);
    }
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCase();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  if (message) {
    return (
      <div className="text-center text-red-600 mt-10">
        {message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EC] p-6">

      <Head title="Case Detail" />

      <h1 className="text-[42px] text-[var(--secondary-color)] mb-2">
         Clinical Case Detail
      </h1>

      <p className="text-[#505050] mb-8">
        View complete information about this clinical case.
      </p>

      <PageTitle
        breadCrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Manage Case', path: '/admin/case/case/manageCase' },
          { label: 'Case Detail', active: true },
        ]}
        title="Case Detail"
      />
  <div className="bg-white rounded-xl shadow-md p-8">

<div className="grid lg:grid-cols-2 gap-10">

<div>

<img
src={clinicalCase.image}
className="w-full h-[350px] object-cover rounded-xl"
/>

</div>

<div>

<h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-4">

{clinicalCase.title}

</h2>

<div className="space-y-4">

<div>

<p className="text-gray-500">

Category

</p>

<p className="font-semibold">

{clinicalCase.category?.name}

</p>

</div>

<div>

<p className="text-gray-500">

Doctor

</p>

<p className="font-semibold">

{clinicalCase.doctor}

</p>

</div>

<div>

<p className="text-gray-500">

Treatment Duration

</p>

<p className="font-semibold">

{clinicalCase.treatment_weeks} Weeks

</p>

</div>

<div>

<p className="text-gray-500">

Status

</p>

<span
className={`px-3 py-1 rounded-full text-sm

${clinicalCase.status==1

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}`}

>

{clinicalCase.status==1

?

"Active"

:

"Inactive"

}

</span>

</div>

</div>

</div>

</div>

<hr className="my-10"/>

<h3 className="text-2xl font-semibold mb-5 text-[var(--secondary-color)]">

Case Description

</h3>

<div

className="prose max-w-none"

dangerouslySetInnerHTML={{

__html:clinicalCase.description,

}}

/>

<div className="grid md:grid-cols-2 gap-6 mt-10">

<div className="bg-[#F5F2EC] rounded-xl p-5">

<p className="text-gray-500">

Created At

</p>

<h5>

{new Date(clinicalCase.created_at).toLocaleDateString()}

</h5>

</div>

<div className="bg-[#F5F2EC] rounded-xl p-5">

<p className="text-gray-500">

Updated At

</p>

<h5>

{new Date(clinicalCase.updated_at).toLocaleDateString()}

</h5>

</div>

</div>

</div>

    </div>
  );
}