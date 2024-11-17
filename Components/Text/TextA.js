import { Text } from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";

export default function TextA({ children }) {
  const [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  return <Text style={styles.texta}>{children}</Text>;
}
