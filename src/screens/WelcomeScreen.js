import { View, Text, Image, TouchableOpacity, YellowBox,SafeAreaView } from 'react-native'
import React from 'react'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';




export default function WelcomeScreen() {
    YellowBox.ignoreWarnings;
    
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white dark:bg-gray-800">
    
        <View className="space-y-2">
            <Text style={{fontSize: wp(10)}} className="text-center font-bold  text-gray-700 dark:text-cyan-100 ">
                S.P.A.R.K
            </Text>
            <Text style={{fontSize: wp(4)}} className="text-center tracking-wider text-gray-600 font-semibold dark:text-cyan-100 ">
                The Future is here, powered by us.
            </Text>
        </View>
        <View className="flex-row justify-center">
            <Image source={require('../../assets/bot.png')} style={{width:wp(60),height: hp(35)}}></Image>
        </View> 
        <TouchableOpacity onPress={()=> navigation.navigate('Features')} className="bg-emerald-500 mx-5 p-4 rounded-2xl shadow-xl shadow-black dark:shadow-slate-400">
            <Text className="text-center font-bold text-white" style={{fontSize: wp(6)}}>Get Started</Text>
        </TouchableOpacity> 
      
    </SafeAreaView>
   


  )
}