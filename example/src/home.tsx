import { useState } from "react";
import * as Tooltip from "universal-tooltip";
import type { ContentProps } from "universal-tooltip";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  StatusBar,
  ViewStyle,
  ViewProps,
  Image,
  TouchableHighlight,
} from "react-native";

const TriggerView = Platform.OS === "web" ? View : (TouchableHighlight as any);

const RenderTooltip = ({
  side = "top",
  text,
  backgroundColor = "#fff",
  customView,
  disableDismissWhenTouchOutside,
  children,
  ...rest
}: ViewProps &
  ContentProps & {
    text: string;
    customView?: JSX.Element;
    disableDismissWhenTouchOutside?: boolean;
  }) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip.Root
      {...Platform.select({
        web: {},
        default: {
          open,
          onDismiss: () => {
            setOpen(false);
          },
        },
      })}
      delayDuration={300}
      disableDismissWhenTouchOutside={disableDismissWhenTouchOutside}
    >
      <Tooltip.Trigger>
        <TriggerView
          {...Platform.select({
            web: { open: true },
            default: {
              open,
              onPress: () => {
                setOpen(true);
              },
            },
          })}
        >
          {children ? (
            children
          ) : (
            <View className="h-8 bg-black border border-gray-100 justify-center items-center rounded-md px-2 cursor-pointer">
              <Text className="text-sm text-white">{text}</Text>
            </View>
          )}
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
          setOpen(false);
          console.log("onTap");
        }}
        dismissDuration={500}
        disableTapToDismiss
        side={side}
        presetAnimation="fadeIn"
        backgroundColor={backgroundColor}
        borderRadius={999}
        {...rest}
      >
        {customView ? (
          customView
        ) : (
          <Tooltip.Text text="Tooltip" textColor="#000" />
        )}
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export function HomeScreen() {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <View className="flex-1 px-4 max-w-md w-full">
        <View className="flex-row flex-wrap mt-28">
          <View className="absolute left-0 top-12">
            <RenderTooltip
              text="Show in right"
              disableDismissWhenTouchOutside
              side="right"
            />
          </View>
          <View className="absolute right-8">
            <RenderTooltip
              text="Show in left"
              disableDismissWhenTouchOutside
              side="left"
            />
          </View>
          <View className="absolute left-4 top-32">
            <RenderTooltip
              text="Show in top"
              disableDismissWhenTouchOutside
              side="top"
            />
          </View>
          <View className="absolute left-36 top-28">
            <RenderTooltip
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
                    <Text className="text-gray-900 font-bold text-xs">
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
            </RenderTooltip>
          </View>
          <View className="absolute right-0 top-28">
            <RenderTooltip
              text="Show in bottom"
              disableDismissWhenTouchOutside
              side="bottom"
            />
          </View>
          <View className="absolute left-20 top-48">
            <RenderTooltip
              text="Zoom in"
              disableDismissWhenTouchOutside
              side="bottom"
              presetAnimation="zoomIn"
            />
          </View>
          <View className="absolute left-56 top-56">
            <RenderTooltip
              text="None"
              disableDismissWhenTouchOutside
              side="bottom"
              presetAnimation="none"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
