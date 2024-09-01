import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useColorScheme } from "nativewind";
import AnimatedSwitch from './AnimatedSwitch';


export default function CustomDrawer({ navigation, ...props }) {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const menuItems = [
        { title: 'Chat History', onPress: () => navigation.navigate('ChatHistory'), icon: 'chatbox' },
        // Add more items as needed
    ];

    const [animatedValue] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(animatedValue, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
            <DrawerContentScrollView {...props}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={item.onPress}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        style={{
                            padding: 10,
                            marginVertical: 5,
                            marginHorizontal: 20,
                            borderRadius: 10,
                            backgroundColor: colorScheme === 'dark' ? '#222' : '#f0f0f0',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transform: [{ scale: animatedValue }],
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            
                            <Text style={{ fontSize: 16, color: colorScheme === 'dark' ? '#fff' : '#000' }}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={{flexDirection:'column', padding: 10, marginVertical: 5, marginHorizontal: 20, borderRadius: 10 }}>
                    <AnimatedSwitch {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                <Text style={{ fontSize: 18, color: colorScheme === 'dark' ? '#fff' : '#000' }}>Let's Create a Future</Text>
            </View>
        </View>
    );
}
