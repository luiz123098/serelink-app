import React, { useMemo, useState } from 'react'
import { router } from 'expo-router'
import {
  YStack, XStack, Text, Card, Avatar, Separator, ScrollView, Button as TButton
} from 'tamagui'
import { ArrowLeft, Eye, X as XIcon, CheckCircle2, Plus, Users as UsersIcon } from '@tamagui/lucide-icons'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { Menu } from '~/components/Menu'
import { Alert } from 'react-native'

type Member = {
  id: string
  name: string
  title: string
  avatar: string
  active: boolean
}

const MOCK_MEMBERS: Member[] = [
  { id: 'u1', name: 'Emily Clark',  title: 'Solutions Intern',     avatar: 'https://randomuser.me/api/portraits/women/44.jpg', active: true },
  { id: 'u2', name: 'John Smith',   title: 'Sales Agent',   avatar: 'https://randomuser.me/api/portraits/men/32.jpg',   active: false },
  { id: 'u3', name: 'Sarah Lee',    title: 'Intern',                 avatar: 'https://randomuser.me/api/portraits/women/68.jpg', active: true },
]

export default function TeamManagement() {
  // 🔗 BACKEND (posterior): carregar membros do time do admin autenticado
  // const session = useSession()...
  // useEffect(() => fetch(`/api/teams/${session.teamId}/members`).then(setMembers), [session])
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS)

  const toggleActive = (id: string) =>
    setMembers((prev) => prev.map(m => m.id === id ? { ...m, active: !m.active } : m))

   const handleRemoveUser = (id: string) => {
    const member = members.find((m) => m.id === id)
    if (!member) return

    Alert.alert(
      'Remove User',
      `Are you sure you want to remove ${member.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            // 🔗 BACKEND (posterior): DELETE /api/members/:id
            setMembers((prev) => prev.filter((m) => m.id !== id))
            alert(`(mock) Removed ${member.name}`)
          },
        },
      ]
    )
  }

  return (
    <YStack f={1} bg="white">
      {/* Topbar simples */}
      <XStack ai="center" jc="space-between" p="$3">
        <TButton circular chromeless icon={<ArrowLeft />} onPress={() => router.back()} />
        <XStack ai="center" gap="$2">
          <UsersIcon />
          <Text fontSize="$6" fontWeight="700">Manage users</Text>
        </XStack>
        <XStack w={36} />
      </XStack>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Container>
          <YStack gap="$3">
            {members.map((m) => (
              <Card key={m.id} p="$3" br="$6" bw={1} boc="$gray5" bg="white">
                <XStack ai="center" jc="space-between" gap="$3">
                  <XStack ai="center" gap="$3" f={1}>
                    <Avatar circular size="$6">
                      <Avatar.Image src={m.avatar} />
                      <Avatar.Fallback bc="$gray5" />
                    </Avatar>
                    <YStack f={1}>
                      <Text fontWeight="700">{m.name}</Text>
                      <Text color="$gray10">{m.title}</Text>
                    </YStack>
                  </XStack>

                  <XStack gap="$2">
                    {/* Ver perfil */}
                    <TButton
                      size="$3"
                      circular
                      bg="#EAF7D8"
                      icon={<Eye color={'#6aa10f'} />}
                      onPress={() => router.push({ pathname: '/team/admin/manageTeam/teamMemberProfile', params: { id: m.id } })}
                      /*onPress={() => router.push({ pathname: '/team/admin/users/[id]', params: { id: m.id } })}*/
                    />
                    {/* (des)ativar */}
                    <TButton
                      size="$3"
                      circular
                      bg="#FBE6E6"
                      icon={<XIcon color="#b42318" />}
                      onPress={() => handleRemoveUser(m.id)}
                    />
                  </XStack>
                </XStack>
              </Card>
            ))}
          </YStack>
        </Container>
      </ScrollView>

      {/* Botão flutuante de adicionar */}
      <YStack position="absolute" style={{ right: 18, bottom: 18 }}>
        <TButton
          circular
          size="$6"
          bg="#99cc33"
          icon={<Plus color="white" />}
          onPress={() => router.push('./newTeamMember')}
          shadowColor="#00000030"
          shadowOpacity={0.2}
        />
      </YStack>
    </YStack>
  )
}
