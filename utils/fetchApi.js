import { useStoreLogin } from "@/store/login";
const baseUrl = "https://abc.in";
// const v3BaseUrl = "";

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

    return await response.json(); // Return the response in JSON format
  } catch (error) {
    console.error("Fetch failed:", error);
    return { error}
    // return { error: "Fetch failed.", details: error.message };
  }
};

export const fetchWithOutToken = async (url, data = {}, options = {}) => {
  try {
    // Set up the headers
    const headers = {
      ...options.headers,
      apihost: baseUrl,
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
    console.error("Fetch failed:",error.message);
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
    console.error("Fetch failed:",error.message );
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
    return await response.json(); // Return the response in JSON format
  } catch (error) {
    console.error("Fetch failed:", error.message);
    return {error}
    // return { error: "Fetch failed.", details: error.message };
  }
};

export default fetchWithToken;