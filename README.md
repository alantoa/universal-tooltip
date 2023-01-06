<div align="center">
  <h1 align="center">Universal Tooltip</h1>

[![npm](https://img.shields.io/npm/l/universal-tooltip?style=flat-square)](https://www.npmjs.com/package/universal-tooltip) [![expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

  <h6 align="center">Cross-platform Tooltip compoent for React Native, power by expo-modules.</h6>
</div>

## What

This is a pure and simple tooltip component and support `fadeIn` and `zoomIn` preset animations

🍎 On iOS:

- using Swift and forked from [`EasyTipView`](https://github.com/teodorpatras/EasyTipView).

🤖️ On Android:

- using Kotlin and warp a great lib - [`Balloon`](https://github.com/skydoves/Balloon).

🌐 On Web:

- warp [`@radix-ui/react-popover`](https://www.radix-ui.com/docs/primitives/components/popover) on mobile.

- warp [`@radix-ui/react-tooltip`](https://www.radix-ui.com/docs/primitives/components/popover) on desktop.

_Why should I differentiate between mobile and desktop?_

> because Radix tooltip is only work on desktop and it's by design, you can check [this thread](https://github.com/radix-ui/primitives/issues/955#issuecomment-960610209).

## Todo

- [ ] support custom view on Android.
- [ ] support more props if anyone want it.

## Usage

```tsx
import { useState } from "react";
import * as Tooltip from "universal-tooltip";
import { Text, View, Pressable, Platform } from "react-native";
const TriggerView = Platform.OS === "web" ? View : Pressable;

// this is because each platform has different behavior, ofc you can replace components yourself.
const [open, setOpen] = useState(false);
<Tooltip.Root
  // on web: I want to be triggered automatically with the mouse.
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
      console.log("onTap");
    }}
    dismissDuration={500}
    disableTapToDismiss
    side="right"
    presetAnimation="fadeIn"
    textSize={16}
    backgroundColor="black"
    fontWeight="bold"
    borderRadius={12}
    textColor="#fff"
    text="Some copy..."
  />
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

Add the `expo-build-properties` plugin to your `app.json`/`app.config.js`, and make sure your `compileSdkVersion >= 32` because [Ballon lib](https://github.com/skydoves/Balloon) require this.
just like this:

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

## Props

...

and more docs will coming...
