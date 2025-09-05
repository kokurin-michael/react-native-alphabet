# @kokurin/react-native-alphabet

<p align="center">
  <img src="./example.gif" alt="Example demo" width="300"/>
</p>

Fast alphabet index bar for React Native (iOS/Android) — like the iOS Contacts sidebar.
Lets users quickly jump through long lists by tapping or sliding across letters.
Fully typed with TypeScript and powered by `react-native-gesture-handler` + `react-native-reanimated`.

---

## ✨ Features
- Tap or slide (pan) across letters to select
- Works with **any symbols**, not only A–Z (e.g. Cyrillic, custom buckets)
- Smooth and responsive (Gesture Handler + Reanimated)
- Customizable styles for container, item, and text
- Minimal API: you provide letters and handle `onCharSelect`

## 📦 Installation

```bash
# with yarn
yarn add @kokurin/react-native-alphabet react-native-gesture-handler react-native-reanimated

# with npm
npm i @kokurin/react-native-alphabet react-native-gesture-handler react-native-reanimated
```

### Reanimated setup
Make sure you have the Reanimated Babel plugin:

```js
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated'],
};
```

### Gesture Handler setup
Wrap your app with `GestureHandlerRootView` (usually in your root component):

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* your app */}
    </GestureHandlerRootView>
  );
}
```

> See the official docs for any platform-specific steps.

---

## 🚀 Usage

```tsx
import React, { useMemo, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';
import Alphabet from '@kokurin/react-native-alphabet';

const LETTERS = ['#','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

export default function ContactsScreen() {
  const listRef = useRef<FlatList<string>>(null);
  const data = useMemo(() => /* your items */ [] as string[], []);

  const indexOfLetter = (ch: string) => {
    // map letter -> first item index in your list
    // implement your own logic
    return 0;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item, i) => `${item}-${i}`}
        renderItem={({ item }) => <Text style={{ padding: 16 }}>{item}</Text>}
      />

      <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
        <Alphabet
          data={LETTERS}
          onCharSelect={(ch) => {
            const idx = indexOfLetter(ch);
            if (idx >= 0) {
              listRef.current?.scrollToIndex({ index: idx, animated: true });
            }
          }}
          hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
          containerStyle={{ paddingVertical: 8, paddingHorizontal: 6 }}
          charContainerStyle={{ paddingVertical: 2, alignItems: 'center' }}
          charStyle={{ fontSize: 11, fontWeight: '600', opacity: 0.8 }}
        />
      </View>
    </View>
  );
}
```

---

## 📚 API

### `Alphabet` props

| Prop                 | Type                                                                 | Default | Description |
|----------------------|----------------------------------------------------------------------|---------|-------------|
| `data`               | `string[]`                                                            | `[]`    | Letters/symbols to render in the index bar. Can be any set (A–Z, А–Я, custom).
| `onCharSelect`       | `(char: string) => void`                                              | `-`     | Called when user taps or slides to a new character.
| `hitSlop`            | `number \| { top?: number; bottom?: number; left?: number; right?: number }` | `undefined` | Expands touch/gesture area for better ergonomics (applies to Tap, and can be shared with Pan).
| `containerStyle`     | `StyleProp<ViewStyle>`                                                | `undefined` | Style for the outer vertical container.
| `charContainerStyle` | `StyleProp<ViewStyle>`                                                | `undefined` | Style for each character container (useful for spacing/alignment).
| `charStyle`          | `StyleProp<TextStyle>`                                                | `undefined` | Style for the character text.

#### Notes
- **Gestures**: Component uses `Gesture.Tap()` and `Gesture.Pan()` under the hood. Sliding across the bar invokes `onCharSelect` only when the letter changes.
- **Bounds**: Y-coordinate is clamped to the container height, so selection is stable at edges.
- **Performance**: Minimal re-renders; work is delegated to the gesture handler; ideal for long lists.

---

## 🧪 Example app
This repo includes an `example/` app showcasing usage. Run it with your favorite RN workflow.

---

## 🔧 Requirements
- React Native `>= 0.72` (tested on 0.79)
- `react-native-gesture-handler >= 2.0.0`
- `react-native-reanimated >= 3.0.0`

---

## 📄 License
[MIT](./LICENSE)
