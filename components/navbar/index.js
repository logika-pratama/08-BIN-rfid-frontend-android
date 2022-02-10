import React, { Node } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-vector-icons/FontAwesome';
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

const Navbar = (): Node => {
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
    backgroundColor: Colors.primary,
    height: '3%'
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    marginRight: '3%'
  },
  sectionChildren: {
    marginRight: '3%'
  }
})

export default Navbar