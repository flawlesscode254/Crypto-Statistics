import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const BlockChainInfo = ({title, value}) => {
  return (
    <View>
        <LinearGradient
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: 0.25 }}
          colors={["#630115", "#2F4697"]}
          style={{
            padding: 10,
            marginBottom: 20,
            borderRadius: 7
          }}
        >
          <Text style={{
            color: "#04e046"
          }}>{title}: <Text style={{
              color: "#FFFFFF"
          }}>{`${parseFloat(value)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text></Text>
        </LinearGradient>
    </View>
  )
}

export default BlockChainInfo