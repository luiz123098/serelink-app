import { YStack } from "tamagui";
import PsychologistProfile from "~/components/PsyProfile";
// ⚠️ Se o alias "~" não estiver configurado, use um import relativo:
 // ajuste o caminho relativo correto

export default function PsyPage() {
  return (
    <YStack f={1} bg="white"> {/* ✅ ocupa a tela toda e fica visível */}
      <PsychologistProfile/>
    </YStack>
  );
}
