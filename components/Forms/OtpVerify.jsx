import { useContext, useEffect, useRef, useState } from "react";
import {
    Input,
    Link,
} from "@heroui/react";
import { verifyOtp } from "../../utils/fetchApi";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";

export default function OtpVerify() {
    const otpLinkRef = useRef(null);
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiResult, setApiResult] = useState(null);
    const [enteredOtp, setEnteredOtp] = useState("");
    const [isError, setIsError] = useState(false);
    const { userEmail } = useUser();

    const handleOtpVerify = async () => {

        if (!enteredOtp) {
            setMessage("Please enter OTP");
            return;
        }

        setLoading(true);

        try {

            const result = await verifyOtp({
                email: userEmail,
                otp: enteredOtp,
            });
            setIsError(false);
            setMessage(result.message);

            setTimeout(() => {

                sessionStorage.removeItem("userEmail");

                router.push("/login");

            }, 3000);

        } catch (error) {

            setIsError(true);
            setMessage(
                error.message
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div
            className="h-screen w-screen overflow-hidden flex items-center justify-center px-4 relative bg-[var(--light-gold2)]"
        >


            {/* Card */}

            <div
                className="w-full max-w-md rounded-3xl shadow-2xl p-8 md:p-10 bg-[#fff]"
            >
                <div className="text-center">
                    <div
                        className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center text-3xl bg-[var(--light-gold)] text-[var(--primary-color)]"
                    >
                        🔐
                    </div>

                    <h2
                        className="text-3xl font-bold mb-2 text-[var(--secondary-color)]"
                    >
                        Enter OTP
                    </h2>

                    {/* <p
            className="text-sm mb-8 text-[var(--text-color2)]"
          >
            Enter the OTP sent to your registered email address.
          </p> */}
                    <p className="text-sm mb-8 text-[var(--text-color2)] text-center">
                        Enter the OTP sent to

                        <br />

                        <span className="font-semibold text-[var(--primary-color)]">
                            {userEmail}
                        </span>
                    </p>
                </div>

                {message && (
                    <div
                        className={`mb-5 text-center text-sm font-medium ${isError
                                ? " text-red-600 "
                                : " text-green-600 "
                            }`}
                    >
                        {message}
                    </div>
                )}

                <Input
                    placeholder="Enter OTP"
                    type="number"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    variant="bordered"
                    classNames={{
                        input: "text-center text-lg tracking-[10px]",
                        inputWrapper:
                            "h-14 border-2 rounded-xl border-[var(--primary-color)] hover:border-[var(--secondary-color)] bg-white",
                    }}
                />

                <button
                    onClick={handleOtpVerify}
                    disabled={loading}
                    className="w-full mt-6 h-14 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white font-semibold text-lg transition-all hover:opacity-90"
                >
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        "Verify"
                    )}
                </button>

                <div className="text-center mt-6">
                    <p
                        className="text-sm text-[var(--text-color2)]"
                    >
                        Didn't receive the OTP?
                    </p>

                    <Link
                        href="/resendOtp"
                        className="mt-2 font-semibold text-[var(--primary-color)]"
                    >
                        Resend OTP
                    </Link>
                </div>

                <Link ref={otpLinkRef} href="/login" className="hidden" />
            </div>
        </div>
    );
}