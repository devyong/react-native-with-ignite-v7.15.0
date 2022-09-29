import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../storybook/views"
import { color } from "../theme"
import ScreenWrapper from "./ScreenWrapper"

storiesOf("ScreenWraper", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ScreenWrapper style={{ backgroundColor: color.error }}>
          {/* Add your component inside */}
        </ScreenWrapper>
      </UseCase>
    </Story>
  ))
