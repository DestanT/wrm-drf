import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from '../../constants/YupValidation';
import { useSession } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { View } from '../Themed';
import { Button, TextInput } from 'react-native';
import axios from 'axios';

type SignUpInputs = {
  username: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }, setError
  } = useForm<SignUpInputs>({
    resolver: yupResolver(signUpValidation),
  });

  const { signIn, isLoading } = useSession();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      await axios.post('dj-rest-auth/registration/', {
        username: data.username,
        password1: data.password,
        password2: data.passwordConfirm,
      });
      router.replace('/sign-in');
    } catch (error) {
      console.error('Failed to sign up:', error);
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
            placeholder='Confirm Password'
          />
        )}
        name='passwordConfirm'
      />
      {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}

      <Button
        title={isLoading ? 'Signing in...' : 'Sign In'}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </View>
  );
}
