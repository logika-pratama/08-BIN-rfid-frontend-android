import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, Alert, FlatList, View, Pressable } from 'react-native'
import MenuScreen from '../menu-screen'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import decode from 'jwt-decode'
import InstanceServices from '../../services'
import StylesKitchen from '../../styles-kitchen'
import LoadingScreen from '../loading-screen'

const dataMenu = [
  {
    "id": 6,
    "title": "Scanning Item",
    "integration_module_screen": false,
    "camera_action_ble": false,
    "camera_action_rfid": false,
    "dropdown": false,
    "table": true,
    "rfid_screen": true,
    "rfid_screen_secondary": true,
    "menu_order": 2,
    "box": true,
    "table_headers": [
      {
        "name": "asset_id",
        "label": "ID Asset"
      },
      {
        "name": "name_asset",
        "label": "Name Aset"
      }
    ],
    "search_field": true,
    "setting_url_form": false,
    "confirm_button": true,
    "confirm_text": "Clear",
    "config_menu_rfid_screen": {
      "enable_setting": false,
      "enable_scanning": false,
      "enable_scan_item": true,
      "enable_taging_ble": false,
      "enable_stock_opname": false,
      "enable_untaging_ble": false,
      "enable_gate_scanning": false,
      "enable_material_test": false,
      "enable_scan_monitoring": false
    },
    "url_screen": "",
    "roles": ["2", "3"]
  },
  {
    "id": 2,
    "title": "Stock Opname",
    "integration_module_screen": false,
    "camera_action_ble": false,
    "camera_action_rfid": false,
    "dropdown": false,
    "table": true,
    "rfid_screen": true,
    "rfid_screen_secondary": true,
    "menu_order": 2,
    "box": true,
    "table_headers": [
      {
        "name": "asset_id",
        "label": "ID Asset"
      },
      {
        "name": "name_asset",
        "label": "Name Aset"
      }
    ],
    "search_field": true,
    "setting_url_form": false,
    "confirm_button": false,
    "confirm_text": "",
    "config_menu_rfid_screen": {
      "enable_setting": false,
      "enable_scanning": false,
      "enable_scan_item": false,
      "enable_taging_ble": false,
      "enable_stock_opname": true,
      "enable_untaging_ble": false,
      "enable_gate_scanning": false,
      "enable_material_test": false,
      "enable_scan_monitoring": false
    },
    "url_screen": "",
    "roles": ["3"]
  }
]

const renderItem = (token, navigation, homeScreenStyles) => ({ item }) => {
  const {
    id,
    title,
    integration_module_screen,
    rfid_screen,
    camera_action_ble,
    camera_action_rfid,
    table,
    table_headers,
    dropdown,
    search_field,
    box,
    setting_url_form,
    confirm_button,
    confirm_text,
    config_menu_rfid_screen,
    url_screen,
    roles
  } = item

  const { role } = decode(token)

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
          camera_action_ble,
          camera_action_rfid,
          table,
          table_headers,
          dropdown,
          search_field,
          box,
          setting_url_form,
          confirm_button,
          confirm_text,
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

  if (roles.indexOf(role) !== -1) {
    return (
      <Pressable style={homeScreenStyles.homeButton} onPress={onPress}>
        <MenuScreen title={item.title} />
      </Pressable>
    )
  }

  return null
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

  const RfidService = new InstanceServices()

  // useEffect(() => {
  //   const requestCameraPermission = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log("You can use the camera");
  //       } else {
  //         console.log("Camera permission denied");
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }

  //   if (homeMenu) {
  //     requestCameraPermission()
  //   }
  // }, [homeMenu])

  useEffect(() => {
    const getHomeMenuList = async () => {
      // setLoadingMenu(true)
      // const resp = await RfidService.homeMenuList(token)

      // if (resp.status) {
      //   if (resp.status === 200) {
      //     const data = resp.data?.data
      //     setHomeMenu(data)
      //   }
      //   else {
      //     if (resp.status === 401) {
      //       const message = resp.data.message
      //       Alert.alert(
      //         ERROR_TITLE,
      //         message
      //       )
      //     }
      //   }
      // }
      // else {
      //   const message = resp
      //   Alert.alert(
      //     ERROR_TITLE,
      //     message
      //   )
      // }
      // setLoadingMenu(false)

      setHomeMenu(dataMenu)
    }

    getHomeMenuList()
  }, [])

  const data = homeMenu

  if (loadingMenu) {
    return <LoadingScreen />
  }

  return (
    <View style={homeScreenStyles.homeScreenContainer}>
      <FlatList
        data={data}
        renderItem={renderItem(token, navigation, homeScreenStyles)}
        keyExtractor={item => item.id} />
    </View>
  )
}

export default HomeScreen