import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function WarningBtn({ children }) {
  return (
    <TouchableOpacity style={[styles.btn, styles.warning]}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
