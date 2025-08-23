import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { YStack, XStack, Input, Button, Text, Card, Avatar } from "tamagui";
import { Star, Search, SlidersHorizontal } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";

// 🔹 Dados fictícios (backend virá depois)
const mockPsychologists = [
  {
    id: "1",
    name: "Dr. Emily",
    specialty: "Specializes in cognitive behavioral therapy",
    rating: 4.9,
    reviews: 1509,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Dr. Michael",
    specialty: "Focuses on mindfulness-based stress reduction",
    rating: 3.7,
    reviews: 132,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Dr. Sarah",
    specialty: "Expert in family therapy and relationship counseling",
    rating: 5.0,
    reviews: 56,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "4",
    name: "Dr. Lucas",
    specialty: "Specialist in anxiety and depression treatment",
    rating: 4.8,
    reviews: 897,
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
  },
];

export default function SearchPsy() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // 🔎 Filtro simples pelo nome digitado
  const filteredData = mockPsychologists.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Cada card é um botão
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/team/psychologist/psyProfile/[id]", params: { id: item.id } })
      }
    >
      <Card
        elevate
        bordered
        marginVertical="$2"
        padding="$3"
        borderRadius="$6"
        backgroundColor="#99cc3381"
      >
        <XStack space="$3" alignItems="center">
          <Avatar circular size="$6">
            <Avatar.Image src={item.avatar} />
            <Avatar.Fallback bc="gray" />
          </Avatar>
          <YStack f={1}>
            <Text fontWeight="700" fontSize="$5">
              {item.name}
            </Text>
            <Text fontSize="$3" color="$gray10">
              {item.specialty}
            </Text>
            <XStack ai="center" mt="$1" space="$1">
              <Star size={16} color="gold" />
              <Text>{item.rating}</Text>
              <Text color="$gray9">({item.reviews} reviews)</Text>
            </XStack>
          </YStack>
        </XStack>
      </Card>
    </TouchableOpacity>
  );

  return (
    <YStack f={1} p="$4" backgroundColor="white">
      {/* Header */}
      <Text fontSize="$7" fontWeight="700" mb="$3" textAlign="center">
        Find Psychologist
      </Text>

      {/* Barra de busca */}
      <XStack ai="center" space="$2" mb="$4">
        <XStack f={1} ai="center" br="$4" px="$2" bc="$gray3">
          <Search size={20} color="gray" />
          <Input
            f={1}
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            borderWidth={0}
            backgroundColor="transparent"
          />
        </XStack>

        {/* Botão que abre a tela de filtro */}
        <Button onPress={() => router.push("/team/psychologist/Filter")}>
          <SlidersHorizontal />
        </Button>
      </XStack>

      {/* Lista de psicólogos */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </YStack>
  );
}

/**
 * Futuramente, substitua `mockPsychologists` pela chamada ao backend:
 * 
 * const [psychologists, setPsychologists] = useState([]);
 * 
 * useEffect(() => {
 *   fetch("http://seu-servidor/api/psychologists")
 *     .then(res => res.json())
 *     .then(data => setPsychologists(data))
 *     .catch(err => console.error(err));
 * }, []);
 * 
 * E depois use `psychologists` no lugar de `mockPsychologists`.
 */
