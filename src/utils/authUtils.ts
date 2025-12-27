// src/utils/authUtils.ts

import * as Cookies from "js-cookie";

export interface User {
  email: string;
  name: string;
  role: "owner" | "staff";
  organization: string;
}

const USER_COOKIE_KEY = "kalamna_user";
const TOKEN_COOKIE_KEY = "kalamna_token";

// Cookie options
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: import.meta.env.PROD, // Only secure in production
  sameSite: "strict" as const,
};

/**
 * Validate user object structure
 */
const isValidUser = (user: any): user is User => {
  return (
    user &&
    typeof user === "object" &&
    typeof user.email === "string" &&
    typeof user.name === "string" &&
    (user.role === "owner" || user.role === "staff") &&
    typeof user.organization === "string"
  );
};

/**
 * Save user data to cookie
 */
export const saveUser = (user: User, token: string): void => {
  if (!isValidUser(user)) {
    console.error("Invalid user object:", user);
    throw new Error("Invalid user data");
  }

  Cookies.set(USER_COOKIE_KEY, JSON.stringify(user), COOKIE_OPTIONS);
  Cookies.set(TOKEN_COOKIE_KEY, token, COOKIE_OPTIONS);
};

/**
 * Get user data from cookie with validation
 */
export const getUser = (): User | null => {
  try {
    const userCookie = Cookies.get(USER_COOKIE_KEY);

    if (!userCookie) {
      return null;
    }

    const user = JSON.parse(userCookie);

    // Validate before returning
    if (!isValidUser(user)) {
      console.error("Invalid user data in cookie:", user);
      clearUser(); // Clear invalid data
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    clearUser(); // Clear corrupted data
    return null;
  }
};

/**
 * Get authentication token
 */
export const getToken = (): string | null => {
  return Cookies.get(TOKEN_COOKIE_KEY) || null;
};

/**
 * Clear user data and token
 */
export const clearUser = (): void => {
  Cookies.remove(USER_COOKIE_KEY);
  Cookies.remove(TOKEN_COOKIE_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getUser() !== null && getToken() !== null;
};

/**
 * Check if user is owner
 */
export const isOwner = (user: User | null): boolean => {
  return user?.role === "owner";
};

/**
 * Check if user is staff
 */
export const isStaff = (user: User | null): boolean => {
  return user?.role === "staff";
};

/**
 * Check if user can perform an action on another user
 * Rules:
 * - Owner can edit/delete any user except themselves
 * - Staff cannot edit/delete anyone
 */
export const canModifyUser = (
  currentUser: User | null,
  targetUserEmail: string,
): boolean => {
  if (!currentUser) return false;
  if (!isOwner(currentUser)) return false;
  if (currentUser.email === targetUserEmail) return false;
  return true;
};
