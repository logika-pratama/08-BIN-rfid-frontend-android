import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, Alert, FlatList, View, Pressable } from 'react-native'
import { ERROR_TITLE } from 'react-native-dotenv'
import MenuScreen from '../menu-screen'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import InstanceServices from '../../services'
import StylesKitchen from '../../styles-kitchen'
import LoadingScreen from '../loading-screen'

const renderItem = (navigation, homeScreenStyles) => ({ item }) => {
  const {
    id,
    title,
    integration_module_screen,
    rfid_screen,
    table,
    table_headers,
    search_field,
    box,
    setting_url_form,
    confirm_button,
    config_menu_rfid_screen,
    url_screen
  } = item
  const onPress = () => {
    if (integration_module_screen) {
      return navigation.navigate('integration_module', {
        id,
        title,
        rfid_screen
      })
    } else {
      if (rfid_screen) {
        return navigation.navigate('detail', {
          id,
          title,
          rfid_screen,
          table,
          table_headers,
          search_field,
          box,
          setting_url_form,
          confirm_button,
          config_menu_rfid_screen
        })
      }
      else {
        return navigation.navigate('detail', {
          id,
          title,
          rfid_screen,
          url_screen
        })
      }
    }
  }

  return (
    <Pressable style={homeScreenStyles.homeButton} onPress={onPress}>
      <MenuScreen title={item.title} />
    </Pressable>
  )
}

const HomeScreen = () => {
  const [homeMenu, setHomeMenu] = useState([])
  const [loadingMenu, setLoadingMenu] = useState(false)
  const route = useRoute()
  const navigation = useNavigation()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const homeScreenStyles = Styles.homeScreenStyles()
  const { token } = route.params

  const Service = new InstanceServices()

  useEffect(() => {
    if (homeMenu) {
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
    }
  }, [homeMenu])

  useEffect(() => {
    const getHomeMenuList = async () => {
      setLoadingMenu(true)
      const resp = await Service.homeMenuList(token)

      if (resp.status) {
        if (resp.status === 200) {
          const data = resp.data?.data
          setHomeMenu(data)
        }
        else {
          if (resp.status === 401) {
            const message = resp.data.message
            Alert.alert(
              ERROR_TITLE,
              message
            )
          }
        }
      }
      else {
        const message = resp
        Alert.alert(
          ERROR_TITLE,
          message
        )
      }
      setLoadingMenu(false)
    }

    getHomeMenuList()
  }, [])

  const data = homeMenu

  if (loadingMenu) {
    <LoadingScreen />
  }

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