import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useEffect, useMemo } from "react"
import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, GradientBackground, Header, Screen, Text } from "../components"
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

export const LocationScreen: FC<StackScreenProps<NavigatorParamList, "location">> = observer(
  function LocationScreen({ navigation }) {
    // Pull in one of our MST stores
    const { locationStore } = useStores()

    const fetchData = useCallback(async (page = 2) => {
      await locationStore.listLocation({ page })
    }, [])

    const renderItem = useCallback(
      ({ item }) => (
        <View style={LIST_CONTAINER}>
          <Text style={LIST_TEXT}>
            {item.name} ({item.type}) - {item.dimension}
          </Text>
        </View>
      ),
      [],
    )

    useEffect(() => {
      fetchData()
    }, [fetchData])

    return (
      <View testID="LocationScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="locationScreen.title"
            leftIcon="back"
            onLeftPress={navigation.goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={LIST_CONTAINER}>
            <Button
              text="Prev"
              disabled={locationStore.info?.prev === null}
              onPress={locationStore.prev}
            />
            <Button
              text="Next"
              disabled={locationStore.info?.next === null}
              onPress={locationStore.next}
            />
          </View>
          {locationStore.state === "error" && <Text>Error...</Text>}
          {locationStore.state === "pending" && <Text>Loading...</Text>}
          {locationStore.state === "done" && (
            <FlatList
              contentContainerStyle={FLAT_LIST}
              data={[...locationStore.items]}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
            />
          )}
        </Screen>
      </View>
    )
  },
)
