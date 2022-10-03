import React, { FC } from "react"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import { SymptomScreen } from "../screens/Symptom.screen"
import { NavigatorParamList } from "./app-navigator"

export type SymptomNavigatorParamList = {
  symptom: undefined
}

const Stack = createStackNavigator<SymptomNavigatorParamList>()

export const SymptomNavigator: FC<StackScreenProps<NavigatorParamList, "symptomNav">> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: true,
      }}
    >
      <Stack.Screen name="symptom" component={SymptomScreen} />
    </Stack.Navigator>
  )
}
