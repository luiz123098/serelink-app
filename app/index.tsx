import { useRouter } from 'expo-router';
import { Button } from '~/components/Button';
import { YStack, Text, Image } from 'tamagui'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <YStack f={1} jc="center" ai="center" bg="white" space="$4" p="$4">

        <Image source={require('../assets/logo.png')} width={200} height={200} ></Image>

        <Text fontSize={20} fontWeight="700" textAlign="center">
          Welcome to MindWell
        </Text>

        <YStack
          bg="#99cc33"
          borderRadius={20}
          px="$4"
          py="$2"
          width={220}
          ai="center"          
        >
          <Text color="white" fontWeight="700">
            What do you have in mind?
          </Text>
        </YStack>

        <YStack space="$3.5" mt="$2">
          <Button
            title="Family (beta)"
            color="black"
            bg="$gray5"
            br="$8"
            onPress={() =>
              router.replace({ pathname: '/signUp', params: { appType: 'family' } })
            }
          />

          <Button
            title="Team"
            color="black"
            bg="$gray5"
            br="$8"
            onPress={() =>
              router.replace({ pathname: '/signUp', params: { appType: 'team' } })
            }
          />

          <Button
            title="Individual (beta)"
            color="black"
            bg="$gray5"
            br="$8"
            onPress={() =>
              router.replace({ pathname: '/signUp', params: { appType: 'individual' } })
            }
          />

          <Button
            title="Couples (beta)"
            color="black"
            bg="$gray5"
            br="$8"
            onPress={() =>
              router.replace({ pathname: '/signUp', params: { appType: 'couples' } })
            }
          />
        </YStack>


        <Text fontSize={12} color="gray" mt="$4">
          Have an account already?
        </Text>

        <Button title='Log in' bg="#99cc33" color="white" borderRadius={20} px="$4" mt="$1" width={220}
          onPress={() =>
              router.replace({ pathname: '/logIn'})
            }
        ></Button>
      </YStack>
    </>
  );
}