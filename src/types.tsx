import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { HitSlop } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';

interface AlphabetProps {
  data?: string[];
  containerStyle?: StyleProp<ViewStyle>;
  charContainerStyle?: StyleProp<ViewStyle>;
  charStyle?: StyleProp<TextStyle>;
  onCharSelect?: (char: string) => void;
  hitSlop?: HitSlop;
}

export type { AlphabetProps };
