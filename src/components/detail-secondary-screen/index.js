import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Surface } from '../../lib/components-ingredients'

const DetailSecondaryScreen = () => {
	const route = useRoute()
	const navigation = useNavigation()

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

	useEffect(() => {
		navigation.setOptions({
			title
		})
	}, [])

	return <View>
		<Surface elevation={7}>
			<Text>
				{'foto'}
			</Text>
		</Surface>
		<Surface elevation={4}>
			<Text>
				{serial_number}
			</Text>
			<Text>
				{name_asset}
			</Text>
			<Text>
				{model}
			</Text>
			<Text>
				{manufactured}
			</Text>
			<Text>
				{tahun_pengadaan}
			</Text>
			<Text>
				{batas_garansi}
			</Text>
			<Text>
				{kondisi}
			</Text>
			<Text>
				{harwat_terakhir}
			</Text>
			<Text>
				{vendor_harwat}
			</Text>
		</Surface>
	</View >
}

export default DetailSecondaryScreen