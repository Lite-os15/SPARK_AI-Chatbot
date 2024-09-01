// Import necessary components and modules
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Clipboard, SafeAreaView } from 'react-native';
import Voice from '@react-native-voice/voice';


import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import Tts from 'react-native-tts';
import { useNavigation } from '@react-navigation/native';
import LoadingDots from 'react-native-loading-dots';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { storeMessage, printChatHistory, clearDatabase, getChatHistory, getChatHistory1 } from '../components/Database'
import ChatHistory from '../components/ChatHistory';
import { datatoAPI } from '../components/DataToAPI'
import AutoTypingAnimation from '../components/TypingAnimation';









export default function HomeScreen({ name }) {
    // State variables initialization
    const [recognizedText, setRecognizedText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speakingMessage, setSpeakingMessage] = useState(null);




    // Call the printChatHistory function wherever you need to print the stored data

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResultsHandler;

        return (
            Voice.removeAllListeners()
        )
    }, []);


    const startSpeaking = async (generatedText) => {

        Tts.speak(generatedText, {
            onStart: () => setSpeakingMessage(generatedText),
            onDone: () => setSpeakingMessage(null)
        });
    };


    const stopSpeaking = async () => {
        Tts.stop(true);

    }

    // Function to handle speech recognition results
    const onSpeechResultsHandler = (event) => {
        const text = event.value[0];

        setIsListening(false);

        console.log(text);

        setRecognizedText(text);
    };



    // Function to handle microphone button press
    const handleMicrophonePress = async () => {


        if (!isListening) {
            try {

                await Voice.start('en-US');
                setIsListening(true);
                // Voice.onSpeechResults = onSpeechResultsHandler;

            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await Voice.stop();
                setIsListening(false);
            } catch (error) {
                console.error(error);
            }
        }
    };




    const handleSendMessage = async () => {
        if (recognizedText.trim().length === 0) return;

        // Add user's input message to the chat
        const newUserMessage = { role: 'user', content: recognizedText.trim() };


        storeMessage('user', recognizedText.trim()); // Storing the user's message // Stored in local database

        console.log("newUserMessage", newUserMessage);
        setMessages([...messages, newUserMessage]);

        console.log("setMessages", setMessages);

        // Clear the text input after sending the message
        setRecognizedText('');

        try {
            // Fetch response from OpenAI API with user's message as query

            const response = await apiCall(recognizedText.trim());

            // Save assistant's response to the database
            response.forEach((msg) => {
                storeMessage('assistant', msg.content);  // Stored in local database
            });

            // console.log("\nResponse: ", response);
            // Update the chat with the response

            setMessages([...messages, newUserMessage, ...response]);
            // console.log("setMessages",setMessages);

            const generatedText = response[0].content;
            console.log("Generated text: ", generatedText);
            // Tts.speak(generatedText)

            startSpeaking(generatedText);
            setIsSpeaking(false);

            // speakText(generatedText);


        } catch (error) {
            console.error('Error fetching response:', error);
        }
    };




    const apiCall = async (userMessage) => {
        try {
            setLoading(true);
            const getData = datatoAPI();
            console.log(getData);
            const chatHistoryJSON = JSON.stringify(getData);
            console.log("how are you",chatHistoryJSON);



            const queryParams = new URLSearchParams({
                input: userMessage,
                // chath_history:chatHistoryJSON
            });
            const url = `https://appsilon.pythonanywhere.com/chat?${queryParams}`;

            const response = await fetch(url);


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();

            // console.log("UserMessage", userMessage);
            const generatedText = responseData.output;
            // console.log(generatedText);
            setLoading(false);

            return [{ role: 'assistant', content: generatedText }];
        } catch (error) {
            console.error('Error from API:', error);
            setLoading(true); // Make sure to set loading to false in case of error

            if (error.response && error.response.status === 500) {
                // Handle 500 status code error
                setLoading(false);
                return [{ role: 'assistant', content: 'Internal server error occurred. Please try again later.' }];
            } else if (error.response && error.response.status === 422) {
                setLoading(false);
                return [{ role: 'assistant', content: 'Invalid Input. Please enter valid input' }];
            } else {
                setLoading(false);
                return [{ role: 'assistant', content: 'Sorry, Something went wrong!!!' }];
            }
        }
    };

    // const Chat = getChatHistory();
    // const Chat2= Chat.slice(0,10);
    // const apidata= datatoAPI();
    // console.log(Chat2);
    // console.log("APi data",apidata);


    // const fetch = require('node-fetch');


    // const apiCall = async (userMessage) => {
    //     try {
    //         setLoading(true);
    //         const requestBody = {
    //             human_input: userMessage
    //         };

    //         const response = await fetch('https://your-fastapi-endpoint.com/chat', {
    //             method: 'POST', // Assuming this endpoint accepts POST requests
    //             headers: {
    //                 'Content-Type': 'application/json' // Specify content type as JSON
    //             },
    //             body: JSON.stringify(requestBody) // Convert requestBody to JSON string
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const responseData = await response.json();

    //         console.log("UserMessage", userMessage);
    //         const generatedText = responseData.output;
    //         console.log(generatedText);
    //         setLoading(false);

    //         return [{ role: 'assistant', content: generatedText }];
    //     } catch (error) {
    //         console.error('Error from API:', error);
    //         setLoading(true); // Make sure to set loading to false in case of error

    //         if (error.response && error.response.status === 500) {
    //             // Handle 500 status code error
    //             setLoading(false);
    //             return [{ role: 'assistant', content: 'Internal server error occurred. Please try again later.' }];
    //         } else if (error.response && error.response.status === 422) {
    //             setLoading(false);
    //             return [{ role: 'assistant', content: 'Invalid Input. Please enter valid input' }];
    //         } else {
    //             setLoading(false);
    //             return [{ role: 'assistant', content: 'Sorry, Something went wrong!!!' }];
    //         }
    //     }
    // };


    // printChatHistory();


    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ elevation: 5 }}>
            <SafeAreaView className="flex-1 flex mx-2" style={{ elevation: 5 }}>

                <View className="flex-row pt-3" style={{ justifyContent: "space-between", elevation: 5 }}>

                    {/* Menu Bar */}
                    <View className="mt-2" style={{ elevation: 5 }}>
                    
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{}}>
                            <Icon name="menu-outline" size={27} color="cyan"></Icon>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {/* Name of the APP */}
                        <Text className="text-gray-700 font-semibold ml-1f dark:text-gray-50  text-center pl-9 text-xl" style={{ alignItems: "baseline", elevation: 5 }}>
                            SPARK
                        </Text>
                    </View>

                    {/* App logo */}
                    <View className="justify-end" style={{ elevation: 5 }}>
                        <Image source={require('../../assets/bot.png')} style={{ height: hp(7), width: wp(15) }}></Image>
                    </View>

                </View>

                <View style={{ flex: 1, elevation: 5 }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} bounces={false} className="space-y-4 p-2">

                        {/* Message Display */}
                        {messages.map((message, index) => (
                            <View key={index} style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>

                                {message.role === 'user' ? (
                                    <View style={{ flex: 1, }} className="shadow-2xl shadow-white">
                                        <View className="rounded-2xl rounded-tr-none shadow-xl shadow-white" style={{ paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-end', maxWidth: wp(80), backgroundColor: "#89d9f2", elevation: 3 }}>
                                            <Text style={{ color: 'black' }} className="p-1">{message.content}</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={{ flex: 1 }}>
                                        <View className="bg-neutral-300 dark:bg-neutral-900 rounded-2xl rounded-tl-none" style={{ paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', maxWidth: wp(80), elevation: 3 }}>
                                            {message.isLoading ? <LoadingDots bounceHeight={6} size={10} /> : <Text className="text-black dark:text-white p-1">{message.content}</Text>}
                                        </View>

                                        {/* Action buttons */}
                                        <View className="flex-row space-x-5" style={{ elevation: 5 }}>



                                            <TouchableOpacity onPress={() => startSpeaking(message.content)}>
                                                <View>
                                                    <Icon size={20} name="volume-high" />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => stopSpeaking()}>
                                                <View>
                                                    <Icon size={20} name="volume-mute-outline" />
                                                </View>
                                            </TouchableOpacity>



                                            <TouchableOpacity onPress={() => Clipboard.setString(message.content)}>
                                                <View>
                                                    <Icon size={20} name="copy-outline" />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>

                    {/* Listening indicator */}
                    {isListening && (
                        <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', elevation: 5 }}>
                            <Text className="text-gray-700 dark:text-white" style={{ fontSize: wp(5) }}>Listening...</Text>
                        </View>
                    )}
                </View>

                {/* Input field and buttons */}
                <View style={{ paddingHorizontal: 5 }}>
                    <View className="flex-row" style={{ marginVertical: 15, height: hp(7.5), elevation: 5 }}>
                        <View
                            className="bg-white  flex-1 shadow-2xl shadow-white"
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',

                                borderRadius: 15, paddingHorizontal: 16,
                                borderWidth: 0.5, elevation: 3
                            }} >
                            <TextInput
                                className="flex-1" editable={true}
                                value={recognizedText}
                                placeholder={"Ask me Something?"}
                                placeholderTextColor='black'
                                style={{ color: 'black', }}
                                onChangeText={setRecognizedText}
                                multiline={true}
                                numberOfLines={3}
                                importantForAutofill='auto' />
                        </View>

                        {/* Microphone and send buttons */}
                        {recognizedText.length > 0 ? (

                            <TouchableOpacity onPress={isLoading ? null : handleSendMessage} 
                            style={{ padding: 10, marginLeft: 5, width: 57, height: 62, 
                            backgroundColor: '#89d9f2', alignItems: 'center', justifyContent: 'center', 
                            borderRadius: 20, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, 
                            shadowRadius: 3.84, elevation: 5,
                            opacity: isLoading ? 0.5 : 1,
                            pointerEvents: isLoading ? 'none' : 'auto'
                             }} 
                            
                            className="shadow-2xl dark:shadow-white shadow-black">

                                {isLoading ? <ActivityIndicator
                                        style={{ position: 'absolute', zIndex: 999 }}
                                        size="small"
                                        color="black"
                                        
                                    /> :
                                     <Icon name="send" size={20} color="black"></Icon>}
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleMicrophonePress} style={{ marginLeft: 5, backgroundColor: isListening ? 'red' : '#89d9f2', width: 57, height: 62, alignItems: 'center', justifyContent: 'center', borderRadius: 25, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 3.84, elevation: 10 }} className="shadow-2xl dark:shadow-white shadow-black">
                                {isListening ? <Icon size={25} color="black" name="mic-off"></Icon> : <Icon color="black" size={30} name="mic-outline"></Icon>}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </View>


    );
}






