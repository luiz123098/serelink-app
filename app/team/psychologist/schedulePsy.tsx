import { Menu } from '~/components/Menu'
import SearchPsy from '../../../components/search/SearchPsy'
import { YStack } from 'tamagui'

export default function SchedulePsy() {
  return (
    <YStack f={1} bg="white">
      {/* Conteúdo principal ocupa todo o espaço */}
      <YStack f={1}>
        <SearchPsy />
      </YStack>

      {/* Menu fixo no rodapé */}
      <YStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
      >
        <Menu />
      </YStack>
    </YStack>
  )
}
