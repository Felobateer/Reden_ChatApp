import React from "react";
import { TouchableOpacity } from "react-native";
import { TextB } from "../texts";
import styles from "./styles";

export default function EditBtn({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.warning} onPress={onPress}>
      <TextB>{title}</TextB>
    </TouchableOpacity>
  );
}
