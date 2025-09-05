import React from 'react'
import { Dialog, YStack, XStack, Text, Button, ScrollView } from 'tamagui'
import { LineChart } from 'react-native-gifted-charts'

export type ActionImpactPoint = { ts: string; mood: number } // 1..4

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  actionName: string
  timeline24h: ActionImpactPoint[]
  width: number
}

const EMOJI_Y_LABELS = ['😡', '😕', '🙂', '😄']

export default function ActionImpactModal({
  open,
  onOpenChange,
  actionName,
  timeline24h,
  width,
}: Props) {
  const data = timeline24h.map((p) => ({ value: p.mood, label: p.ts }))

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" bg="rgba(0,0,0,0.35)" />
        <Dialog.Content
          key="content"
          elevate
          w="100%"
          h="85%"
          maxWidth={520}
          bg="white"
          br="$8"
          p="$4"
        >
          <XStack jc="space-between" ai="center" mb="$3">
            <Text fontSize="$6" fontWeight="800">{actionName} • 24h impact</Text>
            <Dialog.Close asChild>
              <Button size="$2" br="$10" bg="$gray3">
                <Text>Close</Text>
              </Button>
            </Dialog.Close>
          </XStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack ai="center">
              <LineChart
                data={data}
                width={Math.min(width, 480)}
                height={220}
                spacing={16}
                thickness={3}
                curved
                yAxisTextStyle={{ color: '#777' }}
                yAxisLabelTexts={EMOJI_Y_LABELS}
                yAxisThickness={1}
                xAxisThickness={0}
                rulesColor="#eee"
                color1="#8DBA3A"
                areaChart
                startFillColor1="#8DBA3A22"
                endFillColor1="#8DBA3A00"
              />
            </YStack>

            <Text mt="$2" color="$gray10">
              Emoji scale: 😡 1 — 😕 2 — 🙂 3 — 😄 4
            </Text>
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
