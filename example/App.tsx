import { useState } from "react";
import * as Tooltip from "universal-tooltip";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default function App() {
  const [open, setOpen] = useState(true);
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
          containerStyle={{
            paddingTop: 8,
            paddingRight: 10,
            paddingBottom: 8,
            paddingLeft: 10,
          }}
          sideOffset={5}
          side="right"
          presetAnimation="fadeIn"
          textSize={13}
          backgroundColor="#000"
          borderRadius={999}
          textColor="#fff"
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

  option: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});
