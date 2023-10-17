import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { GPT_API_KEY, BACK_IP, BACK_PORT } from '@env';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const Question = () => {

    const [messages, setMessages] = useState([]); //gpt response
    const [selected, setSelected] = useState(null); //button click check
    const [answer, setAnswer] = useState(null);
    const [opacityA, setOpacityA] = useState(1);
    const [opacityB, setOpacityB] = useState(1);
    const [opacityC, setOpacityC] = useState(1);
    const [opacityD, setOpacityD] = useState(1);

    const [visible, setVisible] = useState(null);
    const [button, setButton] = useState(false);

    const animation = useRef(null);

    //pressable animation
    const buttonHandle = (button) => {
        
        setSelected(button);

        button === messages.Answer ? setAnswer('T') : setAnswer('F');
        setVisible(true);
    }

    //change button color
    const getButtonColor = (button) => {
        if (selected === button) {
            return selected === messages.Answer ? '#344496' : '#FF0000';
        }

        return '#FFFFFF';
    }

    //GPT Question Create
    useEffect(() => {
        const sendMessage = async () => {

            try {
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a teacher who gives exam questions'
                            },
                            {
                                role: 'user',
                                content: '정보처리기사 시험에 대한 문제 하나를 Question, A, B, C, D, Answer, Comment를 Key-Value로 한 JSON Type으로 출력해줘'
                            },
                        ],
                        model: 'gpt-3.5-turbo'
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${GPT_API_KEY}`
                        }
                    }
                );

                const json = JSON.parse(response.data.choices[0].message.content);

                setMessages(json);

                setButton(true);
            } catch (err) {
                console.log(err, 'api call error');
            }
        }
        sendMessage();
    }, []);


    useEffect(() => {
        const sendData = () => {

            fetch(`http://${BACK_IP}:${BACK_PORT}/api/post/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answer: `${answer}` })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('서버 응답', data);
                })
                .catch((error) => {
                    console.error('에러 발생', error);
                });
    
        }
        if(answer !== null) sendData();
    }, [answer]);

    //폰트 설정
    const [fontsLoaded] = useFonts({
        'Jua': require('../assets/BMJUA_ttf.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.body}>
            {!button &&
                <LottieView
                    autoPlay loop
                    ref={animation}
                    source={require('../assets/loading.json')}
                    style={styles.lottie}
                    height={80}
                    weight={80}
                    marginTop={150}
                />
            }
            <Text style={styles.question}>{messages.Question}</Text>
            {button &&
                <Pressable
                    style={[
                        styles.button,
                        {
                            backgroundColor: getButtonColor('A'),
                            opacity: opacityA
                        }
                    ]}
                    onPress={() => {
                        buttonHandle('A')
                    }}
                    onPressIn={() => { setOpacityA(0.5) }}
                    onPressOut={() => { setOpacityA(1) }}
                >
                    <Text style={[
                        styles.answer,
                        { color: selected === 'A' ? '#FFFFFF' : '#000000' }
                    ]}>
                        {messages.A}</Text>
                </Pressable>
            }
            {button &&
                <Pressable
                    style={[
                        styles.button,
                        {
                            backgroundColor: getButtonColor('B'),
                            opacity: opacityB
                        }
                    ]}
                    onPress={() => {
                        buttonHandle('B')
                        
                    }}
                    onPressIn={() => { setOpacityB(0.5) }}
                    onPressOut={() => { setOpacityB(1) }}
                >
                    <Text style={[
                        styles.answer,
                        { color: selected === 'B' ? '#FFFFFF' : '#000000' }
                    ]}>
                        {messages.B}</Text>
                </Pressable>
            }
            {button &&
                <Pressable
                    style={[
                        styles.button,
                        {
                            backgroundColor: getButtonColor('C'),
                            opacity: opacityC
                        }
                    ]}
                    onPress={() => {
                        buttonHandle('C')
                        
                    }}
                    onPressIn={() => { setOpacityC(0.5) }}
                    onPressOut={() => { setOpacityC(1) }}

                >
                    <Text style={[
                        styles.answer,
                        { color: selected === 'C' ? '#FFFFFF' : '#000000' }
                    ]}>
                        {messages.C}</Text>
                </Pressable>
            }
            {button &&
                <Pressable
                    style={[
                        styles.button,
                        {
                            backgroundColor: getButtonColor('D'),
                            opacity: opacityD
                        }
                    ]}
                    onPress={() => {
                        buttonHandle('D')
                        
                    }}
                    onPressIn={() => { setOpacityD(0.5) }}
                    onPressOut={() => { setOpacityD(1) }}
                >
                    <Text style={[
                        styles.answer,
                        { color: selected === 'D' ? '#FFFFFF' : '#000000' }
                    ]}>
                        {messages.D}</Text>
                </Pressable>
            }
            {visible && <Text style={styles.comment}>{messages.Comment}</Text>}
        </View>
    );

}

const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    question: {
        marginTop: 50,
        marginBottom: 40,
        alignItems: 'center',
        textAlign: 'center',
        color: '#344496',
        fontFamily: 'Jua',
        fontSize: 30,
        fontWeight: 400
    },

    answer: {
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Jua',
        fontSize: 20,
        fontWeight: 400
    },

    button: {
        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        width: 350,
        height: 70,
        borderColor: '#344496',
        borderWidth: 2
    },

    comment: {
        marginTop: 30,
        marginBottom: 40,
        alignItems: 'center',
        textAlign: 'center',
        color: '#344496',
        fontFamily: 'Jua',
        fontSize: 25,
        fontWeight: 400
    },

    lottie: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Question;