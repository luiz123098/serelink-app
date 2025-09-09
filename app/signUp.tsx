import { useLocalSearchParams, useRouter } from 'expo-router'
import { Button } from '~/components/Button'
import { Input, Label, ScrollView, Text, Image, XStack, YStack, Spacer, Button as ButtonTamagui } from 'tamagui'
import { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft } from '@tamagui/lucide-icons'

export default function SignUp() {
  const router = useRouter()
  const { appType } = useLocalSearchParams<{ appType: string }>()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    birthDate: '',
    company: '',
    sex: '',
    orientation: ''
  })

  const [retypePassword, setRetypePassword] = useState('')

  useEffect(() => {
    if (appType) {
      alert(`Variável recebida: ${appType}`)
    }
  }, [appType])

  const handleInput = (key: string, value: string) => {
    setForm({ ...form, [key]: value })
  }

  const handleSubmit = () => {
    if (form.password !== retypePassword) {
      alert('As senhas não coincidem. Verifique novamente.')
      return
    }

    router.push({
      pathname: './termNconditions',
      params: {
        ...form,
        appType
      }
    })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Return Button */}
        <YStack
          position="absolute"
          t={12}
          l={12}
          zIndex={100}
          pointerEvents="box-none"
        >
          <ButtonTamagui
            size="$5"
            chromeless
            icon={<ArrowLeft />}
            onPress={() => router.replace('/')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          />
        </YStack>
      <ScrollView f={1} p="$4" bg="white" contentContainerStyle={{ paddingBottom: 60 }}>
        <YStack alignItems="center" mb="$4">
          <Image source={require('../assets/logo.png')} width={80} height={80} />
        </YStack>

        {/* Box 1 */}
        <YStack space="$3" p="$4" br="$6" borderWidth={0.4} borderColor="black">
          <Label>Full Name:</Label>
          <Input placeholder="Full Name" onChangeText={(v) => handleInput('fullName', v)} />

          <Label>Email:</Label>
          <Input placeholder="Email" onChangeText={(v) => handleInput('email', v)} />

          <Label>Password:</Label>
          <Input placeholder="Password" secureTextEntry onChangeText={(v) => handleInput('password', v)} />

          <Label>Re-Type password:</Label>
          <Input placeholder="Password" secureTextEntry onChangeText={setRetypePassword} />
        </YStack>

        {/* Box 2 */}
        <YStack space="$3" mt="$4" p="$4" br="$6" borderWidth={0.4} borderColor="black">
          <Label>Date of birth:</Label>
          <Input placeholder="Date of birth" onChangeText={(v) => handleInput('birthDate', v)} />

          <Label>Company Name:</Label>
          <Input placeholder="Company" onChangeText={(v) => handleInput('company', v)} />
        </YStack>

        {/* Box 3 */}
        <YStack space="$3" mt="$4" p="$4" br="$6" borderWidth={0.4} borderColor="black">
          <Label>Sex:</Label>
          <XStack space="$2">
            <Button title="Male" bg="#99cc33" theme="green" onPress={() => handleInput('sex', 'Male')} />
            <Button title="Female" bg="#99cc33" theme="green" onPress={() => handleInput('sex', 'Female')} />
          </XStack>
          <Input placeholder="Other" onChangeText={(v) => handleInput('sex', v)} />
        </YStack>

        {/* Box 4 */}
        <YStack space="$3" mt="$4" p="$4" br="$6" borderWidth={0.4} borderColor="black">
          <Label>Sexual orientation:</Label>
          <XStack space="$2">
            <Button title="Straight" bg="#99cc33" theme="green" onPress={() => handleInput('orientation', 'Straight')} />
            <Button title="Homosexual" bg="#99cc33" theme="green" onPress={() => handleInput('orientation', 'Homosexual')} />
          </XStack>
          <Input placeholder="Other" onChangeText={(v) => handleInput('orientation', v)} />
        </YStack>


        <Button
          bg="#99cc33"
          mt="$6"
          title="Done"
          theme="green"
          onPress={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
