import { useStoreLogin } from "../store/login";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import Cookies from "js-cookie";

// register
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${baseUrl}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.status) {
    const error = new Error();

    error.message =
      result.message ||
      Object.values(result.errors || {})
        .flat()
        .join(", ");

    error.errors = result.errors;

    throw error;
  }

  return result;
};

// verifyOtp
export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await fetch(`${baseUrl}auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.message,
      };
    }

    return data;
  } catch (error) {

    throw {
      message: error.message,
    };
  }
};

// Resend OTP
export const resendOtp = async ({ email }) => {
  try {
    const response = await fetch(
      `${baseUrl}auth/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.message,
      };
    }

    return data;
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

// Login
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.status) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// admin login
export const adminLogin = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.status) {
      throw new Error(result.message);
    }

    // Only admin can login

    if (result.user.role !== "admin") {
      throw new Error("You are not authorized to access the admin panel.");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// add-course
export async function addCourse(formData) {
  const res = await fetch(`${baseUrl}courses/add`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

// all-courses
export async function getCourses() {
  try {
    const res = await fetch(`${baseUrl}courses/all`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// courser-detail
export async function getSingleCourse(id) {
  try {
    const res = await fetch(`${baseUrl}courses/single/${id}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// course-update
export async function updateCourse(id, formData) {
  try {
    const res = await fetch(
      `${baseUrl}courses/update/${id}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// add-faculty
export async function addFaculty(data) {
  try {
    const res = await fetch(`${baseUrl}faculty/add`, {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (!res.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    throw error;
  }
}

// all-faculty
export const getFaculty = async () => {
  const response = await fetch(`${baseUrl}faculty/all`);

  const data = await response.json();

  return data;
};

// faculty-detail
export const getSingleFaculty = async (id) => {
  const response = await fetch(`${baseUrl}faculty/single/${id}`);

  return await response.json();
};

// update-faculty
export const updateFaculty = async (id, data) => {
  const response = await fetch(
    `${baseUrl}faculty/update/${id}`,
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};

// enrollement-submit-form
export const submitEnrollment = async (formData) => {
  const token = Cookies.get("token");

  const response = await fetch(
    `${baseUrl}enrollment/submit`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return await response.json();
};

// enrollement-list
export const getEnrollmentList = async () => {
  const token = Cookies.get("token");

  const response = await fetch(
    `${baseUrl}enrollment/list`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};

// enrollement-detail
export async function getEnrollmentDetail(id) {
  try {
    const token = Cookies.get("token");

    const res = await fetch(`${baseUrl}enrollment/detail/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// updateEnrollmentStatus
export async function updateEnrollmentStatus(id, status) {
  try {
    const token = Cookies.get("token");

    const res = await fetch(`${baseUrl}enrollment/status`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// hero-banner-view
export const getHeroBanner = async () => {
  const response = await fetch(
    `${baseUrl}hero-banner/view`
  );

  const data = await response.json();

  return data;
};

// Update Hero Banner
export const updateHeroBanner = async (formData) => {

  const response = await fetch(
    `${baseUrl}hero-banner/update`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    }
  );

  return await response.json();
};

// case-category-list
export const getCaseCategories = async () => {
  const res = await fetch(`${baseUrl}case-category/all`);
  return await res.json();
};

// case-add-category
export const addCaseCategory = async (data) => {
  const res = await fetch(`${baseUrl}case-category/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

// case-category-update
export const updateCaseCategory = async (id, data) => {
  const res = await fetch(`${baseUrl}case-category/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

// add-clinical-case
export const addCase = async (data) => {
  const response = await fetch(`${baseUrl}clinical-case/add`, {
    method: "POST",
    body: data,
  });

  return await response.json();
};

// list-clinical-case
export const getCases = async () => {
  const response = await fetch(`${baseUrl}clinical-case/all`);

  return await response.json();
};

// detail-clinical-case
export const getSingleCase = async (id) => {
  const response = await fetch(
    `${baseUrl}clinical-case/detail/${id}`
  );

  return await response.json();
};

// update-clinical-case
export const updateCase = async (id, data) => {
  const response = await fetch(
    `${baseUrl}clinical-case/update/${id}`,
    {
      method: "POST",
      body: data,
    }
  );

  return await response.json();
};

// get-all subs-plans
export const getPlans = async () => {
  try {
    const response = await fetch(
      `${baseUrl}plans/all`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    return {
      status: false,
      data: [],
    };
  }
};

// update subscription plan
export const updatePlan = async (id, payload) => {
  try {
    const response = await fetch(
      `${baseUrl}plans/update/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error updating plan:", error);

    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

// detail subscription plan
export const getSinglePlan = async (id) => {
  try {
    const response = await fetch(
      `${baseUrl}plans/detail/${id}`
    );

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      status: false,
    };
  }
};