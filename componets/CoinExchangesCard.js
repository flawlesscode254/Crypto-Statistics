import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CoinExchangesCard = ({
    name,
    image,
    location,
    rank,
    year,
    volume
}) => {
  return (
    <View
      style={{
        margin: 10,
        padding: 10,
        backgroundColor: "#069c3f",
        borderRadius: 7,
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          source={{
            uri: image
          }}
          style={{
            height: 40,
            width: 40,
            borderRadius: 999,
          }}
        />
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 18,
          }}
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginTop: 5
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Ionicons name="location" size={24} />
          <Text style={{
              color: "#FFFFFF"
          }}>{location}</Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Ionicons color={"#ff7308"} name="star" size={20} />
          <Text style={{
              color: "#FFFFFF"
          }}>{`rank: ${rank}`}</Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Ionicons name="time" size={20} />
          <Text style={{
              color: "#FFFFFF"
          }}>{year}</Text>
        </View>
      </View>
      <Text style={{
          marginTop: 5
      }}>Bitcoin Volume Traded 24h: <Text style={{
          color: "blue"
      }}>{`${parseFloat(volume)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text></Text>
    </View>
  );
};

export default CoinExchangesCard;
