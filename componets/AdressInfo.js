import { View, Text } from 'react-native'
import React from 'react'

const AdressInfo = ({balance, sent, received}) => {
  return (
    <View style={{
        margin: 10,
        marginBottom: 20,
        backgroundColor: '#0E2A47',
        padding: 10,
        borderRadius: 8
    }}>
      <Text style={{
          color: "#ed1186"
      }}>Bitcoin balance: <Text style={{
          color: "#FFFFFF"
      }}>{balance}</Text></Text>
      <Text style={{
          color: "#ed1186"
      }}>Bitcoin received: <Text style={{
          color: "#FFFFFF"
      }}>{received}</Text></Text>
      <Text style={{
          color: "#ed1186"
      }}>Bitcoin sent: <Text style={{
          color: "#FFFFFF"
      }}>{sent}</Text></Text>
    </View>
  )
}

export default AdressInfo