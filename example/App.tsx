import { Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabbar } from "./src/navigation/bottom-tab-bar";
import {
  TabBarHomeIcon,
  TabBarLikeIcon,
  TabBarProfileIcon,
  TabBarSearchIcon,
} from "./src/navigation/tab-bar-icon";
import { HomeScreen } from "./src/home";

StatusBar.setBarStyle("light-content");
StatusBar.setHidden(true);
const Tab = createBottomTabNavigator();

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
          name="Tooltip Example"
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
