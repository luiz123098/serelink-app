// components/modals/Team/TeamMoodModal.tsx
import React, { useMemo } from 'react'
import { Dialog, YStack, XStack, Text, ScrollView } from 'tamagui'
import { LineChart } from 'react-native-gifted-charts'

export type MoodPoint = { ts: string; mood: number } // 1..4

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  teamName: string
  color: string
  series: MoodPoint[]
  width: number
}

const EMOJI_Y_LABELS = ['😡', '😕', '🙂', '😄']
// Semana fixa: abreviações curtas
const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function TeamMoodModal({
  open,
  onOpenChange,
  teamName,
  color,
  series,
  width,
}: Props) {
  const sliced = useMemo(() => series.slice(-7), [series])

  const data = useMemo(
    () => sliced.map((p) => ({ value: p.mood })),
    [sliced]
  )

  const xLabels = useMemo(
    () => WEEK_LABELS.slice(0, data.length),
    [data.length]
  )

  const chartWidth = Math.min(520, Math.max(280, Math.floor(width * 0.94)))
  const spacing = useMemo(() => {
    const n = Math.max(1, data.length)
    const s = Math.round(chartWidth / Math.min(8, n)) - 6
    return Math.max(12, Math.min(28, s))
  }, [chartWidth, data.length])

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Overlay bg="rgba(0,0,0,0.35)" onPress={() => onOpenChange(false)} />

        <Dialog.Content
          alignSelf="center"
          w="90%"
          maxWidth={560}
          maxHeight="85%"
          bg="white"
          br="$8"
          p="$4"
        >
          <XStack jc="space-between" ai="center" mb="$3">
            <Text fontSize="$6" fontWeight="800">
              {teamName} • Mood (Weekly)
            </Text>
          </XStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack ai="center">
              <LineChart
                data={data}
                width={chartWidth}
                height={200}
                maxValue={4}
                noOfSections={3}
                yAxisLabelTexts={EMOJI_Y_LABELS}
                xAxisLabelTexts={xLabels}
                yAxisTextStyle={{ color: '#777' }}
                yAxisColor="#ddd"
                xAxisColor="#ddd"
                rulesColor="#eee"
                curved
                thickness={3}
                color={color}
                hideDataPoints
                areaChart
                startFillColor1={`${color}22`}
                endFillColor1={`${color}00`}
                spacing={spacing}
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
