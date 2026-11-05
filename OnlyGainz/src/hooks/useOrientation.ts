import { useWindowDimensions } from "react-native";

/**
 * Returns layout info based on the current window size.
 * Uses window size (not the device sensor) so it also works on iPad
 * split view / resizable windows, where the orientation API can be unreliable.
 */
export function useOrientation() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return { isLandscape, isPortrait: !isLandscape, width, height };
}
