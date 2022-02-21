import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainStack from './MainStack'

const AppStack = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
        <Stack.Screen name='Main' component={MainStack} />
    </Stack.Navigator>
  )
}

export default AppStack