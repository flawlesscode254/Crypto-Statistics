import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import CoinExchangesScreen from "../screens/CoinExchangesScreen";
import CryptoCoinsScreen from "../screens/CryptoCoinsScreen";
import BlockChainScreen from "../screens/BlockChainScreen";
import SettingsScreen from "../screens/SettingsScreen";

const MainStack = () => {
  const Tab = createBottomTabNavigator();
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = "swap-horizontal";
      switch (route.name) {
        case "Crypto Exchanges":
          iconName = "swap-horizontal";
          break;
        case "Crypto Coins":
          iconName = "analytics";
          break;
        case "Block Chain":
          iconName = "business";
          break;
        case "Settings":
          iconName = "settings";
          break;

        default:
          iconName = "swap-horizontal";
      }

      return (
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? "#000000" : "#ccc8c8"}
        />
      );
    },
    tabBarStyle: [
      {
        display: "flex",
      },
      null,
    ],
    headerStyle: {
      backgroundColor: "#070145",
    },
    headerTitleStyle: {
      color: "#FFFFFF",
    },
  });
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Coin Exchanges" component={CoinExchangesScreen} />
      <Tab.Screen name="Crypto Coins" component={CryptoCoinsScreen} />
      <Tab.Screen name="Block Chain" component={BlockChainScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainStack;
