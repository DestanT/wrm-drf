
import { createContext, useContext } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import axios from 'axios';

const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
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

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post("dj-rest-auth/login/", { username, password
      });

      // Save the session token
      setSession(response.data.key);
    } catch (error) {
      console.error('Failed to sign in:', error);
      setSession(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
