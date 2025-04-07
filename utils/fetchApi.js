import { useStoreLogin } from "../store/login";
// const baseUrl = "https://abc.in";
// const v3BaseUrl = "";


export const registerUser = async (name, email, password, c_password, user_type) => {
  const url = "https://nmtdevserver.com/well/wellilab-api-gateway/public/api/register";

  try {
    if (password !== c_password) {
      throw new Error("Password and Confirm Password must match.");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, c_password, user_type }),
    });

    const result = await response.json();

    if (!response.ok || !result?.status) {
      const error = new Error(result.message || "Registration failed");
      error.details = result.data; // Pass full data to catch block
      throw error;
    }
    

    return result.data;

  } catch (error) {
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

    if (!response.ok || !result.status) {
      throw new Error(result.message || "Login failed");
    }

    return result.data; // { token, name }
  } catch (error) {
    throw error;
  }
};






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