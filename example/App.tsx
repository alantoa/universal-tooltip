import { useState } from "react";
import * as Tooltip from "universal-tooltip";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from "react-native";

export default function App() {
  const [open, setOpen] = useState(true);
  return (
    <View style={styles.container}>
      <Tooltip.Root
        onDismiss={() => {
          console.log("onDismiss");
        }}
        style={styles.root}
      >
        <Tooltip.Trigger>
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
          backgroundColor="rgba(0,0,0,.6)"
          borderRadius={20}
          textColor="#fff"
          fontWeight="bold"
          onTap={() => {
            console.log("onTap");
          }}
          text="Add to library"
        />
      </Tooltip.Root>
      {/* <TouchableHighlight
          style={styles.option}
          onPress={() => setOpen((open) => !open)}
        >
          <Text style={styles.text}>Toggle: {`${open}`}</Text>
        </TouchableHighlight> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e1e1",
    alignItems: "center",
    justifyContent: "center",
    height: 700,
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
