import React, { Node, useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { TextInput as TextInputPaper, useTheme, DataTable } from 'react-native-paper'
import decode from 'jwt-decode'
import InstanceApi from '../../services'
import StylesKitchen from '../../styles-kitchen'
import { Button } from '../../lib/components-ingredients'

const DetailScreen = (): Node => {
  const route = useRoute()
  const navigation = useNavigation()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const [data, setData] = useState([])
  const [searchField, setSearchField] = useState('')
  const [finalData, setFinalData] = useState([])
  const { id, title, endPoint, tableHeaders, enableSearch, enableConfirm, token } = route.params
  const { Device_ID: deviceId } = decode(token)
  const detailScreenStyles = Styles.detailScreenStyles(id)

  const getEndPoint = searchText => typeof endPoint === 'function' ? endPoint(searchText) : endPoint
  const Api = new InstanceApi()

  const processToSendData = async searchField => {
    const lastCharSearchField = searchField.charAt(searchField.length - 1)

    if (lastCharSearchField === '\n') {
      const arrText = searchField.split('\n')
      const finalArrText = [... new Set(arrText)]

      if (finalArrText) {
        if (id === 3) {
          const filteredData = finalArrText.filter(el => el !== '' && !data.includes(el))
          setData(prevData => [...prevData, ...filteredData])
        } else {
          const filteredData = finalArrText.filter(el =>
            el && data.map(({ tag_number }) => {
              if (el !== tag_number) {
                return el
              }
            })
          )
          for (let i in filteredData) {
            const searchValue = filteredData[i]
            await sendData(searchValue)
          }
        }
      }

      // clear feild search
      setSearchField('')
    }
  }

  const sendData = async (searchValue) => {
    const finalEndpoint = getEndPoint(searchValue)
    const resp = await Api.detailSearch(finalEndpoint, token)

    if (resp.status === 200) {
      const data = resp.data?.data
      setData(data)
    }
  }

  const handleFocus = (e) => {
    // trigger back button
  }

  const handleChangeSearchField = async e => {
    const text = e.nativeEvent.text
    setSearchField(text)
  }

  const handleConfrim = async () => {
    if (finalData) {
      const tags = finalData.map(({ tag_number }) => tag_number)
      const sendData = [...tags, deviceId].toString()
      const finalSendData = { 'tag': sendData }
      const resp = await Api.detailConfirm(finalSendData, token)

      if (resp.status === 200) {
        setFinalData([])
      }
    }
  }

  useEffect(() => {
    navigation.setOptions({
      title
    })
  }, [])

  useEffect(() => {
    if (searchField) {
      processToSendData(searchField)
    }
  }, [searchField])

  useEffect(() => {
    if (data) {
      if (id === 3) {
        const objArrData = data.map(el => {
          return { 'tag_number': el }
        })
        setFinalData(objArrData)
      } else {
        data &&
          setFinalData(prevData => {
            const newData = data.filter(({ tag_number: tagCurr }) => !prevData.some(({ tag_number: tagPrev }) => tagPrev === tagCurr))
            return [...prevData, ...newData]
          })
      }
    }
  }, [data])

  const countScan = finalData ? finalData.length : 0

  return (
    <View style={detailScreenStyles.detailScreenContainer}>
      {enableSearch &&
        <View style={detailScreenStyles.searchingContainer}>
          <TextInputPaper
            name='search'
            style={detailScreenStyles.feildsStyle}
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

      <ScrollView style={detailScreenStyles.tableContainer}>

        <DataTable>
          <DataTable.Header style={detailScreenStyles.tableHeaders}>
            {tableHeaders.map(tableHeader =>
              <DataTable.Title>
                <Text style={detailScreenStyles.tableHeadersTitleText}>
                  {tableHeader}
                </Text>
              </DataTable.Title>)}
            <DataTable.Title style={detailScreenStyles.tableCellCount}>
              <Text style={detailScreenStyles.tableHeadersTitleText}>
                Total: {countScan}
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          {/* Pencatatan Stok */}
          {id === 0 &&
            finalData?.map(row =>
              <DataTable.Row>
                <DataTable.Cell>
                  {row.tag_number}
                </DataTable.Cell>
                <DataTable.Cell>
                  {row.Quantity}
                </DataTable.Cell>
                <DataTable.Cell>
                  {row.SKU}
                </DataTable.Cell>
                <DataTable.Cell style={detailScreenStyles.tableCellCount}>
                  {''}
                </DataTable.Cell>
              </DataTable.Row>
            )}

          {/* Memindai Barang */}
          {id === 1 &&
            finalData?.map(row =>
              <DataTable.Row>
                <DataTable.Cell>
                  {row.tag_number}
                </DataTable.Cell>
                <DataTable.Cell>
                  {row.Name}
                </DataTable.Cell>
                <DataTable.Cell style={detailScreenStyles.tableCellCount}>
                  {''}
                </DataTable.Cell>
              </DataTable.Row>
            )}

          {/* Pengecekan Barang */}
          {id === 2 &&
            finalData?.map(row =>
              <DataTable.Row>
                <DataTable.Cell>
                  {row.tag_number}
                </DataTable.Cell>
                <DataTable.Cell>
                  {row.Name}
                </DataTable.Cell>
                <DataTable.Cell>
                  {row.Line_number}
                </DataTable.Cell>
                <DataTable.Cell>
                  {row.Rak_number}
                </DataTable.Cell>
                <DataTable.Cell>
                  {row.Bin_number}
                </DataTable.Cell>
                <DataTable.Cell style={detailScreenStyles.tableCellCount}>
                  {''}
                </DataTable.Cell>
              </DataTable.Row>
            )}

          {/* Gerbang Pemindaian */}
          {id === 3 &&
            finalData?.map(row =>
              <DataTable.Row>
                <DataTable.Cell>
                  {row.tag_number}
                </DataTable.Cell>
                <DataTable.Cell style={detailScreenStyles.tableCellCount}>
                  {''}
                </DataTable.Cell>
              </DataTable.Row>
            )}

        </DataTable>

      </ScrollView>

      {enableConfirm &&
        <Button onPress={handleConfrim} text='Konfirmasi' customButtonStyles={detailScreenStyles.buttonStyle} />
      }

    </View>
  )
}

export default DetailScreen