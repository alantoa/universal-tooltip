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
      >
        <Tooltip.Trigger asChild>
          <View style={styles.button}>
            <Text style={styles.text}>Hello!👋</Text>
          </View>
        </Tooltip.Trigger>
        <Tooltip.Content
          sideOffset={3}
          containerStyle={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
          }}
          onTap={() => {
            console.log("onTap");
          }}
          side="right"
          presetAnimation="fadeIn"
          textSize={16}
          backgroundColor="black"
          fontWeight="bold"
          borderRadius={999}
          textColor="#fff"
          text="Save on Spotify to collect"
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
