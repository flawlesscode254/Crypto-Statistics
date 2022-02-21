import { View, Text } from 'react-native'
import React from 'react'

const MoreDetails = ({cap, total, circulating, high, low}) => {
  return (
    <View style={{
        marginTop: 10
    }}>
      <Text style={{
          color: "#FFFFFF",
          marginBottom: 5
      }}>market cap: {" "}
        <Text style={{
            color: "orangered"
        }}>{`$ ${parseFloat(cap)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
      </Text>
      <Text style={{
          color: "#FFFFFF",
          marginBottom: 5
      }}>circulating supply: {" "}
        <Text style={{
            color: "orangered"
        }}>{`${parseFloat(circulating)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
      </Text>
      <Text style={{
          color: "#FFFFFF",
          marginBottom: 5
      }}>total supply: {" "}
        <Text style={{
            color: "orangered"
        }}>{total ? `${parseFloat(total)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : "No limit on supply"}</Text>
      </Text>
      <Text style={{
          color: "#FFFFFF",
          marginBottom: 5
      }}>high 24h: {" "}
        <Text style={{
            color: "orangered"
        }}>{`${parseFloat(high)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
      </Text>
      <Text style={{
          color: "#FFFFFF",
          marginBottom: 5
      }}>low 24h: {" "}
        <Text style={{
            color: "orangered"
        }}>{`${parseFloat(low)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
      </Text>
    </View>
  )
}

export default MoreDetails