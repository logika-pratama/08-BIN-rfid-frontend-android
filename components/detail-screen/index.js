import React, { Node } from 'react'
import { Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import StylesFactory from '../../styles-factory'

const DetailScreen = (): Node => {
  const route = useRoute()
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const title = route.params.title
  const url = route.params.url
  const detailScreenStyles = Styles.detailScreenStyles()
  const getUrl = searchText => typeof url === 'function' ? url(searchText) : url
  return (
    <View style={detailScreenStyles.detailScreenContainer}>
      <Text style={detailScreenStyles.title}>
        title: {title}
        {'\n'}
        url: {getUrl(11222)}
      </Text>
    </View>
  )
}

export default DetailScreen