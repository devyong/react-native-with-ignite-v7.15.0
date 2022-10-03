import React, { FC, useCallback, useEffect } from "react"
import { View, Platform, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { Appbar, FAB, Switch, Paragraph, useTheme } from "react-native-paper"
import ScreenWrapper from "../components/ScreenWrapper"

import { useStores } from "../stores"

import { transparent, yellowA200 } from "../theme/colors"

import { SymptomNavigatorParamList } from "../navigators/Symptom.navigator"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `calendar: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="calendar" component={CalendarScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CalendarScreen: FC<StackScreenProps<CalendarNavigatorParamList, "calendar">> = observer(
  function CalendarScreen({ navigation, route }) {
    
    const theme = useTheme()

    // Pull in one of our MST stores
    // const { calendarStore } = useStores()
    //
    // const fetchData = useCallback(async () => {
    //   await calendarStore.listCalendar()
    // }, [])
    //
    // const renderItem = useCallback(
    //   ({ item }) => (
    //     <View style={styles.container}>
    //       <Text style={styles.listText}>{item.name}</Text>
    //     </View>
    //   ),
    //   [],
    // )
    //
    // useEffect(() => {
    //   fetchData()
    // }, [fetchData])

    const [showLeftIcon, setShowLeftIcon] = React.useState(true)

    return (
      <View testID="CalendarScreen" style={styles.fullscreen}>
        <ScreenWrapper 
          style={styles.container} 
          contentContainerStyle={styles.contentContainer}
          withScrollView={true}
        >
          <View style={styles.row}>
            <Paragraph>CalendarScreen</Paragraph>
            <Switch value={showLeftIcon} onValueChange={() => setShowLeftIcon(!showLeftIcon)} />
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