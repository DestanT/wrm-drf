import { Image } from 'react-native'

type AvatarProps = {
    src: string;
    alt: string;
    height: number;
}

export default function Avatar({ src, alt, height = 45 }: AvatarProps) {
  return (
    <Image
        source={{ uri: src }}
        style={{ width: height, height: height, borderRadius: height / 2 }}
        accessibilityLabel={alt}
        className='border-[#716b5b] bg-[#716b5b]'
    />
  )
}
