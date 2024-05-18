
import { Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import { useSession } from '@/contexts/AuthContext';


export default function TabOneScreen() {
  const { accessToken, promptAsync, request, response } = useSpotifyAuth();
  const { signOut } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        disabled={!request}
        title="Spotify Auth"
        onPress={() => {
          promptAsync();
        }}
        />
      <Button
        title="Sign Out"
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
        />
      {response?.type === 'success' ? <Text>Response:{response.params.code}</Text> : null}
      {accessToken ? <Text>ACCESS_TOKEN:{accessToken}</Text> : null}
    </View>
  );
}