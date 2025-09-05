import { View, StyleSheet } from 'react-native';
import Alphabet from '@kokurin/react-native-alphabet';

export default function App() {
  return (
    <View style={styles.container}>
      <Alphabet data={['A', 'B', 'C']} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
