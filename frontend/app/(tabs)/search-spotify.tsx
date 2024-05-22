import { Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import { useSession } from '@/contexts/AuthContext';
import SpotifySearchForm from '@/components/form/SpotifySearchForm';


export default function SpotifySearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SpotifySearchForm />
    </View>
  );
}