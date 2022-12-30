import { StyleSheet, Text, View } from "react-native";
import * as Tooltip from "universal-tooltip";
// const bubbleBackgroundColor = "blue";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Tooltip.UniversalTooltip
        side="top"
        style={styles.tooltipView}
        presetAnimation="fadeIn"
        dismissDuration={1500}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: bubbleBackgroundColor, borderRadius: 10 },
          ]}
          nativeID="bubble"
        >
          <View
            style={{
              padding: 10,
              height: "100%",
              width: 100,
            }}
            nativeID="bubbleInner"
          >
            <Text style={styles.text}>{"Hello world! 👋"}</Text>
          </View>
        </View>
        <View style={styles.button}>
          <Text style={styles.text}>{"Hello world! 👋"}</Text>
        </View>
      </Tooltip.UniversalTooltip> */}
      <Tooltip.Root style={styles.root}>
        <Tooltip.Trigger asChild>
          <View style={styles.button}>
            <Text style={styles.text}>Hello!👋</Text>
          </View>
        </Tooltip.Trigger>
        <Tooltip.Content
          style={styles.content}
          paddings={[0]}
          sideOffset={5}
          side="left"
          text="Add to"
        >
          <Text style={styles.text}>Add to library</Text>
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e1e1",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    backgroundColor: "#eee",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#333",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
  },
  content: {
    overflow: "hidden",
    backgroundColor: "green",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
