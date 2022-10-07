import React, { FC, useCallback, useEffect } from "react"
import { View, Platform, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { Paragraph, useTheme } from "react-native-paper"
import ScreenWrapper from "../components/ScreenWrapper"

import { useStores } from "../stores"

import { transparent, yellowA200 } from "../theme/colors"

import { NavigatorParamList } from "../navigators/app-navigator"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `signup: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="signup" component={SignupScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SignupScreen: FC<StackScreenProps<NavigatorParamList, "signup">> = observer(
  function SignupScreen({ navigation, route }) {
    
    const theme = useTheme()
    const stores = useStores()

    return (
      <View testID="SignupScreen" style={styles.fullscreen}>
        <ScreenWrapper 
          style={styles.container} 
          contentContainerStyle={styles.contentContainer}
          withScrollView={true}
        >
          <View style={styles.row}>
            <Paragraph>SignupScreen</Paragraph>
          </View>
        </ScreenWrapper>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: transparent,
  },
  contentContainer: {
    backgroundColor: transparent,
  },
  fullscreen: {
    backgroundColor: transparent,
    flex: 1,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})