import React, { useMemo, useState } from 'react'
import { YStack, XStack, Card, Text, Button, Separator, ScrollView } from 'tamagui'
import { useWindowDimensions } from 'react-native'
import { Leaf, Bell, Settings, Circle } from '@tamagui/lucide-icons'
import { PieChart, BarChart } from 'react-native-gifted-charts'
import { Menu } from '~/components/Menu'

// Modais (versão simples com Dialog)
import TeamMoodModal, { MoodPoint } from '~/components/modals/Team/TeamMoodModal'
import ActionImpactModal, { ActionImpactPoint } from '~/components/modals/Actions/ActionImpactModal'

/* ---------------------- Tipos ---------------------- */
type TeamSeries = { team: string; color: string; data: MoodPoint[] } // mood 1..4
type EngagementImpact24h = { action: string; mood24h: number } // 1..4

type StatsData = {
  overallScore: number
  moodByTeam: TeamSeries[]
  actionsImpact24h: EngagementImpact24h[]
  suggestions: string[]
}

/* ---------------------- Constantes ---------------------- */
const EMOJI_Y_LABELS = ['😡', '😕', '🙂', '😄'] // 1..4
const last14 = ['D-13','D-12','D-11','D-10','D-9','D-8','D-7','D-6','D-5','D-4','D-3','D-2','D-1','Today']

/* ---------------------- Mock Data ---------------------- */
// (quando o backend estiver pronto, troque por fetch/WebSocket)
const MOCK: StatsData = {
  overallScore: 82,
  moodByTeam: [
    {
      team: 'Alpha',
      color: '#8DBA3A',
      data: last14.map((ts, i) => ({ ts, mood: [2,2,3,3,3,2,3,3,3,2,3,3,4,4][i] })),
    },
    {
      team: 'Bravo',
      color: '#7FA8F8',
      data: last14.map((ts, i) => ({ ts, mood: [1,2,2,2,3,3,3,3,2,2,3,3,3,3][i] })),
    },
    {
      team: 'Charlie',
      color: '#F6A55D',
      data: last14.map((ts, i) => ({ ts, mood: [3,3,3,4,4,4,3,3,3,3,3,4,4,4][i] })),
    },
  ],
  actionsImpact24h: [
    { action: 'Public Recognition', mood24h: 4 },
    { action: '2h Focus Window', mood24h: 3 },
    { action: 'Short Workshop', mood24h: 3 },
    { action: 'Team Coffee Break', mood24h: 3 },
  ],
  suggestions: [
    'Keep weekly recognitions (5 min in all-hands).',
    'Reserve 2h/day for deep focus (no meetings).',
    'Short workshops solving real team problems.',
  ],
}

/* ---------------------- Utils ---------------------- */
const clamp = (min: number, n: number, max: number) => Math.max(min, Math.min(max, n))
const average = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0)

/* ---------------------- IA Local ---------------------- */
function generateSuggestions(stats: StatsData, horizonDays: 7 | 30 | 90): string[] {
  const latestByTeam = stats.moodByTeam.map((t) => t.data.at(-1)?.mood ?? 3)
  const latestAvg = average(latestByTeam)
  const last7Avg = average(stats.moodByTeam.flatMap((t) => t.data.slice(-7).map((p) => p.mood)))
  const delta = latestAvg - last7Avg

  const lowMorale = [
    'Schedule a soccer or volleyball match after work.',
    'Bring snacks or lunch for the team during work hours.',
    'Block Friday morning for focus + team breakfast.',
    'Short 1:1 check-ins with stressed teammates.',
    'Reduce long meetings for 1 week, switch to async updates.',
    'Organize a “Well-being Day” with stretching/walk session.',
  ]
  const midMorale = [
    'Weekly public recognition (5 min in all-hands).',
    'Daily 2h focus window with no interruptions.',
    'Short Lunch & Learn with internal case study.',
    'Mentorship pairing (junior + senior) for 2 weeks.',
    '2-min gratitude round at end of day.',
  ]
  const highMorale = [
    'Plan a “Ship-It Day” with quick deliveries.',
    'Set short-term goals (2–3 weeks) with visible wins.',
    'Rotate meeting facilitators to increase ownership.',
    'Host positive feedback round with business context.',
  ]

  const horizonHint =
    horizonDays === 7
      ? 'Focus on quick-win actions within a week.'
      : horizonDays === 30
      ? 'Balance well-being with clear monthly goals.'
      : 'Sustain current rhythm and reinforce healthy practices.'

  let pool: string[] = []
  if (latestAvg < 2.25) {
    pool = lowMorale
    if (delta < 0) pool.push('Create a daily 90-min silent zone for focus.')
  } else if (latestAvg < 3.25) {
    pool = midMorale
    if (delta < 0) pool.push('Add micro-breaks (3 min) every 90 min of work.')
  } else {
    pool = highMorale
    if (delta < 0) pool.push('Revisit meeting load; preserve focus windows.')
  }

  const topAction = [...stats.actionsImpact24h].sort((a, b) => b.mood24h - a.mood24h)[0]?.action
  const topActionLine = topAction
    ? `Reinforce: “${topAction}” (highest impact observed in 24h).`
    : undefined

  const uniq = (arr: string[]) => [...new Set(arr)]
  const pick = (arr: string[], n: number) => uniq(arr).sort(() => Math.random() - 0.5).slice(0, n)

  const base = pick(pool, 3)
  if (topActionLine) base.unshift(topActionLine)
  base.push(horizonHint)
  return base
}

