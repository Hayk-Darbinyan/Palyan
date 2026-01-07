import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axios";

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: "bearer";
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

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Check authentication status
  const { data: isAuthenticated = false, isLoading: loading } = useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      const token = getStoredToken();
      if (token) {
        setAuthHeader(token);
        return true;
      }
      return false;
    },
    staleTime: Infinity, // Auth status doesn't go stale
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      const { access_token, token_type } = data;
      
      // Store token
      localStorage.setItem("adminToken", access_token);
      
      // Set auth header
      setAuthHeader(access_token, token_type);
      
      // Update auth query cache
      queryClient.setQueryData(["auth"], true);
    },
    onError: () => {
      queryClient.setQueryData(["auth"], false);
    },
  });

  // Logout function
  const logout = () => {
    clearAuth();
    queryClient.setQueryData(["auth"], false);
    queryClient.clear(); // Clear all cached data
  };

  return {
    isAuthenticated,
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
    logout,
    isLoggingIn: loginMutation.isPending,
  };
};