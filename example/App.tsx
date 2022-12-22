import { StyleSheet, Text, View } from 'react-native';

import * as UniversalTooltip from 'universal-tooltip';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{UniversalTooltip.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
