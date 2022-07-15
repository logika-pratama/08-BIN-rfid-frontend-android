import React, { useState, useEffect } from 'react'
import { Alert, View, Text, ScrollView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { TextInput as TextInputPaper, useTheme, DataTable, Modal, Provider, Portal } from 'react-native-paper'
import decode from 'jwt-decode'
import { ITAM_API_URL, ITAM_TIME_OUT, ITAM_API_KEY, ERROR_TITLE } from 'react-native-dotenv'
import InstanceServices from '../../../services'
import Dropdown from 'react-native-paper-dropdown'
import StylesKitchen from '../../../styles-kitchen'
import { getEndPointSearch, getEndPointSPrint } from '../../../lib/function-ingredients'
import { Surface as Box, Button, Field, Notification } from '../../../lib/components-ingredients'
import LoadingScreen from '../../loading-screen'

// for testing
import DataStockTake from '../../../data-dummy/stock-take.json'
import DataMaterialTest from '../../../data-dummy/material-test.json'
import DataScanningItem from '../../../data-dummy/scanning-item.json'
import DataScanningMonitoring from '../../../data-dummy/scanning-monitoring.json'
// end 

const RfidScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const [data, setData] = useState([])
  const [searchField, setSearchField] = useState('')
  const [sPrintList, setSPrintList] = useState([])
  const [finalData, setFinalData] = useState([])
  const [urlList, setUrlList] = useState([])
  const [messageConfirm, setMessageConfirm] = useState('')
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [loadingUrlList, setLoadingUrlList] = useState(false)
  const [loadingSprintStockOpname, setLoadingSprintStockOpname] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [selectedSPrint, setSelectedSPrint] = useState('')

  const {
    title,
    dropdown,
    search_field,
    box,
    table_headers,
    table,
    confirm_button,
    setting_url_form,
    config_menu_rfid_screen,
    token
  } = route.params

  const { Device_ID: deviceId } = decode(token)
  const rfidScreenStyles = Styles.rfidScreenStyles(config_menu_rfid_screen)

  const enableStockOpname = config_menu_rfid_screen.enable_stock_opname || false
  const enableMaterialTest = config_menu_rfid_screen.enable_material_test || false
  const enableScanItem = config_menu_rfid_screen.enable_scan_item || false
  const enableScanMonitoring = config_menu_rfid_screen.enable_scan_monitoring || false
  const enableGateScanning = config_menu_rfid_screen.enable_gate_scanning || false
  const enableSetting = config_menu_rfid_screen.enable_setting || false

  const RfidService = new InstanceServices()
  const ItamService = new InstanceServices(ITAM_API_URL, ITAM_TIME_OUT, ITAM_API_KEY)

  const processToSendData = async searchField => {
    const lastCharSearchField = searchField.charAt(searchField.length - 1)

    if (lastCharSearchField === '\n') {
      const arrText = searchField.split('\n')
      const finalArrText = [... new Set(arrText)]

      if (finalArrText) {
        const filteredData = finalArrText.filter(el =>
          el && data.map(({ tag_number }) => {
            if (el !== tag_number) {
              return el
            }
          })
        )
        for (let i in filteredData) {
          const searchValue = filteredData[i]
          await sendData(config_menu_rfid_screen, searchValue, selectedSPrint)
        }
      }

      // clear feild search
      setSearchField('')
    }
  }

  const sendData = async (config_menu_rfid_screen, searchValue, selectedSPrint = null) => {
    const endPointSearch = getEndPointSearch(config_menu_rfid_screen, searchValue, selectedSPrint)
    if (enableGateScanning || enableStockOpname) {
      await RfidService.searchAdd(endPointSearch, token)
    } else {
      const resp = await RfidService.searchGet(endPointSearch, token)
      if (resp.status === 200) {
        const data = resp.data?.data
        setData(data)
      }
    }
  }

  const handleOpenDropdown = () => {
    setOpenDropdown(true)
  }

  const handleCloseDropdown = () => {
    setOpenDropdown(false)
  }

  const handlePressRow = () => {
    setOpenModal(true)
  }

  const handleFocus = (e) => {
    // trigger back button
  }

  const handleChangeSearchField = async e => {
    const text = e.nativeEvent.text
    setSearchField(text)
  }

  const handleChangeUrl = (selectedIndex, selectedMenuId, selectedTitle, finalUrlScreen) => {

    setUrlList(prevData => {
      const newData = [...prevData]

      newData[selectedIndex] = {
        'menu_id': selectedMenuId,
        'title': selectedTitle,
        'url_screen': finalUrlScreen
      }

      return newData
    })
  }

  const handleConfrim = async () => {
    if (enableGateScanning) {
      if (finalData) {
        const tags = finalData.map(({ tag_number }) => tag_number)
        const sendData = [...tags, deviceId].toString()
        const finalSendData = { 'tag': sendData }
        const resp = await RfidService.detailConfirm(finalSendData, token)

        if (resp.status === 200) {
          setFinalData([])
        }
      }
    } else if (enableSetting) {
      if (urlList) {
        const resp = await RfidService.uriUpdate(urlList, token)
        if (resp.status) {
          if (resp.status === 200) {
            const message = resp.data?.message
            setMessageConfirm(message)
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
        setLoadingConfirm(false)
      }
    }
  }

  const handleDismissNotification = () => {
    setMessageConfirm('')
  }

  useEffect(() => {
    navigation.setOptions({
      title
    })
  }, [])

  useEffect(() => {
    const getListSPrint = async (endPointSPrint) => {
      setLoadingSprintStockOpname(true)
      const resp = await ItamService.detailSPrintList(endPointSPrint, token)
      if (resp.status) {
        if (resp.status === 200) {
          let data = resp.data?.data

          data.forEach((el, idx) => {
            data[idx]['label'] = el?.name
            data[idx]['value'] = el?.name
          })

          setSPrintList(data)
        }

      }
      else {
        const message = resp
        Alert.alert(
          ERROR_TITLE,
          message
        )
      }
      setLoadingSprintStockOpname(false)
    }

    if ((enableStockOpname && dropdown) || (enableMaterialTest && dropdown)) {
      const endPointSPrint = getEndPointSPrint(config_menu_rfid_screen)
      getListSPrint(endPointSPrint)
    }
  }, [])

  useEffect(() => {
    if (searchField) {
      processToSendData(searchField)
    }
  }, [searchField])

  useEffect(() => {
    const getUrlList = async () => {
      setLoadingUrlList(true)
      const resp = await RfidService.detailUrlList(token)

      if (resp.status) {
        if (resp.status === 200) {
          const data = resp.data?.data
          setUrlList(data)
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
      setLoadingUrlList(false)
    }

    if (enableSetting) {
      getUrlList()
    }
  }, [])

  useEffect(() => {
    if (data) {

      if (!enableMaterialTest) { // this  if will be deleted if uji mat not testing
        data &&
          setFinalData(prevData => {
            const newData = data.filter(({ tag_number: tagCurr }) => !prevData.some(({ tag_number: tagPrev }) => tagPrev === tagCurr))
            return [...prevData, ...newData]
          })
      } // materialTest still using testing (dummy)
    }
  }, [data]) // for running

  useEffect(() => {
    if (enableMaterialTest) {
      setFinalData(DataMaterialTest)
    }
    // else if (enableStockOpname) {
    //   setFinalData(DataStockTake)
    // }
    // else if (enableScanItem) {
    //   setFinalData(DataScanningItem)
    // } else if (enableScanMonitoring) {
    //   setFinalData(DataScanningMonitoring)
    // }
  }, []) // for testing

  const countScan = finalData ? finalData.length : 0

  if (loadingUrlList || loadingConfirm) {
    return <LoadingScreen />
  }

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <View style={rfidScreenStyles.rfidScreenContainer} >
      {/* <Modal visible={openModal}
        // onDismiss={hideModal} 
        contentContainerStyle={containerStyle}
      >
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
      </Modal> */}

      {dropdown &&
        <View style={rfidScreenStyles.dropdownContainer}>
          <Dropdown
            label={"Surat Perintah"}
            mode={"outlined"}
            visible={openDropdown}
            showDropDown={handleOpenDropdown}
            onDismiss={handleCloseDropdown}
            value={selectedSPrint}
            setValue={setSelectedSPrint}
            list={sPrintList}
          />
        </View>
      }

      {enableStockOpname || enableMaterialTest ?
        search_field && !!selectedSPrint &&
        <View style={rfidScreenStyles.searchingContainer}>
          <TextInputPaper
            name='search'
            style={rfidScreenStyles.feildsStyle}
            autoFocus
            multiline
            autoComplete='off'
            onFocus={handleFocus}
            onChange={handleChangeSearchField}
            value={searchField}
            label={'Pindai'}
            placeholder={'Pindai'}
          />
        </View> : search_field &&
        <View style={rfidScreenStyles.searchingContainer}>
          <TextInputPaper
            name='search'
            style={rfidScreenStyles.feildsStyle}
            autoFocus
            multiline
            autoComplete='off'
            onFocus={handleFocus}
            onChange={handleChangeSearchField}
            value={searchField}
            label={'Pindai'}
            placeholder={'Pindai'}
          />
        </View>
      }

      {box &&
        <Box elevation={4}>
          <Text style={rfidScreenStyles.boxText}>
            Total: {countScan}
          </Text>
        </Box>
      }

      {
        table &&
        <ScrollView style={rfidScreenStyles.tableContainer}>

          <DataTable>

            {/* Table Header */}
            <DataTable.Header style={rfidScreenStyles.tableHeaders}>
              {table_headers.map(({ label: col }, idx) => {
                return <DataTable.Title key={idx}>
                  <Text style={rfidScreenStyles.tableHeadersTitleText}>
                    {col}
                  </Text>
                </DataTable.Title>
              })}
            </DataTable.Header>

            {/* Table Body */}
            {
              finalData?.map((row, idx) =>
                <DataTable.Row key={idx} onPress={handlePressRow}>
                  {table_headers?.map(({ name: col }, idx) => {
                    return <DataTable.Cell key={idx}>
                      <Text>
                        {row[col]}
                      </Text>
                    </DataTable.Cell>
                  })}
                </DataTable.Row>
              )
            }

          </DataTable>

        </ScrollView >
      }

      {
        setting_url_form && urlList &&
        urlList?.map((row, idx) => {
          return <Field
            key={idx}
            selectedIndex={idx}
            selectedMenuId={row.menu_id}
            selectedTitle={row.title}
            selectedUrlScreen={row.url_screen}
            changeUrl={handleChangeUrl} />
        })
      }

      {
        confirm_button &&
        <Button onPress={handleConfrim} text='Konfirmasi' customButtonStyles={rfidScreenStyles.buttonStyle} />
      }

      {
        !!messageConfirm &&
        <Notification visible={!!messageConfirm} duration={3000} message={messageConfirm} onDismiss={handleDismissNotification} />
      }

    </View >
  )
}

export default RfidScreen