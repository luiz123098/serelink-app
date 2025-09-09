// app/credits/converter.tsx
import React, { useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { router } from 'expo-router'
import {
  YStack,
  XStack,
  Text,
  Card,
  Input,
  ScrollView,
  Separator,
  Button as TButton,
} from 'tamagui'
import { ArrowLeft, Check } from '@tamagui/lucide-icons'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { Menu } from '~/components/Menu'

type PaymentMethod = {
  id: string
  label: string
  brand: 'visa' | 'mastercard' | 'amex' | 'other'
  last4: string
}

const MOCK_METHODS: PaymentMethod[] = [
  { id: 'm1', label: 'Visa ending in 1234', brand: 'visa', last4: '1234' },
  { id: 'new', label: 'Add a new card', brand: 'other', last4: '' },
]

// 💵 taxa fictícia: 1 crédito = $0.05
const USD_PER_CREDIT = 0.05
// Cupons fictícios
const PROMO_MAP: Record<string, number> = {
  SAVE10: 0.1,
  HUB5: 0.05,
}

export default function creditConverter() {
  const [credits, setCredits] = useState(0)
  const [promo, setPromo] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string>('m1')
  const [isPaying, setIsPaying] = useState(false)

  const discount = useMemo(() => PROMO_MAP[promo.toUpperCase()] ?? 0, [promo])
  const usdRaw = useMemo(() => credits * USD_PER_CREDIT, [credits])
  const usdFinal = useMemo(() => usdRaw * (1 - discount), [usdRaw, discount])

  const nfUSD = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    []
  )

  function handleInputChange(text: string) {
    const n = Number((text || '').replace(/[^\d]/g, ''))
    if (!Number.isNaN(n)) setCredits(Math.max(0, Math.min(100000, n)))
  }

  async function handlePay() {
    if (!selectedMethod) return
    setIsPaying(true)
    try {
      // 🔗 BACKEND (posterior):
      // await fetch('/api/credits/purchase', {...})
      alert(`(mock) Purchased ${credits} credits for ${nfUSD.format(usdFinal)}.`)
      router.back()
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <YStack f={1} bg="white">
      {/* Header simples com back */}
      <XStack ai="center" jc="space-between" p="$3" bg="white">
        <TButton circular chromeless icon={<ArrowLeft />} onPress={() => router.back()} />
        <Text fontSize="$6" fontWeight="700">Credit Converter</Text>
        <XStack w={36} />
      </XStack>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // ajuste se seu header tiver outra altura
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <Container>
            {/* Bloco de conversão */}
            <YStack gap="$2" mb="$4">
              <Text fontSize="$6" fontWeight="700">Credit Conversion</Text>

              <Card bg="#EAF7D8" boc="#D6EFC2" bw={1} p="$3" br="$6">
                <Text color="$gray11" mb="$2">Enter Credits:</Text>

                {/* Input + stepper */}
                <XStack ai="center" gap="$2" mb="$2">
                  <Input
                    f={1}
                    keyboardType="numeric"
                    value={String(credits)}
                    onChangeText={handleInputChange}
                    bg="white"
                  />
                  <TButton size="$2" onPress={() => setCredits((c) => Math.max(0, c - 50))}>-50</TButton>
                  <TButton size="$2" onPress={() => setCredits((c) => c + 50)}>+50</TButton>
                </XStack>

                <XStack jc="space-between" mt="$2">
                  <Text fontWeight="700">Equivalent USD:</Text>
                  <Text fontWeight="800">{nfUSD.format(usdFinal)}</Text>
                </XStack>

                {!!discount && (
                  <Text mt="$1" color="#5E8E1B">
                    Promo applied: {Math.round(discount * 100)}% off (was {nfUSD.format(usdRaw)})
                  </Text>
                )}
              </Card>
            </YStack>

            {/* Método de pagamento */}
            <YStack gap="$2" mb="$4">
              <Text fontSize="$6" fontWeight="700">Payment Method</Text>
              <Card p="$0" br="$6" bw={1} boc="$gray5" bg="white">
                {MOCK_METHODS.map((m, idx) => {
                  const active = selectedMethod === m.id
                  return (
                    <YStack key={m.id}>
                      <XStack ai="center" jc="space-between" p="$3" onPress={() => setSelectedMethod(m.id)}>
                        <Text>{m.label}</Text>
                        {active && <Check size={16} color="#6aa10f" />}
                      </XStack>
                      {idx < MOCK_METHODS.length - 1 && <Separator />}
                    </YStack>
                  )
                })}
              </Card>
            </YStack>

            {/* Promo code */}
            <YStack gap="$2" mb="$5">
              <Text fontSize="$6" fontWeight="700">Promo Code</Text>
              <Input
                placeholder="Enter promo code"
                value={promo}
                onChangeText={setPromo}
                autoCapitalize="characters"
                bg="white"
              />
            </YStack>

            {/* CTA */}
            <Button
              title={isPaying ? 'Processing...' : 'Convert & Pay'}
              bg="#99cc33"
              color="white"
              br="$10"
              disabled={isPaying || credits <= 0}
              onPress={handlePay}
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </YStack>
  )
}
