import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";

const Footer = ({ children }) => {
  return <View style={styles.box}>{children}</View>;
};

export default Footer;
