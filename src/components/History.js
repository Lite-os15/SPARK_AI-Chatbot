import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NumberCardsScreen = () => {
  const [numberCardsData, setNumberCardsData] = useState([]);

  useEffect(() => {
    // Function to generate new card data every 12 hours
    const generateNewCard = () => {
      const currentDate = new Date();
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      const date = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
       // Generate a random number
      const newCard = { id: Date.now(), day, date}; // Create a new card object
      setNumberCardsData(prevData => [...prevData, newCard]); // Add the new card to the data array
    };

    // Initial call to generate a card
    generateNewCard();

    // Set interval to generate new card every 12 hours
    const interval = setInterval(() => {
      generateNewCard();
    }, 12 * 60 * 60 * 1000);

    // Cleanup function to clear interval
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="bg-white dark:bg-black">
      <Text className="text-black dark:text-white">Chat History</Text>
      <ScrollView style={{paddingHorizontal: 10,
    paddingVertical: 20,}}>
        {numberCardsData.map(card => (
          <View key={card.id} style={{width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,}}>
            <Text style={{ fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,}}>{`${card.day}, ${card.date}`}</Text>
            <Text style={styles.cardText}>{`Preview of chat history for ${card.date}`}</Text>
           
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  cardsContainer: {
    
  },
  card: {
    
  },
  cardTitle: {
   
  },
  cardText: {
    fontSize: 16,
  },
});

export default NumberCardsScreen;
