import React, { useState } from 'react';
import { Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { WebView } from 'react-native-webview';
import LoadingScreen from '../../loading-screen';

const OutScreen = () => {
	const [loading, setLoading] = useState(false)
	const route = useRoute()
	const {
		urlScreen,
		alertUrlEorrTitle,
		alertUrlErrorConnection,
		alertUrlErrorCommon,
	} = route.params

	const onLoadStart = () => {
		setLoading(true)
	}
	const onLoad = () => {
		setLoading(false)
	}

	const onError = () => {
		Alert.alert(
			alertUrlEorrTitle,
			alertUrlErrorCommon
		)
	}

	const onHttpError = () => {
		Alert.alert(
			alertUrlEorrTitle,
			alertUrlErrorConnection
		)
	}

	if (loading) {
		return <LoadingScreen />
	} else {
		return (
			<WebView
				source={{ uri: urlScreen }}
				// onLoadStart={onLoadStart}
				// onLoad={onLoad}
				onError={onError}
				onHttpError={onHttpError}
			/>
		)
	}
}

export default OutScreen