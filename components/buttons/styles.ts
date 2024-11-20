import { TextStyle } from "react-native";

const styles = {
  btn: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  success: {
    backgroundColor: "green",
    color: "white",
  },
  warning: {
    backgroundColor: "yellow",
    color: "black",
  },
  delete: {
    backgroundColor: "red",
    color: "white",
  },
  action: {
    backgroundColor: "lightgray",
    color: "black",
  },
};

export default styles;
