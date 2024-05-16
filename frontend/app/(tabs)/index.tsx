import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { axiosReq } from '@/api/axiosDefaults';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const CLIENT_ID = 'bff492e74a8345b1af5b7084adcc5cb5';

export default function SpotifyAuthButton() {
  const [accessToken, setAccessToken] = useState(null);

  // Reference: https://docs.expo.dev/guides/authentication/#spotify
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['user-read-private', 'user-read-email', 'streaming'],
      usePKCE: true,
      redirectUri: makeRedirectUri({
        scheme: 'we-rate-music',
      }),
    },
    discovery
  );

  // Get Spotify access token after successful authentication
  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      const code_verifier = request?.codeVerifier

      const getAccessToken = async () => {
        try {
          const response = await axiosReq.get('auth/spotify/callback/', {
            params: { code, code_verifier }
          });

          if (response.status === 200) {
            setAccessToken(response.data.access_token);
          } else {
            console.error('Error fetching access token:', response.data);
          }
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
    }
    getAccessToken();
  }
  }, [response]);

  return (
    <>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
        />
      {response?.type === 'success' ? <Text>Response:{response.params.code}</Text> : null}
      {accessToken ? <Text>ACCESS_TOKEN:{accessToken}</Text> : null}
    </>
  );
}