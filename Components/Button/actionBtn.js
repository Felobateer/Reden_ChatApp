import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function ActionBtn({ children }) {
  return (
    <TouchableOpacity style={[styles.btn, styles.action]}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
