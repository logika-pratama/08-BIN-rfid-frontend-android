import React, { useState, useEffect } from 'react'
import { Alert, View, Text, ScrollView, PermissionsAndroid, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { TextInput as TextInputPaper, useTheme, DataTable } from 'react-native-paper'
import Dropdown from 'react-native-paper-dropdown'
import decode from 'jwt-decode'
import {
  ITAM_API_URL_STAGING,
  ITAM_TIME_OUT,
  ITAM_API_KEY,
  ITAT_API_URL,
  ITAT_TIME_OUT,
  ERROR_TITLE,
  INIT_QR_CODE,
  DEFAULT_QR_CODE_BLE,
  DEFAULT_QR_CODE_RFID,
} from 'react-native-dotenv'
import { useCameraDevices, Camera } from 'react-native-vision-camera'
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner'
import moment from 'moment'
import InstanceServices from '../../../services'
import StylesKitchen from '../../../styles-kitchen'
import { getEndPointSearch, getEndPointSPrint, pushWithoutDuplicate } from '../../../lib/function-ingredients'
import { Surface, Box, Button, Field, Notification, MultipleNotifications } from '../../../lib/components-ingredients'
import LoadingScreen from '../../loading-screen'

// for testing
import DataMaterialTest from '../../../data-dummy/material-test.json'
// end 

const RfidScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const [activeCameraBle, setActiveCameraBle] = useState(false)
  const [activeCameraRfid, setActiveCameraRfid] = useState(false)
  const [qrCodeBle, setQrCodeBle] = useState([])
  const [qrCodeRfid, setQrCodeRfid] = useState([])
  const [checkPermissionCamera, setCheckPermissionCamera] = useState(false)
  const [searchField, setSearchField] = useState('')
  const [sPrintList, setSPrintList] = useState([])
  const [finalData, setFinalData] = useState([])
  const [urlList, setUrlList] = useState([])
  const [messageConfirm, setMessageConfirm] = useState('')
  const [messagesConfirm, setMessagesConfirm] = useState([])
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [loadingUrlList, setLoadingUrlList] = useState(false)
  const [loadingSprintStockOpname, setLoadingSprintStockOpname] = useState(false)
  const [loadingScanQrCodeBle, setLoadingScanQrCodeBle] = useState(false)
  const [loadingScanQrCodeRfid, setLoadingScanQrCodeRfid] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [selectedSPrint, setSelectedSPrint] = useState('')

  const {
    title,
    camera_action_ble,
    camera_action_rfid,
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

  const devices = useCameraDevices()
  const device = devices.back

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  })

  const { Device_ID: deviceId } = decode(token)
  const rfidScreenStyles = Styles.rfidScreenStyles()

  const enableStockOpname = config_menu_rfid_screen.enable_stock_opname || false
  const enableMaterialTest = config_menu_rfid_screen.enable_material_test || false
  const enableGateScanning = config_menu_rfid_screen.enable_gate_scanning || false
  const enableSetting = config_menu_rfid_screen.enable_setting || false
  const enableScanning = config_menu_rfid_screen.enable_scanning || false
  const enableTagingBle = config_menu_rfid_screen.enable_taging_ble || false
  const enableUntagingBle = config_menu_rfid_screen.enable_untaging_ble || false

  const RfidService = new InstanceServices()
  const ItamService = new InstanceServices(ITAM_API_URL_STAGING, ITAM_TIME_OUT, ITAM_API_KEY) // trough it am
  const ItatService = new InstanceServices(ITAT_API_URL, ITAT_TIME_OUT) // trough it at ble

  let qrCodeBleValue = INIT_QR_CODE,
    qrCodeRfidValue = INIT_QR_CODE

  const processToSendData = async searchField => {
    const lastCharSearchField = searchField.charAt(searchField.length - 1)

    if (lastCharSearchField === '\n') {
      const arrText = searchField.split('\n')
      const finalArrText = [... new Set(arrText)]

      if (finalArrText) {
        const filteredData = finalArrText.filter(el => {
          if (enableScanning) {
            return el && finalData.map(({ rfid_tag }) => {
              if (el !== rfid_tag) {
                return el
              }
            })
          }
          else {
            return el && finalData.map(({ asset_id }) => {
              if (el !== asset_id) {
                return el
              }
            })
          }
        })

        for (let i in filteredData) {
          const searchValue = filteredData[i]

          if (enableScanning) {
            const data = [{
              "rfid_tag": searchValue,
            }]

            setFinalData(prevData => {
              const newData = data.filter(({ rfid_tag: tagCurr }) => !prevData.some(({ rfid_tag: tagPrev }) => tagPrev === tagCurr))
              return [...prevData, ...newData]
            })
          }
          else {
            await sendData(config_menu_rfid_screen, searchValue, selectedSPrint)
          }
        }
      }

      // clear feild search
      setSearchField('')
    }
  }

  const sendData = async (config_menu_rfid_screen,
    searchValue,
    selectedSPrint = null,
    activeCameraBle = false,
    activeCameraRfid = false) => {
    const endPointSearch = getEndPointSearch(config_menu_rfid_screen, searchValue, selectedSPrint, activeCameraBle, activeCameraRfid)
    // if (enableGateScanning || enableStockOpname) { // for testing
    if (enableGateScanning || enableStockOpname || enableMaterialTest) { // for running
      await RfidService.searchAdd(endPointSearch, token)
    } else {
      const resp = await RfidService.searchGet(endPointSearch, token)

      if (enableTagingBle || enableUntagingBle) {
        if (activeCameraBle) {
          if (resp?.status === 200) {
            const data = resp.data?.data
            // waiting for api detail ble, done
            setQrCodeBle(data)
          } else if (resp?.status === 404) {
            // waiting for api detail ble, done
            const newData = [{
              tag_id: DEFAULT_QR_CODE_BLE
            }]
            setQrCodeBle(newData)
          }
        } else if (activeCameraRfid) {
          if (resp?.status === 200) {
            const data = resp.data?.data
            setQrCodeRfid(data)
          } else if (resp?.status === 404) {
            const newData = [{
              asset_id: DEFAULT_QR_CODE_RFID
            }]
            setQrCodeRfid(newData)
          }
        }
      } else {
        if (resp?.status === 200) {
          const data = resp.data?.data
          setFinalData(prevData => {
            const newData = data.filter(({ asset_id: tagCurr }) => !prevData.some(({ asset_id: tagPrev }) => tagPrev === tagCurr))
            return [...prevData, ...newData]
          })
        }
      }
    }
  }

  const handleCameraBle = () => {
    setActiveCameraBle(true)
    setActiveCameraRfid(false)
  }

  const handleCameraRfid = () => {
    setActiveCameraBle(false)
    setActiveCameraRfid(true)
  }

  const handleOpenDropdown = () => {
    setOpenDropdown(true)
  }

  const handleCloseDropdown = () => {
    setOpenDropdown(false)
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
    setLoadingConfirm(true)
    if (enableGateScanning) {
      if (finalData) {
        const tags = finalData.map(({ asset_id }) => asset_id)
        const sendTags = [...tags, deviceId].toString()
        const finalSendTags = { 'tag': sendTags }
        const resp = await RfidService.detailConfirm(finalSendTags, token)

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
              const message = resp.data?.message
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
      }
    } else if (enableTagingBle) {
      if (qrCodeBle.length > 0 && qrCodeRfid.length > 0) {
        const tagId = qrCodeBle[0]?.tag_id,
          nameTag = qrCodeBle[0]?.name_tag

        const assetId = qrCodeRfid[0]?.asset_id,
          nameAsset = qrCodeRfid[0]?.name_asset

        if (tagId === DEFAULT_QR_CODE_BLE || assetId === DEFAULT_QR_CODE_RFID) {
          if (tagId === DEFAULT_QR_CODE_BLE) {
            setMessagesConfirm(messages => {
              return pushWithoutDuplicate(messages, DEFAULT_QR_CODE_BLE)
            })
          }
          if (assetId === DEFAULT_QR_CODE_RFID) {
            setMessagesConfirm(messages => {
              return pushWithoutDuplicate(messages, DEFAULT_QR_CODE_RFID)
            })
          }
        } else {
          const date = Date.now()

          const dateFormatted = moment(date).format('YYYYMMDD')

          const data = [
            {
              'tag_id': tagId,
              'tag_name': nameTag,
              'asset_id': assetId,
              'name': nameAsset,
              'object_name': 'assetA',
              'object_type': 'assets',
              'picture': `assets/images/${assetId}.jpg`,
              'date': dateFormatted
            }
          ]

          // const resp = await ItatService.tagingBle(data, token) // trough it at ble
          const resp = await RfidService.tagingBle(data, token)

          if (resp.status) {
            if (resp.status === 200) {
              // const message = resp.data?.message || resp?.data // trough it at ble
              const message = resp.data?.message
              setMessagesConfirm(messages => {
                return pushWithoutDuplicate(messages, message)
              })
            }
            else {
              if (resp.status === 401) {
                // const message = resp.data?.message || resp?.data // trough it at ble
                const message = resp.data?.message
                Alert.alert(
                  ERROR_TITLE,
                  message
                )
              }
            }
          }
        }
      } else {
        setMessagesConfirm(messages => {
          return pushWithoutDuplicate(messages, INIT_QR_CODE)
        })
      }
    } else if (enableUntagingBle) {
      if (qrCodeBle.length > 0) {
        const tagId = qrCodeBle[0]?.tag_id,
          nameTag = qrCodeBle[0]?.name_tag

        if (tagId === DEFAULT_QR_CODE_BLE) {
          setMessagesConfirm(messages => {
            return pushWithoutDuplicate(messages, DEFAULT_QR_CODE_BLE)
          })
        } else {
          const date = Date.now()

          const dateFormatted = moment(date).format('YYYYMMDD')

          const data = [
            {
              'tag_id': tagId,
              'tag_name': nameTag,
              'asset_id': '',
              'name': '',
              'object_name': 'assetA',
              'object_type': 'assets',
              'picture': '',
              'date': dateFormatted
            }
          ]

          // const resp = await ItatService.untagingBle(data, token) // trough it at ble
          const resp = await RfidService.untagingBle(data, token)

          if (resp.status) {
            if (resp.status === 200) {
              // const message = resp.data?.message || resp?.data // trough it at ble
              const message = resp.data?.message
              setMessagesConfirm(messages => {
                return pushWithoutDuplicate(messages, message)
              })
            }
            else {
              if (resp.status === 401) {
                // const message = resp.data?.message || resp?.data // trough it at ble
                const message = resp.data?.message
                Alert.alert(
                  ERROR_TITLE,
                  message
                )
              }
            }
          }
        }
      } else {
        setMessagesConfirm(messages => {
          return pushWithoutDuplicate(messages, INIT_QR_CODE)
        })
      }
    }
    setLoadingConfirm(false)
  }

  const handleDismissNotification = () => {
    setMessageConfirm('')
  }

  const handleDismissMultipleNotification = (idx) => {
    setMessagesConfirm(messages => {
      const rest = messages.splice(idx, 1)
      return messages
    })
  }

  useEffect(() => {
    navigation.setOptions({
      title
    })
  }, [])

  useEffect(() => {
    const getListSPrint = async (endPointSPrint) => {
      setLoadingSprintStockOpname(true)
      // const resp = await ItamService.detailSPrintList(endPointSPrint, token) // trough it am
      const resp = await RfidService.detailSPrintList(endPointSPrint, token)
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
    const checkCameraPermission = async () => {
      try {
        const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
        if (result) {
          console.log("Camera permission granted");
          setCheckPermissionCamera(result)
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }

    if (activeCameraBle || activeCameraRfid) {
      checkCameraPermission()
    }
  }, [activeCameraBle, activeCameraRfid])

  useEffect(() => {
    const sendSearchQrCode = async (displayValue) => {
      if (activeCameraBle) {
        const tagId = qrCodeBle[0]?.tag_id

        if (displayValue !== tagId) {
          // waiting for api ble detail, done
          setLoadingScanQrCodeBle(true)
          await sendData(
            config_menu_rfid_screen,
            displayValue,
            null,
            activeCameraBle,
            activeCameraRfid)

          qrCodeBleValue = qrCodeBle.length > 0 ? qrCodeBle[0]?.tag_id : DEFAULT_QR_CODE_BLE

          // const data = [{
          //   tag_id: displayValue,
          //   name_tag: ''
          // }]
          //

          // setQrCodeBle(data)
          // setActiveCameraBle(false)
        }
        setActiveCameraBle(false)
        setLoadingScanQrCodeBle(false)
      } else if (activeCameraRfid) {
        const assetId = qrCodeRfid[0]?.asset_id

        if (displayValue !== assetId) {
          setLoadingScanQrCodeRfid(true)
          await sendData(
            config_menu_rfid_screen,
            displayValue,
            null,
            activeCameraBle,
            activeCameraRfid)
          qrCodeRfidValue = qrCodeRfid.length > 0 ? qrCodeRfid[0]?.asset_id : DEFAULT_QR_CODE_RFID
        }
        setActiveCameraRfid(false)
        setLoadingScanQrCodeRfid(false)
      }
    }

    if (barcodes?.length > 0) {
      const displayValue = barcodes[0]?.displayValue

      if (displayValue) {
        sendSearchQrCode(displayValue)
      }
    }
  }, [barcodes])

  // useEffect(() => {
  //   if (qrCodeRfid) {
  //     (async () => {
  //       await sendData(config_menu_rfid_screen, qrCodeRfid)
  //     })()
  //   }
  // }, [qrCodeRfid])

  // useEffect(() => {
  //   if (data) {
  //     // if (!enableMaterialTest) { // this is will be deleted if uji mat not testing
  //     data &&
  //       setFinalData(prevData => {
  //         const newData = data.filter(({ asset_id: tagCurr }) => !prevData.some(({ asset_id: tagPrev }) => tagPrev === tagCurr))
  //         return [...prevData, ...newData]
  //       })
  //     // } // materialTest still using testing (dummy)
  //   }
  // }, [data]) // for running

  // useEffect(() => {
  //   if (enableMaterialTest) {
  //     setFinalData(DataMaterialTest)
  //   }
  // }, []) // for testing

  const countScan = finalData ? finalData.length : 0

  qrCodeBleValue = qrCodeBle.length > 0 ? qrCodeBle[0]?.tag_id : qrCodeBleValue

  qrCodeRfidValue = qrCodeRfid.length > 0 ? qrCodeRfid[0]?.asset_id : qrCodeRfidValue

  if (loadingUrlList || loadingSprintStockOpname || loadingScanQrCodeBle || loadingScanQrCodeRfid) {
    return <LoadingScreen customLoadingContainer={rfidScreenStyles.customLoadingContainer} />
  }

  if ((activeCameraBle || activeCameraRfid) && checkPermissionCamera) {
    if (device !== null) {
      return (
        <View style={rfidScreenStyles.rfidScreenContainer} >
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
        </View>
      )
    }
  }

  return (
    <View style={rfidScreenStyles.rfidScreenContainer} >
      {camera_action_ble &&
        <Surface elevation={7} customSurfaceStyle={rfidScreenStyles.surfaceScanQrBleTagContainer}>
          <View>
            <Text style={rfidScreenStyles.qrBleTextStyle}>
              {qrCodeBleValue}
            </Text>
          </View>
          <View>
            <Button onPress={handleCameraBle} label='Pindai QR Code Tag BLE'
              customButtonStyles={rfidScreenStyles.buttonScanQrBleTagStyle} />
          </View>
        </Surface>
      }

      {
        camera_action_rfid &&
        <Surface elevation={7} customSurfaceStyle={rfidScreenStyles.surfaceScanQrRfidTagContainer}>
          <View>
            <Text style={rfidScreenStyles.qrRfidTextStyle}>
              {qrCodeRfidValue}
            </Text>
          </View>
          <View>
            <Button onPress={handleCameraRfid} label='Pindai QR Code Tag RFID'
              customButtonStyles={rfidScreenStyles.buttonScanQrRfidTagStyle} />
          </View>
        </Surface>
      }

      {
        dropdown &&
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

      {
        enableStockOpname || enableMaterialTest ?
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

      {
        box &&
        <View style={rfidScreenStyles.boxCountContainer}>
          <Box elevation={4}>
            <Text style={rfidScreenStyles.boxTextStyle}>
              Total: {countScan}
            </Text>
          </Box>
        </View>
      }

      {
        table &&
        <ScrollView style={rfidScreenStyles.tableContainer}>

          <DataTable>

            {/* Table Header */}
            <DataTable.Header style={rfidScreenStyles.tableHeadersStyle}>
              {table_headers.map(({ label: col }, idx) => {
                return <DataTable.Title key={idx} style={rfidScreenStyles.tableHeaderTitleStyle}>
                  <Text style={rfidScreenStyles.tableHeadersTitleText}>
                    {col}
                  </Text>
                </DataTable.Title>
              })}
            </DataTable.Header>

            {/* Table Body */}
            {
              finalData?.map((row, idx) =>
                <DataTable.Row key={idx}>
                  {table_headers?.map(({ name: col }, idx) => {
                    return <View key={idx} style={rfidScreenStyles.tableBodyStyle}>
                      <Text numberOfLines={5} maxLength={10} style={rfidScreenStyles.tableBodyTitleText}>
                        {row[col]}
                      </Text>
                    </View>
                  })}
                </DataTable.Row>
              )
            }

          </DataTable>

        </ScrollView >
      }

      {
        setting_url_form && urlList &&
        <View style={rfidScreenStyles.fieldUrlContainer}>
          {urlList?.map((row, idx) => {
            return (
              <Field
                key={idx}
                customFieldStyles={rfidScreenStyles.fieldUrlStyle}
                selectedIndex={idx}
                selectedMenuId={row.menu_id}
                selectedTitle={row.title}
                selectedUrlScreen={row.url_screen}
                changeUrl={handleChangeUrl} />
            )
          })}
        </View>
      }

      {
        confirm_button &&
        <View style={rfidScreenStyles.buttonConfirmContainer}>
          <Button
            customButtonStyles={rfidScreenStyles.buttonConfirmStyle}
            label='Konfirmasi'
            loading={loadingConfirm}
            onPress={handleConfrim} />
        </View>
      }

      {
        // !!messageConfirm &&
        <View style={rfidScreenStyles.notificationUrlContainer}>
          <Notification duration={3000} message={messageConfirm} onDismiss={handleDismissNotification} />
        </View>
      }

      {
        // messagesConfirm.length > 0 &&
        <View style={rfidScreenStyles.notificationUrlContainer}>
          <MultipleNotifications duration={3000} messages={messagesConfirm} onDismiss={handleDismissMultipleNotification} />
        </View>
      }

    </View >
  )
}

export default RfidScreen