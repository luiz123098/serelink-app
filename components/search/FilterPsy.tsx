// components/search/FilterPsy.tsx
import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Input,
  Button,
  Separator,
  Card,
} from "tamagui";
import { useRouter } from "expo-router";
import { X as CloseIcon } from "@tamagui/lucide-icons";
import { Picker } from "@react-native-picker/picker";

export default function FilterPsy() {
  const router = useRouter();

  // state
  const [specialty, setSpecialty] = useState("anxiety");
  const [approach, setApproach] = useState("cbt");
  const [diversity, setDiversity] = useState("lgbt");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const resetAll = () => {
    setSpecialty("anxiety");
    setApproach("cbt");
    setDiversity("lgbt");
    setCountry("");
    setCity("");
    setDate("");
    setTime("");
  };

  const apply = () => {
    alert(
      JSON.stringify(
        { specialty, approach, diversity, country, city, date, time },
        null,
        2
      )
    );
  };

  return (
    <YStack f={1} bg="white">
      {/* Header verde */}
      <XStack ai="center" jc="space-between" px="$3" py="$3" bg="#99cc33" br="$6">
        <Text fontSize="$6" fontWeight="700" color="white">
          Filter Psychologists
        </Text>
        <Button size="$3" circular chromeless onPress={() => router.back()} icon={CloseIcon} />
      </XStack>

      <Separator />

      {/* Conteúdo com scroll */}
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
        showsVerticalScrollIndicator
      >
        {/* Specialties */}
        <Card p="$3" br="$6" bw={1} boc="$gray4" mb="$3">
          <Text fontSize="$5" fontWeight="700" mb="$2">Specialties</Text>
          <Picker
            selectedValue={specialty}
            onValueChange={setSpecialty}
            style={{ backgroundColor: "white", borderRadius: 8 }}
          >
            <Picker.Item label="Anxiety" value="anxiety" />
            <Picker.Item label="Depression" value="depression" />
            <Picker.Item label="Family" value="family" />
            <Picker.Item label="Stress Management" value="stress" />
          </Picker>
        </Card>

        {/* Therapeutic Approach */}
        <Card p="$3" br="$6" bw={1} boc="$gray4" mb="$3">
          <Text fontSize="$5" fontWeight="700" mb="$2">Therapeutic Approach</Text>
          <Picker
            selectedValue={approach}
            onValueChange={setApproach}
            style={{ backgroundColor: "white", borderRadius: 8 }}
          >
            <Picker.Item label="Cognitive Behavioral Therapy" value="cbt" />
            <Picker.Item label="Psychoanalysis" value="psychoanalysis" />
            <Picker.Item label="Mindfulness" value="mindfulness" />
            <Picker.Item label="Systemic Therapy" value="systemic" />
          </Picker>
        </Card>

        {/* Location */}
        <Card p="$3" br="$6" bw={1} boc="$gray4" mb="$3">
          <Text fontSize="$5" fontWeight="700" mb="$2">Location</Text>
          <XStack ai="center" jc="space-between" mb="$2">
            <Text fontWeight="700">Country</Text>
            <Text fontWeight="700">City</Text>
          </XStack>
          <XStack space="$2">
            <Input
              backgroundColor="white"
              flex={1}
              br="$8"
              bw={1}
              boc="$gray5"
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
            <Input
              backgroundColor="white"
              flex={1}
              br="$8"
              bw={1}
              boc="$gray5"
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
          </XStack>
        </Card>

        {/* Diversity & Inclusion */}
        <Card p="$3" br="$6" bw={1} boc="$gray4" mb="$3">
          <Text fontSize="$5" fontWeight="700" mb="$2">Diversity & Inclusion</Text>
          <Picker
            selectedValue={diversity}
            onValueChange={setDiversity}
            style={{ backgroundColor: "white", borderRadius: 8 }}
          >
            <Picker.Item label="LGBTQIA+ friendly" value="lgbt" />
            <Picker.Item label="Neurodiverse friendly" value="neurodiverse" />
            <Picker.Item label="Bilingual" value="bilingual" />
          </Picker>
        </Card>

        {/* Availability */}
        <Card p="$3" br="$6" bw={1} boc="$gray4" mb="$3">
          <Text fontSize="$5" fontWeight="700" mb="$2">Availability</Text>
          <XStack space="$2">
            <Input
              backgroundColor="white"
              flex={1}
              br="$8"
              bw={1}
              boc="$gray5"
              placeholder="Date"
              value={date}
              onChangeText={setDate}
            />
            <Input
              backgroundColor="white"
              flex={1}
              br="$8"
              bw={1}
              boc="$gray5"
              placeholder="Time"
              value={time}
              onChangeText={setTime}
            />
          </XStack>
        </Card>
      </ScrollView>

      {/* Rodapé fixo */}
      <YStack
        px="$3"
        py="$3"
        bg="white"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        borderTopWidth={1}
        borderColor="$gray4"
      >
        <XStack jc="space-between" ai="center">
          <Button br="$10" bw={1} boc="$gray6" bg="$gray3" onPress={resetAll}>
            <Text>Reset</Text>
          </Button>
          <Button br="$10" bg="#99cc33" onPress={apply}>
            <Text color="white">Apply</Text>
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
}
