import React, { Node, useState, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useTheme, DataTable } from 'react-native-paper'
import InstanceApi from '../../service'
import StylesFactory from '../../styles-factory'

const optionsRowsPerPage = [10, 25, 50]

const DetailScreen = (): Node => {
  const route = useRoute()
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(optionsRowsPerPage[0])
  const refSearch = useRef(null)
  const { title, url, tableHeaders, enableSearch, enableConfirm } = route.params
  const detailScreenStyles = Styles.detailScreenStyles()

  const getUrl = searchText => typeof url === 'function' ? url(searchText) : url
  const Api = new InstanceApi()
  const searchValue = refSearch.current?.value

  const onPageChange = page => () => {
    setPage(page)
  }

  const handlePress = () => {

  }

  useEffect(() => {
    setPage(0)
  }, [rowsPerPage])

  useEffect(() => {
    if (searchValue) {
      const finalUrl = getUrl(searchValue)
      Api.detailSearch(finalUrl)
    }
  }, [searchValue])

  return (
    <View style={detailScreenStyles.detailScreenContainer}>
      <Text style={detailScreenStyles.title}>
        title: {title}
        {'\n'}
        url: {getUrl(11222)}
      </Text>
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