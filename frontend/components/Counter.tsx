import { View, Text, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type CounterProps = {
  inputText: string;
};

export default function Counter({ inputText }: CounterProps) {
  // Ensure at least 2 characters are displayed
  if (inputText.length < 2) {
    inputText = '0' + inputText;
  }

  // Platform specific styles
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  const boxStyle = isMobile ? styles.mobileBox : styles.box;
  const textStyle = isMobile ? styles.mobileText : styles.text;
  const borderStyle = isMobile
    ? 'm-0.5 rounded border-x-2 border-y-0 border-x-[#a8a5a3] border-y-[#1d1d1d]'
    : 'm-0.5 rounded border-x-2 border-y-4 border-x-[#a8a5a3] border-y-[#1d1d1d]';

  return (
    // Container
    <View className="flex-1 items-center justify-center">
      {/* Outer most border */}
      <View className="border-4 border-[#2e2d2c] rounded-lg bg-[#242424]">
        {/* Inner border */}
        <View className="flex-row justify-center border-x-4 border-y-2 border-x-[#1d1d1d] border-y-[#1d1d1d] rounded-lg">
          {/* inputText split into characters */}
          {inputText.split('').map((char, index) => (
            // Gradient background for each box
            <LinearGradient
              key={index}
              colors={[
                '#303030',  // Dark
                '#a8a5a3',  // Highlight
                '#7d7875',  // Light
                '#303030',  // Dark
                '#303030',  // Dark
                '#262626',  // Darkest
                '#303030',  // Dark
                '#7d7875',  // Light
                '#303030',
              ]}
              style={boxStyle}
              // Outer border for each box
              className={borderStyle}
            >
              {/* Character */}
              <Text style={textStyle}>{char}</Text>
            </LinearGradient>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 24,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileBox: {
    width: 21,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: '#e8e8e7',
    opacity: 0.85,
  },
  mobileText: {
    fontSize: 20,
    fontFamily: '',
    fontWeight: '900',
    color: '#e8e8e7',
  },
});
