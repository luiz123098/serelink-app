// app/user/profile.tsx
import React, { useEffect, useState } from "react";
import {
  YStack,
  XStack,
  Text,
  Card,
  Avatar,
  Button,
  Separator,
  View,
  ScrollView,
  Progress,
  Spinner,
} from "tamagui";
import { Cog, User } from "@tamagui/lucide-icons";
import { Menu } from "~/components/Menu";

// --------- Tipos ----------
type MoodLevel = "Neutral" | "Positive" | "Negative" | "Good" | "Moderate";
type Role = "Admin" | "User";

type UserProfile = {
  id: string;
  name: string;
  avatar: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  role: Role;
  currentMood: MoodLevel;
  desiredMood: MoodLevel;
  goal: string;
  currentPlan?: string | null;
  history: {
    last: MoodLevel;
    stress: MoodLevel | "N/A";
    sleep: MoodLevel | "N/A";
    exercise: number | "N/A";
  };
  stats: {
    mindful: number[];
    selfCare: number[];
    emotional: number[];
  };
};

// --------- Mock (substituir por backend depois) ----------
const MOCK: UserProfile = {
  id: "u_1",
  name: "Alex Johnson",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  gender: "Male",
  age: 29,
  role: "Admin",
  currentMood: "Neutral",
  desiredMood: "Positive",
  goal: "Improve mood",
  currentPlan: null,
  history: {
    last: "Neutral",
    stress: "Moderate",
    sleep: "Good",
    exercise: 3,
  },
  stats: {
    mindful: [3, 5, 7, 6, 9, 8, 5, 7, 6, 8, 7, 6],
    selfCare: [2, 4, 6, 5, 7, 6, 4, 6, 5, 7, 6, 5],
    emotional: [4, 3, 6, 7, 8, 7, 5, 7, 4, 8, 6, 5],
  },
};

export default function UserProfileScreen() {
  const [data, setData] = useState<UserProfile | null>(null);

  // 🔁 loading em duas fases
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<number>(0);

  // 🔗 depois troque por sua chamada ao backend
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("https://api.seuservidor.com/user/profile");
  //     const json: UserProfile = await res.json();
  //     setData(json);
  //     setDataLoaded(true);
  //   })().catch(console.error);
  // }, []);

  // Simula backend
  useEffect(() => {
    const t = setTimeout(() => {
      setData(MOCK);
      setDataLoaded(true); // ✅ chegou
    }, 900);
    return () => clearTimeout(t);
  }, []);

  // Anima progresso
  useEffect(() => {
    if (dataLoaded) {
      setProgress(100);
      const done = setTimeout(() => setLoading(false), 350);
      return () => clearTimeout(done);
    }
    let v = 0;
    const id = setInterval(() => {
      const step = Math.floor(3 + Math.random() * 12); // 3..14
      v = Math.min(v + step, 95);
      setProgress(v);
    }, 160);
    return () => clearInterval(id);
  }, [dataLoaded]);

  // 🔒 mantém 99% até os dados chegarem pra evitar “salto” visual
  const displayValue = dataLoaded ? 100 : Math.min(99, Math.round(progress));

  if (loading) {
    return (
      <YStack f={1} jc="center" ai="center" bg="white" px="$4">
        <Card p="$4" br="$8" bw={1} boc="$gray5" w="100%" maw={480}>
          <Text fontSize="$6" fontWeight="700" mb="$3">
            Loading profile…
          </Text>

          <XStack ai="center" gap="$2" mb="$3">
            <Spinner size="small" color="$gray10" />
            <Text color="$gray10">Fetching user data</Text>
          </XStack>

          <Progress
            value={displayValue}
            mt="$1"
            size="$4"
            bg="$gray3"
            br="$10"
            overflow="hidden"
            w="100%"
          >
            <Progress.Indicator
              bg="#99cc33"
              br="$10"   // mesmo raio do container
            />
          </Progress>

          <XStack jc="space-between" mt="$2">
            <Text color="$gray10">0%</Text>
            <Text fontWeight="700">{displayValue}%</Text>
          </XStack>
        </Card>
      </YStack>
    );
  }

  // já carregado (após pequeno atraso para ver 100%)
  return (
    <YStack f={1} bg="white" pb="$12">
      {/* Top header */}
      <YStack p="$4" pb="$3" bg="white">
        <XStack ai="center" jc="space-between">
          <Avatar circular size="$6">
            <Avatar.Image src={data!.avatar} />
            <Avatar.Fallback bc="$gray6">
              <User />
            </Avatar.Fallback>
          </Avatar>

          <Button
            size="$3"
            circular
            chromeless
            aria-label="Settings"
            icon={<Cog size={35} color="black" />}
          />
        </XStack>

        <Text ta="center" mt="$2" color="$gray11">
          Admin status
        </Text>
      </YStack>

      <Separator />

      <ScrollView
        contentContainerStyle={{ padding: 12, paddingBottom: 0 }}
        showsVerticalScrollIndicator
      >
        {/* Card — resumo do usuário */}
        <Card p="$4" br="$8" bw={1} boc="$gray5" bg="$gray4Light" mb="$4">
          <XStack gap="$3" ai="center">
            <Avatar circular size="$7">
              <Avatar.Image src={data!.avatar} />
              <Avatar.Fallback bc="$gray6">
                <User />
              </Avatar.Fallback>
            </Avatar>

            <YStack f={1}>
              <Text fontSize="$7" fontWeight="800">
                {data!.name}
              </Text>
              <Text color="$gray11">
                {data!.gender}, {data!.age} years old
              </Text>
            </YStack>

            <YStack ai="flex-end">
              <Text color="$gray11">Role</Text>
              <Text fontWeight="800">{data!.role}</Text>
            </YStack>
          </XStack>

          <Separator mt="$3" />

          <KeyValueRow label="Current mood" value={data!.currentMood} />
          <KeyValueRow label="Desired mood" value={data!.desiredMood} />
          <KeyValueRow label="Goal" value={data!.goal} />
          <KeyValueRow
            label="Current wellness plan"
            value={data!.currentPlan ?? "N/A"}
          />
        </Card>

        {/* Card — histórico de humor */}
        <Card p="$4" br="$8" bw={1} boc="$gray5" bg="$gray4Light" mb="$4">
          <Text fontSize="$6" fontWeight="800" mb="$2">
            Mood history
          </Text>

          <KeyValueRow label="Last" value={data!.history.last} />
          <KeyValueRow label="Stress" value={data!.history.stress} />
          <KeyValueRow label="Sleep" value={data!.history.sleep} />
          <KeyValueRow label="Exercise" value={String(data!.history.exercise)} />
        </Card>

        {/* Card — estatísticas (gráfico simples em “bolinhas”) */}
        <Card p="$4" br="$8" bw={1} boc="$gray5" bg="$gray4Light">
          <Text fontSize="$6" fontWeight="800" mb="$2">
            Wellness Statistics
          </Text>

          <Bars groups={data!.stats} />

          <XStack gap="$4" mt="$3">
            <LegendDot label="Mindful" />
            <LegendDot label="Self-" />
            <LegendDot label="Em" />
          </XStack>
        </Card>
      </ScrollView>

      {/* seu menu fixo no rodapé */}
      <Menu />
    </YStack>
  );
}

