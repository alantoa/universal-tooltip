import { Text, View, Image,ScrollView } from "react-native";

import { CreateTooltip } from "./create-tooltip";

export function HomeScreen() {
  return (
    <ScrollView>
    <View className="h-[140vh] bg-black items-center justify-center">
        <View className="flex-1 px-4 max-w-md w-full">
        <View className="flex-row flex-wrap mt-28">
          <View className="absolute left-20 -top-2">
            <CreateTooltip
              title="Long text tooltip"
              text="A very long long long long long text tooltip"
              disableDismissWhenTouchOutside
              side="top"
              maxWidth={200}
            />
          </View>
          <View className="absolute left-0 top-12">
            <CreateTooltip
              text="Show in right"
              disableDismissWhenTouchOutside
              side="right"
            />
          </View>
          <View className="absolute right-8">
            <CreateTooltip
              text="Show in left"
              disableDismissWhenTouchOutside
              side="left"
            />
          </View>
          <View className="absolute left-4 top-32">
            <CreateTooltip
              text="Show in top"
              disableDismissWhenTouchOutside
              side="top"
            />
          </View>
          <View className="absolute left-36 top-28">
            <CreateTooltip
              text="Custom view"
              backgroundColor="rgba(31,41,55,1)"
              customView={
                <View className="bg-gray-800 rounded-md px-2 py-2 w-56 h-40">
                  <Image
                    source={{
                      uri: "https://pbs.twimg.com/profile_images/1507747390790377479/F9abCIUR_400x400.jpg",
                    }}
                    className="w-12 h-12 rounded-full"
                  />
                  <View className="absolute right-2 bg-gray-100 px-4 py-2 top-2 rounded-full">
                    <Text
                      onPress={() => {
                        console.log(123);
                      }}
                      className="text-gray-900 font-bold text-xs"
                    >
                      Follow
                    </Text>
                  </View>
                  <View className="px-2 mt-1">
                    <Text className="text-gray-100 font-bold text-sm">
                      Alan
                    </Text>
                    <Text className="text-gray-400 font-bold text-xs">
                      @alantoa
                    </Text>
                    <Text className="text-gray-100 font-bold text-md mt-2">
                      software engineer https://github.com/alantoa
                    </Text>
                  </View>
                </View>
              }
              side="bottom"
            >
              <View className="border border-gray-600 rounded-full">
                <Image
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/1507747390790377479/F9abCIUR_400x400.jpg",
                  }}
                  className="w-12 h-12 rounded-full"
                />
              </View>
            </CreateTooltip>
          </View>
          <View className="absolute right-0 top-28">
            <CreateTooltip
              text="Show in bottom"
              disableDismissWhenTouchOutside
              side="bottom"
            />
          </View>
          <View className="absolute left-20 top-48">
            <CreateTooltip
              text="Zoom in"
              disableDismissWhenTouchOutside
              side="bottom"
              presetAnimation="zoomIn"
            />
          </View>
          <View className="absolute left-56 top-56">
            <CreateTooltip
              text="None"
              disableDismissWhenTouchOutside
              side="bottom"
              presetAnimation="none"
            />
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}
