import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { GradientBackground, Header, Screen } from "../components"
import { PrescriptionNavigatorParamList } from "../navigators/Prescription.navigator"
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

export const PrescriptionScreen: FC<
  StackScreenProps<PrescriptionNavigatorParamList, "prescription">
> = observer(function PrescriptionScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { prescriptionStore } = useStores()

  // const fetchData = useCallback(async () => {
  //   await prescriptionStore.listPrescription()
  // }, [])

  // const renderItem = useCallback(
  //   ({ item }) => (
  //     <View style={LIST_CONTAINER}>
  //       <Text style={LIST_TEXT}>{item.name}</Text>
  //     </View>
  //   ),
  //   [],
  // )

  // useEffect(() => {
  //   fetchData()
  // }, [fetchData])

  return (
    <View testID="PrescriptionScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="prescriptionScreen.title"
          leftIcon="back"
          onLeftPress={navigation.goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        {/* <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...prescriptionStore.items]}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
          /> */}
      </Screen>
    </View>
  )
})
