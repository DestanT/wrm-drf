import { View } from 'react-native';
import SignUpForm from '@/components/form/SignUpForm';

export default function SignUp() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SignUpForm />
    </View>
  );
}