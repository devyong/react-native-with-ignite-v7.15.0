import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { PrescriptionScreen } from "../screens/Prescription.screen"

export type PrescriptionNavigatorParamList = {
  prescription: undefined
}

const Stack = createStackNavigator<PrescriptionNavigatorParamList>()
export const PrescriptionNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="prescription" component={PrescriptionScreen} />
    </Stack.Navigator>
  )
}
