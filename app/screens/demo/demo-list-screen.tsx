import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useLayoutEffect, useMemo } from "react"
import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  AutoImage as Image,
  Button,
  GradientBackground,
  Header,
  Screen,
  Text,
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../stores"
import { color, spacing } from "../../theme"

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

export const DemoListScreen: FC<StackScreenProps<NavigatorParamList, "demoList">> = observer(
  ({ navigation }) => {
    const { characterStore } = useStores()

    const onSelect = useCallback((item) => {
      // @ts-ignore
      navigation.navigate("characterDetail", { id: item.id })
    }, [])

    const [goBack, fetchData, renderItem] = useMemo(
      () => [
        function goBack() {
          navigation.goBack()
        },
        async function fetchData() {
          await characterStore.listCharacter()
        },
        function RenderItem({ item }) {
          return (
            <View style={LIST_CONTAINER}>
              <Image source={{ uri: item.image }} style={IMAGE} />
              <Text style={LIST_TEXT} onPress={() => onSelect(item)}>
                {item.name} ({item.status})
              </Text>
            </View>
          )
        },
      ],
      [],
    )

    useLayoutEffect(() => {
      fetchData()
    }, [])

    return (
      <View testID="DemoListScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="demoListScreen.title"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={LIST_CONTAINER}>
            <Button
              text="Prev"
              disabled={characterStore.info.prev === null}
              onPress={characterStore.prev}
            />
            <Button
              text="Next"
              disabled={characterStore.info.next === null}
              onPress={characterStore.next}
            />
          </View>
          {characterStore.state === "error" && <Text>Error...</Text>}
          {characterStore.state === "pending" && <Text>Loading...</Text>}
          {characterStore.state === "done" && (
            <FlatList
              contentContainerStyle={FLAT_LIST}
              data={[...characterStore.items]}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
            />
          )}
        </Screen>
      </View>
    )
  },
)
