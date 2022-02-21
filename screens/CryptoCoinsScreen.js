import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const CoinDetails = () => {
  const [prices, setPrices] = useState();
  const [dates, setDates] = useState();
  const [current, setCurrent] = useState();
  const [change, setChange] = useState();
  const [checkers, setCheckers] = useState([]);
  const [next, setNext] = useState();
  const [month, setMonth] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/historical/close.json"
      );
      const json = await response.json();
      await setPrices(Object.values(json.bpi));
      await setCheckers(Object.values(json.bpi));
      await setDates(Object.keys(json.bpi));
    })();
  }, []);

  useEffect(() => {
    (() => {
      setInterval(async () => {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        const json = await response.json();
        await setCurrent(json.bpi.USD.rate);
        await setNext(json.bpi.USD.rate_float);
      }, 1000);
    })();
  }, []);

  useEffect(() => {
    let a = Number(next) - Number(checkers[checkers.length - 1]);
    let b = a / Number(checkers[checkers.length - 1]);
    let c = b * 100;
    let d = c.toFixed(2);
    setChange(d);

    let e = Number(next) - Number(checkers[0]);
    let f = e / Number(checkers[0]);
    let g = f * 100;
    let h = g.toFixed(2);
    setMonth(h);
  }, [next]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 999,
            marginRight: 20,
          }}
          source={{
            uri: "https://www.ebuyer.com/blog/wp-content/uploads/2013/11/bitcoin-logo-1000_0.jpg",
          }}
        />
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Bitcoin
          </Text>
          <Text
            style={{
              color: "gray",
            }}
          >
            BTC
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {dates ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                letterSpacing: 1,
              }}
            >
              From{" "}
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {dates[0]}
              </Text>{" "}
              to{" "}
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {dates[dates.length - 1]}
              </Text>{" "}
            </Text>
            <Text
              style={{
                color: "green",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >{`${dates.length} days`}</Text>
          </View>
        ) : (
          <ActivityIndicator size="large" color="red" />
        )}
        {prices ? (
          <LineChart
            data={{
              datasets: [
                {
                  data: prices,
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
        ) : (
          <ActivityIndicator size="large" color="red" />
        )}
      </View>

      {current ? (
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              Current
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                letterSpacing: 2,
                color: "#009afa",
              }}
            >
              {`$${current}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                marginRight: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                1 day
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  letterSpacing: 2,
                  color: change > 0 ? "green" : "red",
                }}
              >
                {change > 0 ? `+${change}%` : `${change}%`}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                1 month
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  letterSpacing: 2,
                  color: month > 0 ? "green" : "red",
                }}
              >
                {month > 0 ? `+${month}%` : `${month}%`}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color="red" />
      )}
    </View>
  );
};

export default CoinDetails;

const styles = StyleSheet.create({});