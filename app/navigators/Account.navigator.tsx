import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { AccountScreen } from "../screens/Account.screen"

export type AccountNavigatorParamList = {
  account: undefined
}

const Stack = createStackNavigator<AccountNavigatorParamList>()
export const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="account" component={AccountScreen} />
    </Stack.Navigator>
  )
}
