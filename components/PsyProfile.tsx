import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { YStack, XStack, Text, Avatar, Button, Card } from "tamagui";
import { ArrowLeft, Star, Calendar } from "@tamagui/lucide-icons";

type Psychologist = {
  id: string;
  name: string;
  avatar: string;
  about: string;
  specialties: string[];
  rating: number;
  reviews: number;
};

const MOCK_DB: Psychologist[] = [
  {
    id: "1",
    name: "Dr. Emily Carter",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    about:
      "Dr. Emily Carter is a licensed psychologist specializing in cognitive behavioral therapy and mindfulness-based techniques. With over 15 years of experience, she has helped numerous clients achieve mental clarity and resilience.",
    specialties: ["Cognitive Behavioral Therapy", "Mindfulness", "Stress Management"],
    rating: 4.5,
    reviews: 1509,
  },
  {
    id: "2",
    name: "Dr. Michael Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    about: "Focused on mindfulness-based stress reduction (MBSR).",
    specialties: ["Mindfulness", "Anxiety"],
    rating: 3.7,
    reviews: 132,
  },
];

export default function PsychologistProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<Psychologist | null>(null);

  useEffect(() => {
    console.log("Route param id =>", id);
    if (!id) return;
    const psy = MOCK_DB.find((p) => p.id === id);
    setData(psy || null);
  }, [id]);

  if (!data) {
    return (
      <YStack f={1} jc="center" ai="center">
        <Text>Psychologist not found</Text>
        <Button onPress={() => router.back()} mt="$4" icon={ArrowLeft}>
          <Text>Back</Text> {/* ✅ texto dentro de <Text> */}
        </Button>
      </YStack>
    );
  }

  return (
    <YStack f={1} bg="white">
      {/* Top Bar */}
      <XStack ai="center" jc="space-between" p="$3">
        <Button circular chromeless onPress={() => router.back()} icon={ArrowLeft}>
          {/* sem texto solto */}
        </Button>
        <Text fontSize="$6" fontWeight="700">{data.name}</Text>
        <XStack width={36} />
      </XStack>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Foto + Nome */}
        <YStack ai="center" mb="$4">
          <Avatar circular size="$10">
            <Avatar.Image src={data.avatar} />
            <Avatar.Fallback bc="$gray5" />
          </Avatar>
          <Text mt="$2" fontSize="$7" fontWeight="700">{data.name}</Text>

          <XStack ai="center" mt="$2" space="$1">
            <Star size={18} color="gold" fill="gold" />
            <Text>{data.rating.toFixed(1)} ({data.reviews} reviews)</Text>
          </XStack>
        </YStack>

        {/* About */}
        <Card bc="#E6F4D6" p="$3" br="$6" mb="$4">
          <Text fontSize="$5" fontWeight="700" mb="$2">About</Text>
          <Text>{data.about}</Text>
        </Card>

        {/* Specialties */}
        <YStack mb="$4">
          <Text fontSize="$5" fontWeight="700" mb="$2">Specialties</Text>
          {data.specialties.map((s) => (
            <Text key={s}>• {s}</Text>
          ))}
        </YStack>

        {/* Botão de agendamento */}
        <Button
          mt="$3"
          size="$5"
          br="$10"
          bg="#99cc33"
          icon={Calendar}
          onPress={() => alert(`Schedule with ${data.name}`)}
        >
          <Text>Schedule an Appointment</Text> {/* ✅ texto dentro de <Text> */}
        </Button>
      </ScrollView>
    </YStack>
  );
}
