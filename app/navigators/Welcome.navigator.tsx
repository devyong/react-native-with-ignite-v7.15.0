import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { WelcomeScreen, DemoListScreen, DemoScreen } from "../screens"
import { CharacterDetailScreen } from "../screens/CharacterDetail.screen"
import { EpisodeScreen } from "../screens/Episode.screen"
import { LocationScreen } from "../screens/Location.screen"
import { SigninScreen } from "../screens/Signin.screen"
import { SignupScreen } from "../screens/Signup.screen"
export type WelcomeNavigatorParamList = {
  welcome: undefined
  signup: undefined
  signin: undefined

  demo: undefined
  demoList: undefined
  location: undefined
  episode: undefined
  characterDetail: undefined
  episodeDetail: undefined
  locationDetail: undefined
}

const Stack = createStackNavigator<WelcomeNavigatorParamList>()
export const WelcomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="signin"
        component={SigninScreen}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen name="demo" component={DemoScreen} />

      <Stack.Screen name="demoList" component={DemoListScreen} />
      <Stack.Screen name="characterDetail" component={CharacterDetailScreen} />

      <Stack.Screen name="episode" component={EpisodeScreen} />
      <Stack.Screen name="episodeDetail" component={CharacterDetailScreen} />
     
      <Stack.Screen name="location" component={LocationScreen} />
      <Stack.Screen name="locationDetail" component={CharacterDetailScreen} />
    </Stack.Navigator>
  )
}
