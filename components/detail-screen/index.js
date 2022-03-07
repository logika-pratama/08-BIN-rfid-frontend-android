import React, { Node, useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TextInput, useTheme, DataTable } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import InstanceApi from '../../service'
import StylesFactory from '../../styles-factory'
import { Button } from '../../lib/components-ingredients'

const optionsRowsPerPage = [10, 25, 50]

const DetailScreen = (): Node => {
  const route = useRoute()
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(optionsRowsPerPage[0])
  const { title, endPoint, tableHeaders, enableSearch, enableConfirm, token } = route.params
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

  const handlePress = () => {

  }

  const onSubmit = async data => {
    const searchValue = data?.search
    const finalEndpoint = getEndPoint(searchValue)

    if (searchValue) {
      const resp = await Api.detailSearch(finalEndpoint, token)
      console.log('resp')
      console.log(resp)

      if (resp.status === 200) {
        console.log(resp)
        console.log('resp')
      }
    }
  }

  useEffect(() => {
    setPage(0)
  }, [rowsPerPage])

  return (
    <View style={detailScreenStyles.detailScreenContainer}>
      <Text style={detailScreenStyles.title}>
        title: {title}
        {'\n'}
        url: {getEndPoint(11222)}
      </Text>
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
          />}
      />
      <Button onPress={handleSubmit(onSubmit)} text='Cari' />

      <DataTable>
        <DataTable.Header>
          {tableHeaders.map(tableHeader =>
            <DataTable.Title>
              {tableHeader}
            </DataTable.Title>)}
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>

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
  )
}

export default DetailScreen