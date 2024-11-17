import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function SuccessBtn({ children }) {
  return (
    <TouchableOpacity style={[styles.btn, styles.success]}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
