// app/subscription/subscriptionManagement.tsx
import React, { useMemo, useState } from 'react'
import { router } from 'expo-router'
import {
  YStack,
  XStack,
  Text,
  Card,
  Avatar,
  Separator,
  ScrollView,
  Button as TButton,
} from 'tamagui'
import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { Menu } from '~/components/Menu'

type Plan = {
  id: string
  name: string
  priceLabel: string
  credits: number
  per: 'month' | 'year'
  highlight?: string
}

const PLANS: Plan[] = [
  { id: 'basic',  name: 'Basic Plan',  priceLabel: '$4.99/month',  credits: 1200, per: 'month' },
  { id: 'family', name: 'Family Plan', priceLabel: '$19.99/month', credits: 12000, per: 'month',  highlight: 'Get 2.000 credits free!' },
  { id: 'annual', name: 'Annual Plan', priceLabel: '$99.99/year',  credits: 55000, per: 'year', highlight: 'Get 5.000 credits free!' },
]

const CURRENT = {
  user: {
    name: 'Mindful User',
    handle: '@mindful_user',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    credits: 4380,
  },
  plan: {
    id: 'starter',
    name: 'Mindful Starter',
    renewalDate: '10th December',
    description: 'Get a certain amount of credits to spend into all in app features',
  },
}

export default function SubscriptionManagement() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const availablePlans = useMemo(() => PLANS, [])

  const handleUpgrade = (planId: string) => {
    setLoadingPlan(planId)
    setTimeout(() => {
      setLoadingPlan(null)
      alert(`(mock) Upgraded to ${planId}`)
    }, 800)
  }

  return (
    <YStack f={1} bg="white" position="relative">
      <ScrollView showsVerticalScrollIndicator>
        {/* Top buttons (voltar / cancelar plano) */}
        <YStack position="absolute" style={{ top: 12, left: 12, zIndex: 100 }}>
          <TButton
            size="$3"
            circular
            icon={<ArrowLeft />}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            bg="transparent"
          />
        </YStack>

        <YStack position="absolute" style={{ top: 12, right: 12, zIndex: 100 }}>
          <TButton
            size="$3"
            circular
            icon={<Trash2 />}
            onPress={() => alert('(mock) Cancel plan')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            bg="transparent"
          />
        </YStack>

        <Container>
          {/* Header do usuário */}
          <YStack ai="center" mb="$4">
            <Avatar circular size="$8">
              <Avatar.Image src={CURRENT.user.avatar} />
              <Avatar.Fallback bc="$gray5" />
            </Avatar>
            <Text mt="$2" fontSize="$7" fontWeight="700">Current Plan</Text>
            <Text color="$gray10">{CURRENT.user.handle}</Text>

            <YStack ai="center" mt="$3">
              <Text fontSize="$8" fontWeight="800">{CURRENT.user.credits.toLocaleString()}</Text>
              <Text color="$gray10">Credits</Text>
            </YStack>
          </YStack>

          <Separator />

          {/* Plano atual */}
          <YStack mt="$4" mb="$4">
            <Text fontSize="$6" fontWeight="700" mb="$2">Manage Your Plans</Text>
            <Card
              bg="#EAF7D8"
              p="$3"
              br="$6"
              bw={1}
              boc="#D6EFC2"
              shadowColor="#00000020"
              shadowOpacity={0.1}
            >
              <YStack>
                <Text fontSize="$5" fontWeight="700">{CURRENT.plan.name}</Text>
                <Text mt="$1" color="$gray11">{CURRENT.plan.description}</Text>
                <Text mt="$2" fontWeight="700" color="$gray11">
                  Renewal Date: {CURRENT.plan.renewalDate}
                </Text>
              </YStack>
            </Card>
          </YStack>

          <Separator />

          {/* Planos disponíveis */}
          <YStack mt="$4" mb="$6" gap="$3">
            <Text fontSize="$6" fontWeight="700">Available Plans</Text>

            {availablePlans.map((p) => (
              <Card key={p.id} bg="$gray4" p="$3" br="$6" bw={1} boc="$gray5">
                {/* <-- AQUI é a mudança: layout em linha com o botão à direita */}
                <XStack jc="space-between" ai="center" gap="$3">
                  <YStack f={1} gap="$1" mr="$2">
                    <Text fontSize="$5" fontWeight="700">{p.name}</Text>
                    <Text color="$gray11">{p.priceLabel}</Text>
                    <Text color="$gray11">{p.credits.toLocaleString()} Credits</Text>
                    {!!p.highlight && (
                      <Text color="#5E8E1B" fontWeight="700">{p.highlight}</Text>
                    )}
                  </YStack>

                  <Button
                    title={loadingPlan === p.id ? 'Processing...' : 'Upgrade'}
                    bg="#99cc33"
                    color="white"
                    br="$10"
                    disabled={!!loadingPlan}
                    onPress={() => handleUpgrade(p.id)}
                  />
                </XStack>
              </Card>
            ))}
          </YStack>
        </Container>
      </ScrollView>
    </YStack>
  )
}