/** ---------- Helpers UI ---------- */

function KeyValueRow({ label, value }: { label: string; value: string }) {
  return (
    <XStack jc="space-between" ai="center" py="$2">
      <Text color="$gray11">{label}</Text>
      <Text fontWeight="800">{value}</Text>
    </XStack>
  );
}

// gráfico simples de barras em “bolinhas”
function Bars({
  groups,
}: {
  groups: { mindful: number[]; selfCare: number[]; emotional: number[] };
}) {
  const maxH = 120;
  const norm = (v: number) =>
    Math.round((Math.min(10, Math.max(0, v)) / 10) * maxH);

  const len = Math.max(
    groups.mindful.length,
    groups.selfCare.length,
    groups.emotional.length
  );

  return (
    <XStack ai="flex-end" gap="$2" mt="$2" mb="$2">
      {Array.from({ length: len }).map((_, i) => {
        const m = groups.mindful[i] ?? 0;
        const s = groups.selfCare[i] ?? 0;
        const e = groups.emotional[i] ?? 0;

        return (
          <YStack key={i} ai="center" gap="$1">
            <DotBar height={norm(m)} />
            <DotBar height={norm(s)} />
            <DotBar height={norm(e)} />
          </YStack>
        );
      })}
    </XStack>
  );
}

function DotBar({ height }: { height: number }) {
  const dot = 10;
  const gap = 4;
  const count = Math.max(1, Math.floor(height / (dot + gap)));

  return (
    <YStack ai="center" jc="flex-end" h={height} w={12}>
      {Array.from({ length: count }).map((_, idx) => (
        <View
          key={idx}
          w={10}
          h={10}
          br={9999}
          bg="#8DBA3A"
          mb={idx === count - 1 ? 0 : gap}
        />
      ))}
    </YStack>
  );
}

function LegendDot({ label }: { label: string }) {
  return (
    <XStack ai="center" gap="$2">
      <View w={10} h={10} br={9999} bg="#8DBA3A" />
      <Text color="$gray11">{label}</Text>
    </XStack>
  );
}
