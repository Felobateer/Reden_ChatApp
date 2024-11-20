import React from "react";
import { TouchableHighlight } from "react-native";
import { TextB } from "../texts";
import styles from "./styles";

export default function ActionB({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableHighlight style={styles.action} onPress={onPress}>
      <TextB>{title}</TextB>
    </TouchableHighlight>
  );
}
