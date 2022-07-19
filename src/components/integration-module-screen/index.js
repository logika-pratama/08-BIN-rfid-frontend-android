import React, { useState, useEffect } from 'react'
import { Alert, FlatList, View, Pressable } from 'react-native'
import { ERROR_TITLE } from 'react-native-dotenv'
import MenuScreen from '../menu-screen'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import InstanceServices from '../../services'
import StylesKitchen from '../../styles-kitchen'
import LoadingScreen from '../loading-screen'

const renderItem = (navigation, integrationModuleScreenStyles) => ({ item }) => {
  const {
    id,
    title,
    integration_module_screen,
    rfid_screen,
    table,
    table_headers,
    search_field,
    dropdown,
    box,
    confirm_button,
    setting_url_form,
    config_menu_rfid_screen,
    url_screen
  } = item

  const onPress = () => {
    return navigation.navigate('detail', {
      id,
      title,
      rfid_screen,
      table,
      table_headers,
      search_field,
      dropdown,
      box,
      setting_url_form,
      confirm_button,
      config_menu_rfid_screen,
      url_screen
    })
  }

  if (integration_module_screen)
    return (
      <Pressable style={integrationModuleScreenStyles.homeButton} onPress={onPress}>
        <MenuScreen title={item.title} />
      </Pressable>
    )
}

const IntegrationModuleScreen = () => {
  const [integrationModuleMenu, setIntegrationModuleMenu] = useState([])
  const [loadingMenu, setLoadingMenu] = useState(false)
  const route = useRoute()
  const navigation = useNavigation()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const integrationModuleScreenStyles = Styles.integrationModuleScreenStyles()
  const { token } = route.params

  const RfidService = new InstanceServices()

  useEffect(() => {
    const getIntegrationModuleMenuList = async () => {
      setLoadingMenu(true)
      const resp = await RfidService.integrationModuleMenuList(token)

      if (resp.status) {
        if (resp.status === 200) {
          const data = resp.data?.data
          setIntegrationModuleMenu(data)
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

    getIntegrationModuleMenuList()
  }, [])

  const data = integrationModuleMenu

  if (loadingMenu) {
    return <LoadingScreen />
  }

  return (
    <View style={integrationModuleScreenStyles.integrationModuleScreenContainer}>
      <FlatList
        data={data}
        renderItem={renderItem(navigation, integrationModuleScreenStyles)}
        keyExtractor={item => item.id} />
    </View>
  )
}

export default IntegrationModuleScreen