import { Button, View } from 'react-native';
import LoginForm from '../components/form/LoginForm';
import { router } from 'expo-router';

export default function SignIn() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoginForm />
      <Button title="Sign Up" onPress={() => router.replace('/sign-up')} />
    </View>
  );
}