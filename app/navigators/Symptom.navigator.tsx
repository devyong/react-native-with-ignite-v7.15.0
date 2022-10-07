import type { DrawerNavigationProp } from "@react-navigation/drawer"
import { getHeaderTitle } from "@react-navigation/elements"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import React, { FC } from "react"
import { Platform } from "react-native"
import { Appbar } from "react-native-paper"
import { SymptomScreen } from "../screens/Symptom.screen"
import { NavigatorParamList } from "./app-navigator"
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"

export type SymptomNavigatorParamList = {
  symptom: undefined
}

const Stack = createStackNavigator<SymptomNavigatorParamList>()

export const SymptomNavigator: FC<StackScreenProps<NavigatorParamList, "symptomNav">> = () => {
  return (
    <Stack.Navigator
      initialRouteName="symptom"
      screenOptions={({ navigation }) => {
        return {
          detachPreviousScreen: !navigation.isFocused(),
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name)
            return (
              <Appbar.Header>
                {back ? (
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                ) : (navigation as any).openDrawer ? (
                  <Appbar.Action
                    icon="menu"
                    onPress={() => (navigation as any as DrawerNavigationProp<{}>).openDrawer()}
                  />
                ) : null}
                <Appbar.Content title={title} subtitle="subtitle" />
                <Appbar.Action icon="magnify" onPress={() => console.tron.log("click magnify")} />
                <Appbar.Action icon={MORE_ICON} onPress={() => console.tron.log("click more")} />
              </Appbar.Header>
            )
          },
        }
      }}
    >
      <Stack.Screen name="symptom" component={SymptomScreen} />
    </Stack.Navigator>
  )
}
