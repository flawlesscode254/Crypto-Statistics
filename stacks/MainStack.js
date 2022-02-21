import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CoinExchangesScreen from '../screens/CoinExchangesScreen'
import CryptoCoinsScreen from '../screens/CryptoCoinsScreen'
import BlockChainScreen from '../screens/BlockChainScreen'

const MainStack = () => {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator>
        <Tab.Screen name='Coin Exchanges' component={CoinExchangesScreen} />
        <Tab.Screen name='Crypto Coins' component={CryptoCoinsScreen} />
        <Tab.Screen name='Block Chain' component={BlockChainScreen} />
    </Tab.Navigator>
  )
}

export default MainStack