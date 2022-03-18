import React, { Node, useState, useEffect, useRef } from 'react'
import { View, Text, TextInput } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { TextInput as TextInputPaper, useTheme, DataTable } from 'react-native-paper'
import InstanceApi from '../../services'
import StylesKitchen from '../../styles-kitchen'
import { Button } from '../../lib/components-ingredients'

const optionsRowsPerPage = [10, 25, 50]

const DetailScreen = (): Node => {
  const searchRef = useRef()
  const route = useRoute()
  const navigation = useNavigation()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const [page, setPage] = useState(0)
  const [data, setData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [finalData, setFinalData] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(optionsRowsPerPage[0])
  const { id, title, endPoint, tableHeaders, enableSearch, enableConfirm, token } = route.params
  const detailScreenStyles = Styles.detailScreenStyles()

  const getEndPoint = searchText => typeof endPoint === 'function' ? endPoint(searchText) : endPoint
  const Api = new InstanceApi()

  const sendData = async (searchValue) => {
    console.log('searchValue')
    console.log(searchValue)

    const finalEndpoint = getEndPoint(searchValue)
    const resp = await Api.detailSearch(finalEndpoint, token)
    console.log('resp')
    console.log(resp)

    if (resp.status === 200) {
      const data = resp.data?.data
      console.log('data')
      console.log(data)
      setData(data)
    }
  }

  const onPageChange = page => () => {
    setPage(page)
  }

  const handleConfrim = () => {

  }

  const handleChangeSearchField = e => {
    const text = e.nativeEvent.text

    const arrText = text.split('\n')

    const finalArrText = [... new Set(arrText)]

    if (finalArrText) {
      if (id === 3) {
        const filteredData = finalArrText.filter(el => el !== '' && !data.includes(el))
        setData(prevData => [...prevData, ...filteredData])
      } else {

      }
    }

    // clear
    e.target.clear()
  }

  const handleSubmit = async () => {
    if (searchValue) {
      if (id === 3) {
        const dataSearch = [{ 'tag_number': searchValue }]
        setFinalData(prevData => prevData.some(({ tag_number }) =>
          tag_number === searchValue) ? [...prevData] : [...prevData, dataSearch[0]])
      }
      else {
        await sendData(searchValue)
      }
    }
  }

  useEffect(() => {
    navigation.setOptions({
      title
    })
  }, [])

  useEffect(() => {
    setPage(0)
  }, [rowsPerPage])

  // useEffect(() => {
  //   if (searchValue) {
  //     if (id === 3) {
  //       const dataSearch = [{ 'tag_number': searchValue }]
  //       setFinalData(prevData => prevData.some(({ tag_number }) =>
  //         tag_number === searchValue) ? [...prevData] : [...prevData, dataSearch[0]])
  //     }
  //     else {
  //       sendData(searchValue)
  //     }
  //     searchRef.current.clear()
  //   }
  //   setSearchValue([])
  // }, [searchValue])

  useEffect(() => {
    if (data) {
      if (id === 3) {
        const objArrData = data.map(el => {
          return { 'tag_number': el }
        })
        setFinalData(objArrData)
      }
    }
    // data &&
    //   setFinalData(prevData => (data[0] ? [...prevData, data[0]] : [...prevData]))
  }, [data])

  const searchTextButton = id === 3 ? 'Tambah' : 'Cari'

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
            ref={searchRef}
            onChange={handleChangeSearchField}
            value={searchValue}
            label={'Pindai'}
            placeholder={'Pindai'}
          />
          <Button onPress={handleSubmit} text={searchTextButton} customButtonStyles={detailScreenStyles.buttonStyle} />
        </View>
      }

      <View style={detailScreenStyles.tableContainer}>
        <DataTable>
          <DataTable.Header style={detailScreenStyles.tableHeaders}>
            {tableHeaders.map(tableHeader =>
              <DataTable.Title>
                <Text style={detailScreenStyles.tableHeadersTitle}>
                  {tableHeader}
                </Text>
              </DataTable.Title>)}
            <DataTable.Title>
              <Text style={detailScreenStyles.tableHeadersTitle}>
                Total:
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
                <DataTable.Cell>
                  {row.Item_code}
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
              </DataTable.Row>
            )}

          {/* Gerbang Pemindaian */}
          {id === 3 &&
            finalData?.map(row =>
              <DataTable.Row>
                <DataTable.Cell>
                  {row.tag_number}
                </DataTable.Cell>
              </DataTable.Row>
            )}

          <DataTable.Pagination
            numberOfPages={3}
            onPageChange={(page) => onPageChange(page)}
            // label="1-2 of 6"
            optionsPerPage={optionsRowsPerPage}
            itemsPerPage={rowsPerPage}
            setItemsPerPage={setRowsPerPage}
            showFastPagination
            optionsLabel={'Baris per Halaman'}
          />
        </DataTable>
      </View>

      {enableConfirm &&
        <Button onPress={handleConfrim} text='Konfirmasi' />
      }
    </View>
  )
}

export default DetailScreen