import React, { Node } from 'react'
import { FlatList, View, StyleSheet, SafeAreaView } from "react-native"
import MenuScreen from "../menu-screen"
import { Colors } from '../../lib/styles';
import { NavbarHomeScreen } from '../navbar';

const data = [
  {
    id: 0,
    title: 'Stok Barang'
  },
  {
    id: 1,
    title: 'Memindai Barang'
  },
  {
    id: 2,
    title: 'Memindai Pemantauan dan Uji Material'
  },
  {
    id: 4,
    title: 'Gerbang Pemindaian'
  }
]

const renderItem = ({ item }) => {
  return (
    <MenuScreen title={item.title} />
  )
}

const HomeScreen = (): Node => {
  return (
    <View style={styles.homeScreenContainer}>
      {/* <NavbarHomeScreen /> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExractor={item => item.id} />
    </View>
  )
}

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1
  },
})

export default HomeScreen