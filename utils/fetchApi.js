import { useStoreLogin } from "../store/login";
// const baseUrl = "https://abc.in";
// const v3BaseUrl = "";

export const createNewPasswordApi = async (email, password) => {
  const url = "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/create-new-password";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      throw {
        status: false,
        message: data.message,
        errors: data.data || null,
      };
    }

    return {
      status: true,
      message: data.message,
      message_italian: data.message_italian || data.message,
    };

  } catch (error) {
    console.error("Error creating new password:", error);
    throw error;
  }
};


export const verifyResendOtpApi = async (email, otp) => {
  const url = "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/verify-otp";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await response.json();

    // If response is not OK or status is false
    if (!response.ok || !data.status) {
      throw {
        status: false,
        message: data.message,
        errors: data.data || null
      };
    }

    // Return success response with token and user name
    return {
      status: true,
      message: data.message,
      token: data.data.token,
      name: data.data.name
    };

  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error; 
  }
};


export const resendOtpApi = async (email) => {
  const url = "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/resend-otp";  

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    // If the response is not OK, throw the error response
    if (!response.ok) {
      throw { 
        status: false, 
        message: data.message 
      };
    }

    // Return success response with message
    return {
      status: true,
      message: data.message 
    };

  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error; // Rethrow the error object with status and message
  }
};

export const verifyOtp = async ({ email, otp }) => {
  const response = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, otp })
  });

  const data = await response.json();
  if (!response.ok) throw data;
  return data;
};

export const registerUser = async (name, email, password, c_password) => {
  const url = "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/register";

  try {
    // Basic validations
    if (!name || !email || !password || !c_password ) {
      throw new Error("All fields are required.");
    }

    if (password !== c_password) {
      throw new Error("Password and Confirm Password must match.");
    }

    const payload = { name, email, password, c_password };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    // Handle non-successful responses
    if (!response.ok || !result?.status) {
      const error = new Error(result.message);
      error.details = result.data || null;
      throw error;
    }

    // Return the successful response data
    return result;

  } catch (error) {
    // Optional: Log the error for debugging
    console.error("Registration Error:", error.message, error.details);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  const url = "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    console.log("API Response:", result); // Add this to debug

    if (!response.ok || !result.status) {
      throw new Error(result.message);
    }

    return result.data; // This is where user data should come from
  } catch (error) {
    throw error;
  }
};


export const adminLogin = async (email, password) => {
  const response = await fetch("https://nmtdevserver.com/well/wellilab-api-gateway/public/api/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!data.status) {
    const error = new Error(data.message || "Login failed");
    error.message_italian = data.message_italian || "Login mislukt";
    throw error;
  }

  return data;
};

export const changeAdminPassword = async ({ admin_id, old_password, new_password }) => {
  try {
    const response = await fetch("https://nmtdevserver.com/well/wellilab-api-gateway/public/api/admin/create-new-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        admin_id,
        old_password,
        new_password,
      }),
    });

    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      const errorText = await response.text(); // fallback for non-JSON errors
      return {
        status: false,
        message: "Server error: " + errorText,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      status: false,
      message: "Network or parsing error: " + error.message,
    };
  }
};

