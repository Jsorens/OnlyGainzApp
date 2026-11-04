import { Food } from "@/features/food/types/Food";
import { TextInput } from "react-native";

type ServingSizeProps = {
  amount: string;
  setAmount: (value: string) => void;
};

// Denne komponenten er for å redigere servingsize
export default function ServingSize({ amount, setAmount }: ServingSizeProps) {
  return (
    <TextInput
      style={{
        borderWidth: 1,
        borderColor: "#FFC21A",
        padding: 8,
        color: "#FFC21A",
        fontFamily: "monospace",
      }}
      value={amount}
      keyboardType="decimal-pad"
      onChangeText={(value) => {
        const normalized = value.replace(",", ".");

        if (/^\d*\.?\d*$/.test(normalized)) {
          setAmount(normalized);
        }
      }}
    />
  );
}
