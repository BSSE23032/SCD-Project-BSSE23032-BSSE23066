import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

/**
 * 🔥 IMPORTANT
 * Backend URL is taken from .env
 * Example:
 * VITE_API_BASE_URL=http://52.201.37.251:5000
 */
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  timeout: 10000,
});

// ================= PROPERTIES =================

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd");

    if (response.status >= 400) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong while loading properties");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`);

    if (response.status >= 400) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong while loading property");
    throw error;
  }
};

// ================= USER =================

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, please try again");
    throw error;
  }
};

// ================= BOOKINGS =================

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong while booking");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong while cancelling booking");
    throw error;
  }
};

// ================= FAVOURITES =================

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getAllFav = async (email, token) => {
  if (!token) return [];
  try {
    const res = await api.post(
      `/user/allFav`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data?.favResidenciesID || [];
  } catch (error) {
    toast.error("Something went wrong while fetching favourites");
    throw error;
  }
};

// ================= BOOKINGS LIST =================

export const getAllBookings = async (email, token) => {
  if (!token) return [];
  try {
    const res = await api.post(
      `/user/allBookings`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data?.bookedVisits || [];
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error;
  }
};

// ================= CREATE PROPERTY =================

export const createResidency = async (data, token) => {
  try {
    const res = await api.post(
      `/residency/create`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    toast.error("Something went wrong while creating property");
    throw error;
  }
};
