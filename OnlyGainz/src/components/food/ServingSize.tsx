import { Food } from "@/Types/Meal/Food";
import { TextInput } from "react-native";

type ServingSizeProps = {
  amount: string;
  setAmount: (value: string) => void;
};

// Denne komponenten er for å redigere servingsize
export default function ServingSize({ amount, setAmount }: ServingSizeProps) {
  return (
    <TextInput
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
