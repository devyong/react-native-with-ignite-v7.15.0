import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo } from "react"
import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { GradientBackground, Header, Screen, Text } from "../components"
import { NavigatorParamList } from "../navigators"
import { useStores } from "../stores"
import { color, spacing } from "../theme"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `calendar: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="calendar" component={CalendarScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CalendarScreen: FC<StackScreenProps<NavigatorParamList, "calendar">> = observer(
  function CalendarScreen({ navigation }) {
    // Pull in one of our MST stores
    const { calendarStore } = useStores()

    const [fetchData, renderItem] = useMemo(
      () => [
        async () => {
          await calendarStore.listCalendar()
        },

        ({ item }) => (
          <View style={LIST_CONTAINER}>
            <Text style={LIST_TEXT}>{item.name}</Text>
          </View>
        ),
        // put your computed values here
      ],
      [],
    )

    useEffect(() => {
      fetchData()
    }, [fetchData])

    return (
      <View testID="CalendarScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="calendarScreen.title"
            leftIcon="back"
            onLeftPress={navigation.goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          {calendarStore.state === "error" && <Text>Error...</Text>}
          {calendarStore.state === "pending" && <Text>Loading...</Text>}
          {calendarStore.state === "done" && (
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...calendarStore.items]}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
          />
          )}
        </Screen>
      </View>
    )
  },
)
