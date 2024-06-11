import { TextInput as DefaultTextInput } from 'react-native';

export type TextInputProps = DefaultTextInput['props'];

export function TextInput(props: TextInputProps) {
  return (
    <DefaultTextInput
      className='block w-full rounded-md shadow-sm sm:text-sm sm:leading-6 bg-neutralLight border-2 border-neutralDark px-1.5 py-1' 
      placeholderTextColor={'text-gray-500'}
      {...props}
    />
  );
}
