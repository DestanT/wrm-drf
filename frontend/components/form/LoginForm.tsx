import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from '../../constants/YupValidation';
import { useSession } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { View } from '../Themed';
import { Button, TextInput } from 'react-native';

type LoginInputs = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }, setError
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginValidation),
  });

  const { signIn, isLoading } = useSession();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await signIn(data.username, data.password);
      router.replace('/');
    } catch (error) {
      setError('username', {
        type: 'manual',
        message: 'Invalid username or password',
      });
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
            placeholder='Username'
          />
        )}
        name='username'
      />
      {errors.username && <span>{errors.username.message}</span>}
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
            placeholder='Password'
          />
        )}
        name='password'
      />
      {errors.password && <span>{errors.password.message}</span>}

      <Button
        title={isLoading ? 'Signing in...' : 'Sign In'}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </View>
  );
}
