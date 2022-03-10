import React, { Node, useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { TextInput, useTheme, DataTable } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import InstanceApi from '../../services'
import StylesFactory from '../../styles-factory'
import { Button } from '../../lib/components-ingredients'

const optionsRowsPerPage = [10, 25, 50]

const DetailScreen = (): Node => {
  const route = useRoute()
  const navigation = useNavigation()
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const [page, setPage] = useState(0)
  const [data, setData] = useState([])
  const [finalData, setFinalData] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(optionsRowsPerPage[0])
  const { id, title, endPoint, tableHeaders, enableSearch, enableConfirm, token } = route.params
  const detailScreenStyles = Styles.detailScreenStyles()

  const getEndPoint = searchText => typeof endPoint === 'function' ? endPoint(searchText) : endPoint
  const Api = new InstanceApi()

  const { control, handleSubmit, formState: { error } } = useForm({
    defaultValues: {
      search: ''
    }
  })

  const onPageChange = page => () => {
    setPage(page)
  }

  const handleConfrim = () => {

  }

  const onSubmit = async data => {
    const searchValue = data?.search
    const finalEndpoint = getEndPoint(searchValue)

    if (searchValue) {
      if (id !== 3) {
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


  useEffect(() => {
    data &&
      setFinalData(prevData => (data[0] ? [...prevData, data[0]] : [...prevData]))
  }, [data])

  console.log('finalData')
  console.log(finalData)

  return (
    <View style={detailScreenStyles.detailScreenContainer}>
      {enableSearch &&
        <View>
          <Controller
            name='search'
            control={control}
            render={({ field: { onChange, onBlur, value } }) =>
              <TextInput
                label={'Pencarian'}
                placeholder={'Pencarian'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onKeyPress={handleSubmit(onSubmit)}
              />}
          />
          <Button onPress={handleSubmit(onSubmit)} text='Cari' />
        </View>
      }

      <DataTable>
        <DataTable.Header>
          {tableHeaders.map(tableHeader =>
            <DataTable.Title>
              {tableHeader}
            </DataTable.Title>)}
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

      {id === 3 &&
        <Button onPress={handleConfrim} text='Confirm' />
      }
    </View>
  )
}

export default DetailScreen