// user-list
export async function fetchUsers() {
  try {
    const response = await fetch("https://nmtdevserver.com/well/wellilab-api-gateway/public/api/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

// add user
export const addUser = async (data) => {
  try {
    const response = await fetch("https://nmtdevserver.com/well/wellilab-api-gateway/public/api/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();

    try {
      const result = JSON.parse(text);
      return result;
    } catch {
      return { status: false, message: "Invalid JSON response" };
    }

  } catch {
    return { status: false, message: "Network request failed" };
  }
};

// update-user
export async function updateUser(id, data) {
  try {
    const response = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/update-user/${id}`, {
      method: 'POST',
      body: data, // send FormData directly
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error in updateUser API:", err);
    return { status: false, message: "API call failed" };
  }
}

export const changeUserStatus = async (userId, status) => {
  try {
    const response = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/change-user-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        status: status, // Must be string/number like '1', '2', etc.
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error changing status:', error);
    return { status: false, message: 'Failed to update status' };
  }
};

export const postPatientAssignment = async (payload) => {
  const url = 'https://nmtdevserver.com/well/wellilab-api-gateway/public/api/save-patient-assignment';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || result.status === false) {
      throw new Error(result.message || 'Failed to assign patients');
    }

    return result;
  } catch (error) {
    console.error('Error posting patient assignment:', error);
    return { status: false, message: error.message};
  }
};

export const fetchAssignedPatients = async (userId) => {
  try {
    const response = await fetch('https://nmtdevserver.com/well/wellilab-api-gateway/public/api/patient-assignment-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });

    const result = await response.json();

    if (!response.ok || result?.status === false) {
      console.error('API Error:', result?.message);
      return [];
    }

    const patientsArray = result?.data?.patients;

    if (Array.isArray(patientsArray)) {
      return patientsArray.map(patient => patient.patient_id);
    } else {
      console.warn('No patients found in response data.');
      return [];
    }

  } catch (error) {
    console.error('Error fetching assigned patients:', error);
    return [];
  }
};

export const fetchSocialWorkersWithPatients = async () => {
  try {
    const response = await fetch(
      'https://nmtdevserver.com/well/wellilab-api-gateway/public/api/socialworkers-patients'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching social workers with patients:', error);
    return { status: false, message: 'Failed to fetch data' };
  }
};


export const saveSchedulerData = async ({ user_id, patient_id, schedule_day, schedule_time }) => {
  try {
    const response = await fetch(
      'https://nmtdevserver.com/well/wellilab-api-gateway/public/api/save-schedular-data',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          patient_id,
          schedule_day,
          schedule_time,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { status: false, message: 'Something went wrong while saving schedule.' };
  }
};

  export const deleteAssignedScheduler = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const response = await fetch('https://nmtdevserver.com/well/wellilab-api-gateway/public/api/delete-assign-schedular', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API Error:", error);
      return {
        status: false,
        message: "An error occurred while deleting."
      };
    }
  };

export async function fetchProfile(userId) {
  const response = await fetch(
    'https://nmtdevserver.com/well/wellilab-api-gateway/public/api/get-user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const result = await response.json();
  return result;
}


export async function updateProfileApi(formData) {
  try {
    const response = await fetch("https://nmtdevserver.com/well/wellilab-api-gateway/public/api/update-profile", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    // API might return validation error with status = false
    return data;
  } catch (error) {
    return { status: false, message: "Something went wrong, please try again." };
  }
}

export async function addClinic(apiData) {
  try {
    const formData = new FormData();
    formData.append("clinic_name", apiData.clinic_name);
    formData.append("email", apiData.email);
    formData.append("phone", apiData.phone);
    formData.append("location", apiData.location);
    formData.append("timezone", apiData.timezone);
    formData.append("latitude", apiData.latitude);
    formData.append("longitude", apiData.longitude);
    formData.append("description", apiData.description);

    if (apiData.image) {
      formData.append("image", apiData.image);
    }

    const res = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/add-clinic",
      {
        method: "POST",
        body: formData,
      }
    );

    return await res.json();
  } catch (error) {
    return { status: false, message: error.message };
  }
}

export const fetchClinics = async () => {
  try {
    const response = await fetch(
      "https://nmtdevserver.com/well/wellilab-auth/public/api/clinics",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // API expects POST even for list, so sending empty body
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clinics:", error);
    return null;
  }
};

export const fetchClinicById = async (id) => {
  try {
    const response = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/get-clinic",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clinic_id: id }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching clinic detail:", error);
    return null;
  }
};

export async function deleteClinic(clinicId) {
  try {
    const formData = new FormData();
    formData.append("clinic_id", clinicId);

    const response = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/delete-clinic",
      {
        method: "POST",
        body: formData, // ✅ send as FormData
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Delete clinic error:", error);
    return { status: false, message: "Something went wrong!" };
  }
}

export async function updateClinic(formData) {
  try {
    const response = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/update-clinic",
      {
        method: "POST",
        body: formData,
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error updating clinic:", error);
    return { status: false, message: "Something went wrong" };
  }
}

export const fetchAssignedPatientForSocialWorker = async (userId) => {
  try {
    const response = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/patient-assignment-list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      }
    );

    const result = await response.json();
    console.log("📡 API raw result:", result);

    if (result.status && result.data && Array.isArray(result.data.patients)) {
      return result.data.patients.map((patient) => ({
        ...patient,
        status_value: patient.status === 1 ? "Active" : "Inactive",
      }));
    } else {
      console.warn("⚠️ No patients found or invalid response");
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching assigned patients:", error);
    return [];
  }
};

export const fetchDoctors = async () => {
  try {
    const response = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/users-by-type",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_type: 1 }), // ✅ Only doctors
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return null;
  }
};

export async function fetchDoctorSlots(doctor_id) {
  try {
    const res = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/doctor-slot-list",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctor_id }),
      }
    );
    return await res.json();
  } catch (err) {
    return { status: false, message: "Something went wrong." };
  }
}

export async function addDoctorSlot(payload) {
  try {
    const res = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/doctor-add-slot",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    return await res.json();
  } catch (err) {
    return { status: false, message: "Something went wrong." };
  }
}

export const updateDoctorSlot = async (payload) => {
  try {
    const res = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/doctor-update-slot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Error updating doctor slot:", error);
    return { status: false, message: "Something went wrong." };
  }
};

export const deleteDoctorSlot = async (slot_id) => {
  try {
    const response = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/doctor-delete-slot",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot_id }),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error deleting slot:", error);
    return { status: false, message: "Something went wrong" };
  }
};

export const addClinicSlot = async (payload) => {
  try {
    const res = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/clinic-add-slot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    return { status: false, message: error.message};
  }
};

export const fetchClinicSlots = async (clinic_id) => {
  try {
    const res = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/clinic-slot-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clinic_id }),
    });
    return await res.json();
  } catch (error) {
    return { status: false, message: error.message};
  }
};

export async function updateClinicSlot(payload) {
  try {
    const res = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/clinic-update-slot",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    return await res.json();
  } catch (err) {
    console.error("updateClinicSlot error:", err);
    return { status: false, message: "Something went wrong" };
  }
}

export async function deleteClinicSlot(slot_id) {
  try {
    const res = await fetch(
      "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/clinic-delete-slot",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot_id }),
      }
    );
    return await res.json();
  } catch (err) {
    console.error("deleteClinicSlot error:", err);
    return { status: false, message: "Something went wrong" };
  }
}

export const fetchDoctorsByFilter = async ({ filter_type = "All", latitude = null, longitude = null }) => {
  try {
    const body = {
      user_type: 1, // ✅ Doctors
      filter_type,  // "All" or "Nearby"
    };

    if (filter_type === "Nearby" && latitude && longitude) {
      body.latitude = latitude;
      body.longitude = longitude;
    }

    const response = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/users-by-type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return null;
  }
};

export const fetchDoctorWeeklySlots = async (doctorId) => {
  try {
    const response = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/doctor-slot-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doctor_id: doctorId }),
    });

    const data = await response.json();
    return data; // {status, data: [ { day_of_week, start_time, end_time... } ]}
  } catch (error) {
    console.error("Error fetching doctor weekly slots:", error);
    return { status: false, data: [] };
  }
};

export const fetchDoctorAvailableSlots = async (doctorId, date) => {
  try {
    const response = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/doctor-all-slots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctor_id: doctorId,
        date: date, // format: YYYY-MM-DD
      }),
    });

    const data = await response.json();
    return data; // {status, data: [ { time, status } ]}
  } catch (error) {
    console.error("Error fetching doctor available slots:", error);
    return { status: false, data: [] };
  }
};


export const bookDoctorSlot = async ({ doctor_id, user_id, booking_date, start_time }) => {
  try {
    const response = await fetch(`https://nmtdevserver.com/well/wellilab-api-gateway/public/api/book-doctor-slot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctor_id,
        user_id,
        booking_date,
        start_time,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { status: false, message: "Something went wrong. Please try again." };
  }
};




const fetchGoogleToken = async (token) => {
  try {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
    console.log('Fetching token info from:', url);

    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Token Fetch Failed:', errorText);
      throw new Error('Invalid token');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Google token info:', error.message);
    return null;
  }
};

export { fetchGoogleToken };



const fetchWithToken = async (url, data = {}, options = {}) => {
  try {
    const authToken = useStoreLogin.getState().authToken;

    if (!authToken) {
      window.location.href = "/login";
      return { error: "No auth token, redirecting to login." };
    }

    // Set up the headers
    const headers = {
      ...options.headers,
      token: authToken,
      apihost: baseUrl,
    };

    // Set up the fetch options
    const fetchOptions = {
      ...options,
      headers,
      method: options.method || "GET",
    };
    let newUrl;

    // If the method is POST, PUT, or DELETE, include the data in the body as JSON
    if (
      fetchOptions.method === "POST" ||
      fetchOptions.method === "PUT" ||
      fetchOptions.method === "DELETE"
    ) {
      fetchOptions.body = data;
      if (!url.includes("/file/upload")) {
        fetchOptions.body = JSON.stringify(fetchOptions.body);
      }
      newUrl = url.startsWith("http") ? url : `${v3BaseUrl}${url}`;
    } else {
      // For GET or other methods, construct the URL with query parameters
      newUrl = url.startsWith("http") ? url : `${v3BaseUrl}${url}`;
      const queryString = new URLSearchParams(data).toString();
      newUrl = `${newUrl}?${queryString}`;
    }

    let response = await fetch(newUrl, fetchOptions);

    if (!response.ok) {
      if (response.status === 403) {
        try {
          await useStoreLogin.getState().getNewAuthToken();
        } catch (error) {
          window.location.href = "/login";
          return { error: "Error fetching new auth token." };
        }
        return await fetchWithToken(url, data, options); // Retry with new token
      } else {
        const errorData = await response.json();
        return {
          error: `HTTP error! status: ${response.status}`,
          details: errorData,
        };
      }
    }

    return await response.json(); 
  } catch (error) {
    return { error}
  }
};

export const fetchWithOutToken = async (url, data = {}, options = {}) => {
  try {
    const headers = {
      ...options.headers,
      apihost: baseUrl,
    };

    const fetchOptions = {
      ...options,
      headers,
      method: options.method || "GET",
    };

    // If the method is POST, PUT, or DELETE, include the data in the body as JSON
    if (
      fetchOptions.method === "POST" ||
      fetchOptions.method === "PUT" ||
      fetchOptions.method === "DELETE"
    ) {
      fetchOptions.body = JSON.stringify(data);
      url = url.startsWith("http") ? url : `${v3BaseUrl}${url}`;
    } else {
      // For GET or other methods, construct the URL with query parameters
      url = url.startsWith("http") ? url : `${v3BaseUrl}${url}`;
      const queryString = new URLSearchParams(data).toString();
      url = `${url}?${queryString}`;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: `HTTP error! status: ${response.status}`,
        details: errorData,
      };
    }
    return await response.json(); // Return the response in JSON format
  } catch (error) {
    return { error };
    // return { error: "Fetch failed.", details: error.message };
  }
};

export const fetchWithToken_old = async (url, data = {}, options = {}) => {
  try {
    const authToken = useStoreLogin.getState().authToken;

    if (!authToken) {
      window.location.href = "/login";
      return { error: "No auth token, redirecting to login." };
    }

    // Set up the headers
    const headers = {
      ...options.headers,
      token: authToken,
    };

    // Set up the fetch options
    const fetchOptions = {
      ...options,
      headers,
      method: options.method || "GET",
    };
    let newUrl;

    // If the method is POST, PUT, or DELETE, include the data in the body as JSON
    if (
      fetchOptions.method === "POST" ||
      fetchOptions.method === "PUT" ||
      fetchOptions.method === "DELETE"
    ) {
      fetchOptions.body = data;
      if (!url.includes("/file/upload")) {
        fetchOptions.body = JSON.stringify(fetchOptions.body);
      }
      newUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
    } else {
      // For GET or other methods, construct the URL with query parameters
      newUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
      const queryString = new URLSearchParams(data).toString();
      newUrl = `${newUrl}?${queryString}`;
    }

    let response = await fetch(newUrl, fetchOptions);

    if (!response.ok) {
      if (response.status === 403) {
        try {
          await useStoreLogin.getState().getNewAuthToken();
        } catch (error) {
          window.location.href = "/login";
          return { error: "Error fetching new auth token." };
        }
        return await fetchWithToken(url, data, options); // Retry with new token
      } else {
        const errorData = await response.json();
        return {
          error: `HTTP error! status: ${response.status}`,
          details: errorData,
        };
      }
    }

    return await response.json(); // Return the response in JSON format
  } catch (error) {
    return {error}
    // return { error: "Fetch failed.", details: error.message };
  }
};

export const fetchWithOutToken_old = async (url, data = {}, options = {}) => {
  try {
    // Set up the headers
    const headers = {
      ...options.headers,
    };

    // Set up the fetch options
    const fetchOptions = {
      ...options,
      headers,
      method: options.method || "GET",
    };

    // If the method is POST, PUT, or DELETE, include the data in the body as JSON
    if (
      fetchOptions.method === "POST" ||
      fetchOptions.method === "PUT" ||
      fetchOptions.method === "DELETE"
    ) {
      if (!url.includes("/file/upload")) {
        fetchOptions.body = JSON.stringify(data);
      } else {
        fetchOptions.body = data;
      }
      url = url.startsWith("http") ? url : `${baseUrl}${url}`;
    } else {
      
      // For GET or other methods, construct the URL with query parameters
      url = url.startsWith("http") ? url : `${baseUrl}${url}`;
      const queryString = new URLSearchParams(data).toString();
      
      url = `${url}?${queryString}`;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: `HTTP error! status: ${response.status}`,
        details: errorData,
      };
    }
    return await response.json(); 
  } catch (error) {
    return {error}
  }
};

export default fetchWithToken;