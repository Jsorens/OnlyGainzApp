import { Image, StyleSheet } from "react-native";

const logo = require("@/assets/images/png/logo.png");

type LogoProps = {
  width?: number;
  height?: number;
};

export default function Logo({ width = 120, height = 120 }: LogoProps) {
  const styles = StyleSheet.create({
    logo: {
      width: width,
      height: height,
      alignSelf: "center",
    },
  });

  return (
    <Image
      source={logo}
      style={styles.logo}
      resizeMode="contain"
      accessibilityLabel="OnlyGainz Logo"
    />
  );
}
