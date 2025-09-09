import React, { useState } from 'react'
import { router } from 'expo-router'
import { KeyboardAvoidingView, Platform } from 'react-native'
import {
  YStack, XStack, Text, Input, Card, ScrollView, Separator, Button as TButton
} from 'tamagui'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'

export default function NewTeamMember() {
  // form simples (mock)
  const [full, setFull] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('')
  const [role, setRole] = useState<'member' | 'admin'>('member')
  const [dob, setDob] = useState('')
  const [company, setCompany] = useState('')
  const [sex, setSex] = useState<'male' | 'female' | 'other' | ''>('')
  const [orientation, setOrientation] = useState<'straight' | 'homosexual' | 'other' | ''>('')

  const valid = full && email && pass && pass2 && pass === pass2

  async function handleCreate() {
    if (!valid) return alert('Please fill the form correctly.')
    // 🔗 BACKEND (posterior):
    // await fetch('/api/team/members', { method: 'POST', body: JSON.stringify({...}) })
    alert('(mock) Member added!')
    router.back()
  }

  return (
    <YStack f={1} bg="white">
      <XStack ai="center" jc="space-between" p="$3">
        <TButton circular chromeless icon={<ArrowLeft />} onPress={() => router.back()} />
        <Text fontSize="$6" fontWeight="700">Add New Team Member</Text>
        <XStack w={36} />
      </XStack>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ paddingBottom: 48 }}>
          <Container>
            <Card p="$3" br="$6" bw={1} boc="$gray5" bg="white">
              <YStack gap="$3">
                <YStack>
                  <Text>Full</Text>
                  <Input bg="white" placeholder="Full Name" value={full} onChangeText={setFull} />
                </YStack>

                <YStack>
                  <Text>Email</Text>
                  <Input bg="white" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                </YStack>

                <YStack>
                  <Text>Password</Text>
                  <Input bg="white" placeholder="Password" value={pass} onChangeText={setPass} secureTextEntry />
                </YStack>

                <YStack>
                  <Text>Re-Type</Text>
                  <Input bg="white" placeholder="Password" value={pass2} onChangeText={setPass2} secureTextEntry />
                </YStack>

                <Separator />

                {/* Role */}
                <YStack gap="$2">
                  <Text>Role</Text>
                  <XStack gap="$2">
                    <TButton
                      bg={role === 'member' ? '#99cc33' : '$gray3'}
                      onPress={() => setRole('member')}
                    ><Text color={role === 'member' ? 'white' : '$gray12'}>Member</Text></TButton>
                    <TButton
                      bg={role === 'admin' ? '#99cc33' : '$gray3'}
                      onPress={() => setRole('admin')}
                    ><Text color={role === 'admin' ? 'white' : '$gray12'}>Admin</Text></TButton>
                  </XStack>
                </YStack>

                {/* More fields */}
                <YStack>
                  <Text>Date of birth</Text>
                  <Input bg="white" placeholder="YYYY-MM-DD" value={dob} onChangeText={setDob} />
                </YStack>

                <YStack>
                  <Text>Company</Text>
                  <Input bg="white" placeholder="Company" value={company} onChangeText={setCompany} />
                </YStack>

                <YStack gap="$2">
                  <Text>Sex</Text>
                  <XStack gap="$2">
                    {(['male','female','other'] as const).map(opt => (
                      <TButton key={opt} bg={sex===opt ? '#99cc33' : '$gray3'} onPress={() => setSex(opt)}>
                        <Text color={sex===opt ? 'white' : '$gray12'}>{opt[0].toUpperCase()+opt.slice(1)}</Text>
                      </TButton>
                    ))}
                  </XStack>
                </YStack>

                <YStack gap="$2">
                  <Text>Sexual</Text>
                  <XStack gap="$2">
                    {(['straight','homosexual','other'] as const).map(opt => (
                      <TButton key={opt} bg={orientation===opt ? '#99cc33' : '$gray3'} onPress={() => setOrientation(opt)}>
                        <Text color={orientation===opt ? 'white' : '$gray12'}>{opt[0].toUpperCase()+opt.slice(1)}</Text>
                      </TButton>
                    ))}
                  </XStack>
                </YStack>

                <YStack gap="$2" mt="$3">
                  <Button title="Add Member" bg="#99cc33" color="white" br="$10" onPress={handleCreate} disabled={!valid} />
                  <Button title="Add more members" bg="#99cc33" color="white" br="$10" onPress={handleCreate} disabled={!valid} />
                </YStack>
              </YStack>
            </Card>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </YStack>
  )
}
