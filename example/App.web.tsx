import { useState } from "react";
import * as Tooltip from "universal-tooltip";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabbar } from "./src/navigation/bottom-tab-bar";
import {
  TabBarHomeIcon,
  TabBarLikeIcon,
  TabBarProfileIcon,
  TabBarSearchIcon,
} from "./src/navigation/tab-bar-icon";
import "./dist/output.css";
StatusBar.setBarStyle("light-content");

const Tab = createBottomTabNavigator();
const TriggerView = Platform.OS === "web" ? View : Pressable;

function HomeScreen() {
  const [open, setOpen] = useState(false);
  return (
    <View className="flex-1 items-center justify-center bg-black">
      {/* <Tooltip.Root
        {...Platform.select({
          web: {},
          default: {
            open,
            onDismiss: () => {
              console.log("onDismiss HomeScreen");
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
          >
            <Text>Hello!👋</Text>
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
      </Tooltip.Root> */}
    </View>
  );
}
function SearchScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text>Settings!</Text>
    </View>
  );
}
function LikeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text>Settings!</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text>Settings!</Text>
    </View>
  );
}

export default function App() {
  return (
    <div className="flex flex-row w-full justify-end items-center">
      <div className="flex-row">
        <TabBarHomeIcon />
        <TabBarSearchIcon />
        <TabBarLikeIcon />
        <TabBarProfileIcon />
      </div>
    </div>
  );
}
