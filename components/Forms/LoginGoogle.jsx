import React, { useState, useEffect, useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import { useUser } from "../../context/UserContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/router";

export default function LoginGoogle() {
  const [googleData, setGoogleData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const { setUser } = useUser();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
          if (!executeRecaptcha) {
            setErrorMessages(["reCAPTCHA not yet available. Please try again."]);
            return;
          }

          const token = await executeRecaptcha("social_login");

          const data = {
            name: googleData.name,
            email: googleData.email,
            social_id: googleData.sub,
            provider: "Google",
            recaptcha_token: token,
          };

          const res = await axios.post(
            `${baseUrl}wellilab-api-gateway/public/api/social-login`,
            data
          );

          if (res.data.status === false) {
            const backendErrors = res.data.data ? Object.values(res.data.data).flat() : [];
            setErrorMessages(backendErrors);
          } else {
            const userData = res.data.data.user;
            setUser(userData);
            setResponseData(res.data);

            // ✅ Role-based redirect
            // ✅ Role-based redirect
            if (userData.is_admin) {
              router.replace("/dashboard"); // only admin
            } else {
              switch (userData.user_type) {
                case 1:
                  router.replace("/doctor/dashboard");
                  break;
                case 2:
                  router.replace("/socialWorker/dashboard");
                  break;
                case 3:
                  router.replace("/patient/dashboard");
                  break;
                case 4:
                  router.replace("/uPerson/dashboard");
                  break;
                default:
                  router.replace("/"); // fallback if unknown user_type
              }
            }

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
    >
      <div className="absolute top-2 right-2">
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

      <div className="bg-[#5274F6] w-full md:max-w-xl lg:max-w-3xl md:mx-10 lg:mx-20 p-6 md:p-12 flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">{translateText("googleLogin")}</h2>

          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={(error) => {
              const errorMessage = error.error_description;
              setErrorMessages([errorMessage]);
            }}
            useRecaptcha
          />

          {errorMessages.length > 0 && (
            <div className="mt-4 p-2 border rounded text-red-600 text-sm bg-red-50">
              <ul>
                {errorMessages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
