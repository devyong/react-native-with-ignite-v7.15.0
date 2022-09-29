import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { LoginScreen } from "../screens/Login.screen"

export type LoginNavigatorParamList = {
  login: undefined
}

const Stack = createStackNavigator<LoginNavigatorParamList>()
export const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}
