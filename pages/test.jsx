import {  useRef, useState } from "react";
import {  Button } from "@heroui/react";
import { Input } from "@heroui/react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../utils/firebase";

export default function Phone() {

  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState(null);



const sendOtp = async () => {
  try {
    console.log("Phone number entered:", phone); // ✅ This will show the number in the console

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved", response);
        },
        'expired-callback': () => {
          console.log("reCAPTCHA expired");
        }
      });
    }

    const appVerifier = window.recaptchaVerifier;
    const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
    console.log("confirmation", confirmation);
    setUser(confirmation);
  } catch (err) {
    console.log(err);
  }
};

const verifyOtp = async () => {
  try {
    const result = await user.confirm(otp);
    console.log("OTP verified ✅");
    console.log("Verification response:", result); // 👈 This logs the response object
  } catch (err) {
    console.log("OTP verification failed ❌", err);
  }
};



  return (
  
    <div>
      <div>
      <PhoneInput
        country={"us"}
        value={phone}
        onChange={(value) => setPhone("+" + value)}
      />
      <Button onPress={sendOtp}>Send OTP</Button>

      <Input
      label="Enter OTP"
      onChange={(e) => setOtp(e.target.value)}
      />
      <Button onPress={verifyOtp}>Verify OTP</Button>
      </div>
      <div id="recaptcha"></div>
    </div>
  );
}
