import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axios";
import type { AuthResponse, User } from "@/types/admin";

interface LoginCredentials {
  username: string;
  password: string;
}

interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

// Helper function to check if token exists
const getStoredToken = () => localStorage.getItem("adminToken");

// Helper function to set auth header
const setAuthHeader = (token: string, tokenType: string = "Bearer") => {
  api.defaults.headers.common["Authorization"] = `${tokenType} ${token}`;
};

// Helper function to clear auth
const clearAuth = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminRefreshToken");
  delete api.defaults.headers.common["Authorization"];
};

// API functions
const loginRequest = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const formData = new URLSearchParams();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  const response = await api.post<AuthResponse>("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

const changePasswordRequest = async (data: ChangePasswordData) => {
  const response = await api.post("/auth/change-password", data);
  return response.data;
};

const getMeRequest = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Check authentication status and role via /auth/me
  const { data: authData, isLoading: loading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const token = getStoredToken();
      if (!token) {
        return {
          isAuthenticated: false,
          isSuperAdmin: false,
          user: null
        };
      }

      try {
        setAuthHeader(token);
        const user = await getMeRequest();
        return {
          isAuthenticated: true,
          isSuperAdmin: user.is_super_admin,
          user: user
        };
      } catch (error) {
        clearAuth();
        return {
          isAuthenticated: false,
          isSuperAdmin: false,
          user: null
        };
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: async (data) => {
      const { access_token, refresh_token, token_type } = data;
      
      // Store tokens
      localStorage.setItem("adminToken", access_token);
      localStorage.setItem("adminRefreshToken", refresh_token);
      
      // Set auth header
      setAuthHeader(access_token, token_type);
      
      // Refetch auth data to get user info from /auth/me
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  // Change Password mutation
  const changePasswordMutation = useMutation({
    mutationFn: changePasswordRequest,
    onSuccess: () => {
      logout();
    }
  });

  // Logout function
  const logout = () => {
    clearAuth();
    queryClient.setQueryData(["auth"], {
      isAuthenticated: false,
      isSuperAdmin: false,
      user: null
    });
    queryClient.clear(); // Clear all cached data
  };

  return {
    isAuthenticated: !!authData?.isAuthenticated,
    isSuperAdmin: !!authData?.isSuperAdmin,
    user: authData?.user,
    loading,
    error: loginMutation.isError ? "Login failed. Please try again." : null,
    login: async (credentials: LoginCredentials) => {
      try {
        await loginMutation.mutateAsync(credentials);
        return { success: true };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Login failed. Please try again.";
        return { 
          success: false, 
          error: errorMessage
        };
      }
    },
    changePassword: async (data: ChangePasswordData) => {
      try {
        await changePasswordMutation.mutateAsync(data);
        return { success: true };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Change password failed.";
        return { 
          success: false, 
          error: errorMessage
        };
      }
    },
    logout,
    isLoggingIn: loginMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
  };
};