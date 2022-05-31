import React from 'react'
import { useRoute } from '@react-navigation/native'
import RfidScreen from './rfid-screen'
import OutScreen from './out-screen'

const DetailScreen = () => {
  const route = useRoute()
  const { outScreen } = route.params

  if (outScreen) {
    return <OutScreen />
  } else {
    return <RfidScreen />
  }
}

export default DetailScreen