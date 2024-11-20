import { Text } from "react-native";
import styles from "./styles";

interface TextCProps {
  children: React.ReactNode;
}

export default function TextC({ children }: TextCProps) {
  return <Text style={styles.textc}>{children}</Text>;
}
