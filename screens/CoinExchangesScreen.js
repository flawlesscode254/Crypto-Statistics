import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

import CoinExchangesCard from "../componets/CoinExchangesCard";

const CoinExchangesScreen = () => {
  const [exchanges, setExchanges] = useState([]);
  const apiUrl =
    "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1";
  useEffect(() => {
      fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => setExchanges(result))
  }, []);
  return (
    <View>
      {exchanges.length > 0 && (
        <FlatList
          data={exchanges}
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
      )}
    </View>
  );
};

export default CoinExchangesScreen;
