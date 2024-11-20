import React from "react";
import { View, TextInput } from "react-native";
import { TextA } from "@/components/texts";
import { Input } from "./inputInterface";

interface InputAProps {
  inputValue: Input; // Correctly define the props using the Input interface
}

export default function InputA({ inputValue }: InputAProps) {
  return (
    <View>
      <TextA>{inputValue.label}</TextA>
      <TextInput
        placeholder={inputValue.placeholder}
        value={inputValue.value}
        onChangeText={() => inputValue.onChangeText}
        keyboardType={inputValue.keyboardType}
        secureTextEntry={inputValue.secureTextEntry}
      />
    </View>
  );
}
