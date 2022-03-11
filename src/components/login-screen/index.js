import React, { Node, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../contexts'
import StylesFactory from '../../styles-kitchen'
import { Button } from '../../lib/components-ingredients'
import InstanceApi from '../../services'
import LoadingScreen from '../loading-screen'

const LoginScreen = (): Node => {
  const { saveToken } = useAuth()
  const [loadingLogin, setLoadingLogin] = useState(false)
  const theme = useTheme()
  const primaryColor = theme.colors.primary

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
    setLoadingLogin(true)
    const resp = await Api.login('/login', data)
    if (resp.status === 200) {
      const jwtToken = resp.data.jwtTokken
      await saveToken({ jwtToken })
    }
    else {
      setLoadingLogin(false)
    }
  }

  if (loadingLogin) {
    return <LoadingScreen />
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