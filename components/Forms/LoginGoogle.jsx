import React, { useState, useEffect, useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";



export default function LoginGoogle() {
  const [googleData, setGoogleData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]); // Store dynamic errors as an array

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setGoogleData(decoded);
    } catch (error) {
      setErrorMessages(["Google login failed. Please try again."]);
    }
  };

  const { switchLanguage, locale, translateText } = useContext(LanguageContext);
  const [clientLocale, setClientLocale] = useState("");

  useEffect(() => {
    setClientLocale(locale.toUpperCase());
  }, [locale]);

  useEffect(() => {
    const sendToBackend = async () => {
      if (googleData) {
        try {
          const data = {
            name: googleData.name,
            email: googleData.email,
            social_id: googleData.sub,
            provider: "Google",
          };

          const res = await axios.post(
            "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/social-login",
            data
          );

          if (res.data.status === false) {
            // Dynamically display backend validation error messages
            const backendErrors = res.data.data
              ? Object.values(res.data.data).flat()
              : [];
            setErrorMessages(backendErrors);
          } else {
            setResponseData(res.data);
            window.location.href = "/dashboard";
          }
        } catch (error) {
          setErrorMessages(["Error while communicating with the server."]);
        }
      }
    };

    sendToBackend();
  }, [googleData]);

  return (
    <div
    className="relative w-screen h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: "url('https://nmtdevserver.com/welli/blurflower.png')" }}
  >      <div className="absolute top-2 right-2">
        <div className="relative flex items-center space-x-4 text-2xl cursor-pointer">
          <Dropdown>
            <DropdownTrigger>
              <button variant="bordered" color="primary" className="text-blue-600 border-2 border-[#5274F6] bg-white">
                <IoLanguage />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="en" onClick={() => switchLanguage("en")}>English</DropdownItem>
              <DropdownItem key="ita" onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="bg-[#5274F6] w-full md:max-w-xl lg:max-w-3xl  md:mx-10 lg:mx-20 p-6 md:p-12 flex items-center justify-center h-[100vh]">

      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-md ">
        <h2 className="text-xl font-bold mb-4">{translateText("googleLogin")}</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={(error) => {
            const errorMessage = error.error_description;
            setErrorMessages([errorMessage]);
          }}
        />

        {errorMessages.length > 0 && (
          <div className="mt-4 p-2 border rounded text-lg text-white">
            <ul>
              {errorMessages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* {responseData && (
          <div className="mt-4 p-2 border rounded text-sm text-green-700">
            <h3 className="font-semibold">Backend Response:</h3>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )} */}
      </div>
    </div>
    </div>
  );
}
