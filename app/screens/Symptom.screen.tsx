import React, { FC } from "react"
import { View, Platform, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { Appbar, FAB, Switch, Paragraph, useTheme } from "react-native-paper"
import ScreenWrapper from "../components/ScreenWrapper"

import { SymptomNavigatorParamList } from "../navigators/Symptom.navigator"

import { transparent, yellowA200 } from "../theme/colors"


const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"

export const SymptomScreen: FC<StackScreenProps<SymptomNavigatorParamList, "symptom">> = observer(
  ({ navigation, route }) => {
    // Pull in one of our MST stores
    // const { symptomStore } = useStores()

    // const fetchData = useCallback(async () => {
    //   await symptomStore.listSymptom()
    // }, [])

    // const renderItem = useCallback(
    //   ({ item }) => (
    //     <View style={LIST_CONTAINER}>
    //       <Text style={LIST_TEXT}>{item.name}</Text>
    //     </View>
    //   ),
    //   [],
    // )
    const theme = useTheme()

    // useEffect(() => {
    //   fetchData()
    // }, [fetchData])
    const [showLeftIcon, setShowLeftIcon] = React.useState(true)
    const [showSubtitle, setShowSubtitle] = React.useState(true)
    const [showSearchIcon, setShowSearchIcon] = React.useState(true)
    const [showMoreIcon, setShowMoreIcon] = React.useState(true)
    const [showCustomColor, setShowCustomColor] = React.useState(false)
    const [showExactTheme, setShowExactTheme] = React.useState(false)

    React.useLayoutEffect(() => {
      navigation.setOptions({
        // headerShown: true,
      //   header: () => (
      //     <Appbar.Header
      //       style={showCustomColor ? styles.customColor : null}
      //       theme={{
      //         mode: showExactTheme ? "exact" : "adaptive",
      //       }}
      //     >
      //       {showLeftIcon && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      //       <Appbar.Content title="Title" subtitle={showSubtitle ? "Subtitle" : null} />
      //       {showSearchIcon && (
      //         <Appbar.Action icon="magnify" onPress={() => console.tron.log("click magnify")} />
      //       )}
      //       {showMoreIcon && (
      //         <Appbar.Action icon={MORE_ICON} onPress={() => console.tron.log("click more")} />
      //       )}
      //     </Appbar.Header>
      //   ),
      })
    }, [
      navigation,
      showLeftIcon,
      showSubtitle,
      showSearchIcon,
      showMoreIcon,
      showCustomColor,
      showExactTheme,
    ])

    return (
      <View testID="SymptomScreen" style={styles.fullscreen}>
        <ScreenWrapper
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          withScrollView={true}
        >
          <View style={styles.row}>
            <Paragraph>Left icon</Paragraph>
            <Switch value={showLeftIcon} onValueChange={setShowLeftIcon} />
          </View>
          <View style={styles.row}>
            <Paragraph>Subtitle</Paragraph>
            <Switch value={showSubtitle} onValueChange={setShowSubtitle} />
          </View>
          <View style={styles.row}>
            <Paragraph>Search icon</Paragraph>
            <Switch value={showSearchIcon} onValueChange={setShowSearchIcon} />
          </View>
          <View style={styles.row}>
            <Paragraph>More icon</Paragraph>
            <Switch value={showMoreIcon} onValueChange={setShowMoreIcon} />
          </View>
          <View style={styles.row}>
            <Paragraph>Custom Color</Paragraph>
            <Switch value={showCustomColor} onValueChange={setShowCustomColor} />
          </View>
          <View style={styles.row}>
            <Paragraph>Exact Dark Theme</Paragraph>
            <Switch value={showExactTheme} onValueChange={setShowExactTheme} />
          </View>
          <View style={styles.row}>
            <Paragraph>Dumy row</Paragraph>
          </View>
        </ScreenWrapper>

        <View style={{ backgroundColor: theme.colors.primary, height: 70 }}>
          <Appbar theme={{ mode: showExactTheme ? "exact" : "adaptive" }} style={{ elevation: 0 }}>
            <Appbar.Action icon="archive" onPress={() => console.tron.log("click archive")} />
            <Appbar.Action icon="email" onPress={() => console.tron.log("click email")} />
            <Appbar.Action icon="label" onPress={() => console.tron.log("click label")} />
            <Appbar.Action icon="delete" onPress={() => console.tron.log("click delete")} />
          </Appbar>
          <FAB icon="reply" onPress={() => console.tron.log("press fab")} style={styles.fab} />
        </View>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: transparent,
  },
  contentContainer: {
    paddingVertical: 8,
  },
  customColor: {
    backgroundColor: yellowA200,
  },
  fab: {
    position: "absolute",
    right: 16,
    top: -28,
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
