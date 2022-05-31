import React from 'react'
import { FlatList, View, Pressable } from 'react-native'
import MenuScreen from '../menu-screen'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import decode from 'jwt-decode'
import { BLE_URL, ITAM_URL, ERROR_TITLE, ERROR_CONNECTION, ERROR_COMMON } from 'react-native-dotenv'
import StylesKitchen from '../../styles-kitchen'

const selectIntegrationModuleScreen = (Device_ID) => {
	let homeScreen = [
		{
			id: 0,
			title: 'Catat Stok',
			urlScreen: '',
			alertUrlEorrTitle: '',
			alertUrlErrorConnection: '',
			alertUrlErrorCommon: '',
			endPointSearch: searchText => `/stoktake?asset_id=${encodeURIComponent(searchText)}`,
			tableHeaders: [{
				'noRfid': 'ID Aset',
				'name': 'Nama Aset',
				'codeSakti': 'Kode SAKTI',
				// 'Kode Barang'
			}],
			enableSearch: true,
			enableTable: true,
			enableConfirm: false,
			outScreen: false
		},
		{
			urlScreen: '',
			alertUrlEorrTitle: '',
			alertUrlErrorConnection: '',
			alertUrlErrorCommon: '', id: 1,
			title: 'Memindai Barang',
			urlScreen: '',
			endPointSearch: searchText => `/item/search?asset_id=${encodeURIComponent(searchText)}`,
			tableHeaders: [{
				'noRfid': 'ID Aset',
				// 'Jumlah',
				// 'SKU',
				// 'Kode Barang',
				'nama': 'Nama Aset',
				// 'Deskripsi',
				// 'Satuan'
			}],
			enableSearch: true,
			enableTable: true,
			enableConfirm: false,
			outScreen: false
		},
		{
			id: 2,
			title: 'Pengecekan Barang',
			urlScreen: '',
			alertUrlEorrTitle: '',
			alertUrlErrorConnection: '',
			alertUrlErrorCommon: '',
			endPointSearch: searchText => `/tm/search?asset_id=${encodeURIComponent(searchText)}`,
			tableHeaders: [{
				'noRfid': 'ID Aset',
				// 'Jumlah',
				// 'SKU',
				// 'Kode Barang',
				'nama': 'Nama Aset',
				// 'Deskripsi',
				// 'Satuan',
				'lokasi': 'Lokasi',
				// 'Waktu Pantau'
			}],
			enableSearch: true,
			enableTable: true,
			enableConfirm: false,
			outScreen: false
		}
	]

	const deviceScreen = {
		id: 3,
		title: 'Gerbang Pemindaian',
		urlScreen: '',
		alertUrlEorrTitle: '',
		alertUrlErrorConnection: '',
		alertUrlErrorCommon: '',
		endPointSearch: searchText => `/gatescan?tag_number=${encodeURIComponent(searchText)}`,
		tableHeaders: [{
			'noRfid': 'ID Aset',
			'nama': 'Nama Aset'
		}],
		enableSearch: true,
		enableTable: false,
		enableConfirm: false,
		outScreen: false
	}

	const itamScreen = {
		id: 4,
		title: 'Aset Gudang',
		urlScreen: ITAM_URL,
		alertUrlEorrTitle: ERROR_TITLE,
		alertUrlErrorConnection: ERROR_CONNECTION,
		alertUrlErrorCommon: ERROR_COMMON,
		endPointSearch: searchText => searchText,
		tableHeaders: [],
		enableSearch: false,
		enableTable: false,
		enableConfirm: false,
		outScreen: true
	}

	const bleScreen = {
		id: 5,
		title: 'Penandaan',
		urlScreen: BLE_URL,
		alertUrlEorrTitle: ERROR_TITLE,
		alertUrlErrorConnection: ERROR_CONNECTION,
		alertUrlErrorCommon: ERROR_COMMON,
		endPointSearch: searchText => searchText,
		tableHeaders: [],
		enableSearch: false,
		enableTable: false,
		enableConfirm: false,
		outScreen: true
	}

	homeScreen = Device_ID ? [...homeScreen, deviceScreen, itamScreen, bleScreen] : [...homeScreen, itamScreen, bleScreen]

	return homeScreen
}

const renderItem = (navigation, homeScreenStyles) => ({ item }) => {
	const {
		id,
		title,
		urlScreen,
		alertUrlEorrTitle,
		alertUrlErrorConnection,
		alertUrlErrorCommon,
		endPointSearch,
		tableHeaders,
		enableSearch,
		enableTable,
		enableConfirm,
		outScreen } = item
	const onPress = () => {
		return navigation.navigate('detail', {
			id,
			title,
			urlScreen,
			alertUrlEorrTitle,
			alertUrlErrorConnection,
			alertUrlErrorCommon,
			endPointSearch,
			tableHeaders,
			enableSearch,
			enableTable,
			enableConfirm,
			outScreen
		})
	}

	return (
		<Pressable style={homeScreenStyles.homeButton} onPress={onPress}>
			<MenuScreen title={item.title} />
		</Pressable>
	)
}

const IntegrationModuleScreen = () => {
	const route = useRoute()
	const navigation = useNavigation()
	const theme = useTheme()
	const Styles = new StylesKitchen(theme)
	const integrationModuleScreenStyles = Styles.integrationModuleScreenStyles()
	const { token } = route.params
	const { Device_ID } = decode(token)

	const data = selectIntegrationModuleScreen(Device_ID)

	return (
		<View style={integrationModuleScreenStyles.integrationModuleScreenContainer}>
			<FlatList
				data={data}
				renderItem={renderItem(navigation, integrationModuleScreenStyles)}
				keyExtractor={item => item.id} />
		</View>
	)
}

export default IntegrationModuleScreen