import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const BottomTabbar = ({
  navigation,
  state,
  descriptors,
}: BottomTabBarProps) => {
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        height: 64 + safeAreaBottom,
      }}
      className="bg-black overflow-hidden w-full bottom-0 absolute"
    >
      <View className="flex-row bg-transparent pt-2">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate({
                name: route.name,
                merge: true,
                params: route.params,
              });
            }
          };
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          return (
            <View
              key={route.key}
              className="flex flex-1 items-center justify-center"
            >
              <Pressable
                className="flex-1"
                onLongPress={onLongPress}
                onPress={onPress}
              >
                {options.tabBarIcon?.({ focused, color: "#fff", size: 24 })}
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};
