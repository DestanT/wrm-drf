
import { createContext, useContext, useEffect, useMemo } from 'react';
import { getStorageItemAsync, useStorageState } from '../hooks/useStorageState';
import axios from 'axios';
import "core-js/stable/atob"; // Required for atob to work in React Native
import { axiosRequest } from '@/api/axiosDefaults';

const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: { access: string; refresh: string } | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(),
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  console.log('SessionProvider');
  const [[isLoading, session], setSession] = useStorageState('session');

  useEffect(() => {
    // Will refresh the access token with every axios request if the session exists
    const requestInterceptor = axiosRequest.interceptors.request.use(
      async (config: any) => {
          if (session) {
            config.headers.Authorization = `Bearer ${(session as { access?: string })?.access}`;
            try {
              console.log('trying request', config);
              const { data } = await axios.post('token/refresh/', { refresh: (session as { refresh?: string })?.refresh });
              setSession({ ...session, access: data.access });
              console.log('Session refreshed token:', data.access);
            } catch (error) {
              console.error('Failed to refresh token:', error);
              setSession(null);
            }
          }
          return config;
      },
      (error) => Promise.reject(error)
    );

    // NOTE: NEEDS WORK
    // NOTE: This interceptor will only work for the first request after the session is set, needs more testing
    const responseInterceptor = axiosRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Set the original request config to a variable
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && session) {
          // Prevent infinite loop
          originalRequest._retry = true;
          
          try {
            const { data } = await axios.post('token/refresh/', { refresh: (session as { refresh?: string })?.refresh });
            setSession({ ...session, access: data.access });
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            console.log('Axios request interceptor response, 401 error, token refreshed');

            // Retry the original request
            return axiosRequest(originalRequest);
          } catch (error) {
            console.error('Failed to refresh token:', error);
            setSession(null);
            return Promise.reject(error); // If future error handling is needed, best to reject the promise at this stage before checking for other error codes.
          }
        } else {
          console.error('Interceptor response error:', error);
          console.error('Interceptor response error.config:', error.config);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosRequest.interceptors.request.eject(requestInterceptor);
      axiosRequest.interceptors.response.eject(responseInterceptor);
    };
  } , [session]);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post("token/", { username, password
      });
      
      // Save the session token
      setSession(response.data);
    } catch (error) {
      console.error('Failed to sign in:', error);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null);
        },
        session: session as { access: string; refresh: string } | null,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
