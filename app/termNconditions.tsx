import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Button } from '~/components/Button'
import { ScrollView, Text, YStack, View } from 'tamagui'

export default function TermsNConditions() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const [agreed, setAgreed] = useState(false)

  const handleAgree = async () => {
    setAgreed(true)   

    const userData = {
      ...params, // inclui fullName, email, password, appType, etc.
      agreed: true,
    }

    // 🔒 Aqui você integrará com seu back-end futuramente:
    /*
    try {
      const response = await fetch('https://seu-backend.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      const result = await response.json()
      console.log('Cadastro realizado com sucesso:', result)

      router.push('/login') // ou a próxima página
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
    }
    */

    // Por enquanto, simula envio e navega para próxima página
    console.log('Usuário cadastrado (simulado):', userData)
    router.push('/') // substitua pelo próximo passo real
  }

  return (
    <YStack f={1} bg="white" p="$4" space="$4" ai="center">

      <Text fontSize="$7" fontWeight="700" mt="$2">🍃 MindWell</Text>

      <View
        width="100%"
        height={520}
        bg="#e1efc8"
        br="$6"
        p="$4"
        mt="$2"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontWeight="700" fontSize="$6" mb="$2">Terms and Conditions</Text>
          <Text mb="$2">
            Welcome to MindWell. By using our app, you agree to abide by our terms and conditions outlined below.
            Please read them carefully to ensure you understand your rights and responsibilities.
          </Text>
          <Text mb="$2">
            1. Use of the App: You agree to use the app only for lawful purposes and in accordance with our guidelines. Unauthorized use may result in termination of access.
          </Text>
          <Text mb="$2">
            2. Privacy Policy: Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
          </Text>
          <Text mb="$2">
            3. Limitation of Liability: MindWell is not liable for any damages arising from the use or inability to use the app, including but not limited to data loss or service interruptions.
          </Text>
          <Text mb="$2">
            4. Amendments: We reserve the right to amend these terms at any time. Changes will be effective immediately upon posting to the app.
          </Text>
          <Text>
            5. Contact Information: If you have any questions or concerns about these terms, please contact our support team.
          </Text>
        </ScrollView>
      </View>

      <Button
        title="Agree"
        bg="#99cc33"
        theme="green"
        width="100%"
        height={48}
        mt="$4"
        onPress={handleAgree}
      />
    </YStack>
  )
}
