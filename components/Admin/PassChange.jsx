import { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from "@heroui/react";
import { IoLanguage } from "react-icons/io5";
import { useRouter } from "next/router";
import { changeAdminPassword } from "../../utils/fetchApi";
import { useAdmin } from "../../context/AdminContext"; // Use the correct hook

export default function AdminPasswordChange() {
  const { admin, adminId, logoutAdmin } = useAdmin(); // Use the hook to get values
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
    }
  }, [admin, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError(true);
      setMessage("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setError(true);
      setMessage("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(true);
      setMessage("New password and confirm password do not match.");
      return;
    }

    // Ensure you're properly accessing admin_id inside admin.data
    const adminIdToUse = adminId || admin?.data?.admin_id;

    if (!adminIdToUse) {
      setError(true);
      setMessage("Admin ID is missing. Please login again.");
      return;
    }
    setLoading(true);

    try {
      const response = await changeAdminPassword({
        admin_id: adminIdToUse, // Correctly accessing admin_id
        old_password: oldPassword,
        new_password: newPassword,
      });

      console.log("API response:", response);

      setError(!response.status);
      // setMessage(locale === "ita" ? response.message_italian : response.message);

      if (response.status) {
        setTimeout(() => {
          logoutAdmin(); // ✅ properly logout
          router.push("/admin/login");
        }, 2000);
      }
    } catch (err) {
      setError(true);
      setMessage("An error occurred. Please try again.");
      setLoading(false);

    }
  };


  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://nmtdevserver.com/welli/blurflower.png')" }}
    >
      <div className="absolute top-2 right-2">
        <Dropdown>
          <DropdownTrigger>
            <button className="text-blue-600 border-2 border-[#5274F6] bg-white p-2 rounded">
              <IoLanguage />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Select Language">
            <DropdownItem key="en" onClick={() => switchLanguage("en")}>English</DropdownItem>
            <DropdownItem key="ita" onClick={() => switchLanguage("ita")}>Italian</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="bg-[#5274F6] w-full md:max-w-xl lg:max-w-3xl p-6 md:p-12 flex items-center justify-center h-[100vh]">
        <div className="w-full md:w-1/2 flex flex-col">
          <p className="font-bold text-3xl text-center text-white mb-8">
            {/* {translateText("change_password")} */}
          </p>

          {message && (
            <p className={`text-center mb-4 ${error ? "text-red-300" : "text-green-200"}`}>
              {message}
            </p>
          )}

          <div className="grid gap-4">
            <Input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="text-black"
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="text-black"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-black"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="font-bold text-[15px] md:text-[14px] lg:text-[16px] xl:text-[16px] my-2 text-center text-white rounded-[600px] py-2 w-full flex items-center justify-center bg-[#FFBA1B]"
          >
            {/* {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
            translateText("after_you")
                            )} */}
          </button>
        </div>
      </div>
    </div>
  );
}
