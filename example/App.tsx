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
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerBackgroundContainerStyle: {
            backgroundColor: "#000",
          },
          headerBackground: () => {
            return null;
          },
          headerTintColor: "#fff",
        }}
        tabBar={(props) => <BottomTabbar {...props} />}
      >
        <Tab.Screen
          name="Feed"
          options={{
            tabBarIcon: TabBarHomeIcon,
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Search"
          options={{
            tabBarIcon: TabBarSearchIcon,
          }}
          component={SearchScreen}
        />
        <Tab.Screen
          name="Like"
          options={{
            tabBarIcon: TabBarLikeIcon,
          }}
          component={LikeScreen}
        />

        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: TabBarProfileIcon,
          }}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
