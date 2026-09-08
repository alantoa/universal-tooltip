# Changelog

## 3.0.1

### Fixed

- **A `left` or `right` popup with no room beside its trigger is no longer
  placed off the display.** A bubble wider than the space on either side used
  to be put where it was asked to go and clipped — on iOS by up to a few
  hundred points, on Android flush against the edge with nothing to spare.
  Both platforms now fall back to `bottom` or `top` in that case, after trying
  the opposite side, and the arrow points at the trigger from wherever the
  bubble lands.

  Android had no room check at all before this — `side` mapped straight onto
  Balloon's `showAlignEnd`/`showAlignStart` — and horizontal sides opted out of
  the edge margin that slides a popup inward, which is what left the bubble
  flush against the display.

Nothing about the API changed.

## 3.0.0

Toasts were rebuilt: they stack, they animate on the UI thread, and on iOS the
viewport can own a window so a toast raised from a `Modal` is drawn over it.

### Breaking

- **Reanimated and Gesture Handler are now peer dependencies.** Only `Toast`
  needs them — the anchored popups still animate natively — but they have to be
  installed, and Gesture Handler needs `GestureHandlerRootView` at the root of
  the app:

  ```sh
  npx expo install react-native-reanimated react-native-gesture-handler
  ```

- `Toast.Provider`'s `limit` now defaults to `Infinity` instead of `1`. Nothing
  is held back: a burst of toasts stacks rather than queueing one behind
  another. Pass `limit={1}` for the old behaviour.
- `Toast.Viewport` fills its parent instead of hugging its toasts, and the edge
  spacing moved onto each toast. Padding in the viewport's `style` no longer
  insets them — use `insets`.
- Toasts are absolutely positioned and overlap, so they no longer share a
  column and `gap` no longer applies.
- `Toast.Root`'s `presetAnimation` defaults to `"spring"` (was `"slide"`), and
  `animationDuration` now sets the exit alone, defaulting to `160` (was `220`).
  The entrance is a spring and has no duration.

### Added

- **A stack.** The newest toast sits in front; each one behind peeks
  `stackPeek` past it and is `stackScaleStep` smaller. `maxVisible` (3) of them
  show, and a deeper one fades out in the last slot rather than climbing
  further up the screen.
- **`demotedTimeout`** (2 s): a toast that a newer one pushes back has its
  countdown capped, so the back of the stack clears instead of making you wait
  out every timeout.
- **`presentation="window"`** on `Toast.Viewport` — **iOS only**. The viewport
  renders in an overlay on the window, so a toast is not clipped by an ancestor
  and is raised above an open `Modal`.
- **A viewport inside a `Modal` takes over while it is open**, and the one at
  the root of the app takes back over when it closes. This is the only way to
  get a toast in front of a `Modal` on Android, whose modal is a `Dialog` with
  a window of its own. A viewport that owns a window outranks an inline one, so
  the same JSX is correct on both platforms.
- **Swipe to dismiss on two axes**: sideways in either direction, or toward the
  toast's own edge. Dragging away from that edge resists instead of following.
  Only the front toast takes the gesture.
- **`expandable`** on `Toast.Viewport` — a tap opens the stack out into a list.
  **Experimental**: off by default, and verified on neither platform. On
  Android a tap has been seen to clear the stack rather than open it. Drive
  `expanded` yourself if you need this today.
- Countdowns pause while a toast is touched, dragged or hovered, and while the
  app is in the background.
- `createToastManager` lives in its own module, so the scheduler can be used
  and tested without pulling in react-native.

## 2.0.0

### Breaking

- **Renamed to `poppo`.** `universal-tooltip@2` is a shim that re-exports it
  and is deprecated; change the import path and nothing else. Every native
  identifier still says `UniversalTooltip`, which is deliberate and not
  user-visible.

### Added

- `Toast`: an imperative toast manager with a visible `limit`, an `overflow`
  policy (`"queue"` or `"replace"`), one-toast-per-id de-duplication, and
  countdowns that can be paused.
- `Toast.Viewport`'s `insets`, for the safe area or a tab bar the library has
  no business knowing about.

---

Releases before 2.0.0 were published as
[`universal-tooltip`](https://www.npmjs.com/package/universal-tooltip).
