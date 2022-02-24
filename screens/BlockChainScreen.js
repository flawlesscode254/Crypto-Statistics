import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";

import BlockChainInfo from "../componets/BlockChainInfo";
import AdressInfo from "../componets/AdressInfo";

const BlockChainScreen = () => {
  const [unconfirmed, setUnconfirmed] = useState();
  const [blocks, setBlocks] = useState();
  const [perBlock, setPerBlock] = useState();
  const [circulation, setCirculation] = useState();
  const [transactions, setTransactions] = useState();
  const [volume, setVolume] = useState();
  const [search, setSearch] = useState("");
  const [error, setError] = useState();
  const [balance, setBalance] = useState();
  const [received, setReceived] = useState();
  const [sent, setSent] = useState();

  useEffect(() => {
    setTestDeviceIDAsync("SIMULATOR");
  }, []);

  const getUnconfirmedTransactions = () => {
    fetch("https://blockchain.info/q/unconfirmedcount")
      .then((response) => response.json())
      .then((result) => setUnconfirmed(result));
  };
  const getBlocks = () => {
    fetch("https://blockchain.info/q/getblockcount")
      .then((response) => response.json())
      .then((result) => setBlocks(result));
  };
  const getPerBlock = () => {
    fetch("https://blockchain.info/q/bcperblock")
      .then((response) => response.json())
      .then((result) => setPerBlock(result));
  };
  const getInCirculation = () => {
    fetch("https://blockchain.info/q/totalbc")
      .then((response) => response.json())
      .then((result) => setCirculation(result * 0.00000001));
  };
  const getTransactions = () => {
    fetch("https://blockchain.info/q/24hrtransactioncount")
      .then((response) => response.json())
      .then((result) => setTransactions(result));
  };
  const getVolume = () => {
    fetch("https://blockchain.info/q/24hrbtcsent")
      .then((response) => response.json())
      .then((result) => setVolume(result * 0.00000001));
  };
  const getAddressBalance = () => {
    fetch(`https://blockchain.info/q/addressbalance/${search}?confirmations=3`)
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          setError(result.message);
          setTimeout(() => {
            setError("");
          }, 2500);
        } else {
          setBalance(result * 0.00000001);
        }
      });
  };
  const getReceived = () => {
    fetch(
      `https://blockchain.info/q/getreceivedbyaddress/${search}?confirmations=3`
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          setError(result.message);
          setTimeout(() => {
            setError("");
          }, 2500);
        } else {
          setReceived(result * 0.00000001);
        }
      });
  };
  const getSent = () => {
    fetch(
      `https://blockchain.info/q/getsentbyaddress/${search}?confirmations=3`
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          setError(result.message);
          setTimeout(() => {
            setError("");
          }, 2500);
        } else {
          setSent(result * 0.00000001);
        }
      });
  };
  useEffect(() => {
    getUnconfirmedTransactions();
    getBlocks();
    getPerBlock();
    getInCirculation();
    getTransactions();
    getVolume();
  }, []);
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

      {!!error && (
        <Text
          style={{
            textAlign: "center",
            color: "red",
          }}
        >
          {error}
        </Text>
      )}
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
          <Ionicons name="logo-bitcoin" color="#ed1186" size={24} />
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
            placeholder="Enter public address"
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
      {balance && sent && received && (
        <AdressInfo balance={balance} sent={sent} received={received} />
      )}
      {volume &&
      blocks &&
      perBlock &&
      circulation &&
      transactions &&
      unconfirmed ? (
        <ScrollView>
          <BlockChainInfo
            title={"Unconfirmed Transactions"}
            value={unconfirmed}
          />
          <BlockChainInfo title={"Total Blocks"} value={blocks} />
          <BlockChainInfo title={"Bitcoin Per Block"} value={perBlock} />
          <BlockChainInfo
            title={"Bitcoin in circulation"}
            value={circulation}
          />
          <BlockChainInfo title={"24 hour Transactions"} value={transactions} />
          <BlockChainInfo title={"24 hour Volume"} value={volume} />
        </ScrollView>
      ) : (
        <ActivityIndicator size={30} color="red" />
      )}
    </View>
  );
};

export default BlockChainScreen;
