import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AdMobInterstitial } from "expo-ads-admob";
import { Overlay } from "react-native-elements";

import MoreDetails from "./MoreDetails";

const CoinDetails = ({
  symbol,
  name,
  currentPrice,
  change,
  image,
  cap,
  total,
  circulating,
  high,
  low,
  data,
}) => {
  const [show, setShow] = useState(false);
  const [vis, setVis] = useState(false)

  const interstitialID = Platform.select({
    android: "ca-app-pub-1575625881370911/6175897085",
  });

  const indexOfObject = data.findIndex((obj) => {
    if (obj.name === name) {
      return true;
    }
    return false;
  });

  const showAd = () => {
    AdMobInterstitial.setAdUnitID(interstitialID)
      .then(() => AdMobInterstitial.requestAdAsync())
      .then(() => AdMobInterstitial.showAdAsync())
      .then(() => setVis(vis))
  };
  return (
    <View
      style={{
        marginBottom: 20,
        padding: 10,
        borderRadius: 7,
        backgroundColor: "#012573",
      }}
    >
      <Overlay isVisible={vis}>
        <Text>Loading....</Text>
      </Overlay>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 60,
          }}
        >
          <Image
            source={{
              uri: image,
            }}
            style={{
              height: 40,
              width: 40,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color: "#0fb6f2",
              marginBottom: 20,
            }}
          >
            {symbol}
          </Text>
          <Text
            style={{
              color: "yellow",
            }}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Ionicons
              name={change < 0 ? "arrow-down" : "arrow-up"}
              color={change < 0 ? "red" : "#0ff25a"}
              size={20}
            />
            <Text
              style={{
                color: change < 0 ? "red" : "#0ff25a",
              }}
            >{`${parseFloat(change).toFixed(2)} %`}</Text>
          </View>
          <Text
            style={{
              color: "white",
            }}
          >{`$ ${parseFloat(currentPrice)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            if (indexOfObject % 5 === 0) {
              await setVis(!vis)
              await showAd();
              await setShow(!show)
            }
            else {
              setShow(!show)
            }
          }}
          style={{
            marginLeft: 15,
            alignSelf: "flex-end",
          }}
        >
          <Ionicons
            name={show ? "caret-up" : "caret-down"}
            size={24}
            color={"#FFFFFF"}
          />
        </TouchableOpacity>
      </View>
      {show && (
        <MoreDetails
          key={cap}
          cap={cap}
          total={total}
          circulating={circulating}
          high={high}
          low={low}
        />
      )}
    </View>
  );
};

export default CoinDetails;
