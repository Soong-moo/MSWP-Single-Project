import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

const Main = () => {

    const router = useRouter();
    
    //문제 풀기 버튼
    const [questionOpacity, setQuestionOpacity] = useState(1);
    //정답률 버튼
    const [rateOpacity, setRateOpacity] = useState(1);

    //문제 풀기 라우팅
    const question = () => {
        router.push('/question');
    }
    
    //정답률 라우팅
    const rate = () => {
        router.push('/rate');
    }

    //폰트 설정
    const [fontsLoaded] = useFonts({
        'Jua' : require('../assets/BMJUA_ttf.ttf')
    });

    if(!fontsLoaded) {
        return null;
    }

    return (
            <View style={styles.body}>
                <Text style={styles.mainText}>정보처리기사 기출문제</Text>
                <Text style={styles.subText}>with Chat GPT</Text>
                <Image style={styles.image} source={require('../assets/main_image.png')}/>
                <Pressable 
                    style={[styles.button, {opacity : questionOpacity}]}
                    onPress={question}
                    onPressIn = { () => { setQuestionOpacity(0.5)}}
                    onPressOut = { () => { setQuestionOpacity(1)}}
                >
                    <Text style={styles.buttonText}>문제 풀기</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, {opacity : rateOpacity}]}
                    onPress={rate}
                    onPressIn = { () => { setRateOpacity(0.5)}}
                    onPressOut = { () => { setRateOpacity(1)}}
                >
                    <Text style={styles.buttonText}>정답률 보기</Text>
                </Pressable>
            </View>
    );

}

const styles = StyleSheet.create({

    body : {
        flex : 1,
        backgroundColor : '#344496'
    },

    mainText : {
        marginTop : 130,
        alignItems : 'center',
        textAlign : 'center',
        color : '#FFFFFF',
        fontFamily : 'Jua',
        fontSize : 40,
        fontWeight : 400
    },

    subText : {
        marginTop : 50,
        alignItems : 'center',
        textAlign : 'center',
        color : '#FFFFFF',
        fontFamily : 'Jua',
        fontSize : 30,
        fontWeight : 400
    },

    image : {
        marginTop : 50,
        marginBottom : 20,
        alignSelf : 'center',
        width : 200,
        height : 200
    },

    button : {
        marginTop: 30,
        alignSelf : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 30,
        width : 200,
        height : 50,
        borderColor : '#FFFFFF',
        backgroundColor : '#FFFFFF'
    },

    buttonText : {
        fontFamily : 'Jua',
        fontSize : 20
    }

});


export default Main;