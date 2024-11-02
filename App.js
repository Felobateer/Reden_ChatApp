import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Title, Subtitle, TextA, TextB } from "./Components/Text";
import {
  ActionBtn,
  SuccessBtn,
  WarningBtn,
  DeleteBtn,
} from "./Components/Button";

export default function App() {
  return (
    <View style={styles.container}>
      <Title children={"Reden"} />
      <Subtitle children={"a chat app designed for German"} />
      <TextA children={"From Philip Saadalla"} />
      <TextB children={"built in 2024"} />
      <ActionBtn children={"action"} />
      <SuccessBtn children={"add"} />
      <WarningBtn children={"edit"} />
      <DeleteBtn children={"delete"} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
