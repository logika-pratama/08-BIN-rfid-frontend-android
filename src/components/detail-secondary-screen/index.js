import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Surface } from '../../lib/components-ingredients'
import StylesKitchen from '../../styles-kitchen'

const DetailSecondaryScreen = () => {
	const route = useRoute()
	const navigation = useNavigation()
	const theme = useTheme()

	const {
		title,
		photo,
		serial_number = '',
		name_asset = '',
		model = '',
		manufactured = '',
		tahun_pengadaan = '',
		batas_garansi = '',
		kondisi = '',
		harwat_terakhir = '',
		vendor_harwat = ''
	} = route.params

	const Styles = new StylesKitchen(theme)
	const rfidSecondaryScreenStyles = Styles.rfidSecondaryScreenStyles()

	useEffect(() => {
		navigation.setOptions({
			title
		})
	}, [])

	return <View style={rfidSecondaryScreenStyles.rfidSecondaryScreenContainer}>
		<Surface elevation={7} customSurfaceStyle={rfidSecondaryScreenStyles.imageContainer}>
			<Image source={{ uri: photo }} style={rfidSecondaryScreenStyles.imageStyle} />
		</Surface>
		<Surface elevation={3} customSurfaceStyle={rfidSecondaryScreenStyles.contentContainer}>
			<Text style={rfidSecondaryScreenStyles.contentStyle}>
				{'Serial Number: ' + serial_number}
			</Text>
			<Text style={rfidSecondaryScreenStyles.contentStyle}>
				{'Name Asset: ' + name_asset}
			</Text>
			<Text style={rfidSecondaryScreenStyles.contentStyle}>
				{'Model: ' + model}
			</Text>
			<Text style={rfidSecondaryScreenStyles.contentStyle}>
				{'Manufactured: ' + manufactured}
			</Text>
			<Text style={rfidSecondaryScreenStyles.contentStyle}>
				{'Tahun Pengadaan: ' + tahun_pengadaan}
			</Text>
			<Text style={rfidSecondaryScreenStyles.contentStyle}>
				{'Batas Garansi: ' + batas_garansi}
			</Text>
			<Text style={rfidSecondaryScreenStyles.contentStyle}>
				{'Kondisi: ' + kondisi}
			</Text>
			<Text style={rfidSecondaryScreenStyles.contentStyle}>
				{'Harwat Terakhir: ' + harwat_terakhir}
			</Text>
			<Text style={rfidSecondaryScreenStyles.contentStyle}>
				{'Vendor Harwat: ' + vendor_harwat}
			</Text>
		</Surface>
	</View >
}

export default DetailSecondaryScreen