import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { BACK_IP, BACK_PORT } from '@env';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const Rate = () => {

  const router = useRouter();
  const animation = useRef(null);

  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [opacityArrow, setOpacityArrow] = useState(1);

  //Back 통신
  useEffect(() => {
    const getAll = async () => {
      try {
        const total = await axios.get(`http://${BACK_IP}:${BACK_PORT}/api/get/total`);
        setTotal(total.data[0].total);

        const correct = await axios.get(`http://${BACK_IP}:${BACK_PORT}/api/get/correct`);
        console.log(correct.data[0].correct);
        setCorrect(correct.data[0].correct);

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    getAll();
  }, []);

  const question = () => {
    router.replace('/question');
  }

  //폰트 설정
  const [fontsLoaded] = useFonts({
    'Jua': require('../assets/BMJUA_ttf.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <View style={styles.body}>
        <Text style={styles.mainOne}>이용자들의 정답률은</Text>
        <Text style={styles.rate}>{(correct / total * 100).toFixed(2)}%</Text>
        <Text style={styles.mainTwo}>입니다!</Text>
        <Box flexDirection="row">
          <Box style={styles.boxLeft}>
            <Text style={styles.comment}>정답</Text>
            <Text style={styles.number}>{correct}</Text>
          </Box>
          <Box style={styles.boxRight}>
            <Text style={styles.comment}>풀이</Text>
            <Text style={styles.number}>{total}</Text>
          </Box>
        </Box>
        <Pressable
          style={[styles.button,
          {
            opacity: opacityArrow,
            zIndex : 1
          }]}
          onPress={ question}
          onPressIn={() => { setOpacityArrow(0.5) }}
          onPressOut={() => { setOpacityArrow(1) }}
        >
          <Text style={styles.buttonText}>문제를 풀러 가볼까요?</Text>
        </Pressable>
        <LottieView
          autoPlay loop
          ref={animation}
          source={require('../assets/blue_arrow.json')}
          style={styles.lottie}
          height={100}
          weight={100}
          marginTop={305}
          pointerEvents="none"
        />
      </View>
    </NativeBaseProvider>
  )

}

const styles = StyleSheet.create({

  body: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  mainOne: {
    marginTop: 50,
    alignItems: 'center',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Jua',
    fontSize: 40,
    fontWeight: 400
  },

  rate: {
    marginTop: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: '#344496',
    fontFamily: 'Jua',
    fontSize: 70,
    fontWeight: 400
  },

  mainTwo: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Jua',
    fontSize: 40,
    fontWeight: 400
  },

  boxLeft: {
    alignSelf: 'left',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    width: 150,
    height: 150,
    backgroundColor: '#F6F6F6',
    borderColor: '#344496',
    borderWidth: 5,
    borderRadius: 20
  },

  boxRight: {
    alignSelf: 'right',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    width: 150,
    height: 150,
    backgroundColor: '#F6F6F6',
    borderColor: '#344496',
    borderWidth: 5,
    borderRadius: 20
  },

  comment: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Jua',
    fontSize: 25,
    fontWeight: 400
  },

  number: {
    marginBottom: 40,
    alignItems: 'center',
    textAlign: 'center',
    color: '#344496',
    fontFamily: 'Jua',
    fontSize: 40,
    fontWeight: 400
  },

  button: {
    marginTop: 80,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 350,
    height: 70,
    borderColor: '#344496',
    borderWidth: 3
  },

  buttonText: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Jua',
    fontSize: 20,
    fontWeight: 400
  }

})

export default Rate;