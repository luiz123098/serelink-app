// components/Menu.tsx
import { useRouter } from 'expo-router'
import { XStack, Button, View } from 'tamagui'
import {
  Home as HomeIcon,
  Calendar as CalendarIcon,
  MessageCircle as MessageIcon,
  User as UserIcon
} from '@tamagui/lucide-icons'

export function Menu() {
  const router = useRouter()

  return (
    <View position="absolute" bottom={0} width="100%" bg="white" p="$2">
      <XStack jc="space-around" ai="center" bg="#99cc33" br={20} p="$2">
        <Button circular bg="transparent" onPress={() => router.push('/')}> <HomeIcon color="white" size={24} /> </Button>
        <Button circular bg="transparent" onPress={() => router.push('/')}> <CalendarIcon color="white" size={24} /> </Button>
        <Button circular bg="transparent" onPress={() => router.push('/')}> <MessageIcon color="white" size={24} /> </Button>
        <Button circular bg="transparent" onPress={() => router.push('/')}> <UserIcon color="white" size={24} /> </Button>
      </XStack>
    </View>
  )
}
