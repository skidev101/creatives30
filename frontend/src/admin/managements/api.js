// services/adminService.js

import { authFetch } from "../../utils/auth";

export const addAdmin = async (email) => {
  try {
    const response = await authFetch(
      'https://xen4-backend.vercel.app/admin/addAdmin',
      {
        method: 'POST',
        body: JSON.stringify({ email })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add admin");
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding admin:', error);
    throw error;
  }
};

export const fetchAdmins = async (page = 1, limit = 15) => {
  try {
    const response = await authFetch(
      `https://xen4-backend.vercel.app/admin/allAdmins?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch admins');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }
};

export const fetchUsers = async (page = 1, limit = 15) => {
  try {
    const response = await authFetch(
      `https://xen4-backend.vercel.app/admin/allUsers?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch users');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const deleteUser = async (email) => {
  try {
    const response = await authFetch(
      'https://xen4-backend.vercel.app/admin/deleteUser',
      {
        method: 'POST',
        body: JSON.stringify({ email })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user");
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};