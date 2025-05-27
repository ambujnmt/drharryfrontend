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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error in updateUser API:", err);
    return { status: false, message: "API call failed" };
  }
}

// utils/fetchApi.js
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

// utils/fetchApi.js

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

// utils/fetchApi.js

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