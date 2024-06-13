import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type CounterProps = {
  inputText: string;
};

export default function Counter({ inputText }: CounterProps) {
  // Ensure at least 2 characters are displayed
  if (inputText.length < 2) {
    inputText = '0' + inputText;
  }
  
  return (
    // Container
    <View className="flex-1 items-center justify-center p-5">
      {/* Outer most border */}
      <View className="border-8 border-[#2e2d2c] rounded-xl bg-[#242424]">
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
              style={{
                width: 48,
                height: 64,
                alignItems: 'center',
                justifyContent: 'center',
              }}

              // Outer border for each box
              className="w-12 h-16 m-0.5 rounded border-x-2 border-y-4 border-x-[#a8a5a3] border-y-[#1d1d1d]"
            >
              {/* Character */}
              <Text className="font-mono font-bold text-6xl mt-1 text-[#e8e8e7]/[.85]">
                {char}
              </Text>
            </LinearGradient>
          ))}
        </View>
      </View>
    </View>
  );
}
