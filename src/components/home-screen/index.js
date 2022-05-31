import React, { useEffect } from 'react'
import { PermissionsAndroid, FlatList, View, Pressable } from 'react-native'
import MenuScreen from '../menu-screen'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import decode from 'jwt-decode'
import { TRACKING_3D_URL, ADMIN_URL } from 'react-native-dotenv'
import StylesKitchen from '../../styles-kitchen'

const selectHomeScreen = (role) => {
  let homeScreen = [
    {
      id: 0,
      title: 'Tracking 3D',
      urlScreen: TRACKING_3D_URL,
      outScreen: true
    },
    {
      id: 1,
      title: 'Admin',
      urlScreen: ADMIN_URL,
      outScreen: true,
    },
    {
      id: 2,
      title: 'Integration Module',
      urlScreen: '',
      outScreen: false
    }
  ]

  const superAdminScreen = {
    id: 3,
    title: 'Setting',
    urlScreen: '',
    outScreen: false
  }

  homeScreen = role === '1' ? [...homeScreen, superAdminScreen] : homeScreen

  return homeScreen
}

const renderItem = (navigation, homeScreenStyles) => ({ item }) => {
  const {
    id,
    title,
    urlScreen,
    outScreen
  } = item
  const onPress = () => {
    if (outScreen) {
      return navigation.navigate('detail', {
        id,
        title,
        urlScreen,
        outScreen
      })
    } else {
      return navigation.navigate('integration_module', {
        id,
        title,
        urlScreen,
        outScreen
      })
    }
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
  const { role } = decode(token)

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }

    requestCameraPermission()
  }, [])

  const data = selectHomeScreen(role)

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