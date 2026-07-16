"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/router";

import PageTitle from "../../../components/Breadcrumb/PageTitle";
import { getSinglePlan } from "../../../utils/fetchApi";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPlan = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const res = await getSinglePlan(id);

      if (res.status) {
        setPlan(res.data);
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
    fetchPlan();
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
      <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)] mb-2">
        Subscription Plan Detail
      </h1>

      <p className="text-[#505050] text-[14px] md:text-[14px] lg:text-[16px] mb-8">
        View complete information about this subscription plan.
      </p>

      <PageTitle
        breadCrumbItems={[
          {
            label: "Dashboard",
            path: "/dashboard",
          },
          {
            label: "Subscription Plans",
            path: "/admin/subsPlan/subsPlan",
          },
          {
            label: "Plan Detail",
            active: true,
          },
        ]}
        title="Plan Detail"
      />

      <div className="bg-white rounded-xl shadow-md p-3 md:p-6 lg:p-8">

        {/* Header */}
        <div className="border-b pb-6 mb-8">
          <h2 className="text-4xl font-bold text-[var(--secondary-color)]">
            {plan.name}
          </h2>

          <p className="text-[#505050] mt-3 text-lg">
            {plan.description}
          </p>
        </div>

        {/* Information Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div>
            <p className="text-gray-500">Price</p>
            <h5 className="font-semibold text-xl">
              ${plan.price}
            </h5>
          </div>

          <div>
            <p className="text-gray-500">Duration</p>
            <h5 className="font-semibold text-xl capitalize">
              {plan.duration}
            </h5>
          </div>

          <div>
            <p className="text-gray-500">Button Text</p>
            <h5 className="font-semibold text-xl">
              {plan.button_text}
            </h5>
          </div>

          <div>
            <p className="text-gray-500">Plan ID</p>
            <h5 className="font-semibold text-xl">
              #{plan.id}
            </h5>
          </div>

          <div>
            <p className="text-gray-500">Most Popular</p>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                plan.is_popular
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {plan.is_popular ? "Yes" : "No"}
            </span>
          </div>

          <div>
            <p className="text-gray-500">Status</p>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                plan.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {plan.status ? "Active" : "Inactive"}
            </span>
          </div>

          <div>
            <p className="text-gray-500">Created At</p>
            <h5>
              {plan.created_at
                ? new Date(plan.created_at).toLocaleDateString()
                : "-"}
            </h5>
          </div>

          <div>
            <p className="text-gray-500">Updated At</p>
            <h5>
              {plan.updated_at
                ? new Date(plan.updated_at).toLocaleDateString()
                : "-"}
            </h5>
          </div>

        </div>

        {/* Description */}
        <div className="mt-10">

          <h3 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">
            Description
          </h3>

          <div className="bg-[#F8F8F8] p-5 rounded-lg">
            <p className="leading-7 text-[#505050]">
              {plan.description}
            </p>
          </div>

        </div>

        {/* Features */}
        <div className="mt-10">

          <h3 className="text-2xl font-semibold text-[var(--secondary-color)] mb-5">
            Plan Features
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            {plan.features?.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#F5F2EC] rounded-lg p-4"
              >
                <span className="text-green-600 text-xl">
                  ✓
                </span>

                <span className="font-medium text-[#505050]">
                  {feature}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}
