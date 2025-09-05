import { useCallback, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import type { AlphabetProps } from './types';

const Alphabet = (props: AlphabetProps) => {
  const ref = useRef<View | null>(null);
  const height = useRef(1);
  const lastIndexRef = useRef(-1);

  const handle = useCallback(
    (localY: number) => {
      const data = props.data;
      const length = data?.length ?? 0;
      if (!data || length === 0) return;

      const yRel = Math.max(0, Math.min(height.current, localY));
      const itemH = height.current / length;
      const idx = Math.max(0, Math.min(length - 1, Math.floor(yRel / itemH)));

      if (idx !== lastIndexRef.current) {
        lastIndexRef.current = idx;
        props.onCharSelect?.(data[idx]!);
      }
    },
    [props]
  );

  const tap = useMemo(
    () =>
      Gesture.Tap()
        .hitSlop(props.hitSlop)
        .onEnd((e) => {
          runOnJS(handle)(e.y);
        }),
    [handle, props.hitSlop]
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(4)
        .onChange((e) => {
          runOnJS(handle)(e.y);
        })
        .onFinalize(() => {
          lastIndexRef.current = -1;
        }),
    [handle]
  );

  const gesture = useMemo(() => Gesture.Race(tap, pan), [tap, pan]);

  return (
    <GestureDetector gesture={gesture}>
      <View
        ref={ref}
        style={props.containerStyle}
        onLayout={(e) => {
          height.current = e.nativeEvent.layout.height;
        }}
      >
        {props.data?.map((letter) => (
          <View key={letter} style={props.charContainerStyle}>
            <Text style={props.charStyle}>{letter}</Text>
          </View>
        ))}
      </View>
    </GestureDetector>
  );
};

export default Alphabet;
