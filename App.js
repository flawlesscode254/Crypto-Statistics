import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AdMobInterstitial } from "expo-ads-admob";

import AppStack from "./stacks/AppStack";

export default function App() {
  const interstitialID = Platform.select({
    android: "ca-app-pub-1575625881370911/1758780552",
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
