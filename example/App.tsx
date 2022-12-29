import { StyleSheet, Text, View } from "react-native";

import * as Tooltip from "universal-tooltip";
const bubbleBackgroundColor = "blue";
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
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <View style={styles.button}>
              <Text style={styles.text}>Hello world! 👋</Text>
            </View>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              <Text style={styles.text}>Add to library</Text>
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
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
  tooltipView: {
    overflow: "hidden",
  },
});
