import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";

import { CreateTooltip } from "./create-tooltip";
export function LikeScreen() {
  const navigation = useNavigation<any>();
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Pressable
        onPress={() => navigation.navigate("modal")}
        className="items-center justify-center bg-gray-100 py-2 mb-10 px-4 rounded-lg"
      >
        <Text className="">Open modal</Text>
      </Pressable>

      <CreateTooltip text="Show" disableDismissWhenTouchOutside />
    </View>
  );
}
