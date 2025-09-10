// app/index.tsx (Home)
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView } from 'react-native'
import { Button } from '~/components/Button'
import { YStack, Text, Image } from 'tamagui'

export default function Home() {
  const router = useRouter()

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,            // preenche a altura da tela
        alignItems: 'center',   // centraliza horizontal
        justifyContent: 'center', // centraliza vertical quando couber
        backgroundColor: 'white',
        paddingVertical: 24,    // padding vertical leve e consistente
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* CONTAINER com largura fixa para manter dimensões originais,
          mas centralizado e responsivo (não "esticamos" nada) */}
      <YStack w="100%" maxWidth={420} ai="center" space="$4">
        <Image
          source={require('../assets/logo.png')}
          width={200}
          height={200}
          resizeMode="contain"
        />

        <Text fontSize={20} fontWeight="700" textAlign="center">
          Welcome to SereLink
        </Text>

        {/* “Card” verde – mantém os 220 de largura como você tinha */}
        <YStack
          bg="#99cc33"
          borderRadius={20}
          px="$4"
          py="$2"
          width={220}
          ai="center"
        >
          <Text color="white" fontWeight="700">
            What do you have in mind?
          </Text>
        </YStack>

        {/* Botões – todos com 220 de largura para padronizar o visual */}
        <YStack space="$3.5" mt="$2" ai="center">
          <Button
            title="Family (beta)"
            color="black"
            bg="$gray5"
            br="$8"
            width={220}
            onPress={() =>
              router.replace({ pathname: '/signUp', params: { appType: 'family' } })
            }
          />

          <Button
            title="Team"
            color="black"
            bg="$gray5"
            br="$8"
            width={220}
            onPress={() =>
              router.replace({ pathname: '/signUp', params: { appType: 'team' } })
            }
          />

          <Button
            title="Individual (beta)"
            color="black"
            bg="$gray5"
            br="$8"
            width={220}
            onPress={() =>
              router.replace({ pathname: '/signUp', params: { appType: 'individual' } })
            }
          />

          <Button
            title="Couples (beta)"
            color="black"
            bg="$gray5"
            br="$8"
            width={220}
            onPress={() =>
              router.replace({ pathname: '/signUp', params: { appType: 'couples' } })
            }
          />
        </YStack>

        <Text fontSize={12} color="gray" mt="$4">
          Have an account already?
        </Text>

        <Button
          title="Log in"
          bg="#99cc33"
          color="white"
          borderRadius={20}
          px="$4"
          mt="$1"
          width={220}
          onPress={() => router.replace({ pathname: '/logIn' })}
        />
      </YStack>
    </ScrollView>
  )
}
