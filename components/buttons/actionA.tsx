import React from "react";
import { TouchableOpacity } from "react-native";
import { TextB } from "../texts";
import styles from "./styles";

export default function ActionA({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress}>
      <TextB>{title}</TextB>
    </TouchableOpacity>
  );
}
