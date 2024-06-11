import { Button as DefaultButton, Pressable as DefaultPressable, PressableProps } from 'react-native';

export function Pressable(props: PressableProps) {
  return (
    <DefaultPressable
      className='flex w-full justify-center rounded-md bg-buttonLight px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'
      {...props}
    />
  );
}
