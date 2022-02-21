import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  low
}) => {
  const [show, setShow] = useState(false);
  return (
    <View
      style={{
        marginBottom: 20,
        padding: 10,
        borderRadius: 7,
        backgroundColor: "#012573",
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
          onPress={() => {
            setShow(!show);
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
      {show && 
        <MoreDetails 
          cap={cap} 
          total={total}
          circulating={circulating}
          high={high}
          low={low}
        />
      }
    </View>
  );
};

export default CoinDetails;