/* eslint-disable @typescript-eslint/no-namespace */

/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import React, { useEffect, useState } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import "./i18n"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/error/error-boundary"
import { IRootStore, RootStoreProvider, setupRootStore } from "./stores"
import { initFonts } from "./theme/fonts" // expo
import "./utils/ignore-warnings"
import * as storage from "./utils/storage"
// ----------------------------------------------------------------------------------
// Paper Settings
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from "react-native-paper"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useKeepAwake } from "expo-keep-awake"
import { I18nManager } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DrawerItems from "./components/DrawerItems"

// Add new typescript properties to the theme
declare global {
  namespace ReactNativePaper {
    interface ThemeFonts {
      superLight: ThemeFont
    }
    interface ThemeColors {
      customColor: string
    }
    interface ThemeAnimation {
      customProperty: number
    }
    interface Theme {
      userDefinedThemeProperty: string
    }
  }
}

const CustomDarkTheme: ReactNativePaper.Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    customColor: "#BADA55",
  },
  fonts: {
    ...DarkTheme.fonts,
    superLight: { ...DarkTheme.fonts["light"] },
  },
  userDefinedThemeProperty: "",
  animation: {
    ...DarkTheme.animation,
    customProperty: 1,
  },
}

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    customColor: "#BADA55",
  },
  fonts: {
    ...DefaultTheme.fonts,
    superLight: { ...DefaultTheme.fonts["light"] },
  },
  userDefinedThemeProperty: "",
  animation: {
    ...DefaultTheme.animation,
    customProperty: 1,
  },
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac6",
  },
}

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

const PERSISTENCE_KEY = "NAVIGATION_STATE"
const PREFERENCES_KEY = "APP_PREFERENCES"

export const PreferencesContext = React.createContext<any>(null)

const DrawerContent = () => {
  return (
    <PreferencesContext.Consumer>
      {(preferences) => (
        <DrawerItems
          toggleTheme={preferences.toggleTheme}
          toggleRTL={preferences.toggleRtl}
          isRTL={preferences.rtl}
          isDarkTheme={preferences.theme.dark}
        />
      )}
    </PreferencesContext.Consumer>
  )
}

const Drawer = createDrawerNavigator<{ Home: undefined }>()

/**
 * This is the root component of our app.
 */
function App() {
  // prevents the screen sleeping when rendered
  useKeepAwake()
  const [theme, setTheme] = React.useState<ReactNativePaper.Theme>(CustomDefaultTheme)
  const [rtl, setRtl] = React.useState<boolean>(I18nManager.isRTL)

  const [rootStore, setRootStore] = useState<IRootStore | undefined>(undefined)

  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, PERSISTENCE_KEY)

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCES_KEY)
        const preferences = JSON.parse(prefString || "")

        if (preferences) {
          // eslint-disable-next-line react/no-did-mount-set-state
          setTheme(preferences.theme === "dark" ? CustomDarkTheme : CustomDefaultTheme)

          if (typeof preferences.rtl === "boolean") {
            setRtl(preferences.rtl)
          }
        }
      } catch (e) {
        // ignore error
      }
    }

    restorePrefs()
  }, [])

  React.useEffect(() => {
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(
          PREFERENCES_KEY,
          JSON.stringify({
            theme: theme === DarkTheme ? "dark" : "light",
            rtl,
          }),
        )
      } catch (e) {
        // ignore error
      }

      if (I18nManager.isRTL !== rtl) {
        I18nManager.forceRTL(rtl)
      }
    }

    savePrefs()
  }, [rtl, theme])

  const preferences = React.useMemo(
    () => ({
      toggleTheme: () =>
        setTheme((theme) => (theme === CustomDefaultTheme ? CustomDarkTheme : CustomDefaultTheme)),
      toggleRtl: () => setRtl((rtl) => !rtl),
      rtl,
      theme,
    }),
    [rtl, theme],
  )

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      await initFonts() // expo
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore || !isNavigationStateRestored) return null

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <RootStoreProvider value={rootStore}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider >
            <PreferencesContext.Provider value={preferences}>
              <ErrorBoundary catchErrors={"always"}>
                <AppNavigator
                  initialState={initialNavigationState}
                  onStateChange={onNavigationStateChange}
                />
              </ErrorBoundary>
            </PreferencesContext.Provider>
          </SafeAreaProvider>
        </PaperProvider>
      </RootStoreProvider>
    </ToggleStorybook>
  )
}

export default App
