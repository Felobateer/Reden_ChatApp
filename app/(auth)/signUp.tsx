import { Keyboard, View } from "react-native";
import { useState } from "react";

import { InputA } from "@/components/inputs";
import { ActionA } from "@/components/buttons";

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    bio: "",
  });

  const handleChange = (field: string, value: string) => {
    setNewUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const newUserProps = [
    {
      label: "First Name",
      placeholder: "John",
      value: newUser.firstName,
      onChangeText: (value: string) => handleChange("firstName", value),
      keyboardType: "default",
      secureTextEntry: false,
      errorMessage: "",
    },
    {
      label: "Last Name",
      placeholder: "Smith",
      value: newUser.lastName,
      onChangeText: (value: string) => handleChange("lastName", value),
      keyboardType: "default",
      secureTextEntry: false,
      errorMessage: "",
    },
    {
      label: "Email",
      placeholder: "john@example.com",
      value: newUser.email,
      onChangeText: (value: string) => handleChange("email", value),
      keyboardType: "email-address",
      secureTextEntry: false,
      errorMessage: "",
    },
    {
      label: "Password",
      placeholder: "******",
      value: newUser.password,
      onChangeText: (value: string) => handleChange("password", value),
      keyboardType: "default",
      secureTextEntry: false,
      errorMessage: "",
    },
    {
      label: "Confirm Password",
      placeholder: "******",
      value: newUser.confirmPassword,
      onChangeText: (value: string) => handleChange("confirmPassword", value),
      keyboardType: "default",
      secureTextEntry: false,
      errorMessage: "",
    },
    {
      label: "Bio",
      placeholder: "Hi, I am using Reden now",
      value: newUser.bio,
      onChangeText: (value: string) => handleChange("bio", value),
      keyboardType: "default",
      secureTextEntry: false,
      errorMessage: "",
    },
  ];

  const handleBtn = () => {
    console.log("button Clicked");
  };

  return (
    <View>
      <View>
        {newUserProps.map((prop, index) => {
          return <InputA inputValue={prop} key={index} />;
        })}
      </View>

      <View>
        <ActionA title="Cancel" onPress={handleBtn} />
        <ActionA title="Submit" onPress={handleBtn} />
      </View>
    </View>
  );
}
