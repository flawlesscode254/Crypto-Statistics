import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AdMobInterstitial } from "expo-ads-admob";

import AppStack from "./stacks/AppStack";

export default function App() {
  const interstitialID = Platform.select({
    android: "ca-app-pub-3940256099942544/1033173712",
  });

  useEffect(() => {
    AdMobInterstitial.setAdUnitID(interstitialID)
      .then(() => AdMobInterstitial.requestAdAsync())
      .then(() => AdMobInterstitial.showAdAsync());
  }, []);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <AppStack />
    </NavigationContainer>
  );
}
