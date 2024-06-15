import { Text, StyleSheet, View } from 'react-native';
import { useFonts, StyleScript_400Regular } from '@expo-google-fonts/style-script';

type BrandTextProps = {
  text: string;
  fontSize: number;
};

export default function BrandText({ text, fontSize }: BrandTextProps) {
  let [fontsLoaded, fontError] = useFonts({
    StyleScript_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View>
      <Text
        style={[
          { fontSize: fontSize + 3 },
          styles.brandTextBackground,
          { fontFamily: 'StyleScript_400Regular' }
        ]}
      >
        {text}
      </Text>
      <Text
        style={[
          { fontSize: fontSize },
          styles.brandText,
          { fontFamily: 'StyleScript_400Regular' }
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brandTextBackground: {
    color: '#918c6e',
    textShadowColor: '#a7a38b',
    textShadowOffset: { width: -5, height: 0 },
    textShadowRadius: 5,
    position: 'absolute',
    zIndex: 0,
  },
  brandText: {
    color: '#f4f3f0',
    textShadowColor: '#747058',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    position: 'absolute',
    zIndex: 1,
  },
});