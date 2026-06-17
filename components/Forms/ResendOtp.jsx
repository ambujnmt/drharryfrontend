import { useContext, useEffect, useState, useRef } from "react";
import { Input, Link } from "@heroui/react";
import { resendOtp  } from "../../utils/fetchApi"; 
import { useRegisteredUser } from "../../context/RegisteredUserContext";
import { useRouter } from "next/router";

export default function ResendOtp() {
  const [enteredOtp, setEnteredOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const otpLinkRef = useRef(null);
const router = useRouter();

const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [isError, setIsError] = useState(false);
  const { registeredUserEmail } = useRegisteredUser();



const handleResendOtp = async () => {
  if (!email) {
    setIsError(true);
    setMessage("Please enter your email");
    return;
  }

  setLoading(true);

  try {
    const result = await resendOtp({
      email,
    });

    setIsError(false);
    setMessage(result.message);

    setTimeout(() => {
      sessionStorage.setItem("userEmail", email);
      router.push("/otpVerification");
    }, 3000);
  } catch (error) {
    setIsError(true);
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
};

return (
  <div className="h-screen w-screen overflow-hidden flex items-center justify-center px-4 bg-[var(--light-gold2)]">

    <div className="w-full max-w-md rounded-3xl shadow-2xl p-8 md:p-10 bg-white">

      <div className="text-center">

        <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center text-3xl bg-[var(--light-gold)] text-[var(--primary-color)]">
          📧
        </div>

        <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-2">
          Resend OTP
        </h2>

        <p className="text-sm text-[var(--text-color2)] mb-8">
          Enter your registered email address to receive a new OTP.
        </p>

      </div>

      {message && (
        <div
          className={`mb-5 text-center text-sm font-medium ${
            isError
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <Input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="bordered"
        classNames={{
          input: "text-center",
          inputWrapper:
            "h-14 border-2 rounded-xl border-[var(--primary-color)] hover:border-[var(--secondary-color)] bg-white",
        }}
      />

      <button
        onClick={handleResendOtp}
        disabled={loading}
        className="w-full mt-6 h-14 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white font-semibold text-lg transition"
      >
        {loading ? (
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          "Resend OTP"
        )}
      </button>

      <div className="text-center mt-6">

        <Link
          href="/login"
          className="font-semibold text-[var(--primary-color)]"
        >
          Back to Login
        </Link>

      </div>

    </div>

  </div>
);
}
