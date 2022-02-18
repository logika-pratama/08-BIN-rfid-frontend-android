import React, { Node } from 'react'
import { View, Text } from 'react-native'
import StylesFactory from '../../styles-factory'

const Section = ({ children, childStyle, ...viewProps }): Node => {
  return (
    <View {...viewProps}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          style: [child.props.style, childStyle]
        })
      )}
    </View>
  )
}

export const NavbarHomeScreen = (): Node => {
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const navBarStyles = Styles.navBarStyles()
  return (
    <View style={navBarStyles.navbarContainer}>
      <Section style={navBarStyles.sectionContainer} childStyle={navBarStyles.sectionChildren}>
        <Text>
          Bahasa
        </Text>
        <Text>
          Keluar
        </Text>
      </Section>
    </View>
  )
}