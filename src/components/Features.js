import { View, Text, TouchableOpacity,SafeAreaView } from 'react-native'
import { style } from 'nativewind'
import { Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NumberCardsScreen from './History';
import { useNavigation } from '@react-navigation/native';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import React, { useRef, useEffect,useState } from 'react';
import { Animated, Easing } from 'react-native';
import AutoTypingAnimation from './TypingAnimation';


export default function Features() {
    const navigation = useNavigation();

    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const positionY = useRef(new Animated.Value(hp(30))).current;

    useEffect(() => {

        const fadeInAnimation = Animated.timing(positionY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        });



        const movementAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(position, {
                    toValue: { x: 0, y: 20 },
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(position, {
                    toValue: { x: 0, y: 0 },
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(position, {
                    toValue: { x: 0, y: -20 },
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(position, {
                    toValue: { x: 0, y: 0 },
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                })
            ])
        );

        Animated.sequence([fadeInAnimation, Animated.delay(1000), movementAnimation]).start();

    }, [position]);

    // const [quote, setQuote] = useState("");
    // const quotes = [
    //   "“The road to success and the road to failure are almost exactly the same.”",
    //   "“Success usually comes to those who are too busy to be looking for it.”",
    //   "“I never dreamed about success. I worked for it.” ",
    //   "“If you are working on something that you really care about, you dont have to be pushed. The vision pulls you.”",
    //   "“Concentrate all your thoughts upon the work in hand. The sun rays do not burn until brought to a focus.”",
    //   "“Talent wins games, but teamwork and intelligence win championships.”",
    // ];
    // useEffect(() => {
    //     // Function to select a random quote when the component mounts
    //     const selectRandomQuote = () => {
    //       const randomIndex = Math.floor(Math.random() * quotes.length);
    //       return quotes[randomIndex];
    //     };
    
    //     // Update the quote when the component mounts
    //     const randomQuote = selectRandomQuote();
    //     setQuote(randomQuote);
    //   }, []);


    return (
        <View className="flex-1  bg-white dark:bg-black">
            <SafeAreaView className="flex-1 mx-2 bg-white dark:bg-gray-800">
            <View className="space-y-4 bg-white dark:bg-black flex-1" >
                <Animated.View style={[{ transform: [{ translateY: position.y }, { translateY: positionY }] }]} className=" items-center">
                    <Image source={require('../../assets/bot.png')} style={{ height: hp(30), width: wp(38) }} />
                </Animated.View>





                <View style={{ flexDirection: 'row', elevation:10}} className="bg-white dark:bg-black " >
                    <TouchableOpacity onPress={() => navigation.navigate('Root')} style={{ flex: 1 }}>
                        <View style={{ padding: wp(4), margin: 4, height: hp(23) }} className="rounded-xl space-y-2 bg-emerald-200">
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{ fontSize: wp(3.8) }} className='text-gray-700  font-semibold text-4xl'>SPARK</Text>
                            </View>
                            
                            {/* <Text style={{ fontSize: wp(3.8),justifyContent:'center' }} className='text-gray-700 font-medium overflow-auto'> */}
                            <AutoTypingAnimation text={"Dive into a realm of endless possibilities where imagination has no limits."} typingSpeed={15}>
                                
                            </AutoTypingAnimation>
                            {/* </Text> */}
                            
                        </View>
                    </TouchableOpacity>

                   
                </View>




            </View>

            {/* <View style={{
                flex:0.5,
                justifyContent: 'center',
                
                alignItems: 'center',
            }} className="dark:bg-black">
                <AutoTypingAnimation text={quote} typingSpeed={15}/>
                
            </View> */}
            </SafeAreaView>
        </View>

    )
}