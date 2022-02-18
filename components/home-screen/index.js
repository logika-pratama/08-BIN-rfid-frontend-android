import React, { Node } from 'react'
import { FlatList, View, Pressable } from "react-native"
import { API_URL } from 'react-native-dotenv'
import MenuScreen from "../menu-screen"
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import StylesFactory from '../../styles-factory'
import { NavbarHomeScreen } from '../navbar';

const data = [
  {
    id: 0,
    title: 'Stok Barang',
    url: searchText => `${API_URL}/api/v1/stoktake/${encodeURIComponent(searchText)}`
  },
  {
    id: 1,
    title: 'Memindai Barang',
    url: searchText => `${API_URL}/api/v1/item/search/${encodeURIComponent(searchText)}`
  },
  {
    id: 2,
    title: 'Memilih',
    url: searchText => `${API_URL}/api/v1/tm/search/${encodeURIComponent(searchText)}`
  },
  {
    id: 3,
    title: 'Gerbang Pemindaian',
    url: `${API_URL}/api/v1/gatescan`
  }
]

const renderItem = (navigation) => ({ item }) => {
  const onPress = () => {
    return navigation.navigate('detail', { title: item.title, url: item.url })
  }

  return (
    <Pressable onPress={onPress}>
      <MenuScreen title={item.title} />
    </Pressable>
  )
}

const HomeScreen = (): Node => {
  const navigation = useNavigation()
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const homeScreenStyles = Styles.homeScreenStyles()

  return (
    <View style={homeScreenStyles.homeScreenContainer}>
      {/* <NavbarHomeScreen /> */}
      <FlatList
        data={data}
        renderItem={renderItem(navigation)}
        keyExractor={item => item.id} />
    </View>
  )
}

export default HomeScreen