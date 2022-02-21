import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";

import CoinDetails from "../componets/CryptoDetails"

const CryptoCoinsScreen = () => {
  const [coinData, setCoinData] = useState([]);
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);

  const getData = async () => {
    await setShow(!show);
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=${count}&sparkline=false&price_change_percentage=1h`;
    const response = await fetch(apiUrl);
    const json = await response.json();
    await setCoinData([...coinData, ...json]);
    await setShow(show);
  };

  useEffect(() => {
    getData();
  }, [count]);
  return (
    <View
      style={{
        margin: 10,
      }}
    >
      {coinData.length === 0 ? (
        <ActivityIndicator
          color={"red"}
          style={{
            marginTop: 250,
          }}
          size={30}
        />
      ) : (
        <FlatList
          data={coinData}
          keyExtractor={(item) => item.id}
          onEndReached={() => {
            setCount(count + 1);
          }}
          onEndReachedThreshold={0}
          renderItem={({ item }) => {
            return (
              <CoinDetails
                key={item.id}
                symbol={item.symbol}
                name={item.name}
                currentPrice={item.current_price}
                change={item.price_change_percentage_24h}
                image={item.image}
                cap={item.market_cap}
                total={item.total_supply}
                circulating={item.circulating_supply}
                high={item.high_24h}
                low={item.low_24h}
              />
            );
          }}
        />
      )}
      {show && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={"red"} size={30} />
        </View>
      )}
    </View>
  );
};

export default CryptoCoinsScreen;