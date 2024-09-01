import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useColorScheme } from 'nativewind'


export default function AnimatedSwitch(...props) {
  const { colorScheme, toggleColorScheme } = useColorScheme();

    const animation=useSharedValue(0);
    const[isDay,setIsDay] =useState(true);
    const animatedStyle = useAnimatedStyle(()=>{
        return{
            transform:[{translateX:animation.value}]
        }
    })
  return (
    <View style={{flex:1,justifyContent:'center', alignItems:'center',}}>
      

      <TouchableOpacity className="dark:border-gray-400"
      style={{ 
        width:150,
        height:50,
        borderRadius:30,
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5,
        
      }} onPress={()=>{
        if(animation.value=='0'){
            animation.value=withTiming(100,{duration:500})
            setIsDay(false);
            toggleColorScheme('light');
        }else{
            animation.value=withTiming(0,{duration:500})
            setIsDay(true);
            toggleColorScheme('dark');
        }
        
      }}  {...props}>
        <Animated.View style={[{width:40,height:40,borderRadius:20},animatedStyle]}>
            <Image source={isDay? require('../../assets/nightmode.png'):require('../../assets/light.png')} style={{width:'100%',height:'100%'}}></Image>
        </Animated.View>



      </TouchableOpacity>
    </View>
  )
}