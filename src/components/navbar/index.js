import React, { Node } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useAuth } from '../../contexts'
import StylesFactory from '../../styles-kitchen'
import { Button } from '../../lib/components-ingredients'

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

const NavbarHomeScreen = (): Node => {
  const { deleteToken } = useAuth()
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const navBarStyles = Styles.navBarStyles()

  const handleLogout = async () => {
    await deleteToken()
  }

  return (
    <View style={navBarStyles.navbarContainer}>
      <Section style={navBarStyles.sectionContainer} childStyle={navBarStyles.sectionChildren}>
        <Text>
          Bahasa
        </Text>
        <Button onPress={handleLogout} text="Logout" />
      </Section>
    </View>
  )
}

export { NavbarHomeScreen }