import { useState } from "react";
import {
  Text,
  View,
  Platform,
  ViewProps,
  TouchableHighlight,
} from "react-native";
import * as Tooltip from "universal-tooltip";
import type { ContentProps } from "universal-tooltip";

const TriggerView = Platform.OS === "web" ? View : (TouchableHighlight as any);

export const CreateTooltip = ({
  side = "top",
  text,
  backgroundColor = "#fff",
  customView,
  disableDismissWhenTouchOutside,
  children,
  title,
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
              <Text className="text-sm text-white">{title ?? text}</Text>
            </View>
          )}
        </TriggerView>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          sideOffset={3}
          containerStyle={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
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
          borderRadius={12}
          {...rest}
        >
          {customView ? (
            customView
          ) : (
            <Tooltip.Text
              text={text}
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#020202",
                fontFamily: "Roboto",
              }}
            />
          )}
          <Tooltip.Arrow
            width={10}
            height={5}
            backgroundColor={backgroundColor}
          />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};
