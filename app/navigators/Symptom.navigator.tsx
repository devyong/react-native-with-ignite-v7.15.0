import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SymptomScreen } from "../screens/Symptom.screen"

export type SymptomNavigatorParamList = {
  symptom: undefined
}

const Stack = createStackNavigator<SymptomNavigatorParamList>()
export const SymptomNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="symptom" component={SymptomScreen} />
    </Stack.Navigator>
  )
}
