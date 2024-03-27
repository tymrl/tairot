import React from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Text, View } from "@/components/Themed";
import { RootStackParamList } from "./navigation";

type InputScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "InputScreen">;
};

const InputScreen: React.FC<InputScreenProps> = ({ navigation }) => {
  const [userText, setUserText] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Welcome to Tairot. What are you seeking wisdom on today?
        </Text>
      </View>
      <TextInput style={styles.textInput} multiline={true} value={userText} />
      <Button
        title={"Draw a card"}
        onPress={() => navigation.navigate("TarotScreen", { userText })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "80%",
    padding: 6,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
  },
  textContainer: {
    padding: 24,
  },
  text: {
    fontSize: 16,
    overflow: "scroll",
  },
});

export default InputScreen;
