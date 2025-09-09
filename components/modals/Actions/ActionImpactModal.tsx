// components/modals/Actions/ActionImpactModal.tsx
import React, { useMemo } from 'react'
import { Dialog, YStack, XStack, Text, Button, ScrollView, Separator, Card } from 'tamagui'
import { LineChart } from 'react-native-gifted-charts'

export type ActionImpactPoint = { ts: string; mood: number } // 1..4
export type ActionComment = { id: string; member: string; text: string; tsISO: string }

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  actionName: string
  timeline24h: ActionImpactPoint[]
  width: number
  /** opcional: comentários reais vindos do back-end futuramente */
  comments?: ActionComment[]
}

const EMOJI_Y_LABELS = ['😡', '😕', '🙂', '😄']
const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

// mock local (remover quando plugar o backend)
const MOCK_COMMENTS: ActionComment[] = [
  { id: 'c1', member: 'Ana',   text: 'This helped me focus better in the afternoon.', tsISO: '2025-03-01T10:12:00Z' },
  { id: 'c2', member: 'Rafa',  text: 'Felt more recognized and motivated.',           tsISO: '2025-03-02T16:40:00Z' },
  { id: 'c3', member: 'Lia',   text: 'Nice for team morale, keep it!',                tsISO: '2025-03-03T09:05:00Z' },
]

export default function ActionImpactModal({
  open,
  onOpenChange,
  actionName,
  timeline24h,
  width,
  comments,
}: Props) {
  // Mantém só os últimos 7 pontos para a semana
  const sliced = useMemo(() => timeline24h.slice(-7), [timeline24h])

  // LineChart espera { value }, os labels do X colocamos separados
  const data = useMemo(() => sliced.map(p => ({ value: p.mood })), [sliced])

  // rótulos compactos: M T W T F S S
  const xLabels = useMemo(
    () => WEEK_LABELS.slice(0, data.length),
    [data.length]
  )

  // largura e espaçamento responsivos
  const chartWidth = Math.min(520, Math.max(280, Math.floor(width * 0.94)))
  const spacing = useMemo(() => {
    const n = Math.max(1, data.length)
    const s = Math.round(chartWidth / Math.min(8, n)) - 6
    return Math.max(12, Math.min(28, s))
  }, [chartWidth, data.length])

  // comentários (mock se não vierem via props)
  const feedback = comments?.length ? comments : MOCK_COMMENTS

  const fmt = (iso: string) => {
    try {
      const d = new Date(iso)
      return d.toLocaleString()
    } catch {
      return iso
    }
  }

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
              {actionName} • Weekly impact
            </Text>
          </XStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Gráfico */}
            <YStack ai="center" mb="$3">
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
                color="#8DBA3A"
                hideDataPoints
                areaChart
                startFillColor1="#8DBA3A22"
                endFillColor1="#8DBA3A00"
                spacing={spacing}
              />
            </YStack>

            <Text mt="$1" mb="$3" color="$gray10">
              Emoji scale: 😡 1 — 😕 2 — 🙂 3 — 😄 4
            </Text>

            <Separator />

            {/* Comentários dos membros */}
            <YStack mt="$3" gap="$2">
              <Text fontWeight="800" fontSize="$5">Member feedback</Text>

              {feedback.length === 0 ? (
                <Text color="$gray10">No comments for this action yet.</Text>
              ) : (
                <YStack gap="$2">
                  {feedback.map((c, idx) => (
                    <Card key={c.id ?? idx} p="$3" br="$6" bw={1} boc="$gray5" bg="white">
                      <XStack jc="space-between" ai="center" mb="$1">
                        <Text fontWeight="700">{c.member}</Text>
                        <Text color="$gray10" fontSize="$2">{fmt(c.tsISO)}</Text>
                      </XStack>
                      <Text>{c.text}</Text>
                    </Card>
                  ))}
                </YStack>
              )}
            </YStack>

            {/* OBS: quando plugar backend:
                - trocar MOCK_COMMENTS por dados de /api/actions/:id/comments
                - timeline24h deve vir com os pontos diários de humor pós-ação
            */}
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
