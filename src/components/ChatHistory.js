import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, Text, SafeAreaView, FlatList, } from 'react-native';

import { getChats, getChatHistory1 } from './Database';
import { wrapMigration } from 'realm';
import { ScrollView } from 'react-native-gesture-handler';

const ChatHistory = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch chat history when component mounts
    const chatHistory = getChatHistory1();
    setMessages(chatHistory);
  }, []);

  const renderItem = ({ item }) => {


    const formattedTimestamp = new Date(item.timestamp).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return (
      <View style={[{
        marginBottom: 10,
        paddingHorizontal: 5,
        borderRadius: 20,
      }]}>
        {item.role === 'user' ? (
          <View>
            <View style={{ flex: 1, }} className="shadow-2xl shadow-white">
              <View className="rounded-2xl rounded-tr-none shadow-xl shadow-white" style={{ backgroundColor: "#89d9f2", paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-end', maxWidth: wp(80), backgroundColor: "#89d9f2", elevation: 3 }}>
                <Text className="text-black">You</Text>
                <Text className="text-black">{item.content}</Text>
                <Text className="text-black">{formattedTimestamp}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="bg-neutral-700 dark:bg-neutral-800 rounded-2xl rounded-tl-none" style={{ paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', maxWidth: wp(80), elevation: 3 }}>
            <Text className=" dark:text-white">Assistant</Text>
            <Text className=" dark:text-white">{item.content}</Text>
            <Text className=" dark:text-white">{formattedTimestamp}</Text>
          </View>
        )}

      </View>
    );
  };

  return (
    
    <View className="bg-white dark:bg-black" style={{flex:0}}>
    
      <View style={{
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        alignItems: 'center',
      }}>
        <Text className="text-black dark:text-white " style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}>
        Chat History
        </Text>
      </View>
      
      <SafeAreaView className="bg-white dark:bg-black mb-40 ">
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      
      
    </SafeAreaView>
    </View>
  );
};



export default ChatHistory;
