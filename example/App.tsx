import { useState } from "react";
import * as Tooltip from "universal-tooltip";
import { StyleSheet, Text, View, Pressable, Platform } from "react-native";

const TriggerView = Platform.OS === "web" ? View : Pressable;

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Tooltip.Root
        {...Platform.select({
          web: {},
          default: {
            open,
            onDismiss: () => {
              console.log("onDismiss");
              setOpen(false);
            },
          },
        })}
      >
        <Tooltip.Trigger>
          <TriggerView
            {...Platform.select({
              web: {},
              default: {
                open,
                onPress: () => {
                  setOpen(true);
                },
              },
            })}
            style={styles.button}
          >
            <Text style={styles.text}>Hello!👋</Text>
          </TriggerView>
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
          dismissDuration={500}
          disableTapToDismiss
          side="right"
          presetAnimation="fadeIn"
          textSize={16}
          backgroundColor="black"
          fontWeight="bold"
          borderRadius={999}
          textColor="#fff"
          text="Tooltip"
        />
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
