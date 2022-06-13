import React from 'react'
import { useRoute } from '@react-navigation/native'
import RfidScreen from './rfid-screen'
import WebViewScreen from './web-view-screen'

const DetailScreen = () => {
  const route = useRoute()
  const { rfid_screen } = route.params

  if (rfid_screen) {
    return <RfidScreen />
  } else {
    return <WebViewScreen />
  }
}

export default DetailScreen