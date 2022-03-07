import React, { Node } from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextInput, useTheme } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StylesFactory from '../../styles-factory'
import { Button } from '../../lib/components-ingredients'
import InstanceApi from '../../service'

const LoginScreen = (): Node => {
  const navigation = useNavigation()
  const theme = useTheme()
  const { control, handleSubmit, formState: { error } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const Styles = new StylesFactory(theme)
  const loginScreenStyles = Styles.loginScreenStyles()

  const Api = new InstanceApi()

  const onSubmit = async data => {
    const resp = await Api.login('/login', data)
    if (resp.status === 200) {
      const jwtToken = resp.data.jwtTokken
      try {
        await AsyncStorage.setItem('@token', jwtToken)
        return navigation.navigate('home')
      } catch (err) {
        console.log('Failed store token to async storage', err)
      }
    }
  }

  return (
    <SafeAreaView style={loginScreenStyles.loginScreenContainer}>
      <Controller
        name='email'
        control={control}
        render={({ field: { onChange, onBlur, value } }) =>
          <TextInput
            label={'E-Mail'}
            placeholder={'E-Mail'}
            keyboardType='email-address'
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />}
      />
      <Controller
        name='password'
        control={control}
        render={({ field: { onChange, onBlur, value } }) =>
          <TextInput
            label={'Kata Sandi'}
            placeholder={'Kata Sandi'}
            secureTextEntry
            right={<TextInput.Icon name='eye' />}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />}
      />
      <Button onPress={handleSubmit(onSubmit)} text='Masuk' />
    </SafeAreaView >
  )
}

export default LoginScreen