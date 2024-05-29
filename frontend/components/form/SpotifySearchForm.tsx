import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { spotifySearchValidation } from '../../constants/YupValidation';
import { useSession } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { View } from '../Themed';
import { Button, TextInput } from 'react-native';
import { axiosRequest } from '@/api/axiosDefaults';

type SpotifySearchInputs = {
  query: string;
};

export default function SpotifySearchForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }, setError
  } = useForm<SpotifySearchInputs>({
    resolver: yupResolver(spotifySearchValidation),
  });

  const { signIn, isLoading } = useSession();

  const onSubmit: SubmitHandler<SpotifySearchInputs> = async (data) => {
    try {
      const query = data.query;
      const response = await axiosRequest.get('auth/spotify/search/', {
        params: { query },
      });
      console.log('Spotify search query:', query);
      console.log('Spotify search response:', response.data);
    } catch (error) {
      console.error('Failed Spotify search:', error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Link"
          />
        )}
        name="query"
      />
      {errors.query && <span>{errors.query.message}</span>}

      <Button
        title={isLoading ? 'Searching...' : 'Search'}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </View>
  );
}
