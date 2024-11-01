import { Text } from "react-native";
import styles from "./styles";

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}
