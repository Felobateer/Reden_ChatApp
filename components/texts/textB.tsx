import { Text } from "react-native";
import styles from "./styles";

interface TextBProps {
  children: React.ReactNode;
}

export default function TextB({ children }: TextBProps) {
  return <Text style={styles.textb}>{children}</Text>;
}
