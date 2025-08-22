// components/Menu.tsx
import { useRouter } from 'expo-router'
import { XStack, Button, View } from 'tamagui'
import {
  Home as HomeIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Video as VideoIcon,
  AreaChart as GraphIcon
} from '@tamagui/lucide-icons'

export function Menu() {
  const router = useRouter()

  return (
    <View position="absolute" bottom={0} width="100%" bg="#99cc33" p="$3">
      <XStack jc="space-around" ai="center">

        <Button circular bg="transparent" onPress={() => router.push('/team/admin/adminHome')}>
          <CalendarIcon color="white" size={24} />
        </Button>

        <Button circular bg="transparent" onPress={() => router.push('/team/admin/adminHome')}>
          <VideoIcon color="white" size={24} />
        </Button>

        <Button circular bg="transparent" onPress={() => router.push('/team/admin/adminHome')}>
          <HomeIcon color="white" size={24} />
        </Button>

        <Button circular bg="transparent" onPress={() => router.push('/team/admin/adminHome')}>
          <GraphIcon color="white" size={24} />
        </Button>

        <Button circular bg="transparent" onPress={() => router.push('/team/admin/adminHome')}>
          <UserIcon color="white" size={24} />
        </Button>

      </XStack>
    </View>
  )
}
