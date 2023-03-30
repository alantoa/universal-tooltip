import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
// import * as Tooltip from "universal-tooltip";
export function ModalScreen() {
  const [open, setOpen] = useState(false);

  return (
    <View className="flex-1 bg-gray-300">
      <Text className="font-bold text-white text-lg">Modal Screeen</Text>
    </View>
  );
}
