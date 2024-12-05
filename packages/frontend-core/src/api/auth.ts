import {
  LoginRequest,
  PasswordResetRequest,
  PasswordResetUpdateRequest,
} from "@budibase/types"
import { BaseAPIClient } from "./types"

export interface AuthEndpoints {
  logIn: (tenantId: string, username: string, password: string) => Promise<void>

  // Missing request or response types
  logOut: () => Promise<{ message: string }>
  requestForgotPassword: (
    tenantId: string,
    email: string
  ) => Promise<{ message: string }>
  resetPassword: (
    tenantId: string,
    password: string,
    resetCode: string
  ) => Promise<{ message: string }>
  setInitInfo: (info: any) => Promise<void>
  getInitInfo: () => Promise<any>
}

export const buildAuthEndpoints = (API: BaseAPIClient): AuthEndpoints => ({
  /**
   * Performs a login request.
   * @param tenantId the ID of the tenant to log in to
   * @param username the username (email)
   * @param password the password
   */
  logIn: async (tenantId, username, password) => {
    return await API.post<LoginRequest>({
      url: `/api/global/auth/${tenantId}/login`,
      body: {
        username,
        password,
      },
    })
  },

  /**
   * Logs the user out and invalidates their session.
   */
  logOut: async () => {
    return await API.post({
      url: "/api/global/auth/logout",
    })
  },

  /**
   * Sets initialisation info.
   * @param info the info to set
   */
  setInitInfo: async info => {
    return await API.post({
      url: "/api/global/auth/init",
      body: info,
    })
  },

  /**
   * Gets the initialisation info.
   */
  getInitInfo: async () => {
    return await API.get({
      url: "/api/global/auth/init",
    })
  },

  /**
   * Sends a password reset email.
   * @param tenantId the ID of the tenant the user is in
   * @param email the email address of the user
   */
  requestForgotPassword: async (tenantId, email) => {
    return await API.post<PasswordResetRequest, { message: string }>({
      url: `/api/global/auth/${tenantId}/reset`,
      body: {
        email,
      },
    })
  },

  /**
   * Resets a user's password.
   * @param tenantId the ID of the tenant the user is in
   * @param password the new password to set
   * @param resetCode the reset code to authenticate the request
   */
  resetPassword: async (tenantId, password, resetCode) => {
    return await API.post<PasswordResetUpdateRequest, { message: string }>({
      url: `/api/global/auth/${tenantId}/reset/update`,
      body: {
        password,
        resetCode,
      },
    })
  },
})
