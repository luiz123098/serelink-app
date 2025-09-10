import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { router } from 'expo-router'
import {
  YStack, XStack, Text, Card, Input, ScrollView, Separator, Button as TButton
} from 'tamagui'
import { ArrowLeft, Check, CreditCard, Trash2, Plus } from '@tamagui/lucide-icons'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// Stripe (quando for integrar):
// import { initStripe, useStripe } from '@stripe/stripe-react-native'
// useEffect(() => { initStripe({ publishableKey: 'pk_live_...', merchantIdentifier: 'merchant.com.yourapp' }) }, [])

type UiPaymentMethod = {
  id: string
  brand: string
  last4: string
  exp_month?: number
  exp_year?: number
  isDefault?: boolean
}

/** --------- MOCK local (remover ao plugar backend) ---------- */
const MOCK_METHODS: UiPaymentMethod[] = [
  { id: 'pm_mock_1', brand: 'visa', last4: '1234', exp_month: 12, exp_year: 2028, isDefault: true },
  { id: 'pm_mock_2', brand: 'mastercard', last4: '5678', exp_month: 8, exp_year: 2027 },
]
/** ----------------------------------------------------------- */

export default function PaymentMethodsScreen() {
  // const { initPaymentSheet, presentPaymentSheet } = useStripe()

  const [methods, setMethods] = useState<UiPaymentMethod[]>(MOCK_METHODS)
  const [loading, setLoading] = useState(false)
  const [promo, setPromo] = useState('')

  // ---- Carregar métodos (backend) ----
  const load = useCallback(async () => {
    setLoading(true)
    try {
      // const res = await fetch('https://api.seuservidor.com/payments/methods', { credentials: 'include' })
      // const json: UiPaymentMethod[] = await res.json()
      // setMethods(json)
      setMethods(MOCK_METHODS) // mock
      // const savedPromo = await AsyncStorage.getItem('promo_code')
      // if (savedPromo) setPromo(savedPromo)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // ---- Adicionar método (PaymentSheet em modo Setup) ----
  const addMethod = useCallback(async () => {
    setLoading(true)
    try {
      /** BACKEND:
       * 1) POST /payments/ephemeral-key  -> { ephemeralKey }
       * 2) POST /payments/setup-intent   -> { client_secret, customerId }
       * 3) Stripe.initPaymentSheet({ customerId, customerEphemeralKeySecret, setupIntentClientSecret, merchantDisplayName })
       * 4) presentPaymentSheet()
       * 5) Recarregar métodos do cliente
       */

      // const ek = await (await fetch('/payments/ephemeral-key',{method:'POST'})).json()
      // const si = await (await fetch('/payments/setup-intent',{method:'POST'})).json()
      // const init = await initPaymentSheet({
      //   customerId: si.customerId,
      //   customerEphemeralKeySecret: ek.secret,
      //   setupIntentClientSecret: si.client_secret,
      //   merchantDisplayName: 'MindWell',
      //   allowsDelayedPaymentMethods: false,
      // })
      // if (init.error) throw init.error
      // const present = await presentPaymentSheet()
      // if (present.error) throw present.error
      // await load()

      // MOCK: adiciona um cartão fake
      const n = Math.floor(1000 + Math.random() * 9000)
      setMethods((prev) => [
        ...prev,
        { id: `pm_mock_${Date.now()}`, brand: 'visa', last4: String(n), exp_month: 12, exp_year: 2029 },
      ])
    } finally {
      setLoading(false)
    }
  }, [/*initPaymentSheet, presentPaymentSheet,*/ load])

  // ---- Remover método ----
  const removeMethod = useCallback(async (pmId: string) => {
    setLoading(true)
    try {
      // await fetch(`/payments/methods/${pmId}`, { method: 'DELETE' })
      // await load()
      setMethods((prev) => prev.filter(m => m.id !== pmId)) // mock
    } finally {
      setLoading(false)
    }
  }, [/*load*/])

  // ---- Tornar default ----
  const makeDefault = useCallback(async (pmId: string) => {
    setLoading(true)
    try {
      // await fetch(`/payments/methods/${pmId}/default`, { method: 'POST' })
      // await load()
      setMethods((prev) => prev.map(m => ({ ...m, isDefault: m.id === pmId }))) // mock
    } finally {
      setLoading(false)
    }
  }, [])

  // ---- Salvar / aplicar promo globalmente ----
  const savePromo = useCallback(async () => {
    setLoading(true)
    try {
      // const res = await fetch('/promo/apply', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ code: promo }) })
      // if (!res.ok) { alert('Invalid or expired code'); return }
      // await AsyncStorage.setItem('promo_code', promo.toUpperCase())
      alert(`(mock) Promo code ${promo.toUpperCase()} saved`)
    } finally {
      setLoading(false)
    }
  }, [promo])

  return (
    <YStack f={1} bg="white">
      {/* Topbar */}
      <XStack ai="center" jc="space-between" p="$3" bg="white">
        <TButton circular chromeless icon={<ArrowLeft />} onPress={() => router.back()} />
        <Text fontSize="$6" fontWeight="700">Payment Methods</Text>
        <XStack w={36} />
      </XStack>

      <ScrollView contentContainerStyle={{ paddingBottom: 48 }}>
        <Container>
          {/* Métodos de pagamento */}
          <YStack gap="$2" mb="$4">
            <Text fontSize="$6" fontWeight="700">Your cards</Text>

            <Card p="$0" br="$6" bw={1} boc="$gray5" bg="white">
              {methods.map((m, idx) => (
                <YStack key={m.id}>
                  <XStack ai="center" jc="space-between" p="$3" gap="$2">
                    <XStack ai="center" gap="$2" f={1}>
                      <CreditCard size={18} />
                      <Text>
                        {m.brand.toUpperCase()} •••• {m.last4}
                        {m.exp_month && m.exp_year ? `  (${m.exp_month}/${String(m.exp_year).slice(-2)})` : ''}
                      </Text>
                      {m.isDefault && (
                        <XStack ai="center" gap="$1" ml="$2">
                          <Check size={14} color="#6aa10f" />
                          <Text color="#6aa10f">Default</Text>
                        </XStack>
                      )}
                    </XStack>

                    <XStack gap="$2">
                      {!m.isDefault && (
                        <TButton size="$2" onPress={() => makeDefault(m.id)}>
                          Set default
                        </TButton>
                      )}
                      <TButton size="$2" chromeless icon={<Trash2 />} onPress={() => removeMethod(m.id)} />
                    </XStack>
                  </XStack>
                  {idx < methods.length - 1 && <Separator />}
                </YStack>
              ))}
            </Card>

            <XStack jc="flex-start" mt="$2">
              <Button
                title={loading ? 'Please wait...' : 'Add new card'}
                bg="#99cc33"
                color="white"
                br="$10"
                iconAfter={<Plus color="white" />}
                disabled={loading}
                onPress={addMethod}
              />
            </XStack>
          </YStack>

          {/* Código promocional global */}
          <YStack gap="$2" mb="$6">
            <Text fontSize="$6" fontWeight="700">Promo Code</Text>
            <Input
              placeholder="Enter promo code"
              value={promo}
              onChangeText={(t) => setPromo(t.trim())}
              autoCapitalize="characters"
              bg="white"
            />
            <XStack jc="flex-start">
              <Button
                title={loading ? 'Saving...' : 'Save promo'}
                bg="$gray4"
                br="$10"
                onPress={savePromo}
                disabled={loading || !promo}
              />
            </XStack>
            <Text color="$gray10">
              This code will be applied to all future purchases while valid.
            </Text>
          </YStack>
        </Container>
      </ScrollView>
    </YStack>
  )
}
