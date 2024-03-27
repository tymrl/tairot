import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Card, createShuffledDeck, sendToChatGPT } from "@/utils";

const TabOneScreen = () => {
  const [card, setCard] = useState(createShuffledDeck()[0]);
  const [responseText, setResponseText] = useState("Loading...");

  const fetchChatGPTResponse = async (message: String) => {
    try {
      const response = await sendToChatGPT(message);
      setResponseText(response);
    } catch (error) {
      console.error("Failed to fetch response:", error);
      setResponseText("Failed to load response");
    }
  };

  useEffect(() => {
    setResponseText(
      "Drawing the Five of Wands during the new moon signifies a period of internal and external challenges that surround you, marked by conflict, competition, and the potential for creative breakthroughs. This time is ripe for growth, urging you to confront and embrace these tensions to forge resilience and innovation. It's a call to examine your internal struggles and external contests, not as barriers, but as opportunities to clarify your desires, ambitions, and paths forward. Embrace this energy to set powerful intentions for the new cycle, allowing these challenges to catalyze your evolution and guide you towards realizing your true potential."
    );
  });

  // useEffect(() => {
  //   fetchChatGPTResponse(buildCardPrompt(card));
  // }, []);

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

const buildCardPrompt = (card: Card) => {
  return `Act as a tarot card reader and interpret this tarot card: ${card.name}`;
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
  textContainer: {
    padding: 24,
  },
  text: {
    fontSize: 16,
    overflow: "scroll",
  },
});

export default TabOneScreen;
