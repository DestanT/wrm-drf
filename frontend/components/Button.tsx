import { Pressable, PressableProps, Text } from 'react-native';

interface ButtonProps extends PressableProps {
  title: string;
}

export default function Button(props: ButtonProps) {
  const { onPress, disabled, title } = props;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className='flex w-full justify-center rounded-md bg-buttonLight px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'
      {...props}
    >
      <Text className='text-center'>{title}</Text>
    </Pressable>
  );
}
