<div align="center">
  <h1 align="center">Universal Tooltip</h1> 
  
[![npm](https://img.shields.io/npm/l/universal-tooltip?style=flat-square)](https://www.npmjs.com/package/universal-tooltip) [![expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

  <h6 align="center">Cross-platform Tooltip component for React Native, powered by expo-modules.</h6>
</div>

https://user-images.githubusercontent.com/37520667/224117002-9b316a29-b373-4ff9-8cfc-56aae493d900.mp4

## What

This is a pure and simple native tooltip component that supports fadeIn and zoomIn preset animations.

🍎 On iOS:

- This component is written in Swift and wraps [`EasyTipView`](https://github.com/teodorpatras/EasyTipView).

🤖️ On Android:

- This component is written in Kotlin and wraps the excellent library - [`Balloon`](https://github.com/skydoves/Balloon).

🌐 On Web:

- This component wraps [`@radix-ui/react-popover`](https://www.radix-ui.com/docs/primitives/components/popover) for mobile use.

- This component wraps [`@radix-ui/react-tooltip`](https://www.radix-ui.com/docs/primitives/components/popover) for desktop use.

> Please note that the @radix-ui/react-tooltip component from Radix only works on desktop, as per [this thread](https://github.com/radix-ui/primitives/issues/955#issuecomment-960610209).

## Usage

```tsx
import { useState } from "react";
import * as Tooltip from "universal-tooltip";
import { Text, View, Pressable, Platform } from "react-native";
const TriggerView = Platform.OS === "web" ? View : Pressable;

// This is because each platform has different behaviors, but you can replace the components yourself, of course.
const [open, setOpen] = useState(false);

<Tooltip.Root
  // On web, I would like to be triggered automatically with the mouse.
  {...Platform.select({
    web: {},
    default: {
      open,
      onDismiss: () => {
        console.log("onDismiss");
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
      setOpen(false);
      console.log("onTap");
    }}
    dismissDuration={500}
    disableTapToDismiss
    side="right"
    presetAnimation="fadeIn"
    backgroundColor="black"
    borderRadius={12}
  >
    <Tooltip.Text text="Some copy..." style={{ color: "#000", fontSize: 16 }} />
  </Tooltip.Content>
</Tooltip.Root>;
```

## Installation

```sh
yarn add universal-tooltip
```

### Expo

```sh
expo install universal-tooltip expo-build-properties
```

To use this component, you need to add the expo-build-properties plugin to your app.json or app.config.js and ensure that your compileSdkVersion >= 32 as required by the [Ballon lib](https://github.com/skydoves/Balloon). An example configuration might look like this:

```json
[
  "expo-build-properties",
  {
    "android": {
      "compileSdkVersion": 32,
      "targetSdkVersion": 32,
      "minSdkVersion": 23,
      "buildToolsVersion": "32.0.0",
      "kotlinVersion": "1.6.10"
    },
    "ios": {
      "deploymentTarget": "13.0"
    }
  }
]
```

## License

MIT
