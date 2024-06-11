import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from '../../constants/YupValidation';
import { useSession } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { View, Text } from 'react-native';
import axios from 'axios';
import { Image } from 'react-native';
import { TextInput } from '../CustomTextInput';
import Button from '../Button';

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
    <View className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* Logo & Title */}
      <View className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dxgzepuov/image/upload/v1/default_profile_lcovgw',
          }}
          className="mx-auto h-10 w-auto"
          style={{ width: 80, height: 80, borderRadius: 45 / 2 }}
        />
        <Text className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up page
        </Text>
      </View>

      {/* Form */}
      <View className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-2">
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
        </View>
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
                placeholder='Password'
              />
            )}
            name='password'
          />
          {errors.password && <span>{errors.password.message}</span>}
        </View>
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
                placeholder='Confirm Password'
              />
            )}
            name='passwordConfirm'
          />
          {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
        </View>

        {/* Submit Button */}
        <Button onPress={handleSubmit(onSubmit)} disabled={isLoading} title='Sign Up'/>
      </View>

      {/* Sign In Link */}
      <Text className="mt-10 text-center text-sm text-gray-500">
        Already a member?{' '}
        <Text
          className="font-semibold leading-6 text-indigo-600"
          onPress={() => router.replace('/sign-in')}>
          Click to sign in!
        </Text>
      </Text>
    </View>
  );
}
