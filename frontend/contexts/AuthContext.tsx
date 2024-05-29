import { createContext, useContext, useEffect } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import axios from 'axios';
import { axiosInstance } from '@/api/axiosDefaults';
import { tokenExpired } from '@/utils/dataUtils';

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
  const [[isLoading, session], setSession] = useStorageState('session');

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config: any) => {
        if (session) {
          let accessToken = (session as { access?: string })?.access;

          // Refresh the token if it is expired
          if (accessToken && tokenExpired(accessToken)) {
            try {
              const { data } = await axios.post('token/refresh/', {
                refresh: (session as { refresh?: string })?.refresh,
              });

              setSession({ ...session, access: data.access });
              accessToken = data.access;
              console.log('AxiosInterceptor - Refreshed session token:', data.access);
            } catch (error) {
              console.error('Failed to refresh token:', error);
              setSession(null);
            }
          }

          // Finally set the access token in the Auth header
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // NOTE: Default response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [session]);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post('token/', { username, password });

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
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
