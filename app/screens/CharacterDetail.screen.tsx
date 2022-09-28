import React, { FC, useCallback, useEffect } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, AutoImage as Image, GradientBackground } from "../components"
import { color, spacing } from "../theme"
import { useStores } from "../stores"
import { NavigatorParamList } from "../navigators"

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
  flexDirection: "column",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 5,
  borderWidth: 2,
  borderColor: color.palette.white,
  // height: '100%',
  width: "100%",
}
const LIST_TEXT: TextStyle = {
  // marginLeft: spacing[2],
  paddingVertical: spacing[1],
}
const FLAT_LIST: ViewStyle = {
  marginTop: spacing[4],
  paddingHorizontal: spacing[1],
}

export const CharacterDetailScreen: FC<StackScreenProps<NavigatorParamList, "characterDetail">> =
  observer(function CharacterDetailScreen({ navigation, route }) {
    const { characterStore } = useStores()

    const fetchData = useCallback(async () => {
      // @ts-ignore
      const { id } = route.params
      characterStore.select(id)
      await characterStore.getCharacter(id)
    }, [])

    useEffect(() => {
      fetchData()
    }, [fetchData])

    useEffect(() => {
      return () => {
        characterStore.select(null)
      }
    }, [])

    return (
      <View testID="CharacterDetailScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="characterDetailScreen.title"
            leftIcon="back"
            onLeftPress={navigation.goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={LIST_CONTAINER}>
            <Image source={{ uri: characterStore.current?.image }} style={IMAGE} />
            <View style={FLAT_LIST}>
              <Text style={LIST_TEXT}>Name: {characterStore.current?.name}</Text>
              <Text style={LIST_TEXT}>Status: {characterStore.current?.status}</Text>
              <Text style={LIST_TEXT}>Species: {characterStore.current?.species}</Text>
              <Text style={LIST_TEXT}>Origin: {characterStore.current?.origin.name}</Text>
              <Text style={LIST_TEXT}>Location: {characterStore.current?.location.name}</Text>
              <Text style={LIST_TEXT}>Created: {characterStore.current?.created}</Text>
              <View>
                <Text style={LIST_TEXT}>Episodes:</Text>
                {characterStore.current?.episode.map((episode, index) => (
                  <Text key={index} style={LIST_TEXT}>
                    {episode}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </Screen>
      </View>
    )
  })
