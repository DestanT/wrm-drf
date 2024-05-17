
import { Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';


export default function TabOneScreen() {
  const { accessToken, promptAsync, request, response } = useSpotifyAuth();

  return (
    <View>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
        />
      {response?.type === 'success' ? <Text>Response:{response.params.code}</Text> : null}
      {accessToken ? <Text>ACCESS_TOKEN:{accessToken}</Text> : null}
    </View>
  );
}