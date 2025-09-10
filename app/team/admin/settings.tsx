import { YStack, Text, Card, Separator, Footer, AlertDialog } from "tamagui";
import {
  User as UserIcon,
  Heart as HeartIcon,
  Settings2 as SettingsIcon2,
  ChevronRight as ChevronRightIcon,
  MessageCircleQuestion as HelpIcon,
  LogOut as LogOutIcon,
  Wrench as WrenchIcon,
  Paintbrush as PaintbrushIcon,
  Bell as BellIcon,
  ShieldCheck as ShieldCheckIcon
} from '@tamagui/lucide-icons'
import { Menu } from "~/components/Menu";
import { router } from "expo-router";

function logOut(message: string) {
    alert('logOut?');
}

export default function AdminSettings() {
    return (
        <YStack f={1} bg="white" pb={80}>
            <Text alignSelf="center" mt={'5%'} fontSize={24}>Admin Settings</Text>
            <YStack>
            <Card alignSelf="center" padding={15} mt={'5%'} width={'85%'} backgroundColor={'lightgray'} >
                <Card backgroundColor={'lightgray'} onPress={() => {alert('Profile!')}}>
                <Text> <UserIcon />  Profile <ChevronRightIcon /></Text>
                </Card>
                
                <Separator marginVertical={10}/>
                <Card backgroundColor={'lightgray'} onPress={() => {router.push('../creditsManagement/subscriptionManagement')}}>
                    <Text> <HeartIcon />  Manage Subscription <ChevronRightIcon /></Text>
                </Card>
            </Card>
            
            <Card alignSelf="center" padding={15} mt={'5%'} width={'85%'} backgroundColor={'lightgray'} >
                <Card backgroundColor={'lightgray'} onPress={() => {alert('General Settings!')}}>
                <Text> <SettingsIcon2 />  General Settings <ChevronRightIcon /></Text>
                </Card>
                
                <Separator marginVertical={10}/>
                <Card backgroundColor={'lightgray'} onPress={() => {alert('Privacy!')}}>
                    <Text> <ShieldCheckIcon />  Privacy <ChevronRightIcon /> </Text>
                </Card>
                <Separator marginVertical={10}/>

                <Card backgroundColor={'lightgray'} onPress={() => {router.push('/notificationsPage')}}>
                    <Text> <BellIcon />  Notifications <ChevronRightIcon /> </Text>
                </Card>
                
                <Separator marginVertical={10}/>
                <Card backgroundColor={'lightgray'} onPress={() => {alert('Theme!')}}>
                    <Text> <PaintbrushIcon />  Theme <ChevronRightIcon />    </Text>
                </Card>
                
                <Separator marginVertical={10}/>
                <Card backgroundColor={'lightgray'} onPress={() => {alert('Advanced Settings!')}}>
                    <Text> <WrenchIcon />  Advanced Settings <ChevronRightIcon /> </Text>
                </Card>
            </Card>
            
            <Card alignSelf="center" padding={15} mt={'5%'} width={'85%'} backgroundColor={'lightgray'} >
                <Card backgroundColor={'lightgray'} onPress={() => {alert('Help!')}}>
                <Text> <HelpIcon />  Help <ChevronRightIcon /></Text>
                </Card>
                
                <Separator marginVertical={10}/>
                <Card backgroundColor={'lightgray'} onPress={() => {logOut('Logging out!')}}>
                    <Text> <LogOutIcon />  Log out <ChevronRightIcon /></Text>
                </Card>
            </Card>
            </YStack>
            <Menu />
            
        </YStack>
    );
}