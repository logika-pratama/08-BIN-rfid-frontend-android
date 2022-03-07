import React, { Node } from 'react'
import { FlatList, View, Pressable } from 'react-native'
import MenuScreen from "../menu-screen"
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import StylesFactory from '../../styles-factory'
import { NavbarHomeScreen } from '../navbar';

const data = [
  {
    id: 0,
    title: 'Pencatatan Stok',
    endPoint: searchText => `/stoktake/${encodeURIComponent(searchText)}`,
    tableHeaders: ['Nomor RFID', 'Jumlah', 'SKU', 'Kode Barang'],
    enableSearch: true,
    enableConfirm: false
  },
  {
    id: 1,
    title: 'Memindai Barang',
    endPoint: searchText => `/item/search/${encodeURIComponent(searchText)}`,
    tableHeaders: [
      'Nomor RFID',
      'Jumlah',
      'SKU',
      'Kode Barang',
      'Nama',
      'Deskripsi',
      'Satuan'
    ],
    enableSearch: true,
    enableConfirm: false
  },
  {
    id: 2,
    title: 'Pengecekan Barang',
    endPoint: searchText => `/tm/search/${encodeURIComponent(searchText)}`,
    tableHeaders: [
      'Nomor RFID',
      'Jumlah',
      'SKU',
      'Kode Barang',
      'Nama',
      'Deskripsi',
      'Satuan',
      'Nomor Baris',
      'Nomor Rak',
      'Nomor Kotak',
      'Waktu Pantau'
    ],
    enableSearch: true,
    enableConfirm: false
  },
  {
    id: 3,
    title: 'Gerbang Pemindaian',
    endPoint: `/gatescan`,
    tableHeaders: ['Nomor RFID'],
    enableSearch: false,
    enableConfirm: true
  }
]

const renderItem = (navigation) => ({ item }) => {
  const { title, endPoint, tableHeaders, enableSearch, enableConfirm } = item
  const onPress = () => {
    return navigation.navigate('detail', {
      title,
      endPoint,
      tableHeaders,
      enableSearch,
      enableConfirm
    })
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
        keyExtractor={item => item.id} />
    </View>
  )
}

export default HomeScreen