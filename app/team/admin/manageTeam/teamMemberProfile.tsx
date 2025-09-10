// app/team/admin/manageTeam/teamMemberProfile.tsx
import React, { useMemo } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import {
  YStack, XStack, Text, Avatar, Card, ScrollView, Button as TButton, Separator
} from 'tamagui'
import { ArrowLeft, Mail, Phone } from '@tamagui/lucide-icons'
import { LineChart, BarChart } from 'react-native-gifted-charts'
import { useWindowDimensions } from 'react-native'

const MOCK_MAP = {
  u1: {
    name: 'Emily Clark',
    email: 'emily.clark@example.com',
    phone: '(555) 111-1234',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  u2: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 222-4567',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  u3: {
    name: 'Sarah Lee',
    email: 'sarah.lee@example.com',
    phone: '(555) 333-7890',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
} as const

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const EMOJI_Y = ['😡', '😕', '🙂', '😄'] // 1..4

type NoteType = 'suggestion' | 'complaint' | 'praise' | 'issue'
type Note = { id: string; type: NoteType; dateISO: string; text: string }

const TYPE_STYLES: Record<NoteType, { bg: string; color: string; label: string }> = {
  suggestion: { bg: '#EAF7D8', color: '#2C5A00', label: 'Suggestion' },
  complaint:  { bg: '#FBE6E6', color: '#8A1E1E', label: 'Complaint' },
  praise:     { bg: '#E7F3FF', color: '#0B3A67', label: 'Praise' },
  issue:      { bg: '#FFF4CC', color: '#5A4100', label: 'Issue' },
}

export default function TeamMemberProfile() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const data = id ? (MOCK_MAP as any)[id] : undefined
  const { width } = useWindowDimensions()
  const chartW = Math.min(340, width - 32)

  // ------ MOCK ------
  const moodValues = useMemo<number[]>(
    () => [3, 3, 2, 3, 4, 3], // 1..4 (😡..😄)
    []
  )
  const sessionsValues = useMemo<number[]>(
    () => [1, 2, 3, 3, 2, 1],
    []
  )

  // Feedbacks / comentários (mock)
  const notes: Note[] = useMemo(
    () => [
      {
        id: 'n1',
        type: 'suggestion',
        dateISO: '2025-03-10',
        text: 'Add a 2h daily focus window for fewer meeting interruptions.',
      },
      {
        id: 'n2',
        type: 'complaint',
        dateISO: '2025-03-11',
        text: 'Video calls are too long on Mondays; consider shorter standups.',
      },
      {
        id: 'n3',
        type: 'praise',
        dateISO: '2025-03-12',
        text: 'Team collaboration improved after the recognition shout-outs.',
      },
      {
        id: 'n4',
        type: 'issue',
        dateISO: '2025-03-12',
        text: 'Network instability during remote sessions affected attendance.',
      },
    ],
    []
  )
  // 🔗 BACKEND (posterior):
  // useEffect(() => {
  //   fetch(`/api/members/${id}/notes`)
  //     .then(r => r.json())
  //     .then(setNotes)
  // }, [id])
  // -------------------

  const fmtDate = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

  if (!data) {
    return (
      <YStack f={1} ai="center" jc="center" bg="white">
        <Text>Member not found</Text>
        <TButton mt="$3" onPress={() => router.back()}><ArrowLeft /></TButton>
      </YStack>
    )
  }

  return (
    <YStack f={1} bg="white">
      <XStack ai="center" jc="space-between" p="$3">
        <TButton circular chromeless icon={<ArrowLeft />} onPress={() => router.back()} />
        <Text fontSize="$6" fontWeight="700">Member Profile</Text>
        <XStack w={36} />
      </XStack>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 36 }}>
        {/* Header do membro */}
        <YStack ai="center" mb="$4">
          <Avatar circular size="$9">
            <Avatar.Image src={data.avatar} />
            <Avatar.Fallback bc="$gray5" />
          </Avatar>
          <Text mt="$2" fontSize="$7" fontWeight="700">{data.name}</Text>
          <XStack mt="$1" ai="center" gap="$2">
            <Mail size={16} /><Text>{data.email}</Text>
          </XStack>
          <XStack mt="$1" ai="center" gap="$2">
            <Phone size={16} /><Text>{data.phone}</Text>
          </XStack>
        </YStack>

        {/* Mood • week view (emojis no eixo Y) */}
        <Card p="$3" br="$6" bw={1} boc="$gray5" mb="$3" bg="white">
          <Text fontWeight="700" mb="$2">Mood (Mon–Sat)</Text>
          <LineChart
            data={moodValues.map(v => ({ value: v }))}
            width={chartW}
            height={180}
            maxValue={4}
            noOfSections={3}
            yAxisLabelTexts={EMOJI_Y}
            xAxisLabelTexts={DAYS}
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
          />
        </Card>

        {/* Session Attendance • week view */}
        <Card p="$3" br="$6" bw={1} boc="$gray5" mb="$3" bg="white">
          <Text fontWeight="700" mb="$2">Session Attendance (Mon–Sat)</Text>
          <BarChart
            data={sessionsValues.map((v, i) => ({
              value: v,
              frontColor: i % 2 ? '#8DBA3A' : '#BBD98A',
            }))}
            width={chartW}
            height={180}
            barWidth={24}
            spacing={18}
            noOfSections={4}
            yAxisColor="#ddd"
            xAxisColor="#ddd"
            rulesColor="#eee"
            xAxisLabelTexts={DAYS}
            maxValue={Math.max(...sessionsValues, 4)}
          />
        </Card>

        {/* Feedback / Comentários do membro */}
        <Card p="$3" br="$6" bw={1} boc="$gray5" bg="white">
          <Text fontWeight="700" mb="$2">Member Notes & Feedback</Text>
          <YStack>
            {notes.map((n, i) => {
              const style = TYPE_STYLES[n.type]
              return (
                <YStack key={n.id} py="$2">
                  <XStack ai="center" jc="space-between" mb="$1">
                    <Text color="$gray11">{fmtDate(n.dateISO)}</Text>
                    <TButton size="$2" disabled br="$10" bg={style.bg} color={style.color}>
                      {style.label}
                    </TButton>
                  </XStack>
                  <Text>{n.text}</Text>
                  {i < notes.length - 1 && <Separator mt="$2" />}
                </YStack>
              )
            })}
          </YStack>
          {/* 🔗 Para paginação e busca futura: /api/members/:id/notes?limit=50&cursor=... */}
        </Card>
      </ScrollView>
    </YStack>
  )
}
