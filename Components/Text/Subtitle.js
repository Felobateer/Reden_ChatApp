import { Text } from "react-native";
import styles from "./styles";

export default function Subtitle({ children }) {
  return <Text style={styles.subtitle}>{children}</Text>;
}
