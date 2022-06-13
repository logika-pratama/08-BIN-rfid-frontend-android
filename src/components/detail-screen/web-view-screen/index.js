import React, { useState } from 'react';
import { Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { WebView } from 'react-native-webview';
import { ERROR_TITLE, ERROR_CONNECTION, ERROR_COMMON } from 'react-native-dotenv'
import LoadingScreen from '../../loading-screen';

const WebViewScreen = () => {
	const [loading, setLoading] = useState(false)
	const route = useRoute()
	const { url_screen } = route.params

	const onLoadStart = () => {
		setLoading(true)
	}
	const onLoad = () => {
		setLoading(false)
	}

	const onError = () => {
		Alert.alert(
			ERROR_TITLE,
			ERROR_COMMON
		)
	}

	const onHttpError = () => {
		Alert.alert(
			ERROR_TITLE,
			ERROR_CONNECTION
		)
	}

	if (loading) {
		return <LoadingScreen />
	}

	return (
		<WebView
			source={{ uri: url_screen }}
			// onLoadStart={onLoadStart}
			// onLoad={onLoad}
			onError={onError}
			onHttpError={onHttpError}
		/>
	)
}

export default WebViewScreen