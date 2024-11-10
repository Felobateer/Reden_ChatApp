import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";

const AuthBox = ({ children }) => {
  return <View style={styles.box}>{children}</View>;
};

export default AuthBox;
