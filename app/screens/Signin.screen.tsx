import React, { FC, useCallback, useEffect } from "react"
import { View, Platform, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { Paragraph, useTheme } from "react-native-paper"
import ScreenWrapper from "../components/ScreenWrapper"

import { useStores } from "../stores"

import { transparent, yellowA200 } from "../theme/colors"

import { NavigatorParamList } from "../navigators/app-navigator"
import { Button } from "../components"
import { color, spacing, typography } from "../theme"
import { useAuth } from "../context/Auth.context"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `signin: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="signin" component={SigninScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SigninScreen: FC<StackScreenProps<NavigatorParamList, "signin">> = observer(
  function SigninScreen({ navigation, route }) {
    const theme = useTheme()
    const stores = useStores()

    const auth = useAuth();

    const signin = () => {
      auth.signin({
        username: 'alcotest',
        // password: '4673f3488fff58253aace9a875409dde5ae553b9d886ffc435ef4caacd4f00db',
        password: 'innerwave33!',
      })
    }

    return (
      <View testID="SigninScreen" style={styles.fullscreen}>
        <ScreenWrapper
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          withScrollView={true}
        >
          <View style={styles.row}>
            <Paragraph>SigninScreen</Paragraph>

            <Button
              testID="next-screen-button"
              style={styles.button}
              textStyle={styles.buttonText}
              tx="signinScreen.submit"
              onPress={signin}
            />
          </View>
        </ScreenWrapper>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.palette.deepPurple,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  buttonText: {
    color: color.palette.white,
    fontFamily: typography.primary,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 2,
  },
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
