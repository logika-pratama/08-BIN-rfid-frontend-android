import React, { Node } from 'react'
import { Text, View, StyleSheet } from "react-native"

const MenuScreen = ({ title }): Node => {
  return (
    <View style={styles.menuScreenContainer}>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  menuScreenContainer: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
  }
})

export default MenuScreen