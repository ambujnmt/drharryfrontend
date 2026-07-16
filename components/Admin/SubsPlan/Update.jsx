"use client";

import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";

import { useRouter } from "next/router";

import PageTitle from "../../../components/Breadcrumb/PageTitle";

import {
  getSinglePlan,
  updatePlan,
} from "../../../utils/fetchApi";

export default function Update() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");

  const [isPopular, setIsPopular] = useState(false);
  const [status, setStatus] = useState(true);

  const [features, setFeatures] = useState([""]);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      setLoading(true);

      const res = await getSinglePlan(id);

      if (res.status) {
        const plan = res.data;

        setName(plan.name || "");
        setPrice(plan.price || "");
        setDuration(plan.duration || "");
        setDescription(plan.description || "");
        setButtonText(plan.button_text || "");

        setIsPopular(
          plan.is_popular === true ||
          plan.is_popular === 1
        );

        setStatus(
          plan.status === true ||
          plan.status === 1
        );

        setFeatures(
          plan.features?.length
            ? plan.features
            : [""]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const updateFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const removeFeature = (index) => {
    const updated = [...features];
    updated.splice(index, 1);
    setFeatures(updated);
  };

  const handleSubmit = async () => {
    setButtonLoading(true);

    const payload = {
      name,
      price,
      duration,
      description,
      button_text: buttonText,
      is_popular: isPopular ? 1 : 0,
      status: status ? 1 : 0,
      features: features.filter(
        (item) => item.trim() !== ""
      ),
    };

    const res = await updatePlan(
      id,
      payload
    );

    if (res.status) {
      setMessage(res.message);

      setTimeout(() => {
        router.push(
          "/admin/subsPlan/subsPlan"
        );
      }, 1500);
    }

    setButtonLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EC] p-6">

      <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)] mb-6">
        Update Subscription Plan
      </h1>

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
            label: "Update Plan",
            active: true,
          },
        ]}
        title="Update Plan"
      />

      {message && (
        <div className="text-green-700 text-center mt-5">
          {message}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-md p-3 md:p-6 lg:p-8">
        <h3 className="text-xl font-semibold mb-3 border-b pb-3">
          Plan Information
        </h3>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">

          <Input
            value={name}
            onValueChange={setName}
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Plan Name
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />
          <Input
            label="Price"
            value={price}
            onValueChange={setPrice}
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Price
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <Input
            value={duration}
            onValueChange={setDuration}
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Duration
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />

          <Input
            value={buttonText}
            onValueChange={setButtonText}
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Button Text
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />


        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">


          <Select
            selectedKeys={[isPopular ? "1" : "0"]}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0];
              setIsPopular(value === "1");
            }}
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Most Popular
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          >
            <SelectItem key="1">
              Yes
            </SelectItem>

            <SelectItem key="0">
              No
            </SelectItem>
          </Select>
          <Select
            variant="underlined"
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

        <div className="mb-3">

          <Input
            value={description}
            onValueChange={setDescription}
            variant="underlined"
            label={
              <span className="text-[#000] ">
                Description
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input: "text-[var(--secondary-color)] font-medium",

            }}
          />
        </div>


        <div className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <label className="font-medium">
              Features
            </label>

            <Button
              size="sm"
              className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]"
              onPress={addFeature}
            >
              Add Feature
            </Button>
          </div>

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-2 mb-2"
            >
              <Input
                value={feature}
                onValueChange={(value) =>
                  updateFeature(index, value)
                }
              />

              {features.length > 1 && (
                <Button
                  color="danger"
                  size="sm"
                  onPress={() =>
                    removeFeature(index)
                  }
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>



        <div className="mt-8 flex justify-center">

          <Button
            className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]"
            isLoading={buttonLoading}
            onPress={handleSubmit}
          >
            Update Plan
          </Button>

        </div>

      </div>
    </div>
  );
}