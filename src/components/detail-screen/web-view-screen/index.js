import React, { useState } from 'react';
import { Alert, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { WebView } from 'react-native-webview';
import { ERROR_TITLE, ERROR_CONNECTION, ERROR_COMMON } from 'react-native-dotenv'
import LoadingScreen from '../../loading-screen';
import StylesKitchen from '../../../styles-kitchen'

const WebViewScreen = () => {
	const [loading, setLoading] = useState(false)
	const route = useRoute()
	const theme = useTheme()
	const Styles = new StylesKitchen(theme)
	const webViewStyles = Styles.webViewStyles()
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

	const renderLoading = () => <LoadingScreen />

	return (
		<View style={webViewStyles.webViewContainer}>
			<WebView
				source={{ uri: url_screen }}
				// onLoadStart={onLoadStart}
				// onLoad={onLoad}
				startInLoadingState
				renderLoading={renderLoading}
				onError={onError}
				onHttpError={onHttpError}
			/>
		</View>
	)
}

export default WebViewScreen