import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Button,
  Spinner,
} from "@heroui/react";
import { FaUpload } from "react-icons/fa";
import { Head } from "../../../layouts/head";
import PageTitle from "../../Breadcrumb/PageTitle";

import {
  getHeroBanner,
  updateHeroBanner,
} from "../../../utils/fetchApi";

export default function HeroBanner() {
  const fileRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    button1_text: "",
    button1_link: "",
    button2_text: "",
    button2_link: "",
    image: null,
  });

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      setLoading(true);

      const res = await getHeroBanner();

      if (res.status) {
        setFormData({
          title: res.banner.title || "",
          subtitle: res.banner.subtitle || "",
          button1_text: res.banner.button1_text || "",
          button1_link: res.banner.button1_link || "",
          button2_text: res.banner.button2_text || "",
          button2_link: res.banner.button2_link || "",
          image: null,
        });

        setPreview(res.banner.image);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const fd = new FormData();

      fd.append("title", formData.title);
      fd.append("subtitle", formData.subtitle);
      fd.append("button1_text", formData.button1_text);
      fd.append("button1_link", formData.button1_link);
      fd.append("button2_text", formData.button2_text);
      fd.append("button2_link", formData.button2_link);

      if (formData.image) {
        fd.append("image", formData.image);
      }

      const res = await updateHeroBanner(fd);

      setMessage(res.message);
      setMessageType("success");

      if (res.banner.image) {
        setPreview(res.banner.image);
      }

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setMessage(err.message);
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.title) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--light-gold2)] p-6">
      <Head title="Hero Banner" />

      <div className="mb-8">
        <h1 className="text-[25px] md:text-[35px] lg:text-[42px] text-[var(--secondary-color)]">
          Hero Banner
        </h1>
      </div>

      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Hero Banner", active: true },
        ]}
        title="Hero Banner"
      />

      {message && (
        <div
          className={`text-center mb-5 font-medium ${messageType === "success"
              ? "text-green-600"
              : "text-red-600"
            }`}
        >
          {message}
        </div>
      )}


      <div className="bg-white rounded-xl shadow-lg p-3 md:p-6 lg:p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <Input
            variant="underlined"
            value={formData.title}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                title: value,
              }))
            }
            label={
              <span className="text-[#000]">
                Title
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input:
                "text-[var(--secondary-color)] font-medium",
            }}
          />

          <Input
            variant="underlined"
            value={formData.subtitle}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                subtitle: value,
              }))
            }
            label={
              <span className="text-[#000]">
                Subtitle
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input:
                "text-[var(--secondary-color)] font-medium",
            }}
          />

          <Input
            variant="underlined"
            value={formData.button1_text}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                button1_text: value,
              }))
            }
            label={
              <span className="text-[#000]">
                Button 1 Text
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input:
                "text-[var(--secondary-color)] font-medium",
            }}
          />

          <Input
            variant="underlined"
            value={formData.button1_link}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                button1_link: value,
              }))
            }
            label={
              <span className="text-[#000]">
                Button 1 Link
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input:
                "text-[var(--secondary-color)] font-medium",
            }}
          />

          <Input
            variant="underlined"
            value={formData.button2_text}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                button2_text: value,
              }))
            }
            label={
              <span className="text-[#000]">
                Button 2 Text
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input:
                "text-[var(--secondary-color)] font-medium",
            }}
          />

          <Input
            variant="underlined"
            value={formData.button2_link}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                button2_link: value,
              }))
            }
            label={
              <span className="text-[#000]">
                Button 2 Link
              </span>
            }
            classNames={{
              label: "text-[var(--text-color2)] h-[50px]",
              input:
                "text-[var(--secondary-color)] font-medium",
            }}
          />

        </div>
        {/* Hero Image */}

        <div className="mt-8">

          <label className="block text-[14px] md:text-[15px] font-medium text-[var(--secondary-color)] mb-2">
            Hero Image
          </label>


          <div
            className="
      border-2
      border-dashed
      border-[var(--primary-color)]
      rounded-xl
      bg-[var(--light-gold)]
      text-center
      p-5
      sm:p-6
      lg:p-8
    "
          >

            <FaUpload
              size={30}
              className="mx-auto text-[var(--primary-color)] mb-3"
            />


            <p className="text-sm sm:text-[15px] text-[var(--secondary-color)]">
              Upload Hero Banner
            </p>


            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="
        mt-4
        block
        w-full
        sm:w-auto
        mx-auto
        text-sm
        file:mr-4
        file:px-4
        file:py-2
        file:rounded-lg
        file:border-0
        file:bg-[var(--primary-color)]
        file:text-white
        file:cursor-pointer
      "
              onChange={(e) => {

                const file = e.target.files[0];

                if (file) {

                  setFormData((prev) => ({
                    ...prev,
                    image: file,
                  }));

                  setPreview(
                    URL.createObjectURL(file)
                  );

                }

              }}
            />


            {preview && (

              <img
                src={preview}
                className="
          w-full
          max-w-[500px]
          h-auto
          mx-auto
          rounded-xl
          mt-6
          object-cover
        "
              />

            )}

          </div>

        </div>

        <div className="mt-10">

          <Button
            onPress={handleUpdate}
            className="bg-[var(--primary-color)] text-white px-10"
            isDisabled={loading}
          >
            {loading ? (
              <Spinner
                size="sm"
                color="white"
              />
            ) : (
              "Update Banner"
            )}
          </Button>

        </div>

      </div>
    </div>
  );
}