// components/Menu.tsx
import { useRouter, usePathname, type Href } from 'expo-router'
import { XStack, Button, View } from 'tamagui'
import {
  Home as HomeIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Video as VideoIcon,
  AreaChart as GraphIcon,
} from '@tamagui/lucide-icons'

type Item = {
  key: string
  href: Href
  Icon: React.ComponentType<{ color?: string; size?: number }>
  match: string // relativo (pode usar ../)
}

// 🔧 Resolve "../" e "./" contra o pathname atual e retorna absoluto
function resolveRelative(basePath: string, rel: string) {
  if (!rel) return basePath
  if (rel.startsWith('/')) return rel

  const baseParts = basePath.split('/').filter(Boolean) // ex: ['admin','adminHome']
  // se base aponta para uma página (não pasta), remove o último segmento para resolver relativo
  if (baseParts.length > 0) baseParts.pop()

  const relParts = rel.split('/')

  for (const part of relParts) {
    if (!part || part === '.') continue
    if (part === '..') {
      if (baseParts.length > 0) baseParts.pop()
    } else {
      baseParts.push(part)
    }
  }
  return '/' + baseParts.join('/')
}

const ITEMS: Item[] = [
  {
    key: 'schedule',
    href: '../psychologist/schedulePsy' as Href,
    Icon: CalendarIcon,
    match: '../psychologist/schedulePsy',
  },
  {
    key: 'video',
    href: '../admin/adminHome' as Href,
    Icon: VideoIcon,
    match: '../admin/video', // ajuste conforme sua rota real
  },
  {
    key: 'home',
    href: '../admin/adminHome' as Href,
    Icon: HomeIcon,
    match: '../admin/adminHome',
  },
  {
    key: 'analytics',
    href: '../admin/adminAnalytics' as Href,
    Icon: GraphIcon,
    match: '../admin/adminAnalytics', // ajuste se existir rota real
  },
  {
    key: 'profile',
    href: '../admin/adminProfile' as Href,
    Icon: UserIcon,
    match: '../admin/adminProfile', // ajuste se existir rota real
  },
]

export function Menu() {
  const router = useRouter()
  const pathname = usePathname() // sempre absoluto: "/admin/adminHome", etc.

  return (
    <View position="absolute" bottom={0} width="100%" bg="#99cc33" p="$3" pb="$4">
      <XStack jc="space-around" ai="center">
        {ITEMS.map(({ key, href, Icon, match }) => {
          // ✅ converte seu "match" relativo em absoluto pra comparar com pathname
          const absMatch = resolveRelative(pathname, match)
          const active = pathname === absMatch || pathname.startsWith(absMatch + '/')

          return (
            <Button
              key={key}
              circular
              bg="transparent"
              disabled={active}
              opacity={active ? 0.6 : 1}
              pressStyle={!active ? { scale: 0.98, opacity: 0.85 } : undefined}
              onPress={() => {
                if (!active) router.push(href)
              }}
            >
              <Icon color={active ? 'black' : 'white'} size={24} />
            </Button>
          )
        })}
      </XStack>
    </View>
  )
}
