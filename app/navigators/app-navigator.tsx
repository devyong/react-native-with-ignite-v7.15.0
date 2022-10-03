/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme, Platform } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { WelcomeScreen, DemoScreen, DemoListScreen, CalendarScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { EpisodeScreen } from "../screens/Episode.screen"
import { LocationScreen } from "../screens/Location.screen"
import { CharacterDetailScreen } from "../screens/CharacterDetail.screen"
import { AccountNavigator } from "./Account.navigator"
import { LoginNavigator } from "./Login.navigator"
import { SymptomNavigator } from "./Symptom.navigator"
import { PrescriptionNavigator } from "./Prescription.navigator"

import { getHeaderTitle } from "@react-navigation/elements"
import { Appbar } from "react-native-paper"
import type { DrawerNavigationProp } from "@react-navigation/drawer"
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
  welcome: undefined
  accountNav: undefined
  loginNav: undefined

  symptomNav: undefined
  prescriptionNav: undefined

  demo: undefined
  demoList: undefined
  location: undefined
  episode: undefined
  calendar: undefined
  // 🔥 Your screens go here
  characterDetail: undefined
  episodeDetail: undefined
  locationDetail: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="welcome"
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
        name="welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="accountNav"
        component={AccountNavigator}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="loginNav"
        component={LoginNavigator}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="symptomNav"
        component={SymptomNavigator}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="prescriptionNav"
        component={PrescriptionNavigator}
        options={{
          headerShown: true,
        }}
      />

      {/** 🔥 Your screens go here */}

      <Stack.Screen name="calendar" component={CalendarScreen} options={{ headerShown: true }} />

      <Stack.Screen name="demo" component={DemoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="demoList" component={DemoListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="location" component={LocationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="episode" component={EpisodeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="characterDetail"
        component={CharacterDetailScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="episodeDetail"
        component={CharacterDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="locationDetail"
        component={CharacterDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

interface INavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: INavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
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
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
