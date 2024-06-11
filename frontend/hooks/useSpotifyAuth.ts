import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  AuthRequest,
  AuthRequestConfig,
  AuthSessionResult,
  makeRedirectUri,
  useAuthRequest,
} from 'expo-auth-session';
import { axiosInstance } from '@/api/axiosDefaults';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const CLIENT_ID = 'bff492e74a8345b1af5b7084adcc5cb5';

interface SpotifyAuthResponse {
  accessToken: string | null;
  promptAsync: () => Promise<AuthSessionResult>;
  request: AuthRequest | null;
  response: AuthSessionResult | null;
}

// Reference: https://docs.expo.dev/guides/authentication/#spotify
export const useSpotifyAuth = (): SpotifyAuthResponse => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // TS Reference: https://docs.expo.dev/versions/latest/sdk/auth-session/#authrequestconfig
  const config: AuthRequestConfig = {
    clientId: CLIENT_ID,
    scopes: ['user-read-private', 'user-read-email', 'streaming'],
    usePKCE: true,
    redirectUri: makeRedirectUri({
      scheme: 'we-rate-music',
    }),
  };

  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  // Get Spotify access token after successful authentication
  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      const code_verifier = request?.codeVerifier;

      const getAccessToken = async () => {
        try {
          const response = await axiosInstance.get('auth/spotify/callback/', {
            params: { code, code_verifier },
          });

          if (response.status === 200) {
            setAccessToken(response.data.access_token);
          } else {
            console.error('Error fetching access token:', response.data);
          }
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      };
      getAccessToken();
    }
  }, [response]);

  return {
    accessToken,
    promptAsync,
    request,
    response,
  };
};
