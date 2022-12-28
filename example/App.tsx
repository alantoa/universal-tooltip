import { StyleSheet, Text, View } from "react-native";

import { UniversalTooltipView, hello } from "universal-tooltip";
const bubbleBackgroundColor = "blue";
export default function App() {
  return (
    <View style={styles.container}>
      <UniversalTooltipView
        bubbleBackgroundColor={bubbleBackgroundColor}
        side="right"
        style={styles.tooltipView}
      >
        <View style={StyleSheet.absoluteFillObject} nativeID="bubble">
          <View
            style={{
              padding: 10,
              height: "100%",
              width: 100,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <Text style={styles.text}>{"Hello world! 👋"}</Text>
          </View>
        </View>
        <View style={styles.button}>
          <Text style={styles.text}>{"Hello world! 👋"}</Text>
        </View>
      </UniversalTooltipView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 40,
    backgroundColor: "#333",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
  },
  tooltipView: {},
});
