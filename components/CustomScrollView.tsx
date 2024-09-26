import { StyleSheet } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

import { useThemeColor } from "@/hooks/useThemeColor";

export default function CustomScrollView({
  contentContainerStyle,
  ...rest
}: KeyboardAwareScrollViewProps) {
  const backgroundColor = useThemeColor({}, "background");

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingBottom: 20,
      backgroundColor: backgroundColor,
    },
  });

  return (
    <KeyboardAwareScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      {...rest}
    />
  );
}
