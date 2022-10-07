/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { Platform, useColorScheme } from "react-native"
import { CalendarScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"

import { SigninScreen } from "../screens/Signin.screen"
import { SignupScreen } from "../screens/Signup.screen"

import { PrescriptionNavigator } from "./Prescription.navigator"
import { SymptomNavigator } from "./Symptom.navigator"

import type { DrawerNavigationProp } from "@react-navigation/drawer"
import { getHeaderTitle } from "@react-navigation/elements"
import { Appbar } from "react-native-paper"
import { useAuth } from "../context/Auth.context"
import { WelcomeNavigator } from "./Welcome.navigator"
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  symptomNav: undefined
  prescriptionNav: undefined

  calendar: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="symptomNav"
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
      <Stack.Screen
        name="symptomNav"
        component={SymptomNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="prescriptionNav"
        component={PrescriptionNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

interface INavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: INavigationProps) => {
  
  const { isSignin } = useAuth()
  console.tron.logImportant("IS SIGNIN?", isSignin)

  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {!isSignin ? (
        <>
          <WelcomeNavigator />
        </>
      ) : (
        <>
          <AppStack />
        </>
      )}
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome", "symptom", "prescription"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
