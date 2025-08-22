import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Button } from '~/components/Button'
import { Input, Label, ScrollView, Text, YStack, Image } from 'tamagui'
import { KeyboardAvoidingView, Platform } from 'react-native'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Simulação de verificação no "back-end"
    if (email === 'user@company.com' && password === '123456') {
      const userAppType = 'Team' // <-- isso normalmente viria do banco de dados

      // Precisa validar o tipo de usuario Admin ou membro
      // Tem que fazer a logica de identificar o userAppType e levar ele para a pagina certa
      router.push({
        pathname: './team/admin/adminHome',
        params: {
          appType: userAppType,
          email // adicione dados do banco de acordo
        }
      })
    } else {
      alert('Invalid email or password')
    }
  }

  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView f={1} bg="white" p="$4">
        <YStack f={1} ai="center" space="$4" mt="$6">

            <Image source={require('../assets/logo.png')} width={200} height={200} ></Image>

            <Text fontSize="$8" fontWeight="bold">WellnessHub</Text>
            <Text fontSize="$4" color="$gray10">Join us for better well-being</Text>

            {/* Inputs */}
            <YStack space="$3" width="100%" mt="$4">
            <Label>Email</Label>
            <Input
                placeholder="user@company.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Label>Password</Label>
            <Input
                placeholder="******"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            </YStack>

            <Button
            title="Log in"
            bg="#99cc33"
            color="white"
            width="100%"
            mt="$6"
            onPress={handleLogin}
            />
        </YStack>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}
