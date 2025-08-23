import { useState } from "react";
import { YStack, XStack, Input, Select, Button, Text, Slider } from "tamagui";

export default function FilterPsy() {
  const [price, setPrice] = useState([50, 100]);

  return (
    <YStack space="$3" padding="$3" backgroundColor="white" borderRadius="$4" flex={1}>
      <Text fontSize="$6" fontWeight="bold" color="green10">Filter Psychologists</Text>

      {/* Specialties */}
      <YStack>
        <Text>Specialties</Text>
        <Select defaultValue="Anxiety">
          <Select.Trigger>
            <Select.Value placeholder="Choose" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item index={0} value="Anxiety">
              <Select.ItemText>Anxiety</Select.ItemText>
            </Select.Item>
            <Select.Item index={1} value="Depression">
              <Select.ItemText>Depression</Select.ItemText>
            </Select.Item>
          </Select.Content>
        </Select>
      </YStack>

      {/* Therapeutic Approach */}
      <YStack>
        <Text>Therapeutic Approach</Text>
        <Select defaultValue="cbt">
          <Select.Trigger>
            <Select.Value placeholder="Choose" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item index={0} value="cbt">
              <Select.ItemText>Cognitive Behavioral Therapy</Select.ItemText>
            </Select.Item>
            <Select.Item index={1} value="psychoanalysis">
              <Select.ItemText>Psychoanalysis</Select.ItemText>
            </Select.Item>
          </Select.Content>
        </Select>
      </YStack>

      {/* Session Price */}
      <YStack>
        <Text>Session Price</Text>
        <Slider
          defaultValue={price}
          min={0}
          max={150}
          step={5}
          onValueChange={setPrice}
        >
          <Slider.Track>
            <Slider.TrackActive />
          </Slider.Track>
          <Slider.Thumb index={0} />
          <Slider.Thumb index={1} />
        </Slider>
        <Text>{`$${price[0]} - $${price[1]}`}</Text>
      </YStack>

      {/* Location */}
      <YStack>
        <Text>Location</Text>
        <XStack space="$2">
          <Input flex={1} placeholder="Country" />
          <Input flex={1} placeholder="City" />
        </XStack>
      </YStack>

      {/* Diversity & Inclusion */}
      <YStack>
        <Text>Diversity & Inclusion</Text>
        <Select defaultValue="lgbt">
          <Select.Trigger>
            <Select.Value placeholder="Choose" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item index={0} value="lgbt">
              <Select.ItemText>LGBTQIA+ friendly</Select.ItemText>
            </Select.Item>
            <Select.Item index={1} value="neurodiverse">
              <Select.ItemText>Neurodiverse friendly</Select.ItemText>
            </Select.Item>
          </Select.Content>
        </Select>
      </YStack>

      {/* Availability */}
      <YStack>
        <Text>Availability</Text>
        <XStack space="$2">
          <Input flex={1} placeholder="Date" />
          <Input flex={1} placeholder="Time" />
        </XStack>
      </YStack>

      {/* Buttons */}
      <XStack space="$3" justifyContent="space-between" marginTop="$3">
        <Button theme="green">Reset</Button>
        <Button theme="green">Apply</Button>
      </XStack>
    </YStack>
  );
}
