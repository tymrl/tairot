import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import InputScreen from "./InputScreen";
import TarotScreen from "./TarotScreen";
import { RootStackParamList } from "./navigation";

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InputScreen" component={InputScreen} />
      <Stack.Screen name="TarotScreen" component={TarotScreen} />
    </Stack.Navigator>
  );
};

export default App;
