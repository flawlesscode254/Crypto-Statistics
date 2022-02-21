import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const CoinDetails = () => {
  const [prices, setPrices] = useState([]);
  useEffect(() => {
      fetch(
        "https://api.coindesk.com/v1/bpi/historical/close.json"
      )
      .then((response) => response.json())
      .then((result) => setPrices(Object.values(result.bpi)))
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {prices.length > 0 && (
        <LineChart
          data={{
            datasets: [
              {
                data: [...prices],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          withInnerLines={false}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "1",
              strokeWidth: "1",
              stroke: "#000000",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default CoinDetails;

const styles = StyleSheet.create({});
