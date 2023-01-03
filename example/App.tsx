import { useState } from "react";
import * as Tooltip from "universal-tooltip";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Tooltip.Root
        open={open}
        onDismiss={() => {
          console.log("onDismiss");
        }}
        style={styles.root}
      >
        <Tooltip.Trigger asChild>
          <View style={styles.button}>
            <Text style={styles.text}>Hello!👋</Text>
          </View>
        </Tooltip.Trigger>
        <Tooltip.Content
          style={styles.content}
          containerStyle={{
            paddingTop: 8,
            paddingRight: 10,
            paddingBottom: 8,
            paddingLeft: 10,
          }}
          sideOffset={5}
          side="top"
          presetAnimation="fadeIn"
          fontStyle={{
            fontSize: 13,
            color: "#fff",
          }}
          onTap={() => {
            console.log("onTap");
          }}
          text="Add to library"
        />
      </Tooltip.Root>
      <TouchableHighlight
        style={styles.option}
        onPress={() => setOpen((open) => !open)}
      >
        <Text style={styles.text}>Toggle: {`${open}`}</Text>
      </TouchableHighlight>
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
  root: {},
  button: {
    backgroundColor: "#333",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  text: {
    color: "#fff",
  },
  content: {
    overflow: "hidden",
    backgroundColor: "green",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  option: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});
