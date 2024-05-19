import { View } from 'react-native';
import LoginForm from '../components/form/LoginForm';

export default function SignIn() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoginForm />
    </View>
  );
}