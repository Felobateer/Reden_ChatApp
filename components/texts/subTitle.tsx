import { Text } from "react-native";
import styles from "./styles";

interface SubTitleProps {
  children: React.ReactNode;
}

export default function SubTitle({ children }: SubTitleProps) {
  return <Text style={styles.subtitle}>{children}</Text>;
}
