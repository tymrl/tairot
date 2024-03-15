import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { createShuffledDeck } from "@/utils";
import { OPENAI_API_KEY } from "@env";

const TabOneScreen = () => {
  const [card, setCard] = useState(createShuffledDeck()[0]);
  const [responseText, setResponseText] = useState("Loading...");

  // useEffect(() => {
  //   setResponseText(
  //     "Drawing the Five of Wands during the new moon signifies a period of internal and external challenges that surround you, marked by conflict, competition, and the potential for creative breakthroughs. This time is ripe for growth, urging you to confront and embrace these tensions to forge resilience and innovation. It's a call to examine your internal struggles and external contests, not as barriers, but as opportunities to clarify your desires, ambitions, and paths forward. Embrace this energy to set powerful intentions for the new cycle, allowing these challenges to catalyze your evolution and guide you towards realizing your true potential."
  //   );
  // });

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
    fetchChatGPTResponse(card.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨{card.name}✨</Text>
      <Image
        source={{ uri: card.imageUrl }}
        style={{ width: 240, height: 422 }}
      />
      <ScrollView>
        <Text style={styles.text}>{responseText}</Text>
      </ScrollView>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
};

const sendToChatGPT = async (message: String) => {
  const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error contacting OpenAI:", error);
    throw error;
  }
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text: {
    fontSize: 16,
    overflow: "scroll",
  },
});

export default TabOneScreen;
