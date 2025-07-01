// app/(pasta ou rota)/company-home.tsx
import { YStack, XStack, Text, Image, Button, ScrollView, View } from 'tamagui'
import { Menu } from '../../../components/Menu'

export default function AdminHome() {
  return (
    <YStack f={1} bg="white" pb={80}>
      {/* Topo */}
      <YStack p="$4">
        <XStack ai="center" jc="space-between">
          <XStack ai="center" space="$3">
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=3' }} width={45} height={45} br={100} />
            <YStack>
              <Text fontWeight="bold">Hello, Chris</Text>
              <Text fontSize="$2" color="$gray10">Admin</Text>
            </YStack>
          </XStack>

          <XStack space="$3">
            <Button size="$2" bg="transparent">💳</Button>
            <Button size="$2" bg="transparent">🔔</Button>
            <Button size="$2" bg="transparent">⚙️</Button>
          </XStack>
        </XStack>

        <XStack space="$3" mt="$4">
          <Button f={1} bg="#99cc33" br="$6" color="white">Buy session</Button>
          <Button f={1} bg="#99cc33" br="$6" color="white">Quick schedule</Button>
        </XStack>
      </YStack>

      <ScrollView p="$4">
        <YStack space="$4">
          {/* Próximas sessões */}
          <Text fontWeight="700">Next sessions</Text>
          <XStack ai="center" jc="space-between" bg="$gray2" br="$4" p="$3">
            <XStack ai="center" space="$3">
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=5' }} width={35} height={35} br={100} />
              <Text>Dr. Steeve</Text>
            </XStack>
            <Text color="$gray10">Friday 10:00 am</Text>
          </XStack>

          {/* Últimas sessões */}
          <Text fontWeight="700">Last sessions</Text>

          {[{
            name: 'Dr. Sara',
            date: '05/14/2025',
            img: 'https://i.pravatar.cc/150?img=6'
          }, {
            name: 'Dr. Emily',
            date: '05/07/2025',
            img: 'https://i.pravatar.cc/150?img=7'
          }].map((item, idx) => (
            <XStack key={idx} ai="center" jc="space-between" bg={idx % 2 === 0 ? '$gray3' : '$gray2'} br="$4" p="$3">
              <XStack ai="center" space="$3">
                <Image source={{ uri: item.img }} width={35} height={35} br={100} />
                <Text>{item.name}</Text>
              </XStack>
              <Text color="$gray10">{item.date}</Text>
            </XStack>
          ))}
        </YStack>
      </ScrollView>

      {/* Menu flutuante */}
      <Menu />
    </YStack>
  )
}
