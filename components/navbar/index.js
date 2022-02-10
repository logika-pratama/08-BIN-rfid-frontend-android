import React, { Node } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../lib/styles';

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
  return (
    <View style={styles.navbarContainer}>
      <Section style={styles.sectionContainer} childStyle={styles.sectionChildren}>
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

const styles = StyleSheet.create({
  navbarContainer: {
    flex: .1,
    backgroundColor: Colors.primary,
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: 24
  },
  sectionChildren: {
    marginRight: 8
  }
})