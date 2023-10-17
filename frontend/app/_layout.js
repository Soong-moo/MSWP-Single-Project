import { Stack, useRouter } from "expo-router";
import { Text, Pressable, StyleSheet, Alert } from "react-native";
import { useFonts } from 'expo-font';

const Layout = () => {

    const router = useRouter();

    const back = () => {
        Alert.alert(
            '처음으로 돌아가시겠습니까?', // 제목
            '', // 부가 메시지 (필요 없으면 빈 문자열)
            [
                {
                    text: 'NO',
                    onPress: () => { return },
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => router.back()
                }
            ],
            { cancelable: false }
        )
    }

    const rateBack = () => {
        router.back()
    }

    const submit = () => {
        // if(props.visible === false) {
        //     Alert.alert(
        //         '아직 문제를 풀지 않으셨습니다',
        //         '그래도 넘어가시겠습니까?',
        //         [
        //             {
        //                 text: 'NO',
        //                 onPress: () => { return },
        //                 style: 'cancel'
        //             },
        //             {
        //                 text: 'OK', 
        //                 onPress: () => router.replace('/question')
        //             }
        //         ],
        //         { cancelable: false }
        //     )
        // }
        router.replace('/question')
    }

    //폰트 설정
    const [fontsLoaded] = useFonts({
        'Jua': require('../assets/BMJUA_ttf.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#344496'
                },
                headerTintColor: '#FFFFFF',
            }}
        >
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="question"
                options={{
                    headerTitle: '기출문제',
                    headerTitleStyle: {
                        fontFamily: 'Jua',
                        fontSize: 20
                    },
                    headerLeft: () =>
                        <Pressable
                            onPress={back}
                        >
                            <Text style={styles.button}>←</Text>
                        </Pressable>,
                    headerRight: () =>
                        <Pressable
                            onPress={submit}
                        >
                            <Text style={styles.button}>→</Text>
                        </Pressable>,
                    gestureEnabled: false,
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="rate"
                options={{
                    headerTitle: "정답률 확인",
                    headerTitleStyle: {
                        fontFamily: 'Jua',
                        fontSize: 20
                    },
                    headerLeft: () =>
                        <Pressable
                            onPress={rateBack}
                        >
                            <Text style={styles.button}>←</Text>
                        </Pressable>,
                    headerShown: true
                }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    button: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default Layout;