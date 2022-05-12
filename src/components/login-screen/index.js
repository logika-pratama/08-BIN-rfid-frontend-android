import React, { Node, useState } from 'react'
import { SafeAreaView, Image, View, Text, Alert } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'
import { useAuth } from '../../contexts'
import StylesKitchen from '../../styles-kitchen'
import { Button } from '../../lib/components-ingredients'
import InstanceApi from '../../services'
import LoadingScreen from '../loading-screen'
import LogistikPolri from '../../assets/images/logo_divtik_small.png'

const errorAlertTitle = 'Kesalahan'

const LoginScreen = () => {
  const { saveToken } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [secureText, setSecureText] = useState(true)

  const theme = useTheme()

  const Styles = new StylesKitchen(theme)
  const loginScreenStyles = Styles.loginScreenStyles()

  const Api = new InstanceApi()

  const handleChangeEmail = text => {
    setEmail(text)
  }

  const handleChangePassword = text => {
    setPassword(text)
  }

  const handleSecureText = () => {
    setSecureText(prev => !prev)
  }

  const handleSubmit = async () => {
    setLoadingLogin(true)
    const data = { email, password }
    const resp = await Api.login(data)

    if (resp.status) {
      if (resp.status === 200) {
        const jwtToken = resp.data.jwtTokken
        await saveToken({ jwtToken })
      }
      else {
        if (resp.status === 401) {
          const message = resp.data.message
          Alert.alert(
            errorAlertTitle,
            message
          )
        }
        setLoadingLogin(false)
      }
    }
    else {
      const message = resp
      Alert.alert(
        errorAlertTitle,
        message
      )
      setLoadingLogin(false)
    }
  }

  const isDisabled = email && password ? false : true

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
          ITAT-RFID
        </Text>
      </View>
      <View style={loginScreenStyles.formContainer}>
        <TextInput
          name='email'
          style={loginScreenStyles.feildsStyle}
          onChangeText={handleChangeEmail}
          label={'E-Mail'}
          placeholder={'E-Mail'}
          keyboardType='email-address'
          left={<TextInput.Icon name='account' />}
          value={email}
        />
        <TextInput
          name='password'
          style={loginScreenStyles.feildsStyle}
          onChangeText={handleChangePassword}
          label={'Kata Sandi'}
          placeholder={'Kata Sandi'}
          secureTextEntry={secureText}
          left={<TextInput.Icon name='key' />}
          right={<TextInput.Icon name={secureText ? 'eye-off' : 'eye'} onPress={handleSecureText} />}
          value={password}
        />
      </View>
      <Button
        onPress={handleSubmit}
        text='Masuk'
        isDisabled={isDisabled}
        customButtonStyles={loginScreenStyles.buttonStyle} />
    </SafeAreaView >
  )
}

export default LoginScreen