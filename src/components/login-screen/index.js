import React, { Node, useState } from 'react'
import { SafeAreaView, Image, View, Text } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../contexts'
import StylesKitchen from '../../styles-kitchen'
import { Button } from '../../lib/components-ingredients'
import InstanceApi from '../../services'
import LoadingScreen from '../loading-screen'
import LogistikPolri from '../../assets/images/logistik_polri.png'

const LoginScreen = (): Node => {
  const { saveToken } = useAuth()
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [secureText, setSecureText] = useState(true)
  const theme = useTheme()

  const { control, handleSubmit, formState: { error } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const Styles = new StylesKitchen(theme)
  const loginScreenStyles = Styles.loginScreenStyles()

  const Api = new InstanceApi()

  const handleSecureText = () => {
    setSecureText(prev => !prev)
  }

  const onSubmit = async data => {
    setLoadingLogin(true)
    const resp = await Api.login(data)
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
      <View style={loginScreenStyles.imageAndTextContainer}>
        <Image
          style={loginScreenStyles.imageStyle}
          source={LogistikPolri}
        />
        <Text style={loginScreenStyles.textStyle}>
          ITAM-RFID
        </Text>
      </View>
      <View style={loginScreenStyles.formContainer}>
        <Controller
          name='email'
          control={control}
          render={({ field: { onChange, onBlur, value } }) =>
            <TextInput
              style={loginScreenStyles.feildsStyle}
              label={'E-Mail'}
              placeholder={'E-Mail'}
              keyboardType='email-address'
              left={<TextInput.Icon name='account' />}
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
              style={loginScreenStyles.feildsStyle}
              label={'Kata Sandi'}
              placeholder={'Kata Sandi'}
              secureTextEntry={secureText}
              left={<TextInput.Icon name='key' />}
              right={<TextInput.Icon name={secureText ? 'eye-off' : 'eye'} onPress={handleSecureText} />}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />}
        />
      </View>
      <Button onPress={handleSubmit(onSubmit)} text='Masuk' customButtonStyles={loginScreenStyles.buttonStyle} />
    </SafeAreaView >
  )
}

export default LoginScreen