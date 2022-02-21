import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import BlockChainInfo from "../componets/BlockChainInfo";

const BlockChainScreen = () => {
  const [unconfirmed, setUnconfirmed] = useState();
  const [blocks, setBlocks] = useState();
  const [perBlock, setPerBlock] = useState();
  const [circulation, setCirculation] = useState();
  const [transactions, setTransactions] = useState();
  const [volume, setVolume] = useState();

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
      <ScrollView>
        <BlockChainInfo
          title={"Unconfirmed Transactions"}
          value={unconfirmed}
        />
        <BlockChainInfo title={"Total Blocks"} value={blocks} />
        <BlockChainInfo title={"Bitcoin Per Block"} value={perBlock} />
        <BlockChainInfo title={"Bitcoin in circulation"} value={circulation} />
        <BlockChainInfo title={"24 hour Transactions"} value={transactions} />
        <BlockChainInfo title={"24 hour Volume"} value={volume} />
      </ScrollView>
    </View>
  );
};

export default BlockChainScreen;
