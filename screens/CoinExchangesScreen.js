import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";

import CoinExchangesCard from "../componets/CoinExchangesCard";

const CoinExchangesScreen = () => {
  const [exchanges, setExchanges] = useState([]);
  useEffect(() => {
    setTestDeviceIDAsync("SIMULATOR");
  }, []);
  const apiUrl =
    "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1";
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => setExchanges(result));
  }, []);
  return (
    <View>
      <View
        style={{
          shadowOffset: { width: 5, height: 5 },
          width: "90%",
          borderRadius: 5,
          alignSelf: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <AdMobBanner
          bannerSize="smartBanner"
          adUnitID="ca-app-pub-1575625881370911/1950352244"
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={(e) => console.log(e)}
        />
      </View>
      {exchanges.length > 0 ? (
        <FlatList
          data={exchanges}
          style={{
            marginBottom: 70
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <CoinExchangesCard
                name={item.name}
                image={item.image}
                location={item.country}
                rank={item.trust_score_rank}
                year={item.year_established}
                volume={item.trade_volume_24h_btc}
              />
            );
          }}
        />
      ) : (
        <ActivityIndicator color={"red"} size={30} />
      )}
    </View>
  );
};

export default CoinExchangesScreen;