/* ---------------------- Página ---------------------- */
export default function AdminAnalytics() {
  const [stats, setStats] = useState<StatsData>(MOCK)
  const [horizon, setHorizon] = useState<7 | 30 | 90>(30)

  // Modais
  const [openTeam, setOpenTeam] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<{ name: string; color: string; series: MoodPoint[] } | null>(null)

  const [openAction, setOpenAction] = useState(false)
  const [selectedAction, setSelectedAction] = useState<{ name: string; timeline: ActionImpactPoint[] } | null>(null)

  // dimensões responsivas
  const { width: winW } = useWindowDimensions()
  const PAGE_PAD = 12
  const CARD_PAD = 12
  const MAX_CARD_WIDTH = 420
  const cardW = Math.floor(Math.min(winW - PAGE_PAD * 2, MAX_CARD_WIDTH))
  const innerW = Math.max(260, cardW - CARD_PAD * 2)

  const pieRadius = clamp(48, Math.round(innerW * 0.2), 72)
  const innerRadius = Math.round(pieRadius * 0.64)
  const teamBarHeight = clamp(170, Math.round(innerW * 0.58), 220)
  const actBarHeight = clamp(170, Math.round(innerW * 0.58), 220)
  const barWidth = clamp(26, Math.round(innerW * 0.16), 40)
  const spacing = clamp(20, Math.round(innerW * 0.08), 32)

  // donut
  const pieData = useMemo(
    () => [
      { value: Math.max(1, stats.overallScore), color: '#8DBA3A' },
      { value: Math.max(1, 100 - stats.overallScore), color: '#E9F6D6' },
    ],
    [stats.overallScore]
  )

  // barras: média por time com onPress para abrir modal
  const teamAvgBars = useMemo(() => {
    return stats.moodByTeam.map((t) => ({
      value: Number(average(t.data.map((p) => p.mood)).toFixed(2)),
      label: t.team,
      frontColor: t.color,
      onPress: () => {
        setSelectedTeam({ name: t.team, color: t.color, series: t.data })
        setOpenTeam(true)
      },
    }))
  }, [stats.moodByTeam])

  // timeline fake 24h pós-ação
  function fakeActionTimeline(base: number): ActionImpactPoint[] {
    const days = 14
    return Array.from({ length: days }).map((_, i) => ({
      ts: `D-${days - i}`,
      mood: Math.max(1, Math.min(4, base + (Math.random() * 0.6 - 0.3))),
    }))
  }

  const short = (s: string) =>
    s
      .replace('Public Recognition', 'Recognition')
      .replace('2h Focus Window', 'Focus 2h')
      .replace('Short Workshop', 'Workshop')
      .replace('Team Coffee Break', 'Coffee')

  // barras: ações com onPress para abrir modal
  const actionBars = useMemo(
    () =>
      stats.actionsImpact24h.map((a) => ({
        value: a.mood24h,
        label: short(a.action),
        frontColor: '#8DBA3A',
        onPress: () => {
          setSelectedAction({ name: a.action, timeline: fakeActionTimeline(a.mood24h) })
          setOpenAction(true)
        },
      })),
    [stats.actionsImpact24h]
  )

  return (
    <YStack f={1} bg="white">
      {/* Header */}
      <YStack p="$4" pt="$5" bg="white">
        <XStack ai="center" jc="space-between" mx="auto" w="100%" maw={MAX_CARD_WIDTH}>
          <XStack ai="center" gap="$2">
            <Leaf color="#8DBA3A" />
            <Text fontSize="$6" fontWeight="700">Team Analytics</Text>
          </XStack>
          <XStack ai="center" gap="$3">
            <Button circular chromeless icon={<Bell />} />
            <Button circular chromeless icon={<Settings />} />
          </XStack>
        </XStack>
      </YStack>

      <Separator />

      {/* Conteúdo */}
      <ScrollView f={1} contentContainerStyle={{ padding: PAGE_PAD, paddingBottom: 120 }} showsVerticalScrollIndicator>
        <YStack gap="$3" mx="auto" w="100%" maw={MAX_CARD_WIDTH}>

          {/* Well-being Metrics */}
          <Card p="$3" br="$8" bw={1} boc="$gray5" bg="#E9F6D6">
            <Text fontSize="$6" fontWeight="800" mb="$2">Well-being Metrics</Text>
            <XStack jc="space-between" ai="center" w="100%">
              <Text color="$gray11">Overall Score</Text>
              <Text fontSize="$8" fontWeight="800" color="#8DBA3A">
                {Math.round(stats.overallScore)}%
              </Text>
            </XStack>
            <YStack ai="center" w="100%" mt="$2">
              <PieChart
                data={pieData}
                donut
                radius={pieRadius}
                innerRadius={innerRadius}
                centerLabelComponent={() => (
                  <Text fontWeight="800" color="#8DBA3A">
                    {Math.round(stats.overallScore)}%
                  </Text>
                )}
              />
            </YStack>
          </Card>

          {/* Média de humor por time (15 dias) */}
          <Card p="$3" br="$8" bw={1} boc="$gray5" bg="#d9d9d9" overflow="hidden">
            <Text fontSize="$6" fontWeight="800" mb="$2">Average Mood by Team (15 days)</Text>
            <YStack w="100%" ai="center" gap="$2">
              <BarChart
                data={teamAvgBars}
                width={innerW}
                height={teamBarHeight}
                barWidth={barWidth}
                spacing={spacing}
                barBorderRadius={10}
                isAnimated
                maxValue={4}
                noOfSections={3}
                yAxisLabelTexts={EMOJI_Y_LABELS}
                yAxisTextStyle={{ color: '#777' }}
                xAxisThickness={0}
                yAxisThickness={1}
                rulesColor="#eee"
                backgroundColor="transparent"
              />
              <XStack gap="$4" mt="$1">
                {stats.moodByTeam.map((t) => (
                  <Legend key={t.team} color={t.color} label={t.team} />
                ))}
              </XStack>
            </YStack>
            <Text mt="$2" color="$gray10" ta="center">
              Tap a bar to open detailed timeline for that team
            </Text>
          </Card>

          {/* Ações de engajamento — humor após 24h */}
          <Card p="$3" br="$8" bw={1} boc="$gray5" bg="#d9d9d9" overflow="hidden">
            <Text fontSize="$6" fontWeight="800" mb="$2">Engagement Actions • Mood after 24h</Text>
            <YStack w="100%" ai="center">
              <BarChart
                data={actionBars}
                width={innerW}
                height={actBarHeight}
                barWidth={barWidth}
                spacing={spacing}
                barBorderRadius={10}
                isAnimated
                maxValue={4}
                noOfSections={3}
                yAxisLabelTexts={EMOJI_Y_LABELS}
                yAxisTextStyle={{ color: '#777' }}
                xAxisThickness={0}
                yAxisThickness={1}
                rulesColor="#eee"
                backgroundColor="transparent"
              />
            </YStack>
            <Text mt="$2" color="$gray10" ta="center">
              Tap a bar to open detailed 24h impact timeline
            </Text>
          </Card>

          {/* Sugestões (IA) */}
          <Card p="$3" br="$8" bw={1} boc="$gray5" bg="#E9F6D6">
            <Text fontSize="$6" fontWeight="800" mb="$2">Suggestions (AI)</Text>

            <XStack jc="center" gap="$2" mb="$2">
              <Button size="$2" br="$10" bg={horizon === 7 ? '#99cc33' : '$gray3'} onPress={() => setHorizon(7)}>
                <Text color={horizon === 7 ? 'white' : '$gray11'}>7d</Text>
              </Button>
              <Button size="$2" br="$10" bg={horizon === 30 ? '#99cc33' : '$gray3'} onPress={() => setHorizon(30)}>
                <Text color={horizon === 30 ? 'white' : '$gray11'}>30d</Text>
              </Button>
              <Button size="$2" br="$10" bg={horizon === 90 ? '#99cc33' : '$gray3'} onPress={() => setHorizon(90)}>
                <Text color={horizon === 90 ? 'white' : '$gray11'}>90d</Text>
              </Button>
            </XStack>

            <YStack gap="$2" mb="$3">
              {stats.suggestions.map((s, i) => (
                <Text key={i} color="$gray11">• {s}</Text>
              ))}
            </YStack>

            <XStack gap="$2" jc="center">
              <Button br="$10" bg="#99cc33" onPress={() => setStats((s) => ({ ...s, suggestions: generateSuggestions(s, horizon) }))}>
                <Text color="white">Generate Suggestions</Text>
              </Button>
              <Button br="$10" bg="$gray3" onPress={() => setStats((s) => ({ ...s, suggestions: generateSuggestions(s, horizon) }))}>
                <Text>More Ideas</Text>
              </Button>
            </XStack>
          </Card>
        </YStack>
      </ScrollView>

      {/* Modais */}
      {selectedTeam && (
        <TeamMoodModal
          open={openTeam}
          onOpenChange={setOpenTeam}
          teamName={selectedTeam.name}
          color={selectedTeam.color}
          series={selectedTeam.series}
          width={innerW}
        />
      )}

      {selectedAction && (
        <ActionImpactModal
          open={openAction}
          onOpenChange={setOpenAction}
          actionName={selectedAction.name}
          timeline24h={selectedAction.timeline}
          width={innerW}
        />
      )}

      <Menu />
    </YStack>
  )
}

/* ---------------------- UI Helpers ---------------------- */
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <XStack ai="center" gap="$2">
      <Circle size={10} color={color} fill={color} />
      <Text color="$gray11">{label}</Text>
    </XStack>
  )
}
