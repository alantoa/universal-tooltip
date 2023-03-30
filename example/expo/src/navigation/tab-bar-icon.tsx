import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import * as Tooltip from "universal-tooltip";

type TabBarIconProps = {
  color?: string;
  focused?: boolean;
  onPress?: () => void;
};
const IconButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View className="h-12 w-12 items-center justify-center">{children}</View>
  );
};

export function TabBarHomeIcon({ color, focused, onPress }: TabBarIconProps) {
  return (
    <IconButton>
      <Ionicons
        name={focused ? "home-sharp" : "home-outline"}
        size={24}
        color={color}
      />
    </IconButton>
  );
}

export function TabBarSearchIcon({ color, focused, onPress }: TabBarIconProps) {
  return (
    <IconButton>
      <Ionicons
        name={focused ? "search-sharp" : "search-outline"}
        size={24}
        color={color}
      />
    </IconButton>
  );
}

export function TabBarLikeIcon({ color, focused, onPress }: TabBarIconProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 2000);
  }, []);
  return (
    <IconButton>
      <Tooltip.Root
        disableDismissWhenTouchOutside
        {...Platform.select({
          default: {
            onDismiss: () => {
              setOpen(false);
            },
            open,
          },
        })}
      >
        <Tooltip.Trigger>
          <View>
            <Ionicons
              name={focused ? "heart-sharp" : "heart-outline"}
              size={24}
              color={color}
            />
          </View>
        </Tooltip.Trigger>
        <Tooltip.Content
          sideOffset={5}
          containerStyle={{
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 4,
            paddingBottom: 4,
          }}
          dismissDuration={500}
          side="top"
          presetAnimation="fadeIn"
          backgroundColor="#fff"
          borderRadius={12}
        >
          <Tooltip.Text
            textSize={12}
            textColor="#000"
            text="You got 12 likes"
          />
        </Tooltip.Content>
      </Tooltip.Root>
    </IconButton>
  );
}

export function TabBarProfileIcon({
  color,
  focused,
  onPress,
}: TabBarIconProps) {
  return (
    <IconButton>
      <Ionicons
        name={focused ? "person" : "person-outline"}
        size={24}
        color={color}
      />
    </IconButton>
  );
}
