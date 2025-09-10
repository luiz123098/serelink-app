// app/notifications/index.tsx
import React, { useMemo } from 'react'
import { Alert } from 'react-native'
import { router } from 'expo-router'
import {
  YStack, XStack, Text, Card, ScrollView, Button as TButton
} from 'tamagui'
import { ArrowLeft, Bell } from '@tamagui/lucide-icons'
import { Container } from '~/components/Container'

type AppNotification = {
  id: string
  title: string
  message: string
  timestamp: string
  color?: string
  targetRoute?: string
}

const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Team mood improved',
    message: 'Average mood increased in the last 7 days.',
    timestamp: '2m ago',
  },
  {
    id: 'n2',
    title: 'New comment',
    message: 'Charlie left anonymous feedback.',
    timestamp: '1h ago',
  },
  {
    id: 'n3',
    title: 'Action suggestion',
    message: 'Try a 2h focus window this Wednesday.',
    timestamp: 'Yesterday',
  },
]

export default function Notifications() {
  const items = useMemo(() => MOCK_NOTIFICATIONS, [])

  const handlePress = (n: AppNotification) => {
    Alert.alert('Notification clicked', `${n.title}`)
    // 🔗 Navegação futura:
    // if (n.targetRoute) router.push(n.targetRoute)
  }

  const DEFAULT_BG = '#99cc33'

  return (
    <YStack f={1} bg="white">
      {/* Topbar */}
      <XStack ai="center" jc="space-between" p="$3">
        <TButton circular chromeless icon={<ArrowLeft />} onPress={() => router.back()} />
        <XStack ai="center" gap="$2">
          <Bell />
          <Text fontSize="$6" fontWeight="700">Notifications</Text>
        </XStack>
        <XStack w={36} />
      </XStack>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Container>
          <YStack gap="$3">
            {items.map((n) => {
              const bg = n.color ?? DEFAULT_BG
              return (
                <Card
                  key={n.id}
                  p="$3"
                  br="$6"
                  bg={bg}
                  elevate
                  animation="bouncy"
                  hoverStyle={{
                    y: -2,
                    shadowColor: '#00000040',
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: 6 },
                  }}
                  pressStyle={{
                    scale: 0.97,
                    shadowColor: '#00000030',
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 3 },
                  }}
                  onPress={() => handlePress(n)}
                >
                  <XStack ai="center" jc="space-between" gap="$2">
                    <XStack ai="center" gap="$2" f={1}>
                      <Bell size={18} color="white" />
                      <YStack f={1}>
                        <Text fontWeight="700" color="white">{n.title}</Text>
                        <Text color="white">{n.message}</Text>
                      </YStack>
                    </XStack>
                    <Text color="white">{n.timestamp}</Text>
                  </XStack>
                </Card>
              )
            })}
          </YStack>
        </Container>
      </ScrollView>
    </YStack>
  )
}
