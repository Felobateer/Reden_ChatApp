import { Keyboard, View } from "react-native";
import { useState } from "react";

import { InputA } from "@/components/inputs";
import { ActionA, ActionB } from "@/components/buttons";

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Function to handle text changes for each field
  const handleChange = (field: string, value: string) => {
    setCredentials((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const credentialsProps = [
    {
      label: "Email",
      placeholder: "john@example.com",
      value: credentials.email,
      onChangeText: (value: string) => handleChange("email", value),
      keyboardType: "email-address",
      secureTextEntry: false,
      errorMessage: "",
    },
    {
      label: "Password",
      placeholder: "***********",
      value: credentials.password,
      onChangeText: (value: string) => handleChange("password", value),
      keyboardType: "default",
      secureTextEntry: true,
      errorMessage: "",
    },
  ];

  const handleBtn = () => {
    console.log("button clicked");
  };

  return (
    <View>
      <InputA inputValue={credentialsProps[0]} />
      <InputA inputValue={credentialsProps[1]} />
      <ActionA title="Login" onPress={handleBtn} />
      <ActionB title="signin with Google" onPress={handleBtn} />
    </View>
  );
}
