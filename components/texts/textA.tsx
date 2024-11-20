import { Text } from "react-native";
import styles from "./styles";

interface TextAProps {
  children: React.ReactNode;
}

export default function TextA({ children }: TextAProps) {
  return <Text style={styles.texta}>{children}</Text>;
}
