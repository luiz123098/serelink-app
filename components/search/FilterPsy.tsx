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
  Select,
  Adapt,
  Sheet,
} from "tamagui";
import { useRouter } from "expo-router";
import { Check, ChevronDown, ChevronUp, X as CloseIcon } from "@tamagui/lucide-icons";
import { LinearGradient } from "tamagui/linear-gradient";

export default function FilterPsy() {
  const router = useRouter();

  // state
  const [specialty, setSpecialty] = useState("anxiety");
  const [approach, setApproach] = useState("cbt");
  const [diversity, setDiversity] = useState("lgbt");
  const [price, setPrice] = useState<number[]>([50, 100]);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const resetAll = () => {
    setSpecialty("anxiety");
    setApproach("cbt");
    setDiversity("lgbt");
    setPrice([50, 100]);
    setCountry("");
    setCity("");
    setDate("");
    setTime("");
  };

  const apply = () => {
    alert(
      JSON.stringify(
        { specialty, approach, diversity, price, country, city, date, time },
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
        {/* Specialties (Custom Select) */}
        <Card p="$3" br="$6" bw={1} boc="$gray4" mb="$3" overflow="visible">
          <Text fontSize="$5" fontWeight="700" mb="$2">Specialties</Text>

          <Select
            value={specialty}
            onValueChange={setSpecialty}
            disablePreventBodyScroll
          >
            <Select.Trigger
              br="$8"
              bw={1}
              boc="$gray5"
              bg="white"
              h={42}
              px="$3"
              iconAfter={ChevronDown}
              maxWidth="100%"
            >
              <Select.Value placeholder="Choose" />
            </Select.Trigger>

            {/* abre como Sheet no touch (RN), dropdown no web */}
            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
                <Sheet.Frame p="$3">
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronUp size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={["$background", "transparent"]}
                  borderRadius="$4"
                />
              </Select.ScrollUpButton>

              <Select.Viewport minWidth={240}>
                <Select.Group>
                  <Select.Label>Specialties</Select.Label>

                  <Select.Item index={0} value="anxiety">
                    <Select.ItemText>Anxiety</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item index={1} value="depression">
                    <Select.ItemText>Depression</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item index={2} value="family">
                    <Select.ItemText>Family</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item index={3} value="stress">
                    <Select.ItemText>Stress Management</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronDown size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={["transparent", "$background"]}
                  borderRadius="$4"
                />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </Card>

        {/* Therapeutic Approach (Custom Select) */}
        <Card p="$3" br="$6" bw={1} boc="$gray4" mb="$3" overflow="visible">
          <Text fontSize="$5" fontWeight="700" mb="$2">Therapeutic Approach</Text>

          <Select
            value={approach}
            onValueChange={setApproach}
            disablePreventBodyScroll
          >
            <Select.Trigger
              br="$8"
              bw={1}
              boc="$gray5"
              bg="white"
              h={42}
              px="$3"
              iconAfter={ChevronDown}
              maxWidth="100%"
            >
              <Select.Value placeholder="Choose" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
                <Sheet.Frame p="$3">
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronUp size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={["$background", "transparent"]}
                  borderRadius="$4"
                />
              </Select.ScrollUpButton>

              <Select.Viewport minWidth={240}>
                <Select.Group>
                  <Select.Label>Approaches</Select.Label>

                  <Select.Item index={0} value="cbt">
                    <Select.ItemText>Cognitive Behavioral Therapy</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item index={1} value="psychoanalysis">
                    <Select.ItemText>Psychoanalysis</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item index={2} value="mindfulness">
                    <Select.ItemText>Mindfulness</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item index={3} value="systemic">
                    <Select.ItemText>Systemic Therapy</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronDown size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={["transparent", "$background"]}
                  borderRadius="$4"
                />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
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
              flex={1}
              br="$8"
              bw={1}
              boc="$gray5"
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
            <Input
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

        {/* Diversity & Inclusion (Custom Select) */}
        <Card p="$3" br="$6" bw={1} boc="$gray4" mb="$3" overflow="visible">
          <Text fontSize="$5" fontWeight="700" mb="$2">Diversity & Inclusion</Text>

          <Select
            value={diversity}
            onValueChange={setDiversity}
            disablePreventBodyScroll
          >
            <Select.Trigger
              br="$8"
              bw={1}
              boc="$gray5"
              bg="white"
              h={42}
              px="$3"
              iconAfter={ChevronDown}
              maxWidth="100%"
            >
              <Select.Value placeholder="Choose" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
                <Sheet.Frame p="$3">
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronUp size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={["$background", "transparent"]}
                  borderRadius="$4"
                />
              </Select.ScrollUpButton>

              <Select.Viewport minWidth={240}>
                <Select.Group>
                  <Select.Label>Options</Select.Label>

                  <Select.Item index={0} value="lgbt">
                    <Select.ItemText>LGBTQIA+ friendly</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item index={1} value="neurodiverse">
                    <Select.ItemText>Neurodiverse friendly</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item index={2} value="bilingual">
                    <Select.ItemText>Bilingual</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronDown size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={["transparent", "$background"]}
                  borderRadius="$4"
                />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </Card>

        {/* Availability */}
        <Card p="$3" br="$6" bw={1} boc="$gray4" mb="$3">
          <Text fontSize="$5" fontWeight="700" mb="$2">Availability</Text>
          <XStack space="$2">
            <Input
              flex={1}
              br="$8"
              bw={1}
              boc="$gray5"
              placeholder="Date"
              value={date}
              onChangeText={setDate}
            />
            <Input
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
