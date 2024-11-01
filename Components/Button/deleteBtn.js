import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function DeleteBtn({ children }) {
  return (
    <TouchableOpacity style={[styles.btn, styles.delete]}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
