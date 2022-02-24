import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";

import CoinDetails from "../componets/CryptoDetails";

const CryptoCoinsScreen = () => {
  const [coinData, setCoinData] = useState([]);
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTestDeviceIDAsync("SIMULATOR");
  }, []);

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
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#0E2A47",
            marginTop: 10,
            paddingVertical: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 45,
            flexDirection: "row",
            paddingHorizontal: 20,
            color: "white",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Ionicons name="analytics" color="#ed1186" size={24} />
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={{
              height: 40,
              flex: 1,
              color: "grey",
              borderRadius: 30,
              paddingLeft: 10,
              color: "white",
            }}
            placeholderTextColor="#FFF"
            placeholder="Enter coin to search"
          />
          {search ? (
            <TouchableOpacity
              onPress={async () => {
                await getAddressBalance();
                await getReceived();
                await getSent();
                await setSearch("");
              }}
            >
              <Ionicons name="search" color="#F69237" size={24} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {coinData
        .filter((val) => {
          if (search === "") {
          } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
            return val;
          }
        })
        .map((val) => (
          <CoinDetails
            symbol={val.symbol}
            name={val.name}
            currentPrice={val.current_price}
            change={val.price_change_percentage_24h}
            image={val.image}
            cap={val.market_cap}
            total={val.total_supply}
            circulating={val.circulating_supply}
            high={val.high_24h}
            low={val.low_24h}
          />
        ))}
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
          style={{
            marginBottom: 70
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
            bottom: 200,
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
