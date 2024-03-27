import React, { useState, useEffect } from "react";
import { Button, Image, ScrollView, StyleSheet, TextInput } from "react-native";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

import { Text, View } from "@/components/Themed";
import { Card, createShuffledDeck, sendToChatGPT } from "@/utils";

type RootStackParamList = {
  InputScreen: undefined;
  TarotScreen: { userText: string };
};

const Stack = createStackNavigator<RootStackParamList>();

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

type TarotScreenProps = {
  route: RouteProp<RootStackParamList, "TarotScreen">;
};

const TarotScreen: React.FC<TarotScreenProps> = ({ route }) => {
  const [card, setCard] = useState(createShuffledDeck()[0]);
  const [responseText, setResponseText] = useState("Loading...");

  const buildCardPrompt = (card: Card) => {
    return `Act as a tarot card reader and interpret this tarot card: ${card.name}. Interpet it in the following context, as specified by the querent: ${route.params.userText}`;
  };

  const fetchChatGPTResponse = async (message: String) => {
    try {
      const response = await sendToChatGPT(message);
      setResponseText(response);
    } catch (error) {
      console.error("Failed to fetch response:", error);
      setResponseText("Failed to load response");
    }
  };

  // useEffect(() => {
  //   setResponseText(
  //     "Drawing the Five of Wands during the new moon signifies a period of internal and external challenges that surround you, marked by conflict, competition, and the potential for creative breakthroughs. This time is ripe for growth, urging you to confront and embrace these tensions to forge resilience and innovation. It's a call to examine your internal struggles and external contests, not as barriers, but as opportunities to clarify your desires, ambitions, and paths forward. Embrace this energy to set powerful intentions for the new cycle, allowing these challenges to catalyze your evolution and guide you towards realizing your true potential."
  //   );
  // });

  useEffect(() => {
    fetchChatGPTResponse(buildCardPrompt(card));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨{card.name}✨</Text>
      <Image
        source={{ uri: card.imageUrl }}
        style={{ width: 240, height: 422 }}
      />
      <ScrollView style={styles.textContainer}>
        <Text style={styles.text}>{responseText}</Text>
      </ScrollView>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="InputScreen" component={InputScreen} />
        <Stack.Screen name="TarotScreen" component={TarotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    padding: 12,
    fontWeight: "bold",
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

export default App;
