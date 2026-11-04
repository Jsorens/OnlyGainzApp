import { View, TextInput, StyleSheet } from "react-native";

type searchFieldProps = {
  value: string;
  onChange: (text: string) => void;
};

export function SearchField({ value, onChange }: searchFieldProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Search..."
        placeholderTextColor="#8A8466"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 6,
  },
  input: {
    backgroundColor: "#11140D",
    borderWidth: 1,
    borderColor: "#FFC21A",
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: "#FFC21A",
    fontFamily: "monospace",
    fontSize: 14,
  },
});
