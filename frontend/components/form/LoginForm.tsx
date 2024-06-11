import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from '../../constants/YupValidation';
import { useSession } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { TextInput } from '../CustomTextInput';
import { Pressable } from '../CustomButton';

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
          Sign in to your account
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
                placeholder="Username"
              />
            )}
            name="username"
          />
          {errors.username && <Text className="text-center">{errors.username.message}</Text>}
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
                placeholder="Password"
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && <Text className="text-center">{errors.password.message}</Text>}
        </View>

        {/* Submit Button */}
        <Pressable onPress={handleSubmit(onSubmit)} disabled={isLoading}>
          <Text className="text-center">{isLoading ? 'Signing in...' : 'Login'}</Text>
        </Pressable>
      </View>

      {/* Sign Up Link */}
      <Text className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <Text
          className="font-semibold leading-6 text-indigo-600"
          onPress={() => router.replace('/sign-up')}>
          Click to sign up!
        </Text>
      </Text>
    </View>
  );
}
