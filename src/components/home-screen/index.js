import React, { Node } from 'react'
import { FlatList, View, Pressable } from 'react-native'
import MenuScreen from '../menu-screen'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import decode from 'jwt-decode'
import StylesKitchen from '../../styles-kitchen'

const selectHomeScreen = (Device_ID) => {
  let homeScreen = [
    {
      id: 0,
      title: 'Catat Stok',
      endPointSearch: searchText => `/stoktake?asset_id=${encodeURIComponent(searchText)}`,
      tableHeaders: [{
        'noRfid': 'ID Asset',
        'jml': 'Jumlah',
        'sku': 'No. SAKTI',
        // 'Kode Barang'
      }],
      enableSearch: true,
      enableTable: true,
      enableConfirm: false
    },
    {
      id: 1,
      title: 'Memindai Barang',
      endPointSearch: searchText => `/item/search?asset_id=${encodeURIComponent(searchText)}`,
      tableHeaders: [{
        'noRfid': 'ID Asset',
        // 'Jumlah',
        // 'SKU',
        // 'Kode Barang',
        'nama': 'Nama Aseet',
        // 'Deskripsi',
        // 'Satuan'
      }],
      enableSearch: true,
      enableTable: true,
      enableConfirm: false
    },
    {
      id: 2,
      title: 'Pengecekan Barang',
      endPointSearch: searchText => `/tm/search?asset_id=${encodeURIComponent(searchText)}`,
      tableHeaders: [{
        'noRfid': 'ID Asset',
        // 'Jumlah',
        // 'SKU',
        // 'Kode Barang',
        'nama': 'Nama Asset',
        // 'Deskripsi',
        // 'Satuan',
        'lokasi': 'Lokasi',
        // 'Waktu Pantau'
      }],
      enableSearch: true,
      enableTable: true,
      enableConfirm: false
    }
  ]

  const deviceScreen = {
    id: 3,
    title: 'Gerbang Pemindaian',
    endPointSearch: searchText => `/gatescan?tag_number=${encodeURIComponent(searchText)}`,
    tableHeaders: [{
      'noRfid': 'ID Asset',
      'nama': 'Nama Asset'
    }],
    enableSearch: true,
    enableTable: false,
    enableConfirm: false
  }

  homeScreen = Device_ID ? [...homeScreen, deviceScreen] : homeScreen

  return homeScreen
}

const renderItem = (navigation, homeScreenStyles) => ({ item }) => {
  const { id, title, endPointSearch, tableHeaders, enableSearch, enableTable, enableConfirm } = item
  const onPress = () => {
    return navigation.navigate('detail', {
      id,
      title,
      endPointSearch,
      tableHeaders,
      enableSearch,
      enableTable,
      enableConfirm
    })
  }

  return (
    <Pressable style={homeScreenStyles.homeButton} onPress={onPress}>
      <MenuScreen title={item.title} />
    </Pressable>
  )
}

const HomeScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const homeScreenStyles = Styles.homeScreenStyles()
  const { token } = route.params
  const { Device_ID } = decode(token)

  const data = selectHomeScreen(Device_ID)

  return (
    <View style={homeScreenStyles.homeScreenContainer}>
      <FlatList
        data={data}
        renderItem={renderItem(navigation, homeScreenStyles)}
        keyExtractor={item => item.id} />
    </View>
  )
}

export default HomeScreen